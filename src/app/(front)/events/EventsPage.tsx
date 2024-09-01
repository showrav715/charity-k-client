import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { GetEventList } from "@/@actions/frontend";
import EventSidebar from "@/app/components/event/EventSidebar";
import EventCard from "@/app/components/cards/EventCard";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import Pagination from "@/app/components/pagination/Pagination";
import NotFounds from "@/app/ui/NotFounds";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

export default function EventsPage() {
  const [data, setData] = useState(null);
  const location = useLocation();
  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = location?.search || "";
        const eventData = await GetEventList(query);
        setData(eventData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchData();
  }, [location?.search]);

  if (!data || !settings) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>{translate("Events")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Events"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/events", pageLable: "Events" }
        ]}
      />

      <div className="ch-blog-content-wrapper">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7 col-xl-8">
              <div className="lg-blog-card-wrapper">
                {data.events.data.length != 0 ? (
                  data.events.data.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))
                ) : (
                  <NotFounds />
                )}
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <EventSidebar recent_events={data.recent_events} />
            </div>
          </div>

          <Pagination
            last_page={data.events?.last_page}
            per_page={data.events?.per_page}
            total={data.events?.total}
            links={data.events?.links}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
