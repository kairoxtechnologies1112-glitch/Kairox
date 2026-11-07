import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, MoveUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { getService, services } from '@/lib/services';
import { pageMetadata } from '@/lib/metadata';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  return service ? pageMetadata(service.title, service.summary, `/services/${slug}`) : { title: 'Service not found', robots: { index: false, follow: false } };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  return <main id="main" className="inner-page detail-page"><section className="detail-hero wrap"><Link href="/services" className="back-link"><ArrowLeft size={15} /> All services</Link><p className="eyebrow"><span className="eyebrow-mark" />{service.number} / {service.eyebrow}</p><h1>{service.title}<br /><span>built around you.</span></h1><div className="detail-hero-lower"><p>{service.description}</p><Link href="/contact" className="button button--primary">Discuss this service <ArrowUpRight size={16} /></Link></div><div className="detail-stamp mono-label">SERVICE NOTE / {service.number}—06</div></section><section className="detail-outcomes section-pad"><div className="wrap outcomes-layout"><div><SectionHeading eyebrow="What this can include" title="A useful outcome, not a fixed package." description="The exact scope depends on your goals and the work your team needs to get done." /></div><div className="outcome-list">{service.outcomes.map((outcome, index) => <article key={outcome}><span>{String(index + 1).padStart(2, '0')}</span><p>{outcome}</p><Check size={17} /></article>)}</div></div></section><section className="detail-related section-pad"><div className="wrap"><div className="section-topline"><SectionHeading eyebrow="Related capabilities" title="Good things connect." description="Other services that can support the same journey." /></div><div className="services-grid services-grid--three">{related.map((item) => <ServiceCard key={item.slug} service={item} />)}</div><Link href="/contact" className="text-link detail-contact-link">Start a conversation <MoveUpRight size={16} /></Link></div></section></main>;
}
