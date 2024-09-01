import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { GetGallery } from "@/@actions/frontend";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import GalleryBox from "@/app/components/gallery/GalleryBox";
import Pagination from "@/app/components/pagination/Pagination";
import NotFounds from "@/app/ui/NotFounds";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

export const metadata = {
  title: "Gallery"
};
export default function GalleryPage() {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    GetGallery(searchParams.toString()).then((res) => {
      setData(res);
    }).catch((err) => {
      console.log(err);
    });


  }, [searchParams])



  const formate_data = data?.gallery?.data?.map((item) => {
    return {
      src: item?.api_photo,
      width: 500,
      height: 300,

      customOverlay: (
        <div className="bg-img-gallary-overlay">
          <i className="fa-solid fa-link icon-cls"></i>
        </div>
      )
    };
  });

  if ( !settings || !data) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Gallery")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Our Image Gallery"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/gallery", pageLable: "Gallery" }
        ]}
      />

      <div className="donor-page-wrapper gallery-img-wrapper">
        <div
          className="container py-120"


        >
          <div className="row gy-4">
            {formate_data?.length == 0 || null ? (
              <NotFounds />
            ) : (
              <GalleryBox images={formate_data} />
            )}
          </div>
          {formate_data?.length > 0 && (
            <Pagination
              last_page={data?.gallery?.last_page}
              per_page={data?.gallery?.per_page}
              total={data?.gallery?.total}
              links={data?.gallery?.links}
            />
          )}
        </div>
      </div>
      <Footer /> 
    </>
  );
}
