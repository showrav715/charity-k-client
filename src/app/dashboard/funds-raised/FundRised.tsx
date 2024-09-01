import { getFundRaised } from "@/@actions/user";
import FundsRaised from "@/app/components/dashboard/funds-raised/FundsRaised";
import Pagination from "@/app/components/pagination/Pagination";
import React from "react";
import { useStore } from "@/store/index";
import { useSearchParams } from "react-router-dom";


const FundRised = () => {
  const title = "Received Donation";
  const [searchParams] = useSearchParams();
  const token = useStore((state) => state.token);

  const [getAllfund, setAllFund] = React.useState(null);

  React.useEffect(() => {
    getFundRaised(token, searchParams)
      .then((res) => {
        setAllFund(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  return (
    <>
      <FundsRaised title={title} table_data={getAllfund} />
      <Pagination
        last_page={getAllfund?.last_page}
        per_page={getAllfund?.per_page}
        total={getAllfund?.total}
        links={getAllfund?.links}
      />
    </>
  );
};

export default FundRised;
