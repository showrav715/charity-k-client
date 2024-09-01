import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import ContactWrapper from '@/app/components/contact/ContactWrapper'
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

export default function ContactPage() {
  const settings = useStore((state) => state.settings);

  if ( !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Contact Us")}</title>
      </Helmet>
      <Header />
      <ContactWrapper />
      <Footer /> 
    </>
  )
}
