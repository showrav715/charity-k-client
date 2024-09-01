import { GetCategory } from "@/@actions/frontend";
import { getSingleCampaign } from "@/@actions/user";
import EditCampaign from "@/app/components/dashboard/campaigns/EditCampaign";

import { error } from "@/helper/helper";
import { useStore } from "@/store/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CampaignEdit = () => {

  const params = useParams();
  const id = params.id;
  const [campaign, setCampaign] = useState({});
  const [categoryData, setCategoryData] = useState(null);

  const token = useStore((state) => state.token);
  useEffect(() => {
    getSingleCampaign(Number(id), token).then((res) => {
      setCampaign(res.response);
    })
      .catch((err) => {
        error(err.message);
      });

    GetCategory().then((res) => {
      setCategoryData(res);
    })
      .catch((err) => {
        error(err.message);
      });


  }, [])


  const title = "Edit Campaign";

  return (

    <EditCampaign
      title={title}
      categoryList={categoryData}
      campaign={campaign}
    />
  );
};

export default CampaignEdit;
