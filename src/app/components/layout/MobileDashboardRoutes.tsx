import{ useState,useEffect } from "react";
import SideNav from "../dashboard/SideNav";
import MobileMenu from "./MobileMenu";
import { CurrencyResponse } from "../../../@types/frontend";
import { useStore } from "../../../store/index";
import { GetAllCurrency } from "@/@actions/frontend";
import { baseUrl } from "@/BaseUrl";

export default function MobileDashboardRoutes() {
  const defaultCurr = useStore((state) => state.defaultCurrency);
  const [isHomeRoute, setisHomeRoute] = useState(false);
  const storeCurrency = useStore((state) => state.setCurrency);
  const [currencies, setCurrencies] = useState([] as CurrencyResponse[]);
  const defLang = useStore((state) => state.defaultLanguage);
  // mobile menu 
  const handleMobileMenu = useStore((state) => state.setMobileMenuOpen);
  const isMobileMenuOpen = useStore((state) => state.isMobileMenuOpen);
  const [allLanguages, setAllLanguages] = useState([] as any);
  const storeLanguage = useStore((state) => state.storeLanguage);
  const setLanguage = useStore((state) => state.setLanguage);


  useEffect(() => {

    const getCurrency = async () => {
      const res = await GetAllCurrency();;
      setCurrencies(res as any);
    };
    getCurrency();
    fetchAndUpdateLanguage();
  }, []);


  const fetchAndUpdateLanguage = async (code = "en", check = false) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/language/${code}`
      );
      const data = await response.json();
      if (check || !defLang) {
        await storeLanguage(data.response.language, check ? "api" : "");
      }

      setAllLanguages(data.response.languages);
      const defaultLang = data.response.languages.find((item: any) => item.code == code);
      if (check || !defLang) {
        setLanguage(defaultLang)
      }
    } catch (error) {
      console.error("Error fetching and updating settings:", error);
    }
  };



  const handleCurrencyChange = (e: any) => {
    storeCurrency(e);
  };

  const handleLanguageChange = (e: any) => {
    fetchAndUpdateLanguage(e.code, true);
  };

  const langList = allLanguages.map((item: any) => {
    return {
      ...item,
      id: item.id,
      name: item.language,
    };
  });



  useEffect(() => {
    const defaultCurrency = currencies.find((item) => item.default == 1);
    if (defaultCurrency) {
      storeCurrency(defaultCurrency, "api");
    }
  }, [currencies]);

  const currencyList = currencies.map((item: CurrencyResponse) => {
    return {
      ...item,
      id: item.id,
      name: item.code,
    };
  });
 



  return (
    <div
      className={` ${
        isMobileMenuOpen ? "left-0" : "-left-[100%]"
      } block bg-[#091e42ad] fixed top-0 w-full  h-[100%] z-40 transition-all ease-linear duration-300`}
    >
      <button
        type="button"
        onClick={()=>handleMobileMenu(false)}
        className={` ${
          isMobileMenuOpen ? "visible opacity-1" : "opacity-0 invisible"
        } fixed  right-[8px] top-[20px] min-425:top-[30px] w-[30px] min-425:w-[40px] h-[30px] min-425:h-[40px] bg-white rounded-[50%] flex justify-center items-center text-auc-text-color-900 transition-all ease-linear duration-300`}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
      <div className="w-[280px] min-425:w-[300px] bg-white h-[100%]">
        <div className="bg-white flex min-992:hidden">
          <button
            onClick={() => setisHomeRoute(false)}
            className={`${
              isHomeRoute
                ? "bg-auc-text-color-400"
                : "bg-auc-primary-color text-white"
            } flex-1 py-3 px-4 text-whitee capitalize`}
          >
            dashboard
          </button>
          <button
            onClick={() => setisHomeRoute(true)}
            className={`${
              !isHomeRoute
                ? "bg-auc-text-color-400"
                : "bg-auc-primary-color text-white"
            } flex-1 py-3 px-4 text-whitee capitalize`}
          >
            home
          </button>
        </div>

        {!isHomeRoute ? (
          <SideNav isMobile={true} />
        ) : (
          <MobileMenu
            isDashboard={true}
            mobileCurrencyList={currencyList}
            mobileDefaultCurr={defaultCurr}
            mobileHandleCurrencyChange={handleCurrencyChange}
            mobileLangList={langList}
            mobileHandleLangChange={handleLanguageChange}
            mobileDefaultLang={defLang && defLang.id}
          />
        )}
      </div>
    </div>
  );
}
