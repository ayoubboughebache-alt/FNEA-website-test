/**
 * طبقة البيانات (Data layer)
 * ------------------------------------------------------------
 * حاليًا: يقرأ المحتوى من ملفات JSON في public/data/ (تعديلها لا يحتاج إعادة بناء الموقع).
 *
 * مستقبلًا (لوحة تحكم Admin): استبدل دوال القراءة هنا باستدعاءات API
 * (Supabase / Firebase / REST) دون تغيير أي Component، لأن كل الصفحات تمر عبر هذا الملف.
 * دوال الكتابة (create/update/remove) جاهزة كواجهة موحّدة لتنفيذها لاحقًا.
 */
import { asset } from '../lib/utils';

export const COLLECTIONS = {
  siteConfig: 'site-config.json',
  services: 'services.json',
  activities: 'activities.json',
  news: 'news.json',
  members: 'members.json',
  branches: 'branches.json',
  gallery: 'gallery.json',
  videos: 'videos.json',
  faq: 'faq.json',
  guide: 'guide.json',
};

async function readJson(file) {
  const res = await fetch(asset(`/data/${file}`), { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
  return res.json();
}

/** يحمّل كل المحتوى دفعة واحدة */
export async function loadAllContent() {
  const entries = await Promise.all(
    Object.entries(COLLECTIONS).map(async ([key, file]) => [key, await readJson(file)])
  );
  const data = Object.fromEntries(entries);
  // ترتيب افتراضي
  data.news = [...data.news].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  // النشاطات: القادمة أولًا (الأقرب فالأبعد) ثم المنتهية (الأحدث فالأقدم)
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = data.activities.filter((a) => (a.date || '') >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = data.activities.filter((a) => (a.date || '') < today).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  data.activities = [...upcoming, ...past];
  data.members = [...data.members].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return data;
}

/* ============================================================
 * واجهة الكتابة — للوحة التحكم المستقبلية
 * مثال Supabase:
 *   import { createClient } from '@supabase/supabase-js'
 *   const supabase = createClient(URL, ANON_KEY)
 *   export const create = (collection, item) => supabase.from(collection).insert(item)
 * ============================================================ */
const notConnected = (op) => async () => {
  throw new Error(`[contentService] "${op}" غير مفعّل: اربط قاعدة بيانات (Supabase/Firebase/API) لتفعيل لوحة التحكم.`);
};
export const create = notConnected('create');   // create('news', {...})
export const update = notConnected('update');   // update('news', id, {...})
export const remove = notConnected('remove');   // remove('news', id)
