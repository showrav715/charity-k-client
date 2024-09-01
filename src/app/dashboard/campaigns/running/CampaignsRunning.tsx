import { useEffect, useState } from "react";

import { getUserCampaigns } from "@/@actions/user";
import { useStore } from "@/store/index";
import { useSearchParams } from "react-router-dom";
import Campaigns from "@/app/components/dashboard/campaigns/Campaigns";

const CampaignsRunning = () => {
  const [searchParams, setSearchParams] = useSearchParams();


  const token = useStore((state) => state.token);
  const [data, setData] = useState();
  useEffect(() => {
    searchParams.set("type", "running");
    setSearchParams(searchParams);
    if (searchParams.get("type") != "running") {
      return;
    }
    getUserCampaigns(token, searchParams)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  const title = "Running Campaigns";
  return (
    <div>
      <Campaigns table_data={data} title={title} />
    </div>
  );
};

export default CampaignsRunning;
