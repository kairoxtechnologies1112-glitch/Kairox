import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { DemoPlayground } from '@/components/DemoPlayground';
import { demoProjects, getDemoProject } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demoProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getDemoProject(slug);
  return project ? pageMetadata(`${project.title} — ${project.label}`, project.summary, `/work/${slug}`) : { title: 'Project not found', robots: { index: false, follow: false } };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getDemoProject(slug);
  if (!project) notFound();
  return <main id="main" className="inner-page project-detail-page"><section className="detail-hero wrap"><Link href="/work" className="back-link"><ArrowLeft size={15} /> All work</Link><div className="project-detail-badges"><span className="project-label">{project.label}</span><span className="mono-label">{project.number} / {project.category}</span></div><h1>{project.title}<br /><span>as a concept.</span></h1><div className="detail-hero-lower"><p>{project.description}</p><Link href="/contact" className="button button--outline">Discuss an idea <ArrowUpRight size={16} /></Link></div><p className="project-truth-note">This is a demonstration using fictional sample information. It is not a client project or live connected system.</p></section><section className="demo-showcase-section section-pad"><div className="wrap"><DemoPlayground kind={project.slug as 'restaurant-website' | 'lead-management-system' | 'appointment-management-system' | 'business-automation-system'} /></div></section><section className="project-context-section section-pad"><div className="wrap project-context"><div><p className="eyebrow"><span className="eyebrow-mark" />What this concept explores</p><h2>Experience first.<br /><span>Connected thinking.</span></h2></div><div><p>{project.summary}</p><div className="project-service-list"><span className="mono-label">RELATED CAPABILITIES</span>{project.services.map((service) => <span key={service}><Check size={14} />{service}</span>)}</div></div></div></section></main>;
}
