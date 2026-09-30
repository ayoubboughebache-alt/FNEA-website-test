import PageHeader from '../components/ui/PageHeader';
import FAQSection from '../components/sections/FAQSection';
import ContactCTA from '../components/sections/ContactCTA';
import { useLang } from '../i18n/LanguageContext';

export default function FAQ() {
  const { t } = useLang();
  return (
    <>
      <PageHeader title={t('faq.title')} crumbs={[{ label: t('nav.faq') }]} />
      <FAQSection showAllLink={false} />
      <ContactCTA />
    </>
  );
}
