import React from "react";
import { translate } from "@/helper/helper";
import { ShowCurrencyPrice } from "@/helper/helper";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  img: string;
  category: string;
  category_link?: string | null;
  progress_percentage: string | number;
  raised_amount: number;
  raised_goal: number;
  donate_link?: string;
}

const CampaignCard: React.FC<Props> = ({
  title,
  img,
  category,
  category_link,
  progress_percentage,
  raised_amount,
  raised_goal,
  donate_link,
}) => {
  return (
    <div className="single-campaign">
      <div className="top-area overflow-hidden rounded-3">
        <Link to={donate_link}>
          <img
            className="thumbnail"
            width={392}
            height={392}
            src={img}
            alt="campaign feature image"
          />
        </Link>
        {category_link && (
          <Link to={category_link} className="ch-btn sm-btn ch-white-btn">
            {category}
          </Link>
        )}
      </div>
      <h5>
        <Link to={donate_link}>
          {title.length > 65 ? `${title.slice(0, 65)}...` : title}
        </Link>
      </h5>

      <p className="percentage-label">
        {translate("Founded")}: {progress_percentage}%
      </p>
      <div
        className="progress progress-wrapper"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow={0}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-bar progress-container"
          style={{ width: `${progress_percentage}%` }}
        ></div>
      </div>
      <div className="sm-info-wrapper">
        <span>
          <b>{translate("Raised")}:</b>{" "}
          <ShowCurrencyPrice price={raised_amount} />
        </span>
        <span>
          <b>{translate("Goal")}:</b> <ShowCurrencyPrice price={raised_goal} />
        </span>
      </div>

      <Link to={donate_link} className="ch-btn ch-primary-btn w-100">
        {translate("donate now")}
      </Link>
    </div>
  );
};

export default CampaignCard;

