'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Box3, MathUtils, Mesh, PMREMGenerator, Vector3 } from 'three';
import type { Group, Material, Scene, Texture } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const MODEL_PATH = '/models/kairox-digital-core.glb';

type SceneBoundaryProps = { children: ReactNode; onError: () => void };

function setSceneEnvironment(target: Scene, environment: Texture | null, intensity: number) {
  target.environment = environment;
  target.environmentIntensity = intensity;
}

class SceneErrorBoundary extends Component<SceneBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Reflections() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const previousEnvironment = scene.environment;
    const previousIntensity = scene.environmentIntensity;
    const environment = generator.fromScene(room, 0.04).texture;
    setSceneEnvironment(scene, environment, 1.05);

    return () => {
      if (scene.environment === environment) {
        setSceneEnvironment(scene, previousEnvironment, previousIntensity);
      }
      environment.dispose();
      room.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material: Material) => material.dispose());
        }
      });
      generator.dispose();
    };
  }, [gl, scene]);

  return null;
}

function DigitalCore({ onLoaded }: { onLoaded: () => void }) {
  const gltf = useLoader(GLTFLoader, MODEL_PATH);
  const viewport = useThree((state) => state.viewport);
  const assembly = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const prepared = useMemo(() => {
    const model = gltf.scene.clone(true);
    model.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const longestSide = Math.max(size.x, size.y, size.z, 0.001);
    return { model, center, longestSide };
  }, [gltf.scene]);

  useEffect(() => onLoaded(), [onLoaded]);

  // Subtle interactive movement: the core leans gently toward the cursor.
  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useFrame(({ clock }, delta) => {
    const group = assembly.current;
    if (!group) return;
    const dt = Math.min(delta, 0.05);
    const elapsed = clock.getElapsedTime();
    const damp = 1 - Math.exp(-dt * 3.2);
    // Natural, unhurried spin with a soft pointer-driven tilt layered on top.
    group.rotation.y += dt * 0.14;
    group.rotation.x = MathUtils.lerp(group.rotation.x, Math.sin(elapsed * 0.22) * 0.03 + pointer.current.y * 0.14, damp);
    group.rotation.z = MathUtils.lerp(group.rotation.z, Math.sin(elapsed * 0.17) * 0.02 - pointer.current.x * 0.05, damp);
    group.position.x = MathUtils.lerp(group.position.x, pointer.current.x * 0.12, damp);
    group.position.y = Math.sin(elapsed * 0.55) * 0.075;
  });

  // Fit by the narrower of the preferred size and the available canvas width.
  const targetSize = Math.min(3.3, viewport.width * 0.94, viewport.height * 0.9);
  const scale = targetSize / prepared.longestSide;
  return (
    <group ref={assembly}>
      <group scale={scale} position={[-prepared.center.x * scale, -prepared.center.y * scale, -prepared.center.z * scale]}>
        <primitive object={prepared.model} />
      </group>
    </group>
  );
}

function PauseWhenHidden({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const setFrameloop = useThree((state) => state.setFrameloop);

  useEffect(() => {
    const element = target.current;
    let onScreen = true;
    let tabVisible = !document.hidden;
    const apply = () => setFrameloop(onScreen && tabVisible ? 'always' : 'never');
    const observer = element ? new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; apply(); }) : null;
    if (element && observer) observer.observe(element);
    const onVisibility = () => { tabVisible = !document.hidden; apply(); };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [setFrameloop, target]);

  return null;
}

function ContextLossReporter({ onLost, onRestored }: { onLost: () => void; onRestored: () => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const handleLost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    gl.domElement.addEventListener('webglcontextlost', handleLost);
    gl.domElement.addEventListener('webglcontextrestored', onRestored);
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', handleLost);
      gl.domElement.removeEventListener('webglcontextrestored', onRestored);
    };
  }, [gl, onLost, onRestored]);

  return null;
}

export default function OrbCanvas() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reportError = useCallback(() => setFailed(true), []);
  const reportLoaded = useCallback(() => {
    setFailed(false);
    setReady(true);
  }, []);
  const shell = useRef<HTMLDivElement>(null);

  return (
    <div className={`orb-canvas-shell${ready ? ' is-ready' : ''}`} ref={shell}>
      <Canvas
        fallback={<span>KAIROX Digital Core: chrome-and-glass 3D model</span>}
        camera={{ position: [0, 0, 5.4], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'default', preserveDrawingBuffer: false }}
        onCreated={({ gl }) => { gl.toneMappingExposure = 1.12; }}
      >
        <SceneErrorBoundary onError={reportError}>
          <ContextLossReporter onLost={reportError} onRestored={reportLoaded} />
          <Suspense fallback={null}>
            <Reflections />
            <PauseWhenHidden target={shell} />
            <ambientLight intensity={0.28} color="#C0CBE0" />
            <directionalLight position={[3.5, 4.2, 5]} intensity={1.35} color="#FFFFFF" />
            <pointLight position={[3.6, 2.2, 2.6]} intensity={5.5} distance={9} color="#9B6DFF" />
            <pointLight position={[-3.6, -1.6, 2.2]} intensity={4.2} distance={9} color="#22C8FF" />
            <pointLight position={[0, 2.8, -3.4]} intensity={3.4} distance={10} color="#8CEBFF" />
            <pointLight position={[-2.6, 2.4, 3]} intensity={1.4} distance={8} color="#9B6DFF" />
            <DigitalCore onLoaded={reportLoaded} />
          </Suspense>
        </SceneErrorBoundary>
      </Canvas>
      {!ready && !failed ? <div className="orb-loader" role="status"><span className="orb-loader__spinner" aria-hidden="true" />Loading KAIROX Digital Core</div> : null}
      {failed ? <div className="orb-error" role="status">3D preview unavailable. The rest of the site is ready to use.</div> : null}
    </div>
  );
}
