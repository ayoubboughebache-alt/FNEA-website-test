import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { cn } from '../../lib/utils';

export default function LanguageSwitcher({ light = false, inline = false }) {
  const { lang, setLang, langs, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  if (inline) {
    return (
      <div role="group" aria-label={t('nav.language')} className="grid grid-cols-3 gap-2">
        {langs.map((l) => (
          <button key={l.code} type="button" onClick={() => setLang(l.code)} aria-pressed={lang === l.code}
            className={cn('min-h-[48px] rounded-xl border text-sm font-semibold transition-colors', lang === l.code ? 'border-primary bg-primary text-white' : 'border-ink/10 text-ink hover:border-primary/40')}>
            {l.label}
          </button>
        ))}
      </div>
    );
  }
  const current = langs.find((l) => l.code === lang);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label={t('nav.language')}
        className={cn('flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-colors', light ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/5')}>
        <Globe className="h-[18px] w-[18px]" aria-hidden="true" />
        <span>{current.short}</span>
      </button>
      {open && (
        <ul role="listbox" className="fade-in absolute end-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-xl border border-ink/10 bg-white p-1 shadow-lift">
          {langs.map((l) => (
            <li key={l.code}>
              <button type="button" role="option" aria-selected={lang === l.code} onClick={() => { setLang(l.code); setOpen(false); }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-surface">
                {l.label}{lang === l.code && <Check className="h-4 w-4 text-primary" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
