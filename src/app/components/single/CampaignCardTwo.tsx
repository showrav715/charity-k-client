

import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
// import dynamic from "next/dynamic";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { translate } from "@/helper/helper";
// const ShowCurrencyPrice = dynamic(
//   () => import("@/helper/helper").then((module) => module.ShowCurrencyPrice),
//   { ssr: false }
// );

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


export default function CampaignCardTwo({
  title,
  img,
  category,
  category_link,
  progress_percentage,
  raised_amount,
  raised_goal,
  donate_link,
}: Props) {
  return (
    <div className="single-campaign single-campaign-2">
      <div className="top-area overflow-hidden rounded-3">
        <Link to={donate_link}>
          <img
            className="thumbnail"
            width={392}
            height={392}
            src={img}
            alt="campaing feature image"
          />
        </Link>
        {category_link && (
          <Link to={category_link} className="ch-btn sm-btn ch-dark-btn ">
            {category}
          </Link>
        )}
      </div>
      <div className="contents-wrapper">
        <h5>
          <Link to={donate_link}>
            {title.length > 44 ? `${title.slice(0, 44)}...` : title}
          </Link>
        </h5>

        <div className="btm-wrapper">
          <div className="sm-info-wrapper">
            <span>
              {/* <b>{translate("Raised")}:</b> <br />{" "} */}
              <b>Raised:</b> <br />{" "}
              {raised_amount}
              {/* <ShowCurrencyPrice price={raised_amount} /> */}
            </span>
          </div>
          <div className="sm-info-wrapper">
            <span>
              {/* <b>{translate("Goal")}:</b> <br />{" "} */}
              <b>Goal:</b> <br />{" "}
              {raised_goal}
              {/* <ShowCurrencyPrice price={raised_goal} /> */}
            </span>
          </div>
          <div className="circle-progress-wrapper">
            <CircularProgressbar
              className="cu"
              value={Number(progress_percentage)}
              text={`${progress_percentage}%`}
              styles={buildStyles({
                textColor: "#091e42",
                pathColor: `#02a95c`,
              })}
            />
          </div>
        </div>

        <Link to={donate_link} className="ch-btn ch-primary-btn w-100">
          {/* {translate("donate now")} */}
          donate now
        </Link>
      </div>
    </div>
  );
}
