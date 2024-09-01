

import { useStore } from "@/store/index";
import { Link } from "react-router-dom";
import { translate } from "@/helper/helper";
export default function HeroSection() {
  const settings = useStore((state) => state.settings);
  const splitTitle = useStore((state) => state.splitTitle);

  return (
    <section
      className="ch-hero-section bg-class"
      style={{
        backgroundImage: `url('/assets/images/herosection-bg.png')`,
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
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
                <Link className="ch-btn ch-secondary-btn" to="/campaigns">
                  {translate('Explore Campaigns')}
                </Link>
                <Link className="ch-btn ch-primary-btn" to="/checkout">
                  {translate('Donate Now')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
