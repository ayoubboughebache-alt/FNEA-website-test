import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, translations } from './translations';
import { pick } from '../lib/utils';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // اللغة الافتراضية: العربية
  const [lang, setLang] = useState('ar');
  const meta = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
  }, [lang, meta.dir]);

  /** t('nav.home') → نص الواجهة */
  const t = useCallback((key) => {
    const get = (obj) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
    return get(translations[lang]) ?? get(translations.ar) ?? key;
  }, [lang]);

  /** p(field) → يختار النص حسب اللغة من بيانات JSON */
  const p = useCallback((field) => pick(field, lang), [lang]);

  const value = useMemo(() => ({ lang, setLang, dir: meta.dir, t, p, langs: LANGS }), [lang, meta.dir, t, p]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
