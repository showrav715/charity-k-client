
import { Fragment } from "react";
import CampaignCardList from "../single/CampaignCardList";
import CampaignCard from "../single/CampaignCard";
import { useStore } from "@/store/index";
export default function CampaignList({ campaingList }) {

  const isList = useStore((state) => state.isCampaignListView);



  return (
    <div className={`row  ${isList ? "gy-5" : "gy-4"}`}>
      {campaingList &&
        campaingList?.map((card, index) => (
          <Fragment key={index}>
            {!isList ? (
              <div className="col-12 col-md-6 col-lg-4" key={card.id}>
                <CampaignCard
                  key={card?.id}
                  title={card?.title}
                  img={card?.api_photo}
                  category={card?.category?.name}
                  category_link={
                    card?.category?.slug &&
                    `/campaigns?category=${card?.category?.slug}`
                  }
                  progress_percentage={card?.founded}
                  raised_amount={card?.raised}
                  raised_goal={card?.goal}
                  donate_link={`/campaigns/${card?.slug}`}
                />
              </div>
            ) : (
              <div className="col-12" key={card.id}>
                <CampaignCardList
                  title={card.title}
                  des={card?.sort_details}
                  img={card?.api_photo}
                  category={card?.category?.name}
                  category_link={
                    card?.category?.slug &&
                    `/campaigns?category=${card?.category?.slug}`
                  }
                  progress_percentage={card?.founded}
                  raised_amount={card?.raised}
                  raised_goal={card?.goal}
                  donate_link={`/campaigns/${card?.slug}`}
                />
              </div>
            )}
          </Fragment>
        ))}
    </div>
  );
}
