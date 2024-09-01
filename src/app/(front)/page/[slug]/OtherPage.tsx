import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { dynamicPageData } from "@/@actions/frontend";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";



function OtherPage() {
  const params = useParams();
  const query = params?.slug;
  const [data, setData] = useState(null);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    dynamicPageData(query).then((res) => {
      setData(res);
    }).catch((error) => {
      console.log(error);
    })

  }, [query])

  if (data == undefined || !settings) {
    return <CardsSkeleton />
  }


  return (
    <>
      <Helmet>
        <title>{translate(`${data?.response?.title}`)}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title={`${data?.response?.title}`}
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          {
            pageToLink: `/page/${data?.response?.slug}`,
            pageLable: `${data?.response?.title}`
          }
        ]}
      />
      <div className="dynamic-page"  >
        <div className="container">
          <h4>{data?.response?.title}</h4>
          <span dangerouslySetInnerHTML={{ __html: data?.response?.details }} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OtherPage;
