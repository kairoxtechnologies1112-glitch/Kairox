import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export const metadata = { title: 'Page not found', robots: { index: false, follow: false } };

export default function NotFound() {
  return <main id="main" className="not-found-page"><div className="not-found-orb" aria-hidden="true"><span>404</span></div><p className="eyebrow"><span className="eyebrow-mark" />That path is out of orbit</p><h1>This page<br /><span>isn’t here.</span></h1><p>The link may have moved, or the address may be incomplete.</p><div><Link href="/" className="button button--primary"><ArrowLeft size={16} /> Back home</Link><Link href="/work" className="text-link">Explore our work <ArrowUpRight size={16} /></Link></div></main>;
}
