import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import AboutVideoSection from "@/app/components/about/AboutVideoSection";
import LatestNewsSection from "@/app/components/home/LatestNewsSection";
import VolunteersSection from "@/app/components/home/VolunteersSection";
import SponsorsSection from "@/app/components/about/SponsorsSection";
import AboutSectionWrapper from "@/app/components/about/AboutSectionWrapper";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';
export default function AboutPage() {

  const settings = useStore((state) => state.settings);

  if ( !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("About US")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="About US"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/about", pageLable: "About US" },
        ]}
      />
      <AboutSectionWrapper />
      <AboutVideoSection />
      <LatestNewsSection />
      <VolunteersSection />
      <SponsorsSection />
      <Footer /> 
    </>
  );
}

