import Reveal from './Reveal';
import { cn } from '../../lib/utils';

export default function SectionHeading({ eyebrow, title, lead, action, center = false, light = false, className, as: H = 'h2' }) {
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-4 md:mb-12', !center && action && 'md:flex-row md:items-end md:justify-between', center && 'items-center text-center', className)}>
      <div className={cn('max-w-2xl', center && 'mx-auto')}>
        {eyebrow && <p className={cn('eyebrow mb-3', light && '!text-accent')}>{eyebrow}</p>}
        <H className={cn('h-section', light && '!text-white')}>{title}</H>
        {lead && <p className={cn('lead mt-3', light && '!text-white/75')}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
