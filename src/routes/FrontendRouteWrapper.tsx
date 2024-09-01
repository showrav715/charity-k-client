import { useStore } from "../store/index";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { baseUrl } from "../BaseUrl";
// import Header from "../app/components/layout/Header";
// import Footer from "../app/components/layout/Footer";
import ScrollToTop from "react-scroll-to-top";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function FrontendRouteWrapper({ children }) {
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
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/all.css" />
        <link rel="stylesheet" href="/assets/css/loading.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="icon" href="/assets/images/favicon.svg" />
        {/* Example for JS from CDN */}
        <script src="/assets/js/bootstrap.bundle.min.js" defer></script>
        <script src="/assets/js/wow.js"></script>
      </Helmet>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
      <ScrollToTop
        className="scroll-top-btn"
        smooth
        component={<i className="fa-solid fa-angle-up scroll-to-top-icon"></i>}
      />
    </>
  );
}


