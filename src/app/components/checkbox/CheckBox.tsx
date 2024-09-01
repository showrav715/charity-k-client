

import { useEffect, useState } from "react";

const CheckBox = ({ lebel, handler = null }) => {
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    handler && handler();
  }, [isChecked])

  return (
    <div className="flex items-center gap-[16px]">
      <div
        onClick={() => setIsChecked((state) => !state)}
        className="flex relative w-[24px] h-[24px] p-[3.6px] justify-center items-center border border-auc-primary-color-900 hover:border-auc-primary-hover-color transition-all ease-in-out duration-300 rounded-[6px] cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className={`${!isChecked && "hidden"}`}
        >
          <path
            d="M14.6023 4.80029L6.90234 12.5003L3.40234 9.00029"
            stroke={`#3271A6`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <label htmlFor="preloaded-amount">{lebel}</label>
    </div>
  );
};

export default CheckBox;
