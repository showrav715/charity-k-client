
import React from "react";
import { IChatCard } from "../../interfaces/interfaces";

import { useStore } from "@/store/index";
import { translate } from "@/helper/helper";

const ChatCard: React.FC<IChatCard> = ({
  isAttached,
  userImg,
  date,
  message,
  type,
}) => {
  const user = useStore((state) => state.user);
  return (
    <div className="w-full flex flex-col min-768:flex-row px-[20px] min-768:px-[40px] py-[20px] min-768:py-[32px] rounded-[8px] border border-auc-border-color bg-auc-white-color items-start gap-[20px] min-768:gap-[43px] ">
      {/* User Avatar And Name  */}
      <div className="flex flex-col items-center justify-center  gap-[12px] w-[67px]">
        <div className="w-[67px]">
          <div className="rounded-[60px] mx-auto w-[60px] h-[60px] bg-cover bg-center bg-no-repeat bg-lightgray">
            <img src={userImg} alt="user" width={60} height={60} />
          </div>
        </div>
        <p className="text-[18px] leading-[120%]">
          {type == "user" ? user.username : "Admin"}
        </p>
      </div>
      {/* Chat  */}
      <div className="min-768:pl-[32px] min-768:border-l border-auc-border-color flex flex-col items-start gap-[16px] ">
        <p className="text-auc-text-color-900 text-[16px] font-semibold leading-[170%] ">
          {translate("Posted on")} {date}
        </p>

        <p className="text-auc-text-color-800 text-[16px] font-normal leading-[170%] ">
          {message}
        </p>
        {isAttached && (
          <div className="flex items-end gap-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
            >
              <path
                d="M13.5 4.5V0.4725L17.595 5.25H14.25C14.0511 5.25 13.8603 5.17098 13.7197 5.03033C13.579 4.88968 13.5 4.69891 13.5 4.5ZM14.25 6.75C13.6533 6.75 13.081 6.51295 12.659 6.09099C12.2371 5.66903 12 5.09674 12 4.5V0H2.25C1.65326 0 1.08097 0.237053 0.65901 0.65901C0.237053 1.08097 0 1.65326 0 2.25V18.75C0 19.3467 0.237053 19.919 0.65901 20.341C1.08097 20.7629 1.65326 21 2.25 21H15.75C16.3467 21 16.919 20.7629 17.341 20.341C17.7629 19.919 18 19.3467 18 18.75V6.75H14.25Z"
                fill="#3271A6"
              />
            </svg>
            <span className="text-[16px] leading-[120%] text-auc-primary-color-900">
              {translate("Attachment")} 1
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
