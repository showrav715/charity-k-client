import { useStore } from "../store/index";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { baseUrl } from "../BaseUrl";
import HeaderTailwind from "../app/components/layout/HeaderTailwind";
import FooterTailwind from "../app/components/layout/FooterTailwind";
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from "../../src/theme";
import "../../src/app/globals.css";
import SideNav from "../app/components/dashboard/SideNav";
import { Token } from "../helper/helper";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DashboardRouteWrapper({ children }) {
  // store value
  const storeSetting = useStore((state) => state.storeSetting);
  const settings = useStore((state) => state.settings);
  const router = useNavigate();

  // get settings
  const fetchAndUpdateSettings = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/setting`);
      const data = await response.json();
      await storeSetting(data.response);
    } catch (error) {
      console.error("Error fetching and updating settings:", error);
    }
  };

  useEffect(() => {
    fetchAndUpdateSettings();
  }, []);

  if (!Token) {
    return <Navigate to="/login" />;
  }

  if (settings?.is_maintenance == 1) {
    router("/maintenance");
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Helmet>
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/all.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/loading.css" />
        <link rel="icon" href="/assets/images/favicon.svg" />
        <script src="/assets/js/wow.js"></script>
        <title>Dashboard</title>
      </Helmet>

      <ThemeProvider value={theme}>
        <HeaderTailwind />
        <div className="bg-[#F7FBFA] pb-[60px] min-992:pb-[120px] dashboard-layout">
          <div className="flex dashboardContainer flex-col md:flex-row  min-1440:w-[1320px] min-1200:w-[1140px] min-992:w-[960px] min-768:w-[720px] min-576:w-[540px] min-320:w-full mx-auto">
            <SideNav />
            <div className="w-full max-h-screen overflow-scroll scrollbar-hidden min-1440:w-[76.4%] min-1024:ww-[70%] px-[20px] min-768:px-[40px] pt-[16px] min-768:pt-[32px] pb-[60px] min-768:pb-[120px] bg-auc-white-color  auc-dashboard-sidebar-shadow">
              {children}
            </div>
          </div>
        </div>

        <FooterTailwind />
      </ThemeProvider>
    </>
  );
}
