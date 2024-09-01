import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { GetFaq } from "@/@actions/frontend";
import FAQ from "@/app/components/campaign/tab-items/FAQ";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense, useEffect, useState } from "react";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

export default function FaqPage() {

  const [data, setData] = useState(null);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    GetFaq().then((res) => {
      setData(res?.faqs);
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  if (data == undefined || !settings) {
    return <CardsSkeleton />
  }


  return (
    <>
      <Helmet>
        <title>{translate("FAQ")}</title>
      </Helmet>
      <Header />
      <Suspense>
        <BreadCrumb
          title="FAQ"
          menus={[
            { pageToLink: "/", pageLable: "Home" },
            { pageToLink: "/faq", pageLable: "FAQ" },
          ]}
        />
        <div className="ch-blog-content-wrapper">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <div className="custom-faq-wrapper">
                  <FAQ faqs={data} isPage={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
