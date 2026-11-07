import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowDown, ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Workflow } from 'lucide-react';
import { HeroOrb } from '@/components/HeroOrb';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { ProjectCard } from '@/components/ProjectCard';
import { GrowthFlow } from '@/components/GrowthFlow';
import { ProcessSteps } from '@/components/ProcessSteps';
import { services } from '@/lib/services';
import { demoProjects } from '@/lib/projects';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('Power your next evolution', 'KAIROX TECHNOLOGIES builds websites, custom software and connected business systems for the next stage of your digital evolution.', '/');

export default function HomePage() {
  return <main id="main">
    <section className="hero-section wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-mark" />POWER YOUR NEXT EVOLUTION.</p>
        <h1 className="hero-title"><span className="reveal-line"><span>We turn business ideas</span></span> <span className="reveal-line"><span><span className="grad-text">into digital growth.</span></span></span></h1>
        <p className="hero-lede">From high-performing websites to intelligent software and automation, we build digital solutions designed around your business.</p>
        <div className="hero-actions"><Link href="/contact" className="button button--primary">Start a project <ArrowUpRight size={17} /></Link><Link href="/work" className="button button--ghost">Explore our work <ArrowRight size={16} /></Link></div>
        <dl className="hero-facts" aria-label="At a glance"><div><dt>Services</dt><dd>06</dd></div><div><dt>Demo projects</dt><dd>04</dd></div><div><dt>Founders</dt><dd>02</dd></div></dl>
        <div className="hero-footnote"><span><i /> Two founders · one working partnership</span><span>01 — 04 / Digital systems</span></div>
      </div>
      <div className="hero-art"><HeroOrb /></div>
      <a href="#introduction" className="scroll-hint"><ArrowDown size={15} /> Scroll to explore</a>
    </section>

    <div className="signal-strip" aria-label="Our focus areas"><div className="signal-track"><span>WEBSITE DEVELOPMENT</span><i /> <span>BUSINESS SYSTEMS</span><i /> <span>PROCESS AUTOMATION</span><i /> <span>CUSTOM SOFTWARE</span><i /> <span>WEBSITE DEVELOPMENT</span><i /> <span>BUSINESS SYSTEMS</span><i /> <span>PROCESS AUTOMATION</span></div></div>

    <section id="introduction" className="intro-section section-pad wrap">
      <div className="intro-label"><p className="eyebrow"><span className="eyebrow-mark" />A digital partner, not another vendor</p><span className="intro-number mono-label">[ A01 — APPROACH ]</span></div>
      <div className="intro-content"><h2>Make the digital part<br />of business <span>feel simple.</span></h2><div className="intro-lower"><p>We’re a two-founder digital solutions agency. We bring your website, customer journey and day-to-day systems closer together—so the experience feels clearer for your customers and more workable for your team.</p><Link href="/about" className="text-link">Get to know us <ArrowUpRight size={16} /></Link></div></div>
    </section>

    <section className="services-section section-pad">
      <div className="wrap"><div className="section-topline"><SectionHeading eyebrow="What we build" title="The right tools for your next move." description="Start with the part that needs work. We connect the pieces when it makes sense." /><Link href="/services" className="text-link section-topline__link">All services <ArrowUpRight size={16} /></Link></div>
        <div className="services-grid">{services.map((service) => <ServiceCard key={service.slug} service={service} />)}</div>
      </div>
    </section>

    <section className="growth-section section-pad"><div className="wrap"><div className="growth-intro"><SectionHeading eyebrow="A connected system" title="One useful step at a time." description="Strong digital experiences attract attention. Thoughtful systems help turn it into lasting momentum." /><span className="growth-orbit" aria-hidden="true"><i /><b /><em /></span></div><GrowthFlow /></div></section>

    <section className="process-section section-pad"><div className="wrap process-layout"><div className="process-intro"><SectionHeading eyebrow="How we work" title="A clear path from first thought to live system." description="Good work is a conversation with a direction. Here’s how we keep it moving." /><Link href="/process" className="button button--outline">See our process <ArrowRight size={16} /></Link></div><ProcessSteps compact /></div></section>

    <section className="work-section section-pad"><div className="wrap"><div className="section-topline"><SectionHeading eyebrow="Selected demonstrations" title="Ideas, made tangible." description="A few interactive concepts to show what these systems can feel like. Each is labelled as sample work—not a client case study." /><Link href="/work" className="text-link section-topline__link">Explore all demos <ArrowUpRight size={16} /></Link></div><div className="projects-grid">{demoProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div><div className="client-empty-teaser"><span className="empty-orbit" aria-hidden="true"><i /></span><div><p className="mono-label">REAL CLIENT PROJECTS</p><h3>Space for work we can name.</h3><p>We’ll add client work here with permission and verified details.</p></div><span className="empty-status">No projects published yet</span></div></div></section>

    <section className="why-section section-pad"><div className="wrap"><div className="why-top"><SectionHeading eyebrow="Why Choose Us" title="Small team, connected thinking." description="A close working relationship, a joined-up view and a thoughtful build process from the first conversation." /><p className="why-side-note">An independent studio<br />for the moving parts of business.</p></div><div className="why-grid"><article><span className="why-icon"><Sparkles size={18} /></span><span className="mono-label">01 / CLARITY</span><h3>Built around your actual needs.</h3><p>We begin with the problem to solve—not a one-size-fits-all package or a technology looking for a reason.</p></article><article><span className="why-icon"><Workflow size={18} /></span><span className="mono-label">02 / CONNECTION</span><h3>Experience meets operations.</h3><p>We look beyond the first click to the customer handoff, team workflow and systems behind it.</p></article><article><span className="why-icon"><ShieldCheck size={18} /></span><span className="mono-label">03 / CARE</span><h3>Thoughtful work, honestly shown.</h3><p>Clear scope, a considered process and no made-up case studies. You see exactly what a concept is.</p></article></div></div></section>

    <section className="closing-cta section-pad"><div className="wrap closing-card"><div className="closing-art" aria-hidden="true"><span /><i /><b /><em /></div><div><p className="eyebrow"><span className="eyebrow-mark" />The next step starts here</p><h2>What could work<br /><span>better for you?</span></h2><p>Tell us what you’re working on. We’ll help you find a useful place to begin.</p><Link href="/contact" className="button button--primary">Start a project <ArrowUpRight size={17} /></Link></div><span className="closing-marker mono-label">YOUR IDEA, NEXT.</span></div></section>
  </main>;
}
