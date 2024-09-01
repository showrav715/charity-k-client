
import  { useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Link, useNavigate } from "react-router-dom";

import {
  Campaign, 
  ImageGalleryInterface,
  preloadedAmountInterface,
} from "@/@types/frontend";
import { ShowConvertPrice, ShowCurrencySign, translate, ShowCurrencyPrice } from "@/helper/helper";
import { CardsSkeleton } from "@/app/ui/skeletons";



export default function CampaignDonation({
  page_data,
  preloaded_amount,
}: {
  page_data: Campaign;
  preloaded_amount: preloadedAmountInterface[];
}) {
  const router = useNavigate();
  if (!page_data) {
    router("/error");
  }

  const [donationAmount, setdonationAmount] = useState<number | null>(null);
  const handelePre = (value: number) => {
    const amount = ShowConvertPrice({ price: value });
    setdonationAmount(amount as number);
  };

  const handle = () => {
    router(`/checkout/${page_data?.slug}?amount=${donationAmount}`);
  };

  const images: ImageGalleryInterface[] = page_data?.galleries;

  return (
    <div className="campaign-donation-area">
      <div className="container">
        <div className="row g-4 g-xl-5">
          <div
            className="col-lg-5 col-xl-6"
          >
            {images == undefined ? (
              <CardsSkeleton />
            ) : (
              <div className="position-sticky top-51">
                {images && images.length > 0 ? (
                  <ImageGallery
                    showNav={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    items={images}
                  />
                ) : (
                  <img
                    src={page_data?.api_photo}
                    height={500}
                    width={500}
                    alt={`${page_data?.title} img`}
                    className="product-details-fea-img"
                  />
                )}
                <Link
                  to={`/campaings?category=${page_data?.category?.id}`}
                  className="ch-btn sm-btn ch-white-btn position-category-btn"
                >
                  {page_data?.category?.name}
                </Link>
              </div>
            )}

          </div>
          <div
            className="col-lg-7 col-xl-6"
          >
            <div className="single-campaign version-2 campaign-details">
              <div className="bottom-area">
                <h3>{page_data?.title}</h3>
                <p className="percentage-label">
                  {translate("Founded")}: {page_data?.founded} %
                </p>

                <div>
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
                      style={{ width: `${page_data?.founded}%` }}
                    ></div>
                  </div>
                </div>
                <div className="sm-info-wrapper mb-20">
                  <span>
                    <b>{translate("Raised")}:</b>{" "}
                    <ShowCurrencyPrice price={page_data?.raised} />
                  </span>
                  <span>
                    <b>{translate("Goal")}:</b>{" "}
                    <ShowCurrencyPrice price={page_data?.goal} />
                  </span>
                </div>

                <div className="sm-info-wrapper flex-column mb-20 gap-8">
                  <span className="fz-18 line-height-160">
                    <b>{translate("Location")}:</b> {page_data?.location}
                  </span>
                  <span className="fz-18 line-height-160">
                    <b>{translate("Campaign End")}: </b>
                    {page_data?.close_type == "end_date" && (
                      <>{page_data?.end_date}</>
                    )}

                    {page_data?.close_type == "goal" && (
                      <>
                        <ShowCurrencyPrice price={page_data?.goal} />{" "}
                        {translate("found raised")}
                      </>
                    )}
                  </span>
                  <span className="fz-18 line-height-160">
                    <b>{translate("People Benefits")}:</b> {page_data?.benefits}{" "}
                    {translate("people")}
                  </span>
                </div>

                <h4 className="mb-24">{translate("Your Donation")}</h4>

                <div className="input-with-currency">
                  <span className="currency-icon">
                    <ShowCurrencySign />
                  </span>
                  <input
                    type="number"
                    className="donation-input mb-16"
                    value={donationAmount}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setdonationAmount(null);
                      } else {
                        setdonationAmount(Number(e.target.value) as number);
                      }
                    }}
                  />
                </div>

                <div className="donation-amount-wrapper mb-40">
                  {preloaded_amount?.map((donation, index) => (
                    <button
                      key={index}
                      onClick={() => handelePre(donation?.amount)}
                      className="fixed-donation-amount"
                    >
                      <ShowCurrencyPrice price={donation?.amount} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={handle}
                  className="ch-btn ch-primary-btn w-100"
                >
                  {translate("donate now")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
