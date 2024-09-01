import { Link, useSearchParams } from "react-router-dom";
import { getAllTickets } from "@/@actions/user";
import Pagination from "../../components/pagination/Pagination";
import TicketsTable from "../../components/dashboard/tickets/TicketsTable";
import { translate } from "@/helper/helper";
import { useStore } from "@/store/index";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";

const Tickets = () => {
  const [searchParams] = useSearchParams();
  const token = useStore((state) => state.token);
  const [allTickets, setAllTickets] = useState(null);
  useEffect(() => {
    getAllTickets(token, searchParams).then((res) => {
      setAllTickets(res);
    })
      .catch((err) => {
        console.log(err);
      });

  }, [searchParams])


  if (allTickets == undefined) {
    return <CardsSkeleton />
  }


  return (
    <>
      <div className="auc-primary-heading-container">
        <h2>{translate("Support Tickets")}</h2>
        <Link
          to="/dashboard/tickets/create-tickets"
          className="auc-btn-default auc-btn-primary"
        >
          + {translate("Create New Ticket")}
        </Link>
      </div>
      <TicketsTable table_data={allTickets?.data} />

      <Pagination
        last_page={allTickets?.last_page}
        per_page={allTickets?.per_page}
        total={allTickets?.total}
        links={allTickets?.links}
      />
    </>
  );
};

export default Tickets;
