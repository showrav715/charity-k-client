import{ Suspense, useEffect, useState } from "react";

import { getDashboardData, getTranactions } from "../../@actions/user";
import DashboardCard from "../components/cards/DashboardCard";
import Transactions from "../components/dashboard/transactions/Transactions";
import { translate } from "../../helper/helper";
import { useStore } from "../../store/index";
const DashBoardHome = () => {
  const [transactions, setTransactions] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  const token = useStore((state) => state.token);

  useEffect(() => {
    getTranactions(token)
      .then((res) => {
        setTransactions(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getDashboardData(token)
      .then((res) => {
        setDashboardData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const data = [
    {
      img: "/assets/img/DashboardCardIcon_1.png",
      title: "Total Campaign",
      value: dashboardData?.total_campaign,
      currency: false
    },
    {
      img: "/assets/img/DashboardCardIcon_2.png",
      title: "My Donation",
      value: dashboardData?.total_donation,
      currency: false
    },
    {
      img: "/assets/img/DashboardCardIcon_3.png",
      title: "Complete Campaign",
      value: dashboardData?.complete_campaign,
      currency: false
    },
    {
      img: "/assets/img/DashboardCardIcon_4.png",
      title: "Closed Campaign",
      value: dashboardData?.cancel_campaign,
      currency: false
    },
    {
      img: "/assets/img/DashboardCardIcon_5.png",
      title: "Total Funds Raised",
      value: dashboardData?.total_fund,
      currency: true
    },
    {
      img: "/assets/img/DashboardCardIcon_6.png",
      title: "My Donation",
      value: dashboardData?.my_donations,
      currency: true
    },
    {
      img: "/assets/img/DashboardCardIcon_7.png",
      title: "Total Withdraw",
      value: dashboardData?.total_withdraw,
      currency: true
    },
    {
      img: "/assets/img/DashboardCardIcon_8.png",
      title: "Current Balance",
      value: dashboardData?.current_balance,
      currency: true
    }
  ];

  return (
    <div>
      <h2 data-wow-delay="0.1s" className="wow fadeInUp auc-primary-heading">
        {translate("Dashboard")}
      </h2>

      <div className="grid min-320:grid-cols-1 min-768:grid-cols-2 min-992:grid-cols-3   min-1440:grid-cols-4 gap-[28px] mx-auto">
        {data.map((data, index) => (
          <Suspense key={index} fallback={<p className="font-semibold">...</p>}>
            <DashboardCard
              img={data.img}
              value={data.value as any}
              title={data.title}
              currency={data.currency}
            />
          </Suspense>
        ))}
      </div>

      <h2
        data-wow-delay="0.2s"
        className="wow fadeInUp text-[20px] min-768:text-[24px] min-1200:text-[32px] mt-[32px] mb-[24px]  "
      >
        {translate("Recent Transactions")}
      </h2>
      <Transactions transactions={transactions?.data} isDashboard={false} />
    </div>
  );
};

export default DashBoardHome;
