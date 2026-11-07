import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'right' | 'center';
  children?: ReactNode;
}) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <p className="section-heading__description">{description}</p> : null}
      {children}
    </div>
  );
}
