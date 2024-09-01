import { Helmet } from 'react-helmet';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GetCampaignList } from "@/@actions/frontend";
import { translate } from "@/helper/helper";
import CampaignList from "@/app/components/campaign/CampaignList";
import CampaignFilterBox from "@/app/components/campaign/CampaignFilterBox";
import Pagination from "@/app/components/pagination/Pagination";
import NotFounds from "@/app/ui/NotFounds";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { CardsSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

const CampaignsPage = () => {
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams).toString();
    GetCampaignList(queryParams).then((res) => {
      setPageData(res);
    }).catch((err) => {
      setError(err);
    });


  }, [searchParams]);

  // if (error) return <div>Error loading campaigns</div>;
  if (pageData == undefined || !settings) return <CardsSkeleton />;
  // if (pageData.data.length === 0) return <NotFounds />;

  return (
    <>
      <Helmet>
        <title>{translate("Campaigns")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Campaigns"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/campaigns", pageLable: "Campaigns" },
        ]}
      />

      <section className="ch-camp-section">
        <div className="container">
          <div className="row justify-content-center mb-60">
            <div className="col-lg-6">
              <div className="title-box text-center">
                <h5 className="sm-title">
                  {translate("Campaigns")}
                </h5>
                <h2 className="title" data-aos-delay="100">
                  {translate("Our")} <span>{translate("Highlighted Campaigns")}</span> {translate("for a Better Tomorrow")}
                </h2>
              </div>
            </div>
          </div>

          {/* Filter box */}
          <CampaignFilterBox />

          {/* Campaign list */}
          <Suspense fallback={<CardsSkeleton />}>
            {
              pageData.data.length === 0 ? <NotFounds />: <CampaignList campaingList={pageData.data} />
            }

          </Suspense>

          {/* Pagination */}
          <Pagination
            last_page={pageData.last_page}
            links={pageData.links}
            per_page={pageData.per_page}
            total={pageData.total}
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CampaignsPage;
