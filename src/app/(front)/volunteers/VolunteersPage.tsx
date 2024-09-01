import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GetVolunteers } from "@/@actions/frontend";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import Pagination from "@/app/components/pagination/Pagination";
import TeamCard from "@/app/components/single/TeamCard";
import NotFounds from "@/app/ui/NotFounds";
import { CardsSkeleton } from '@/app/ui/skeletons';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

const VolunteersPage = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const query = new URLSearchParams(location.search).toString();
        const result = await GetVolunteers(query);
        setData(result);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };

    fetchVolunteers();
  }, [location.search]);

  if (error) return <div>Error loading volunteers</div>;
  if (!data || !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Volunteers")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="List of Volunteers"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/volunteers", pageLable: "List of Volunteers" }
        ]}
      />

      <div className="donor-page-wrapper">
        <div className="container py-120">
          <div className="row gy-4">
            {data.volunteers.data.length !== 0 ? (
              data.volunteers.data.map((card) => (
                <div
                  key={card.id}
                  className="col-12 col-md-6 col-lg-4 col-xl-3"
                >
                  <TeamCard
                    img={card.api_photo}
                    name={card.name}
                    desig={card.designation}
                    facebook={card.facebook}
                    twitter={card.twitter}
                    instagram={card.instagram}
                    linkedin={card.linkedin}
                  />
                </div>
              ))
            ) : (
              <NotFounds />
            )}
          </div>

          <Pagination
            last_page={data.volunteers.last_page}
            per_page={data.volunteers.per_page}
            total={data.volunteers.total}
            links={data.volunteers.links}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VolunteersPage;
