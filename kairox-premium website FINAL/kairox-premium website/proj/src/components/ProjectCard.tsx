import Link from 'next/link';
import { ArrowUpRight, CalendarDays, ChartNoAxesColumnIncreasing, Utensils, Workflow } from 'lucide-react';
import type { DemoProject } from '@/lib/projects';

const previewIcons = [Utensils, ChartNoAxesColumnIncreasing, CalendarDays, Workflow];

export function ProjectCard({ project }: { project: DemoProject }) {
  const Icon = previewIcons[Number(project.number) - 1] ?? Workflow;
  return (
    <Link href={`/work/${project.slug}`} className="project-card">
      <div className={`project-preview project-preview--${project.slug}`}>
        <div className="preview-chrome"><span /><span /><span /><small>{project.category} / PREVIEW</small></div>
        <div className="preview-content"><span className="preview-icon"><Icon size={19} aria-hidden="true" /></span><span className="preview-lines"><i /><i /><i /></span></div>
        <div className="preview-bars"><i /><i /><i /><i /><i /><i /></div>
        <div className="preview-ring" aria-hidden="true" />
      </div>
      <div className="project-card__meta"><span className="project-label">{project.label}</span><span className="mono-label">{project.number} / {project.category}</span></div>
      <div className="project-card__heading"><h3>{project.title}</h3><span className="project-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span></div>
      <p>{project.summary}</p>
    </Link>
  );
}
