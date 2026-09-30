import Hero from '../components/sections/Hero';
import QuickActions from '../components/sections/QuickActions';
import AboutPreview from '../components/sections/AboutPreview';
import Services from '../components/sections/Services';
import ConcernCTA from '../components/sections/ConcernCTA';
import ActivitiesPreview from '../components/sections/ActivitiesPreview';
import NewsPreview from '../components/sections/NewsPreview';
import NewStudents from '../components/sections/NewStudents';
import TeamPreview from '../components/sections/TeamPreview';
import GalleryPreview from '../components/sections/GalleryPreview';
import FAQSection from '../components/sections/FAQSection';
import ContactCTA from '../components/sections/ContactCTA';

/** ترتيب أقسام الصفحة الرئيسية — يمكن إعادة ترتيبها أو حذف أي قسم هنا */
export default function Home() {
  return (
    <>
      <Hero />
      <QuickActions />
      <AboutPreview />
      <Services />
      <ConcernCTA />
      <ActivitiesPreview />
      <NewsPreview />
      <NewStudents />
      <TeamPreview />
      <GalleryPreview />
      <FAQSection limit={6} />
      <ContactCTA />
    </>
  );
}
