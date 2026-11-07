'use client';

import dynamic from 'next/dynamic';
import { useCore3D } from '@/components/core3d';

const SiteCoreCanvas = dynamic(() => import('./SiteCoreCanvas'), { ssr: false });

/**
 * Site-wide fixed layer holding the KAIROX Digital Core.
 * It sits behind all content (z-index -1, above the CSS ambient gradient) and never takes pointer input.
 * If WebGL is unavailable the layer is not rendered and the CSS background + static hero orb remain.
 */
export function SiteCore() {
  const enabled = useCore3D();
  if (!enabled) return null;
  return <div className="site-core" aria-hidden="true"><SiteCoreCanvas /></div>;
}
