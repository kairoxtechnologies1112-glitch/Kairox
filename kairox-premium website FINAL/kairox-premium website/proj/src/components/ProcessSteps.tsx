import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { processSteps } from '@/lib/site';

export function ProcessSteps({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`process-list${compact ? ' process-list--compact' : ''}`}>
      {processSteps.map((step) => <article className="process-item" key={step.number}>
        <span className="process-number">{step.number}</span>
        <div className="process-copy"><h3>{step.title}</h3>{!compact ? <p>{step.detail}</p> : null}</div>
        <span className="process-line" aria-hidden="true" />
      </article>)}
      {compact ? <Link href="/process" className="process-more">See our full process <ArrowUpRight size={15} /></Link> : null}
    </div>
  );
}
