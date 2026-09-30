import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { cn } from '../../lib/utils';

let uid = 3;
/** حاسبة المعدل: Σ(المعدل × المعامل) ÷ Σ المعاملات */
export default function AverageCalculator() {
  const { t } = useLang();
  const [rows, setRows] = useState([{ id: 1, name: '', grade: '12', coef: '3' }, { id: 2, name: '', grade: '8', coef: '2' }]);
  const upd = (id, k, v) => setRows((r) => r.map((x) => (x.id === id ? { ...x, [k]: v } : x)));
  const valid = rows.map((r) => ({ g: parseFloat(r.grade), c: parseFloat(r.coef) })).filter((r) => !isNaN(r.g) && !isNaN(r.c) && r.c > 0 && r.g >= 0 && r.g <= 20);
  const sumC = valid.reduce((s, r) => s + r.c, 0);
  const avg = sumC ? valid.reduce((s, r) => s + r.g * r.c, 0) / sumC : null;
  const ok = avg != null && avg >= 10;
  return (
    <div className="mt-2 rounded-2xl border border-primary/15 bg-surface p-4 md:p-5">
      <p className="font-body text-base font-bold text-ink">{t('guide.calc.title')}</p>
      <p className="mb-4 text-sm">{t('guide.calc.hint')}</p>
      <div className="grid gap-2">
        <div className="hidden grid-cols-[1fr_6rem_5rem_2.75rem] gap-2 px-1 text-xs font-semibold text-muted sm:grid">
          <span>{t('guide.calc.module')}</span><span>{t('guide.calc.grade')}</span><span>{t('guide.calc.coef')}</span><span className="sr-only">{t('guide.calc.remove')}</span>
        </div>
        {rows.map((r, i) => (
          <div key={r.id} className="grid grid-cols-[1fr_1fr_2.75rem] gap-2 rounded-xl border border-ink/5 bg-white/60 p-2 sm:grid-cols-[1fr_6rem_5rem_2.75rem] sm:border-0 sm:bg-transparent sm:p-0">
            <input className="input col-span-3 !min-h-[44px] !px-3 !py-2 sm:col-span-1" value={r.name} placeholder={`${t('guide.calc.module')} ${i + 1}`} onChange={(e) => upd(r.id, 'name', e.target.value)} aria-label={`${t('guide.calc.module')} ${i + 1}`} />
            <input className="input !min-h-[44px] !px-3 !py-2 tabular-nums" inputMode="decimal" type="number" min="0" max="20" step="0.25" value={r.grade} placeholder={t('guide.calc.grade')} onChange={(e) => upd(r.id, 'grade', e.target.value)} aria-label={t('guide.calc.grade')} />
            <input className="input !min-h-[44px] !px-3 !py-2 tabular-nums" inputMode="decimal" type="number" min="1" step="1" value={r.coef} placeholder={t('guide.calc.coef')} onChange={(e) => upd(r.id, 'coef', e.target.value)} aria-label={t('guide.calc.coef')} />
            <button type="button" onClick={() => setRows((x) => x.filter((y) => y.id !== r.id))} disabled={rows.length <= 1} aria-label={t('guide.calc.remove')}
              className="grid h-11 w-11 place-items-center rounded-xl text-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-30"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => setRows((r) => [...r, { id: uid++, name: '', grade: '', coef: '1' }])} className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-primary/25 px-4 text-sm font-semibold text-primary hover:bg-primary/5">
          <Plus className="h-4 w-4" aria-hidden="true" />{t('guide.calc.add')}
        </button>
        <div className={cn('flex items-center gap-3 rounded-xl px-4 py-2', avg == null ? 'bg-white' : ok ? 'bg-primary text-white' : 'bg-red-50 text-red-700')} aria-live="polite">
          <span className="text-sm font-semibold">{t('guide.calc.result')}</span>
          <span className="font-display text-2xl font-bold tabular-nums" dir="ltr">{avg == null ? '—' : avg.toFixed(2)}</span>
          {avg != null && <span className="text-xs">{ok ? t('guide.calc.validated') : t('guide.calc.notValidated')}</span>}
        </div>
      </div>
    </div>
  );
}
