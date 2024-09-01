
import { GetWithdrawHistory } from "@/@actions/user";
import LogsTable from "@/app/components/dashboard/logs/LogsTable";
import Pagination from "@/app/components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { useStore } from "@/store/index";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";

const WithdrawLog =  () => {
  const [searchParams] = useSearchParams();
  const token = useStore((state) => state.token);
  const [data, setData] = useState(null);

  useEffect(() => {
    GetWithdrawHistory(token, searchParams).then((res) => {
      setData(res);
    }).catch((error) => {
      console.log(error)
    });

  }, [])
  



  const title = "Withdraw History";
  if (data?.data == undefined ) {
    return <CardsSkeleton />;
  }

  return (
    <div>
      <LogsTable title={title} table_data={data?.data} />
      <Pagination
        last_page={data?.last_page}
        per_page={data?.per_page}
        total={data?.total}
        links={data?.links}
      />
    </div>
  );
};

export default WithdrawLog;
