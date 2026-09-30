import { cn } from '../../lib/utils';

/** أزرار التصفية (قابلة للتمرير أفقيًا داخل حاويتها فقط على الهاتف) */
export default function FilterTabs({ options, value, onChange, label }) {
  return (
    <div role="tablist" aria-label={label} className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
      {options.map((o) => (
        <button key={o.value} role="tab" type="button" aria-selected={value === o.value} onClick={() => onChange(o.value)}
          className={cn('min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-semibold transition-all duration-200',
            value === o.value ? 'border-primary bg-primary text-white shadow-sm' : 'border-ink/10 bg-white text-ink hover:border-primary/40 hover:text-primary')}>
          {o.label}{o.count != null && <span className={cn('ms-1.5 tabular-nums', value === o.value ? 'text-white/70' : 'text-muted')}>{o.count}</span>}
        </button>
      ))}
    </div>
  );
}
