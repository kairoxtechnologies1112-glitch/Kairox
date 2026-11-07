import type { Metadata } from 'next';
import { absoluteUrl, companyName } from '@/lib/site';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absoluteUrl(path);
  const image = url ? absoluteUrl('/og-image.svg') : undefined;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: {
      type: 'website',
      siteName: companyName,
      title,
      description,
      ...(url ? { url } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: `${companyName} — Power your next evolution` }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
