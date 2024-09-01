
import HeroSection from "./HeroSection";
import VideoSection from "./VideoSection";
import CategorySection from "./CategorySection";
import AboutSection from "./AboutSection";
import FeatureCampaign from "./FeatureCampaign";
import CtaSection from "./CtaSection";
import NewestCampaign from "./NewestCampaign";
import VolunteersSection from "./VolunteersSection";
import LatestNewsSection from "./LatestNewsSection";
import { FeatureRecentDataResponse } from "@/@types/frontend";
export default function HomepageOne({campaign_data }: { page_data: FeatureRecentDataResponse, campaign_data: FeatureRecentDataResponse }) {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <CategorySection />
      <AboutSection />
      <FeatureCampaign page_data={campaign_data?.feature_campaign} title={`Featured Campaigns`} subtitle={`Explore Our Impactful Campaigns`} />
      <CtaSection />
      <NewestCampaign page_data={campaign_data?.newest_campaign} />
      <VolunteersSection />
      <LatestNewsSection />
    </>
  );
}
