


import CampaignCard from "../single/CampaignCard";
import { Campaign } from "@/@types/frontend";
import { translate } from "@/helper/helper";
import Slider from "react-slick";
import { campaignSliderSettings } from "@/config/frontend";
export default function FeatureCampaign({ page_data, title, subtitle }) {
  return (
    <section className="ch-fea-section">
      <div className="container px-0">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                
                data-aos-delay="100"
                
                className="sm-title"
              >
                {translate(title)}
              </h5>
              <h2
                
                data-aos-delay="150"
                
                className="title"
              >
                {translate(subtitle)}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <Slider {...campaignSliderSettings}>
            {page_data &&
              page_data?.map((card: Campaign) => (
                <CampaignCard
                  key={card?.id}
                  title={card?.title}
                  img={card?.api_photo}
                  category={card?.category?.name}
                  category_link={card?.category?.slug}
                  progress_percentage={card?.founded}
                  raised_amount={card?.raised}
                  raised_goal={card?.goal}
                  donate_link={`/campaigns/${card?.slug}`}
                />
              ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
