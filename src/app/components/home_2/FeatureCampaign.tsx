

import React from "react";
import { Campaign } from "@/@types/frontend";
import CampaignCardTwo from "../single/CampaignCardTwo";
import Slider from "react-slick";
import CustomPrevArrow from "../slider_components/CustomPrevArrow";
import CustomNextArrow from "../slider_components/CustomNextArrow";
// import { campaignSliderSettings } from "@/config/frontend";
// import { translate } from "@/helper/helper";
// import { campaignSliderSettings } from "@/config/frontend";


export default function FeatureCampaign({ page_data, title, subtitle }) {

  const campaignSliderSettings = {
    dots: true,
    cssEase: 'ease',
    autoplay: true,
    infinite: true,
    speed: 4500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: React.createElement(CustomPrevArrow),
    nextArrow: React.createElement(CustomNextArrow),
    centerMode: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <section className="ch-fea-section ch-fea-section-2">
      <div className="container px-0">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                className="sm-title"
              >
                {title}
                {/* {translate(title)} */}
              </h5>
              <h2
                className="title"
              >
                {subtitle}
                {/* {translate(subtitle)} */}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <Slider {...campaignSliderSettings}>
            {page_data &&
              page_data?.map((card: Campaign) => (
                <CampaignCardTwo
                  key={card?.id}
                  title={card?.title}
                  img={card?.api_photo}
                  category={card?.category?.name}
                  category_link={`/campaigns?category=${card?.category?.slug}`}
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
