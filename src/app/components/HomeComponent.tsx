import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { useStore } from "../../../src/store/index";
import { CardsSkeleton } from "../../../src/app/ui/skeletons";
import HomepageTwo from "./home_2/Index";
import { useEffect, useState } from "react";
import { FeatureCampaignData, FeatureRecentData, GetMetaDataForHome } from "../../@actions/frontend";
import HomepageOne from "./home/Index";
import Header from './layout/Header';
import Footer from './layout/Footer';

function HomeComponent() {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [campaign_data, setCampaign_data] = useState(null);
  const [metaInfo, setmetaInfo] = useState(null);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentData = await FeatureRecentData();
        setDatas(recentData);

        const campaignData = await FeatureCampaignData();
        setCampaign_data(campaignData);

        const metaData = await GetMetaDataForHome();
        setmetaInfo(metaData);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Home")}</title>
        <meta
          name={metaInfo?.response?.title}
          content={metaInfo?.response?.meta_description}
        />
        {metaInfo?.response?.meta_image && (
          <meta property="og:image" content={metaInfo?.response?.meta_image} />
        )}
      </Helmet>
      <Header /> 
      {settings?.theme === "theme1" ? (
        <HomepageTwo page_data={datas} campaign_data={campaign_data} />
      ) : (
        <HomepageOne page_data={datas} campaign_data={campaign_data} />
      )}
      <Footer /> 
    </>
  );
}

export default HomeComponent;
