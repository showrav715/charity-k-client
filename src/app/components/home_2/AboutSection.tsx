
import { AboutPageDataResponse } from "../../../@types/frontend";
import { AboutPageData } from "../../../@actions/frontend";
import { split } from "../../../helper/helper";

import { Link, useLocation } from "react-router-dom";
// import { usePathname } from "next/navigation";
import  { useEffect, useState } from "react";
import CleanContent from "../../../app/ui/CleanContent";
import { HerosectionSkeleton } from "../../../app/ui/skeletons";

export default function AboutSection() {
  const [about, setAbout] = useState<AboutPageDataResponse | null>(null);
  const route = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const data = await AboutPageData();
        setAbout(data as AboutPageDataResponse);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  if (!about) return <HerosectionSkeleton />;

  const { word, last } = split(about?.about?.title, 1);

  return (
    <section className="ch-about-section ch-about-section-2">
      <div className="container">
        <div className="row gx-0 gx-lg-5 gy-4 align-items-center">
          <div className="col-lg-12 col-xl-6"
          
          >
            <img
              width={752}
              height={663}
              src={about?.about?.photo}
              alt="about image"
              className="about-img"
            />
          </div>
          <div
            className="col-lg-12 col-xl-6"
          >
            <div className="title-box">
              <h5 className="sm-title">{about?.about?.header_title}</h5>
              <h2 className="title">
                {word} <span>{last}</span>
              </h2>

              <CleanContent
                content={about?.about?.description}
                classNames="des"
              />

              <div className="about-service-wrapper">
                {about?.features &&
                  about?.features?.length > 0 &&
                  about?.features?.map((fea) => (
                    <div key={fea?.id} className="single-about-service">
                      <div className="icon-wrapper">
                        <img
                          src={fea?.api_photo}
                          width={60}
                          height={60}
                          alt={fea?.title}
                          className="w-[60px] h-[60px]"
                        />
                      </div>
                      <div className="content-wrapper">
                        <h6>{fea?.title}</h6>
                        <p>{fea?.text}</p>
                      </div>
                    </div>
                  ))}
              </div>
              {route?.pathname === "/" && (
                <div className="btn-wrapper">
                  <Link
                    className="ch-btn ch-primary-btn about-btn"
                    to="/about"
                  >
                    {about?.about?.btn_text}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
