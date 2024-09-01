
import Description from "./tab-items/Description";
import FAQ from "./tab-items/FAQ";

import VideoPlayerTab from "./tab-items/VideoPlayerTab";
import { translate } from "@/helper/helper";

export default function DetailsTabPanel({des_data,faqs_data,video_data,title}) {
  return (
    <div
      className="ch-auction-details-tab-panel"
      
      
      data-aos-delay="200"
    >
      <div className="container">
        <nav>
          <div className="nav mb-40" id="nav-tab" role="tablist">
            <a
              className="nav-link active ch-btn ch-primary-btn"
              id="nav-des-tab"
              data-bs-toggle="tab"
              href="#nav-des"
              role="tab"
              aria-controls="nav-des"
              aria-selected="true"
            >
              {translate("Description")}
            </a>
            <a
              className="nav-link ch-btn ch-primary-btn"
              id="nav-faq-tab"
              data-bs-toggle="tab"
              href="#nav-faq"
              role="tab"
              aria-controls="nav-faq"
              aria-selected="false"
            >
              {translate("FAQ")}
            </a>
            <a
              className="nav-link ch-btn ch-primary-btn"
              id="nav-video-tab"
              data-bs-toggle="tab"
              href="#nav-video"
              role="tab"
              aria-controls="nav-video"
              aria-selected="false"
            >
              {translate("Video")}
            </a>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-des"
            role="tabpanel"
            aria-labelledby="nav-des-tab"
          >
            <Description des={des_data} title={title} />
          </div>
          <div
            className="tab-pane fade"
            id="nav-faq"
            role="tabpanel"
            aria-labelledby="nav-faq-tab"
          >
            <FAQ faqs={faqs_data} />
          </div>
          <div
            className="tab-pane fade"
            id="nav-video"
            role="tabpanel"
            aria-labelledby="nav-video-tab"
          >
            <VideoPlayerTab  video_link={video_data}/>
          </div>
        </div>
      </div>
    </div>
  );
}
