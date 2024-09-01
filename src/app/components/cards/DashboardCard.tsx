


import { IDashboardCard } from "../../interfaces/interfaces";
// import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { translate,ConvertPrice ,ShowCurrencySign} from "../../../helper/helper";

const DashboardCard: React.FC<IDashboardCard> = ({ img, value, title,currency }) => {
  // const ShowCurrencySign = dynamic(
  //   () => import("@/helper/helper").then((module) => module.ShowCurrencySign),
  //   {
  //     ssr: false,
  //   }
  // );

  const price = currency ? ConvertPrice({ price: value }) : value;

  return (
    <div
      data-wow-delay="0.2s"
      className={`
            flex flex-col gap-[16px] items-center p-[32px] rounded-[8px] border-1 border-opacity-0 hover:border-opacity-100 text-center transition-all duration-300 ease-in-out wow fadeInUp
            ${title === "Total Campaign" && "bg-[#E5F2F2] border-[#008080]"}
            ${title === "Pending Campaign" && "bg-[#FFF7EB] border-[#FFB134]"}
            ${title === "Complete Campaign" && "bg-[#E9F9F6] border-[#26C3A4]"}
            ${title === "Closed Campaign" && "bg-[#FFEBF0] border-[#FF3A69]"}
            ${title === "Total Funds Raised" && "bg-[#EFF0FF] border-[#5B68FF]"}
            ${title === "My Donation" && "bg-[#E5F9FF] border-[#00C2FF]"}
            ${title === "Total Withdraw" && "bg-[#FBEEFD] border-[#DA55F0]"}
            ${title === "Current Balance" && "bg-[#E6F6EF] border-[#3271A6]"}
        `}
    >
      <img src={img} className="" width={80} height={80} alt="" />

      <div className="flex flex-col gap-[8px]">
        <p className="text-[24px] leading-[31.2px] font-semibold">
          {currency && <ShowCurrencySign />}
          <CountUp decimals={currency && 2 | 0} end={price as number} />
        </p>
        <p className="text-[16px] leading-[21.6px]">{translate(title)}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
