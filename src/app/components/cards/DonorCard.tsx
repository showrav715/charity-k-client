import { Link } from "react-router-dom";
import { Donor } from "@/@types/frontend";
import { truncateString, translate, ShowCurrencyPrice } from "@/helper/helper";

const DonorCard = ({ data }: { data: Donor }) => {
  return (
    <div className="single-donor">
      <div className="img-wrapper">
        <span className="date-txt">{data?.api_date}</span>
        <img
          width={280}
          height={160}
          src={data.campaign.api_photo}
          alt="single-donor"
        />
      </div>
      <ul>
        <li>
          <span>{translate("Donor Name")}: </span>
          {data.name ? data?.name : "Anonymous"}
        </li>
        <li>
          <Link to={`/campaigns/${data.campaign_slug}`}>
            <span>{translate("Campaign Name")}:</span> {data?.campaign?.title && truncateString(data?.campaign?.title, 40)}
          </Link>
        </li>
        <li>
          <span>{translate("Donate Amount")}:</span> <ShowCurrencyPrice price={data.total} />
        </li>
      </ul>
    </div>
  );
};

export default DonorCard;
