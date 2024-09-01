
import { Settings, split, translate } from "@/helper/helper";
import { Link } from "react-router-dom";

export default function CtaSection() {
  var { word, last } = split(Settings("cta_title"), 3);

  return (
    <section
      className="ch-contact-section d-flex items-center home1 bg-class position-relative"
      style={{ backgroundImage: `url('/assets/images/about-sec-bg.png')` }}
    >
      <img
        width={834}
        height={1900}
        src="/assets/images/contact-shape.png"
        alt="contact image"
        className="contact-shape d-none d-lg-block"
      />
      <div className="container">
        <div className="row position-relativee z-1 align-items-center gy-5">
          <div className="col-lg-6">
            <div className="title-box">
              <h2
                
                
                className="title mb-60 text-white"
              >
                {word} <span>{last}</span>
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
              
              
              width={834}
              height={518}
              src={Settings("cta_photo2")}
              alt="contact image"
              className="contact-img  mask-with-img position-relative z-30"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
