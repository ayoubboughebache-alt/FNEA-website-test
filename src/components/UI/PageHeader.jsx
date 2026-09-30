import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '../../i18n/LanguageContext';

/** رأس الصفحات الداخلية مع مسار التنقل (Breadcrumb) */
export default function PageHeader({ title, lead, crumbs = [], children }) {
  const { t, dir } = useLang();
  const Sep = dir === 'rtl' ? ChevronLeft : ChevronRight;
  return (
    <header className="relative overflow-hidden bg-primary-dark pattern-stars pt-[calc(var(--nav-h)+2.5rem)] pb-12 text-white md:pb-16">
      <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
      <div className="container relative">
        <nav aria-label="breadcrumb" className="mb-4 text-sm text-white/70">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="hover:text-white">{t('nav.home')}</Link></li>
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <Sep className="h-3.5 w-3.5" aria-hidden="true" />
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="hero-in max-w-3xl font-display font-bold !text-white" style={{ fontSize: 'clamp(1.75rem, 1.2rem + 2.2vw, 2.75rem)' }}>{title}</h1>
        {lead && <p className="hero-in mt-3 max-w-2xl text-white/80" style={{ '--d': '80ms' }}>{lead}</p>}
        {children}
      </div>
    </header>
  );
}
