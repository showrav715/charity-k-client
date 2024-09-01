import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetDonor } from "@/@actions/frontend";
import DonorCard from "@/app/components/cards/DonorCard";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import Pagination from "@/app/components/pagination/Pagination";
import NotFounds from "@/app/ui/NotFounds";
import { CardsSkeleton } from '@/app/ui/skeletons';
import { useStore } from "@/store/index";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';


const DonorListPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const query = new URLSearchParams(location.search).toString();
        const response = await GetDonor(query);
        setData(response);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    fetchDonors();
  }, [location.search]);

  if (error) return <div>Error loading donors</div>;
  if (!data || !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Donor List")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Donor List"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/donor", pageLable: "Donor List" }
        ]}
      />

      <div className="donor-page-wrapper">
        <div className="container py-120">
          <div className="row gy-4">
            {data.data?.length !== 0 ? (
              data.data.map((item, index) => (
                <div
                  key={index}
                  className="col-12 col-md-6 col-lg-4 col-xl-3"
                >
                  <DonorCard data={item} />
                </div>
              ))
            ) : (
              <NotFounds />
            )}
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

export default DonorListPage;
