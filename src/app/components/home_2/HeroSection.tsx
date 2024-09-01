

import { translate } from "../../../helper/helper";

import { useStore } from "../../../store/index";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import { Link } from "react-router-dom";
import { CardsSkeleton } from "../../../app/ui/skeletons";


export default function HeroSection() {
  const settings = useStore((state) => state.settings);
  const splitTitle = useStore((state) => state.splitTitle);


  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!settings || !splitTitle) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <section
        className="ch-hero-section ch-hero-section-2 bg-class"
        style={{
          backgroundImage: `url('/assets/images/herosection2-bg.png')`,
        }}
      >
        {/* shapes */}
        <img
          src={`/assets/images/home2-vector1.png`}
          width={84}
          height={83}
          loading="lazy"
          alt="shapes"
          className="shape shape1"
        />
        <img
          src={`/assets/images/home2-vector2.png`}
          width={74}
          height={45}
          alt="shapes"
          className="shape shape2 item-rotate"
        />
        <img
          src={`/assets/images/home2-vector3.png`}
          width={52}
          height={97}
          alt="shapes"
          className="shape shape3"
        />
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-7">
              <div className="title-box">
                <h5
                  className="sm-title"
                >
            
                  {settings?.hero_subtitle}
                </h5>
                <h1
                  className="title"
                >
                  {splitTitle.stringWithoutLastWord}{" "}
                  <span>{splitTitle.lastWord}</span>
                </h1>
                <div
                  className="btn-wrapper"
                >
                  <Link className="ch-btn ch-primary-btn" to="/campaigns">
                    {translate("Explore Campaigns")}
                  </Link>
                  <Link className="ch-btn ch-white-btn" to="/checkout">
                    {translate("Donate Now")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="vdo-wrapper" 
                  >
                {/* vdo btn */}
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
                {/* main img */}
                <img
                  src={settings?.hero_photo}
                  alt="main img"
                  className="hero-img "
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={settings?.hero_video_link}
        onClose={closeModal}
      />
    </>
  );
}
