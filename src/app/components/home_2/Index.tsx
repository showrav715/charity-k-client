

import { CardsSkeleton } from "../../../app/ui/skeletons";
import { FeatureRecentDataResponse } from "../../../../src/@types/frontend";
import AboutSection from "./AboutSection";
import CategorySection from "./CategorySection";
import CounterSection from "./CounterSection";
import CtaSection from "./CtaSection";
import FAQSection from "./FAQSection";
import FeatureCampaign from "./FeatureCampaign";
import HeroSection from "./HeroSection";
import LatestNewsSection from "./LatestNewsSection";
import NewestCampaign from "./NewestCampaign";
import TestimonialSection from "./TestimonialSection";
import VolunteersSection from "./VolunteersSection";


// export default function HomepageTwo() {
export default function HomepageTwo({
  page_data,
  campaign_data,
}: {
  page_data: FeatureRecentDataResponse;
  campaign_data: FeatureRecentDataResponse;
}) {



  if (!page_data) return <CardsSkeleton />; 

  return (
    <>
      
      <HeroSection />
      <CategorySection />
    <div className="bg-gray-300">
        <FeatureCampaign
          page_data={campaign_data?.feature_campaign}
          title={`Featured Campaigns`}
          subtitle={`Explore Our Impactful Campaigns`}
         
        /> 
        <CtaSection />
        <NewestCampaign page_data={campaign_data?.newest_campaign} />
          <VolunteersSection  />
          <AboutSection />
        <CounterSection page_data={page_data?.counters} />
        <LatestNewsSection page_data={page_data?.recent_blogs} />
        <TestimonialSection page_data={page_data?.testimonials} />
        <FAQSection page_data={page_data?.faqs}  />
      </div>
    </>
  );
}
