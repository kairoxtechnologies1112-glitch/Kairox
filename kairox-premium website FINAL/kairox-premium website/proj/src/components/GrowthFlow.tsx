import { ArrowRight, ArrowUpRight } from 'lucide-react';

const stages = [
  { number: '01', title: 'Attract', detail: 'Make the right first impression.' },
  { number: '02', title: 'Convert', detail: 'Turn attention into a clear next step.' },
  { number: '03', title: 'Automate', detail: 'Let useful systems carry the routine.' },
  { number: '04', title: 'Grow', detail: 'Build momentum you can keep improving.' },
];

export function GrowthFlow() {
  return (
    <div className="growth-flow">
      {stages.map((stage, index) => <div className="growth-stage" key={stage.number}>
        <span className="mono-label">{stage.number} <span className="stage-dot" /></span>
        <h3>{stage.title}</h3><p>{stage.detail}</p>
        {index < stages.length - 1 ? <span className="growth-arrow" aria-hidden="true"><ArrowRight size={18} /></span> : <span className="growth-arrow growth-arrow--end" aria-hidden="true"><ArrowUpRight size={18} /></span>}
      </div>)}
    </div>
  );
}
