import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetTestimonial } from "@/@actions/frontend";
import Testimonial from "@/app/components/cards/Testimonial";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import Pagination from "@/app/components/pagination/Pagination";
import NotFounds from "@/app/ui/NotFounds";
import { CardsSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

const TestimonialPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const query = new URLSearchParams(location.search).toString();
        const response = await GetTestimonial(query);
        setData(response);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    fetchTestimonials();
  }, [location.search]);

  if (error) return <div>Error loading testimonials</div>;
  if (!data || !settings) return <CardsSkeleton />;
  // if (data.data.length === 0) return <NotFounds />;

  return (
    <>
      <Helmet>
        <title>{translate("Testimonial")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Testimonial"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/testimonials", pageLable: "Testimonial" }
        ]}
      />

      <div className="donor-page-wrapper">
        <div className="container py-120">
          <div className="row gy-4">
            {data.data.length == 0 && <NotFounds />}
            {data?.data?.map((item) => (
              <div className="col-12 col-lg-6" key={item.id}>
                <Testimonial data={item} />
              </div>
            ))}
          </div>
          <Pagination
            last_page={data.last_page}
            per_page={data.per_page}
            total={data.total}
            links={data.links}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TestimonialPage;
