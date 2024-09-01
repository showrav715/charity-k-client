
import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import CleanContent from "@/app/ui/CleanContent";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { useStore } from "@/store/index";
import { useNavigate } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';


function Maintenance() {
  const settings = useStore((state) => state.settings);
  const router = useNavigate();

  if (!settings) return <CardsSkeleton />
  if (settings?.is_maintenance == 0) {
    router("/");
  }

  return (
    <>
      <Helmet>
        <title>{translate("Maintenance")}</title>
      </Helmet>
      <Header />
      <div className="px-[30px] auc-container py-[60px] min-992:py-[120px] flex justify-center flex-col">
        <img className="mx-auto mb-4 object-contain" src={settings?.maintenance_photo} width={400} height={400} alt="Maintenance" />
        <CleanContent classNames="text-center max-w-[600px] mx-auto" content={settings?.maintenance} />
      </div>
      <Footer />
    </>
  )
}

export default Maintenance