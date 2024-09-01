

import { Link } from "react-router-dom";
import { Campaign } from "@/@types/frontend";

import { translate } from "@/helper/helper";
import CampaignCardTwo from "../single/CampaignCardTwo";

export default function NewestCampaign({ page_data }) {

  return (
    <section className="ch-newest-section ch-newest-section-2">
      <div className="container">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                className="sm-title"
              >
                {translate("Recently Added Campaigns")}
              </h5>
              <h2 className="title">
                {translate("Just In: Explore Our Newest Impactful Campaigns")}
              </h2>
            </div>
          </div>
        </div>

        <div className="row gy-4 justify-content-center">
          {page_data &&
            page_data?.map((card: Campaign) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={card.id}
              >
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
              </div>
            ))}
          <div
            className="col-12 text-center mt-60"
          >
            <Link to="/campaigns" className="ch-btn ch-primary-btn-outline">
              {translate("Show All Campaign")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
