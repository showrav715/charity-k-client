
import { GetCategory } from "@/@actions/frontend";
import CreateCampaign from "@/app/components/dashboard/campaigns/CreateCampaign";
import { useEffect, useState } from "react";

const CampaignsCreate = () => {
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    const data = GetCategory();
    data.then((res) => {
      setCategoryData(res as any);
    });
  }, []);



  const title = "Create New Campaign";
  return (
    <>
      <CreateCampaign title={title} categoryList={categoryData} />
    </>
  );
};

export default CampaignsCreate;
