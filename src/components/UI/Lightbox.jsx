import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { asset } from '../../lib/utils';
import { useLang } from '../../i18n/LanguageContext';

/** عارض الصور (Lightbox): أسهم لوحة المفاتيح، Esc، والسحب على الهاتف */
export default function Lightbox({ items, index, onClose, onIndex }) {
  const { t, p, dir } = useLang();
  const touch = useRef(null);
  const item = items[index];
  const go = (delta) => onIndex((index + delta + items.length) % items.length);
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(dir === 'rtl' ? -1 : 1);
      if (e.key === 'ArrowLeft') go(dir === 'rtl' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  });

  if (!item) return null;
  const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div role="dialog" aria-modal="true" aria-label={p(item.alt)} className="fade-in fixed inset-0 z-[80] flex flex-col bg-black/90"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current == null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go((dx < 0 ? 1 : -1) * (dir === 'rtl' ? -1 : 1));
        touch.current = null;
      }}>
      <div className="flex items-center justify-between p-3 text-white/80 text-sm">
        <span className="tabular-nums px-2">{index + 1} / {items.length}</span>
        <button ref={closeRef} onClick={onClose} aria-label={t('nav.close')} className="grid h-12 w-12 place-items-center rounded-full hover:bg-white/10"><X className="h-6 w-6" /></button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-2 pb-4 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img key={item.src} src={asset(item.src)} alt={p(item.alt)} className="fade-in max-h-[78vh] max-w-full rounded-lg object-contain" />
        {items.length > 1 && <>
          <button onClick={() => go(-1)} aria-label={t('gallery.prev')} className="absolute start-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:grid"><PrevIcon className="h-6 w-6" /></button>
          <button onClick={() => go(1)} aria-label={t('gallery.next')} className="absolute end-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:grid"><NextIcon className="h-6 w-6" /></button>
        </>}
      </div>
      {item.caption && <p className="px-4 pb-6 text-center text-sm text-white/80" dir="auto">{p(item.caption)}</p>}
    </div>
  );
}
