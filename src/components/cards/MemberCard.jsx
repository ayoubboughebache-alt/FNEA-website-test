import { UserRound } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';
import { asset } from '../../lib/utils';

/** بطاقة عضو: الصورة توضع في public/images/members/ ويُكتب مسارها في members.json → photo */
export default function MemberCard({ member }) {
  const { p, t } = useLang();
  return (
    <article className="card group flex h-full flex-col items-center p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <div className="h-28 w-28 overflow-hidden rounded-full bg-surface ring-4 ring-white shadow-card">
          {member.photo
            ? <img src={asset(member.photo)} alt={p(member.name)} loading="lazy" className="h-full w-full object-cover" />
            : <div className="flex h-full w-full flex-col items-center justify-center text-primary/40 pattern-stars-dark"><UserRound className="h-12 w-12" aria-hidden="true" /><span className="sr-only">{t('common.photoPlaceholder')}</span></div>}
        </div>
        <span className="absolute -bottom-1 start-1/2 h-1.5 w-10 -translate-x-1/2 rtl:translate-x-1/2 rounded-full bg-accent" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-body text-lg font-bold text-ink">{p(member.name)}</h3>
      <p className="mt-1 text-sm font-semibold text-primary">{p(member.role)}</p>
      {p(member.unit) && <p className="mt-1 text-sm text-muted">{p(member.unit)}</p>}
    </article>
  );
}
