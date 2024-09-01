import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import BreadCrumb from '@/app/components/common/BreadCrumb';
import EventDetails from '@/app/components/event/EventDetails';
import EventDetailsSidebar from '@/app/components/event/EventDetailsSidebar';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { GetSingleEvent } from '@/@actions/frontend';
import { translate } from '@/helper/helper';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

const EventsDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const settings = useStore((state) => state.settings);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await GetSingleEvent(slug);
        if (eventData == null) {
          navigate('/404', { replace: true });
        } else {
          setData(eventData);
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
        navigate('/404', { replace: true });
      }
    };

    fetchEvent();
  }, [slug, navigate]);

  if (!data || !settings) {
    return <CardsSkeleton/>;
  }

  return (
    <>
      <Helmet>
        <title>{translate("Event Details")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Event Details"
        menus={[
          { pageToLink: '/', pageLable: 'Home' },
          { pageToLink: '/events', pageLable: 'Event' },
          { pageToLink: `/events/${slug}`, pageLable: 'Event Details' },
        ]}
      />
      <div className="ch-blog-content-wrapper">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7 col-xl-8">
              <EventDetails data={data.event} />
            </div>
            <div className="col-lg-5 col-xl-4">
              <EventDetailsSidebar data={data.event} />
            </div>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default EventsDetailsPage;
