
import { Helmet } from 'react-helmet';
import { GetCampaignDetails } from "@/@actions/frontend";
import DetailsTabPanel from "@/app/components/campaign/DetailsTabPanel";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import RecentCampaign from "@/app/components/home/RecentCampaign";
import { translate } from "@/helper/helper";
import CampaignDonation from "@/app/components/campaign/CampaignDonation"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";


export default function SingleCampaign() {
  const params = useParams();
  const [page_data, setPageData] = useState(null);

  const settings = useStore((state) => state.settings);


  useEffect(() => {
    GetCampaignDetails(params?.slug).then((res) => {
      setPageData(res)

    }).catch((error) => {
      console.log(error)

    })

  }, [params])

  if (page_data == undefined || !settings) {
    return <CardsSkeleton />
  }

  return (
    <>
      <Helmet>
        <title>{translate("Campaigns Details")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title={page_data?.campaign?.title}
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/campaigns", pageLable: "Campaign" },
          {
            pageToLink: `/campaigns/${page_data?.campaign?.slug}`,
            pageLable: `${page_data?.campaign?.title}`,
          },
        ]}
      />

      <CampaignDonation
        preloaded_amount={page_data?.preloaded as any}
        page_data={page_data?.campaign}
      />

      <DetailsTabPanel
        des_data={page_data?.campaign?.description}
        faqs_data={page_data?.campaign?.faqs}
        video_data={page_data?.campaign?.video_link}
        title={page_data?.campaign?.title}
      />

      <RecentCampaign
        title={translate("Related Campaigns")}
        subtitle={translate("Cause Connections: Explore Related Initiatives")}
        page_data={page_data?.related_campaigns}
      />
      <Footer />
    </>
  );
}
