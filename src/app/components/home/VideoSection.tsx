import { useStore } from "@/store/index";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

export default function VideoSection() {

  const settings = useStore((state) => state.settings);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <>
      <div

        data-aos-anchor=".ch-hero-section"
        className="ch-vdo-section bg-class"
        style={{
          backgroundImage: `url('/assets/images/video-section-bg.png')`,
        }}
      >
        <div className="section-to-up section-to-up-extended">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="video-img-wrapper">
                  <svg
                    className="green-rec"
                    width="363"
                    height="319"
                    viewBox="0 0 363 319"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 16C0 7.16344 7.16344 0 16 0H362C362.552 0 363 0.447715 363 1V303C363 311.837 355.837 319 347 319H16C7.16345 319 0 311.837 0 303V16Z"
                      fill="#02A95C"
                    />
                  </svg>
                  <svg
                    className="red-rec"
                    width="362"
                    height="304"
                    viewBox="0 0 362 304"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="362" height="304" rx="16" fill="#FF4E59" />
                  </svg>
                  <img
                    className="rec-shape item-bounce"
                    src="/assets/images/rec-shape.png"
                    alt="rectangle shape"
                    width={188}
                    height={293}
                    loading="lazy"
                  />

                  <img
                    className="main-img bg-class  max-h-[700px]"
                    src={settings?.hero_photo2}
                    alt="video image"
                    width={1320}
                    height={700}
                    loading="lazy"
                  />

                  <div
                    className="video-btn-wrapper bg-class"
                    style={{
                      backgroundImage: `url('${settings?.hero_photo}')`,
                    }}
                  >
                    <button
                      className="vdo-btn"
                      type="button"
                      onClick={openModal}
                    >
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
                            fill="#02A95C"
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
            </div>
          </div>
        </div>
      </div>
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={settings?.hero_video_link}
        onClose={closeModal}
      />
    </>
  );
}
