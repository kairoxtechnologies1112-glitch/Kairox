import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SiteCore } from '@/components/SiteCore';
import { companyDescriptor, companyName, publicOrigin, siteDescription } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: publicOrigin ? new URL(publicOrigin) : undefined,
  title: { default: `${companyName} — ${companyDescriptor}`, template: `%s — ${companyName}` },
  description: siteDescription,
  keywords: ['digital solutions', 'website development', 'lead management', 'business automation', 'custom software'],
  applicationName: companyName,
  icons: { icon: '/icon.svg', shortcut: '/icon.svg' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website', siteName: companyName,
    title: `${companyName} — ${companyDescriptor}`,
    description: siteDescription,
    ...(publicOrigin ? { url: publicOrigin, images: [`${publicOrigin}/og-image.svg`] } : {}),
  },
  twitter: {
    card: publicOrigin ? 'summary_large_image' : 'summary',
    title: `${companyName} — ${companyDescriptor}`,
    description: siteDescription,
    ...(publicOrigin ? { images: [`${publicOrigin}/og-image.svg`] } : {}),
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#080B14' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a><SiteCore /><Header /><ScrollReveal />{children}<Footer /></body></html>;
}
