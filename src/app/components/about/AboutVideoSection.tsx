

import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import CountUp from "react-countup";
import { counters } from "@/@types/frontend";
import { AboutPageCounters } from "@/@actions/frontend";
export default function AboutVideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [counters, setCounters] = useState<counters[] | null>(null);
  const [backgroud_photo, setBackgroud_photo] = useState<string | null>(null);
  const [video_id, setVideo_id] = useState<string | null>(null);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AboutPageCounters();
        setCounters(data.counters as counters[]);
        setBackgroud_photo(data?.about?.backgroud_photo);
        setVideo_id(data?.about?.video_id);
      } catch (error) {
        console.error("Error fetching latest category:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div
        className="ch-about-vdo-section bg-class"
        style={{
          backgroundImage: `url('/assets/images/ch-about-video-bg.png')`,
        }}
      >
        <div className="container">
          <div className="row mb-120">
            <div className="col-12"  >
              <div className="video-box">
                {backgroud_photo && (
                  <img
                    src={backgroud_photo}
                    width={1320}
                    height={600}
                    alt="video image"
                    className="video-img"
                  />
                )}

                <button className="vdo-btn" type="button" onClick={openModal}>
                  <svg
                    width="110"
                    height="110"
                    viewBox="0 0 110 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1569_7019)">
                      <path
                        d="M54.9999 0C24.6243 0 0 24.6243 0 54.9999C0 85.3755 24.6243 110 54.9999 110C85.3755 110 110 85.3755 110 54.9999C109.968 24.6379 85.3621 0.0324567 54.9999 0ZM78.1625 56.7523C77.7818 57.5161 77.1628 58.1353 76.3988 58.516V58.5356L44.9703 74.2499C43.0293 75.2197 40.6699 74.4327 39.6999 72.4918C39.4241 71.94 39.2821 71.3309 39.2855 70.7142V39.2858C39.2846 37.116 41.0426 35.3564 43.2123 35.3553C43.8226 35.355 44.4245 35.4968 44.9703 35.7696L76.3988 51.484C78.3406 52.4517 79.1304 54.8104 78.1625 56.7523Z"
                        fill="#3271A6"
                      />
                      <path
                        d="M39.6016 40.5898V69.4098C39.6016 72.6614 43.0069 74.7897 45.9297 73.3649L75.4886 58.9549C78.7845 57.3481 78.7845 52.6515 75.4886 51.0447L45.9297 36.6347C43.0069 35.2099 39.6016 37.3382 39.6016 40.5898Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1569_7019">
                        <rect width="110" height="110" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="row g-5 g-lg-0 ch-single-about-wrapper">
            {counters &&
              counters?.map((counters) => (
                <div
                  key={counters?.id}
                  className="col-md-6 col-lg-3 single-item"
                  
                  
                  data-aos-delay={`100`}
                >
                  <div className="single-about-counter">
                    <div className="icon-wrapper">
                      <i className={counters.icon}></i>

                    </div>
                    <h3>
                      <span>
                        <CountUp end={counters?.counter_number} />{" "}
                      </span>{" "}
                      +
                    </h3>
                    <h5>{counters?.title}</h5>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={video_id}
        onClose={closeModal}
      />
    </>
  );
}
