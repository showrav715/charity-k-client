
import { HerosectionSkeleton } from "../../../app/ui/skeletons";
import { Settings, translate } from "../../../helper/helper";

import { Link } from "react-router-dom";


export default function CtaSection() {
  if (!Settings("cta_title")) return <HerosectionSkeleton />;
  return (
    <section
      className="ch-contact-section ch-contact-section-2 bg-class mb-5"
      style={{ backgroundImage: `url('/assets/images/about-sec-bg2.png')` }}
    >
      {/* shapes */}
      <img
        src={`/assets/images/home2-vector3.png`}
        width={52}
        height={97}
        alt="shapes"
        className="shape shape1"
      />
      <img
        src={`/assets/images/cta-vector2.png`}
        width={120}
        height={120}
        alt="shapes"
        className="shape shape2"
      />
      <div className="container">
        <div className="row position-relative z-1 align-items-center gy-md-5">
          <div className="col-lg-6">
            <div className="title-box">
              <h2
                className="title mb-60 text-white"
              >
                {Settings("cta_title")}
              </h2>
              <Link
                to="/become-volunteer"
                className="ch-btn ch-primary-btn"
              >
                {translate("Join as a Volunteer")}
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src={Settings('cta_photo')}
              alt="contact image"
              className="contact-img d-none d-md-block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
