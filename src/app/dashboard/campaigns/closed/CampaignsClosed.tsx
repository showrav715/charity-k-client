
import { useSearchParams } from "react-router-dom";
import Campaigns from "../../../components/dashboard/campaigns/Campaigns";
import { getUserCampaigns } from "@/@actions/user";
import { useEffect, useState } from "react";
import { useStore } from "@/store/index";

const CampaignsClosed = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const token = useStore((state) => state.token);
  const [datas, setData] = useState(null);
  useEffect(() => {
    searchParams.set("type", "closed");
    setSearchParams(searchParams);
    if (searchParams.get("type") != "closed") {
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



  const title = "Closed Campaigns";
  return (
    <div>
      <Campaigns table_data={datas} title={title} />
    </div>
  );
};

export default CampaignsClosed;
