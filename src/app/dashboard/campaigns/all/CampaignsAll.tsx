import { useEffect, useState } from "react";
import Campaigns from "../../../components/dashboard/campaigns/Campaigns";
import { getUserCampaigns } from "../../../../@actions/user";
import { useStore } from "../../../../store/index";
import { useSearchParams } from "react-router-dom";

const CampaignsAll = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = useStore((state) => state.token);
  const [data, setData] = useState();
  useEffect(() => {
    searchParams.set("type", "all");
    setSearchParams(searchParams);
    if (searchParams.get("type") != "all") {
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

  const title = "All Campaigns";
  return (
    <div>
      <Campaigns table_data={data} title={title} />
    </div>
  );
};

export default CampaignsAll;
