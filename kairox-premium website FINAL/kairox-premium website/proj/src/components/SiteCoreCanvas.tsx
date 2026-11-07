'use client';

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { usePathname } from 'next/navigation';
import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from 'react';
import {
  BackSide, Box3, BufferAttribute, Color, DoubleSide, MathUtils, Mesh, MeshBasicMaterial, MeshPhysicalMaterial,
  MeshStandardMaterial, PlaneGeometry, PMREMGenerator, Scene, SphereGeometry, Vector3,
} from 'three';
import type { Group, Material, Object3D } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL_PATH = '/models/kairox-digital-core.glb';
const CAMERA_Z = 9.3;
const CAMERA_FOV = 24;

type Pose = { x: number; y: number; y2: number; size: number; opacity: number };
/** Where the core rests on inner pages (fractions of the viewport). y -> y2 is the scroll drift. */
const POSES: Record<string, Pose> = {
  default: { x: 0.82, y: 0.40, y2: 0.62, size: 0.62, opacity: 0.55 },
  services: { x: 0.84, y: 0.38, y2: 0.64, size: 0.66, opacity: 0.55 },
  work: { x: 0.85, y: 0.42, y2: 0.60, size: 0.60, opacity: 0.5 },
  about: { x: 0.80, y: 0.40, y2: 0.66, size: 0.62, opacity: 0.5 },
  process: { x: 0.84, y: 0.36, y2: 0.66, size: 0.64, opacity: 0.5 },
  contact: { x: 0.86, y: 0.42, y2: 0.58, size: 0.52, opacity: 0.42 },
  legal: { x: 0.88, y: 0.40, y2: 0.58, size: 0.44, opacity: 0.32 },
};

function poseFor(pathname: string): Pose {
  const first = pathname.split('/')[1] ?? '';
  if (first === 'privacy' || first === 'terms') return POSES.legal;
  return POSES[first] ?? POSES.default;
}

function setCoreState(state: 'on' | 'failed' | null) {
  if (typeof document === 'undefined') return;
  if (state) document.documentElement.dataset.core3d = state;
  else delete document.documentElement.dataset.core3d;
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { setCoreState('failed'); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** A tiny virtual photo studio: bright sky, dark horizon, violet floor and coloured softboxes.
 *  Chrome needs contrast to read as chrome, and brand-coloured light so it is not plain grey. */
function buildStudio() {
  const studio = new Scene();
  const sky = new SphereGeometry(30, 48, 24);
  const stops: Array<[number, Color]> = [
    [0, new Color('#2A3FA8')],
    [0.28, new Color('#6A45E0')],
    [0.44, new Color('#080D28')],
    [0.58, new Color('#0B1238')],
    [0.78, new Color('#4C6BFF')],
    [1, new Color('#E8F0FF').multiplyScalar(2.2)],
  ];
  const position = sky.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const tmp = new Color();
  for (let i = 0; i < position.count; i += 1) {
    const t = MathUtils.clamp((position.getY(i) / 30 + 1) / 2, 0, 1);
    let k = 0;
    while (k < stops.length - 2 && t > stops[k + 1][0]) k += 1;
    const [t0, c0] = stops[k];
    const [t1, c1] = stops[k + 1];
    tmp.copy(c0).lerp(c1, MathUtils.clamp((t - t0) / (t1 - t0), 0, 1));
    colors.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  sky.setAttribute('color', new BufferAttribute(colors, 3));
  studio.add(new Mesh(sky, new MeshBasicMaterial({ vertexColors: true, side: BackSide, toneMapped: false })));
  const panel = (hex: string, power: number, w: number, h: number, x: number, y: number, z: number) => {
    const mesh = new Mesh(new PlaneGeometry(w, h), new MeshBasicMaterial({ color: new Color(hex).multiplyScalar(power), side: DoubleSide, toneMapped: false }));
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
  };
  panel('#FFFFFF', 8, 12, 6, -9, 7, 12);
  panel('#9B6DFF', 8, 5, 16, 15, 0, 7);
  panel('#22C8FF', 8, 5, 16, -15, -2, 7);
  panel('#8CEBFF', 5, 18, 3, 0, 5, -16);
  return studio;
}

function Reflections() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new PMREMGenerator(gl);
    const studio = buildStudio();
    const environment = generator.fromScene(studio, 0.03).texture;
    const previous = scene.environment;
    scene.environment = environment;
    scene.environmentIntensity = 1.2;
    return () => {
      if (scene.environment === environment) scene.environment = previous;
      environment.dispose();
      studio.traverse((object) => {
        if (object instanceof Mesh) {
          object.geometry.dispose();
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((m: Material) => m.dispose());
        }
      });
      generator.dispose();
    };
  }, [gl, scene]);
  return null;
}

/** Give the supplied chrome and glass a cool violet-cyan sheen without replacing the model. */
function tuneMaterials(root: Object3D) {
  const chromeTint = new Color('#B7C3FF');
  const glassTint = new Color('#BFE9FF');
  root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material: Material) => {
      if (!(material instanceof MeshStandardMaterial) || material.userData.kairoxTuned) return;
      material.userData.kairoxTuned = true;
      if (material instanceof MeshPhysicalMaterial && material.transmission > 0) {
        material.attenuationColor.copy(glassTint);
        material.iridescence = 0.3;
        material.iridescenceThicknessRange = [200, 500];
        material.envMapIntensity = 1.6;
      } else if (material.metalness > 0.5) {
        material.color.lerp(chromeTint, 0.18);
        material.envMapIntensity = 1.3;
        if (material instanceof MeshPhysicalMaterial) {
          material.iridescence = Math.max(material.iridescence, 0.22);
          material.iridescenceThicknessRange = [260, 620];
        }
      }
      material.needsUpdate = true;
    });
  });
}

function DigitalCore({ onLoaded }: { onLoaded: () => void }) {
  const gltf = useLoader(GLTFLoader, MODEL_PATH);
  const pathname = usePathname();
  const assembly = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const motion = useRef({ x: 0, y: 0, size: 0, opacity: 0, spin: 0, progress: 0, ready: 0, init: false, startedAt: 0 });
  const prepared = useMemo(() => {
    const model = gltf.scene.clone(true);
    tuneMaterials(model);
    model.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(model);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    return { model, center, longestSide: Math.max(size.x, size.y, size.z, 0.001) };
  }, [gltf.scene]);

  useEffect(() => onLoaded(), [onLoaded]);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  useFrame(({ gl, size, camera }, delta) => {
    const group = assembly.current;
    if (!group) return;
    const m = motion.current;
    const W = size.width;
    const H = size.height;
    const dt = Math.min(delta, 0.05);
    const damp = 1 - Math.exp(-dt * 3.4);
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.documentElement.scrollHeight - H, 1);
    const progress = MathUtils.clamp(scrollY / maxScroll, 0, 1);
    const minSide = Math.min(W, H);

    // Resting pose for this page, drifting down the viewport as the page scrolls.
    const pose = poseFor(pathname);
    let tx = W * pose.x;
    let ty = H * MathUtils.lerp(pose.y, pose.y2, progress);
    let tsize = Math.min(minSide * pose.size, W * 0.42);
    let topacity = pose.opacity;

    // On the homepage the core first docks into the hero, then eases out to its resting pose while scrolling.
    const anchor = document.querySelector<HTMLElement>('[data-core-anchor]');
    if (anchor) {
      const r = anchor.getBoundingClientRect();
      const f = MathUtils.smoothstep(1 - scrollY / (H * 0.8), 0, 1);
      tx = MathUtils.lerp(tx, r.left + r.width / 2, f);
      ty = MathUtils.lerp(ty, r.top + r.height / 2, f);
      tsize = MathUtils.lerp(tsize, Math.min(r.width * 0.94, r.height * 0.84), f);
      topacity = MathUtils.lerp(topacity, 1, f);
    }

    if (!m.init) { m.x = tx; m.y = ty; m.size = tsize; m.opacity = topacity; m.init = true; }
    m.x = MathUtils.lerp(m.x, tx, damp);
    m.y = MathUtils.lerp(m.y, ty, damp);
    m.size = MathUtils.lerp(m.size, tsize, damp);
    m.opacity = MathUtils.lerp(m.opacity, topacity, damp);
    m.progress = MathUtils.lerp(m.progress, progress, damp);
    if (!m.startedAt) m.startedAt = performance.now();
    m.ready = MathUtils.clamp((performance.now() - m.startedAt) / 1200, 0, 1);
    m.spin += dt * 0.14;

    const worldPerPixel = (2 * Math.tan(MathUtils.degToRad(CAMERA_FOV / 2)) * CAMERA_Z) / H;
    const elapsed = performance.now() / 1000;
    group.position.set(
      (m.x - W / 2) * worldPerPixel + pointer.current.x * 0.1,
      -(m.y - H / 2) * worldPerPixel + Math.sin(elapsed * 0.55) * 0.07,
      0,
    );
    group.scale.setScalar((m.size * worldPerPixel) / prepared.longestSide);
    group.rotation.y = m.spin + m.progress * Math.PI * 2.5;
    group.rotation.x = MathUtils.lerp(group.rotation.x, Math.sin(elapsed * 0.22) * 0.03 + pointer.current.y * 0.14, damp);
    group.rotation.z = MathUtils.lerp(group.rotation.z, Math.sin(elapsed * 0.17) * 0.02 - pointer.current.x * 0.05, damp);
    gl.domElement.style.opacity = String(m.opacity * m.ready);
    camera.updateProjectionMatrix();
  });

  return (
    <group ref={assembly}>
      <group position={[-prepared.center.x, -prepared.center.y, -prepared.center.z]}>
        <primitive object={prepared.model} />
      </group>
    </group>
  );
}

function PauseWhenHidden() {
  const setFrameloop = useThree((state) => state.setFrameloop);
  useEffect(() => {
    const apply = () => setFrameloop(document.hidden ? 'never' : 'always');
    document.addEventListener('visibilitychange', apply);
    return () => document.removeEventListener('visibilitychange', apply);
  }, [setFrameloop]);
  return null;
}

function ContextLossReporter() {
  const { gl } = useThree();
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); setCoreState('failed'); };
    const restored = () => setCoreState('on');
    gl.domElement.addEventListener('webglcontextlost', lost);
    gl.domElement.addEventListener('webglcontextrestored', restored);
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', lost);
      gl.domElement.removeEventListener('webglcontextrestored', restored);
    };
  }, [gl]);
  return null;
}

export default function SiteCoreCanvas() {
  useEffect(() => () => setCoreState(null), []);
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
      onCreated={({ gl }) => { gl.toneMappingExposure = 1.1; gl.domElement.style.opacity = '0'; }}
    >
      <SceneErrorBoundary>
        <ContextLossReporter />
        <Suspense fallback={null}>
          <Reflections />
          <PauseWhenHidden />
          <ambientLight intensity={0.22} color="#C0CBE0" />
          <directionalLight position={[3.5, 4.2, 5]} intensity={1.1} color="#FFFFFF" />
          <pointLight position={[3.6, 2.2, 2.6]} intensity={5} distance={10} color="#9B6DFF" />
          <pointLight position={[-3.6, -1.6, 2.2]} intensity={4.5} distance={10} color="#22C8FF" />
          <pointLight position={[0, 2.8, -3.4]} intensity={3.4} distance={10} color="#8CEBFF" />
          <DigitalCore onLoaded={() => setCoreState('on')} />
        </Suspense>
      </SceneErrorBoundary>
    </Canvas>
  );
}
