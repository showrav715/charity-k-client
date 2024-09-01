import { getUserDonations } from "@/@actions/user";
import MyDonation from "@/app/components/dashboard/my-donation/MyDonation";
import Pagination from "@/app/components/pagination/Pagination";
import { useSearchParams } from "react-router-dom";
import { useStore } from "@/store/index";
import { useEffect, useState } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";

const MyDonationPage = () => {
  const title = "My Donation";

  const [searchParams] = useSearchParams();

  const token = useStore((state) => state.token);
  const [getAllDonations, setData] = useState(null);

  useEffect(() => {
    getUserDonations(token, searchParams)
      .then((res) => {
        setData(res);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, [searchParams]);

  if (getAllDonations == undefined) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <MyDonation title={title} table_data={getAllDonations} />
      <Pagination
        last_page={getAllDonations?.last_page}
        per_page={getAllDonations?.per_page}
        total={getAllDonations?.total}
        links={getAllDonations?.links}
      />
    </>
  );
};

export default MyDonationPage;
