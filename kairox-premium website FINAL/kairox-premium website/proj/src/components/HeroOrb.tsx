'use client';

/**
 * The live 3D core is rendered by the site-wide <SiteCore /> layer (see layout.tsx).
 * This element is the homepage "dock": the core glides into it while the hero is in view.
 * The CSS static orb shows until the 3D model is ready, and stays if WebGL or the model is unavailable.
 */
export function HeroOrb() {
  return (
    <div className="hero-orb" data-core-anchor role="group" aria-label="KAIROX Digital Core">
      <div className="orb-fallback" aria-hidden="true"><span className="orb-fallback__halo" /><span className="orb-fallback__ring" /><span className="orb-fallback__mark">K</span></div>
      <span className="orb-caption mono-label">KAIROX DIGITAL CORE</span>
    </div>
  );
}
