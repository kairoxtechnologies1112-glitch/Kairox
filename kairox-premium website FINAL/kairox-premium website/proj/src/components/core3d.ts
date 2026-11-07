import { useSyncExternalStore } from 'react';

/** Desktop-class, motion-allowed, WebGL-capable devices get the live 3D core. */
let webglSupport: boolean | undefined;

function shouldRender3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 820px)').matches) return false;
  if (webglSupport === undefined) {
    try {
      const probe = document.createElement('canvas');
      webglSupport = Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}

function subscribe(callback: () => void) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const size = window.matchMedia('(max-width: 820px)');
  motion.addEventListener('change', callback);
  size.addEventListener('change', callback);
  return () => {
    motion.removeEventListener('change', callback);
    size.removeEventListener('change', callback);
  };
}

export function useCore3D() {
  return useSyncExternalStore(subscribe, shouldRender3D, () => false);
}
