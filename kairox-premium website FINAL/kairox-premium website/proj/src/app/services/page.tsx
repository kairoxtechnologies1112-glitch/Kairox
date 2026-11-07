import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ServiceCard } from '@/components/ServiceCard';
import { SectionHeading } from '@/components/SectionHeading';
import { services } from '@/lib/services';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('Services', 'Explore website development, lead management, WhatsApp and process automation, custom software, and creative systems.', '/services');

export default function ServicesPage() {
  return <main id="main" className="inner-page services-page"><section className="page-hero wrap"><p className="eyebrow"><span className="eyebrow-mark" />Services / 01—06</p><h1>Useful digital<br /><span>work, made clear.</span></h1><div className="page-hero-bottom"><p>From the first impression to the workflow behind it, find the right starting point for your business.</p><Link href="/contact" className="button button--primary">Talk through an idea <ArrowUpRight size={16} /></Link></div><a href="#service-list" className="scroll-hint"><ArrowDown size={15} /> Browse services</a></section><section id="service-list" className="section-pad services-section"><div className="wrap"><div className="section-topline"><SectionHeading eyebrow="Six ways to move forward" title="Built for the moving parts." description="Choose one service or combine the pieces that help your customer experience and operations work together." /></div><div className="services-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div></div></section><section className="service-note-section section-pad"><div className="wrap service-note"><div><p className="eyebrow"><span className="eyebrow-mark" />Made to fit</p><h2>Your business is<br />not a template.</h2></div><p>Every engagement starts with the context. We’ll ask about the people, process and outcomes around your idea before recommending how to build it.</p><Link href="/contact" className="text-link">Tell us what you need <ArrowUpRight size={16} /></Link></div></section></main>;
}
