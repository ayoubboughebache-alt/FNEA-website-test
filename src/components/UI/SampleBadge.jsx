import { useContent } from '../../context/ContentContext';
import { useLang } from '../../i18n/LanguageContext';

/** شارة "محتوى تجريبي" — تختفي عند وضع showSampleBadges: false في site-config.json أو sample: false في العنصر */
export default function SampleBadge({ item, className = '' }) {
  const data = useContent();
  const { t } = useLang();
  if (!item?.sample || !data?.siteConfig?.showSampleBadges) return null;
  return <span className={`inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-900 ${className}`}>{t('common.sample')}</span>;
}
