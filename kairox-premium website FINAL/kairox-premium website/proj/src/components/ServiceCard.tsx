import Link from 'next/link';
import { ArrowUpRight, Braces, ChartNoAxesCombined, PanelsTopLeft, Radio, Workflow, Fingerprint } from 'lucide-react';
import type { Service } from '@/lib/services';

const iconMap = {
  web: PanelsTopLeft,
  leads: ChartNoAxesCombined,
  whatsapp: Radio,
  automation: Workflow,
  software: Braces,
  brand: Fingerprint,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];
  return (
    <Link href={`/services/${service.slug}`} className="service-card">
      <div className="service-card__top"><span className="mono-label">{service.number} / SERVICE</span><span className="icon-frame"><Icon size={19} strokeWidth={1.6} aria-hidden="true" /></span></div>
      <div className="service-card__body"><p className="service-card__eyebrow">{service.eyebrow}</p><h3>{service.title}</h3><p>{service.summary}</p></div>
      <span className="service-card__link">Explore service <ArrowUpRight size={15} aria-hidden="true" /></span>
    </Link>
  );
}
