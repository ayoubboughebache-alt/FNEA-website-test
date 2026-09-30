import { useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

/** عنصر Accordion مفرد (مفتوح/مغلق يتحكم فيه الأب) */
export function AccordionItem({ id, title, icon, open, onToggle, children }) {
  const uid = useId();
  return (
    <div id={id} className={cn('card overflow-hidden transition-shadow duration-300', open && 'shadow-lift')}>
      <h3 className="m-0 font-body">
        <button type="button" aria-expanded={open} aria-controls={`${uid}-panel`} id={`${uid}-btn`} onClick={onToggle}
          className="flex w-full items-center gap-3 px-5 py-4 text-start text-base font-semibold text-ink transition-colors hover:text-primary md:px-6 md:py-5 min-h-[56px]">
          {icon && <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors', open ? 'bg-primary text-white' : 'bg-primary/[0.07] text-primary')}>{icon}</span>}
          <span className="flex-1">{title}</span>
          <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted transition-transform duration-300', open && 'rotate-180 text-primary')} aria-hidden="true" />
        </button>
      </h3>
      <div id={`${uid}-panel`} role="region" aria-labelledby={`${uid}-btn`}
        className={cn('grid transition-[grid-template-rows] duration-300 ease-out', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className={cn('overflow-hidden transition-[visibility] duration-300', !open && 'invisible')}>
          <div className="px-5 pb-5 md:px-6 md:pb-6 text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
