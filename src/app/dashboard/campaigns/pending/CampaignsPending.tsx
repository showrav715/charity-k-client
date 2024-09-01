
import { useSearchParams } from "react-router-dom";
import Campaigns from "../../../components/dashboard/campaigns/Campaigns";
import { getUserCampaigns } from "@/@actions/user";
import { useEffect, useState } from "react";
import { useStore } from "@/store/index";

const CampaignsPending = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const token = useStore((state) => state.token);
  const [datas, setData] = useState(null);
  useEffect(() => {
    searchParams.set("type", "pending");
    setSearchParams(searchParams);
    if (searchParams.get("type") != "pending") {
      return;
    }
    getUserCampaigns(token, searchParams)
      .then((res) => {
        setData(res);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, [searchParams]);



  const title = "Pending Campaigns";
  return (
    <div>
      <Campaigns table_data={datas} title={title} />
    </div>
  );
};

export default CampaignsPending;
