
import { Dialog } from "@material-tailwind/react";

import { ShowCurrencyPrice, translate } from "@/helper/helper";
import { Link, useLocation } from "react-router-dom";

const DonationDetailsCard = ({ openModal, handleOpenModal, data }) => {

  const {pathname} = useLocation();

  return (
    <>
    {/* @ts-ignore  */}
      <Dialog
        open={openModal}
        handler={handleOpenModal}
        size={"md"}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        // onPointerEnterCapture={() => {}}
        // onPointerLeaveCapture={() => {}}
        // className="bg-transparent shadow-none"
        placeholder={undefined}
      >
        <div className="flex flex-col items-start  gap-[24px] max-768:gap-[12px] px-[40px] max-1600:px-[30px] max-768:px-[20px] py-[32px] max-1600:py-[24px] max-768:py-[16px] rounded-[12px]   m-auto bg-auc-white-color">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-[20px] text-auc-text-color-900 min-768:text-[24px] min-1440:text-[32px] leading-[130%] font-semibold">
              {translate("Donation Details!")}
            </h3>
            <span>
              <svg
                onClick={handleOpenModal}
                className="cursor-pointer max-768:w-[30px] max-768:h-[30px]"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clipPath="url(#clip0_933_3888)">
                  <path
                    d="M20 0C8.97156 0 0 8.97156 0 20C0 31.0284 8.97156 40 20 40C31.0284 40 40 31.0284 40 20C40 8.97156 31.0284 0 20 0ZM27.3651 25.0082C28.0167 25.6601 28.0167 26.7133 27.3651 27.3651C27.0401 27.6901 26.6135 27.8534 26.1865 27.8534C25.7599 27.8534 25.3333 27.6901 25.0082 27.3651L20 22.3566L14.9918 27.3651C14.6667 27.6901 14.2401 27.8534 13.8135 27.8534C13.3865 27.8534 12.9599 27.6901 12.6349 27.3651C11.9833 26.7133 11.9833 25.6601 12.6349 25.0082L17.6434 20L12.6349 14.9918C11.9833 14.3399 11.9833 13.2867 12.6349 12.6349C13.2867 11.9833 14.3399 11.9833 14.9918 12.6349L20 17.6434L25.0082 12.6349C25.6601 11.9833 26.7133 11.9833 27.3651 12.6349C28.0167 13.2867 28.0167 14.3399 27.3651 14.9918L22.3566 20L27.3651 25.0082Z"
                    fill="#FF4E59"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_933_3888">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
          <img
            src={data?.campaign?.api_photo}
            className="rounded-[8px] w-[100%] h-[200px] object-cover"
            width={508}
            height={220}
            alt=""
          />
          <div className="w-full">
            <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium w-[173px] leading-[130%]">
                {translate("Campaign Name")}
              </h5>
              <h5 className=" text-[14px] min-768:text-[16px] min-1440:text-[18px] text-right text-auc-primary-color-900 font-medium leading-[130%]">
                <Link to={`/campaigns/${data?.campaign?.slug}`}>
                  {data?.campaign?.title}
                </Link>
              </h5>
            </div>

            <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {translate("Transaction ID")}
              </h5>
              <h5   className="break-words text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {data?.txn_id}
              </h5>
            </div>

            {pathname === "/dashboard/funds-raised" && (
              <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
                <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                  {translate("Donor Name")}
                </h5>
                <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                  {data?.user?.name || "N/A"}
                </h5>
              </div>
            )}

            <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {translate("Email")}
              </h5>
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {data?.email || "N/A"}
              </h5>
            </div>

            {pathname === "/dashboard/funds-raised" && (
              <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
                <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                  {translate("Phone Number")}
                </h5>
                <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                  {data?.user?.phone || "N/A"}
                </h5>
              </div>
            )}

            {pathname === "/dashboard/funds-raised" && (
              <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
                <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                  {translate("Address")}
                </h5>
                <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                  {data?.user?.address || "N/A"}
                </h5>
              </div>
            )}

            <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {translate("Donation Amount")}
              </h5>
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                <ShowCurrencyPrice price={data?.total} />
              </h5>
            </div>

            <div className="flex items-start justify-between py-[12px] border-b border-auc-text-color-500">
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {translate("Payment gateway")}
              </h5>
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {data?.payment_method}
              </h5>
            </div>

            <div className="flex items-start justify-between py-[12px]  border-auc-text-color-500">
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {translate("Date")}
              </h5>
              <h5 className="text-[14px] min-768:text-[16px] min-1440:text-[18px] text-auc-text-color-900 font-medium leading-[130%]">
                {data?.created_at}
              </h5>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DonationDetailsCard;
