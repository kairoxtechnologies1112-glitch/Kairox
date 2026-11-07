import type { MetadataRoute } from 'next';
import { absoluteUrl, publicOrigin } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!publicOrigin) return [];
  const paths = ['/', '/services', '/work', '/about', '/process', '/contact', '/privacy', '/terms'];
  const details = [
    '/services/website-development', '/services/lead-management', '/services/whatsapp-automation',
    '/services/process-automation', '/services/custom-software', '/services/branding-creative-systems',
    '/work/restaurant-website', '/work/lead-management-system', '/work/appointment-management-system', '/work/business-automation-system',
  ];
  return [...paths, ...details].map((path) => ({ url: absoluteUrl(path)!, changeFrequency: 'monthly', priority: path === '/' ? 1 : 0.7 }));
}
