import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import Transactions from "../../components/dashboard/transactions/Transactions";
import { getTranactions } from "@/@actions/user";
import { useSearchParams } from "react-router-dom";
import { useStore } from "@/store/index";

const Tranactions = () => {
  const [searchParams] = useSearchParams();
  const token = useStore((state) => state.token);
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    getTranactions(token, searchParams)
      .then((res) => {
        setTransactions(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams])


  return (
    <div>
      <Transactions transactions={transactions?.data} title={'Transactions'} />
      <Pagination
        last_page={transactions?.last_page}
        per_page={transactions?.per_page}
        total={transactions?.total}
        links={transactions?.links}
      />
    </div>
  );
};

export default Tranactions;
