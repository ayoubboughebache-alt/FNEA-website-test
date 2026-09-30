import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';

const TITLES = { '/about': 'nav.about', '/services': 'nav.services', '/activities': 'nav.activities', '/news': 'nav.news', '/guide': 'nav.guide', '/team': 'nav.team', '/branches': 'nav.branches', '/gallery': 'nav.gallery', '/videos': 'nav.videos', '/faq': 'nav.faq', '/contact': 'nav.contact', '/submit': 'form.title' };

/** عنوان الصفحة في المتصفح (SEO) */
export default function useDocumentTitle() {
  const { pathname } = useLocation();
  const { t } = useLang();
  useEffect(() => {
    const base = 'FNEA Ouargla';
    const key = TITLES['/' + pathname.split('/')[1]];
    document.title = key ? `${t(key)} | ${base}` : `${base} | المكتب الولائي للطلبة`;
  }, [pathname, t]);
}
