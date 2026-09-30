/** يحوّل مسارًا مثل "/images/hero.webp" إلى مسار يعمل من أي مجلد نشر */
export const asset = (path) => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
};

/** يختار النص المناسب للغة الحالية مع الرجوع إلى العربية */
export const pick = (field, lang) => {
  if (field == null) return '';
  if (typeof field === 'string' || Array.isArray(field)) return field;
  return field[lang] ?? field.ar ?? field.fr ?? field.en ?? '';
};

export const formatDate = (iso, lang) => {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  const locale = lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-FR' : 'en-GB';
  try { return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric', numberingSystem: 'latn' }); }
  catch { return iso; }
};

export const hexToRgb = (hex) => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
  return m ? `${parseInt(m[1], 16)} ${parseInt(m[2], 16)} ${parseInt(m[3], 16)}` : null;
};

export const isExternal = (url) => /^https?:\/\//.test(url || '');
export const cn = (...c) => c.filter(Boolean).join(' ');
