'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Progressive-enhancement entrance animations.
 * Elements that are already visible on load are never hidden (no flash).
 * Elements below the fold start slightly offset and ease in once on scroll.
 * Does nothing when the visitor prefers reduced motion or IntersectionObserver is missing.
 */
const TARGETS = [
  '.section-heading', '.intro-content', '.service-card', '.growth-stage', '.process-item',
  '.process-expanded-item', '.project-card', '.client-empty-teaser', '.real-projects',
  '.why-grid article', '.closing-card', '.founder-card', '.outcome-list article',
  '.project-context > div', '.service-note > *', '.contact-form-panel', '.contact-intro',
  '.about-bottom-inner', '.process-close-inner', '.demo-window', '.footer-pitch',
].join(',');

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(TARGETS));
    const pending: HTMLElement[] = [];
    const viewportBottom = window.innerHeight;

    nodes.forEach((node) => {
      if (node.getBoundingClientRect().top < viewportBottom * 0.96) return;
      const siblings = node.parentElement ? Array.from(node.parentElement.children) : [];
      node.style.setProperty('--reveal-delay', `${Math.min(Math.max(siblings.indexOf(node), 0), 5) * 70}ms`);
      node.classList.add('reveal-pending');
      pending.push(node);
    });

    const timers: number[] = [];
    const settle = (node: HTMLElement) => node.classList.remove('reveal-pending', 'is-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const node = entry.target as HTMLElement;
        node.classList.add('is-in');
        observer.unobserve(node);
        // Once the entrance has played, drop the helper classes so hover effects stay snappy.
        timers.push(window.setTimeout(() => settle(node), 1700));
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    pending.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
      pending.forEach(settle);
    };
  }, [pathname]);

  return null;
}
