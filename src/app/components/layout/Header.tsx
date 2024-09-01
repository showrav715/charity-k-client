

import  { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
// import { Link, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useStore } from "../../../store/index";
import { GetAllCurrency, GetAllPage } from "../../../@actions/frontend";
import { CurrencyResponse, Page } from "../../../@types/frontend";
import { translate } from "../../../helper/helper";
import ProfileButton from "../buttons/ProfileButton";
import { baseUrl } from "../../../BaseUrl";
import NiceSelect from "../NiceSelect/NiceSelect";

export default function Header() {

  // const pathname = useLocation();
  const settings = useStore((state) => state.settings);
  const token = useStore((state) => state.token);

  // currency & lang code start
  const storeCurrency = useStore((state) => state.setCurrency);
  const defaultCurr = useStore((state) => state.defaultCurrency);
  const storeLanguage = useStore((state) => state.storeLanguage);
  const setLanguage = useStore((state) => state.setLanguage);
  const defLang = useStore((state) => state.defaultLanguage);
  const [allLanguages, setAllLanguages] = useState([] as any);
  const [currencies, setCurrencies] = useState([] as CurrencyResponse[]);

  const [pages, setPages] = useState([]);

  // mobile menu
  const handleMobileMenu = useStore((state) => state.setMobileMenuOpen);


  useEffect(() => {

    const getCurrency = async () => {
      const res = await GetAllCurrency();
      const pageData = await GetAllPage();
      setPages(pageData.data);
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

  const currencyList = currencies.map((item: CurrencyResponse) => {
    return {
      ...item,
      id: item.id,
      name: item.code,
    };
  });

  useEffect(() => {
    const defaultCurrency = currencies.find((item) => item.default == 1);
    if (defaultCurrency) {
      storeCurrency(defaultCurrency, "api");
    }
  }, [currencies]);

  // currency & lang code end

  // if (!settings || currencyList.length == 0 || langList.length == 0) {
  //   return null;
  // }



  return (
    <>
      <header
        className={`ch-header-area `}
        // className={`ch-header-area ${settings?.theme == "theme1" && pathname?.pathname == "/" && "home2"
        //   } ${pathname?.pathname === "/" && "home"}`}
      >
        <div className="header-topbar">
          <div className="container ">
            <div className="topbar-wrapper">
              <span className="header-contact">
                Contact & Support : {settings?.phone}
              </span>
              <div className="currency-lang-wrapper">
                {currencyList && (
                  <NiceSelect
                    options={currencyList}
                    onChange={(e) => handleCurrencyChange(e)}
                    defaultValue={defaultCurr && defaultCurr.id}
                    wrapperClass="header-currency-wrapper"
                  />
                )}

                <svg
                  className="divider"
                  width="1"
                  height="21"
                  viewBox="0 0 1 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="0.5" y1="0.5" x2="0.5" y2="20.5" stroke="#9ADDBE" />
                </svg>

                {langList && (
                  <NiceSelect
                    options={langList}
                    onChange={(e) => handleLanguageChange(e)}
                    defaultValue={defLang && defLang.id}
                    wrapperClass="header-currency-wrapper header-country-wrapper"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="container relative">
          <div className="row align-items-center">
            <div className="col-4 col-lg-2 col-xxl-2">
              <Link to="/" className="ch-header-logo-wrapper">
                <img
                  width={190}
                  height={60}
                  src={settings?.header_logo}
                  alt="logo"
                  className="logo"
                />
              </Link>
            </div>
            <div className="col-lg-7 col-xxl-8 d-none d-lg-block">
              <nav>
                <ul className="ch-menu">


                <li>
                    <Link to="/">{translate("Home")}</Link>
                  </li>
                  
                  <li className="has-submenu">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {translate("About")}
                      <svg
                        className="angle-down"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M18.9481 8.70986C18.8551 8.61613 18.7445 8.54174 18.6227 8.49097C18.5008 8.4402 18.3701 8.41406 18.2381 8.41406C18.1061 8.41406 17.9754 8.4402 17.8535 8.49097C17.7317 8.54174 17.6211 8.61613 17.5281 8.70986L12.9481 13.2899C12.8551 13.3836 12.7445 13.458 12.6227 13.5088C12.5008 13.5595 12.3701 13.5857 12.2381 13.5857C12.1061 13.5857 11.9754 13.5595 11.8535 13.5088C11.7317 13.458 11.6211 13.3836 11.5281 13.2899L6.9481 8.70986C6.85513 8.61613 6.74453 8.54174 6.62267 8.49097C6.50081 8.4402 6.37011 8.41406 6.2381 8.41406C6.10609 8.41406 5.97538 8.4402 5.85352 8.49097C5.73166 8.54174 5.62106 8.61613 5.5281 8.70986C5.34185 8.89722 5.2373 9.15067 5.2373 9.41486C5.2373 9.67905 5.34185 9.9325 5.5281 10.1199L10.1181 14.7099C10.6806 15.2717 11.4431 15.5872 12.2381 15.5872C13.0331 15.5872 13.7956 15.2717 14.3581 14.7099L18.9481 10.1199C19.1343 9.9325 19.2389 9.67905 19.2389 9.41486C19.2389 9.15067 19.1343 8.89722 18.9481 8.70986Z"
                          fill="#091E42"
                        />
                      </svg>
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link to="/about">{translate("About Us")}</Link>
                      </li>

                      <li>
                        <Link to="/volunteers">
                          {translate("Volunteers")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/testimonial">
                          {translate("Testimonials")}
                        </Link>
                      </li>
                      <li>
                        <Link to="/donor-list">
                          {translate("Donor List")}
                        </Link>
                      </li>
                    </ul>
                  </li>



                  <li>
                    <Link to="/campaigns">{translate("Campaigns")}</Link>
                  </li>

                  <li className="has-submenu">
                    <a href="#" onClick={(e) => e.preventDefault()}>
                      {translate("pages")}
                      <svg
                        className="angle-down"
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M18.9481 8.70986C18.8551 8.61613 18.7445 8.54174 18.6227 8.49097C18.5008 8.4402 18.3701 8.41406 18.2381 8.41406C18.1061 8.41406 17.9754 8.4402 17.8535 8.49097C17.7317 8.54174 17.6211 8.61613 17.5281 8.70986L12.9481 13.2899C12.8551 13.3836 12.7445 13.458 12.6227 13.5088C12.5008 13.5595 12.3701 13.5857 12.2381 13.5857C12.1061 13.5857 11.9754 13.5595 11.8535 13.5088C11.7317 13.458 11.6211 13.3836 11.5281 13.2899L6.9481 8.70986C6.85513 8.61613 6.74453 8.54174 6.62267 8.49097C6.50081 8.4402 6.37011 8.41406 6.2381 8.41406C6.10609 8.41406 5.97538 8.4402 5.85352 8.49097C5.73166 8.54174 5.62106 8.61613 5.5281 8.70986C5.34185 8.89722 5.2373 9.15067 5.2373 9.41486C5.2373 9.67905 5.34185 9.9325 5.5281 10.1199L10.1181 14.7099C10.6806 15.2717 11.4431 15.5872 12.2381 15.5872C13.0331 15.5872 13.7956 15.2717 14.3581 14.7099L18.9481 10.1199C19.1343 9.9325 19.2389 9.67905 19.2389 9.41486C19.2389 9.15067 19.1343 8.89722 18.9481 8.70986Z"
                          fill="#091E42"
                        />
                      </svg>
                    </a>
                    <ul className="submenu">
                      <li>
                        <Link to="/blog">{translate("Blog")}</Link>
                      </li>
                      <li>
                        <Link to="/events">{translate("Events")}</Link>
                      </li>
                      <li>
                        <Link to="/gallery">{translate("Gallery")}</Link>
                      </li>
                      <li>
                        <Link to="/faq">{translate("Faq")}</Link>
                      </li>
                      {pages?.length != 0 && (
                        <li className="has-submenu">
                          <a href="#" onClick={(e) => e.preventDefault()}>
                            {translate("other")}
                          </a>

                          <ul className="submenu">
                            {pages?.map((page: Page) => {
                              return (
                                <li key={page.id}>
                                  <Link to={`/page/${page.slug}`}>
                                    {page.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      )}
                    </ul>
                  </li>

                  <li>
                    <Link to="/contact">{translate("Contact")}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-8 col-lg-3 col-xxl-2 d-flex align-items-center justify-content-end">
              {token && <ProfileButton />}
              {!token && (
                <Link
                  to={`/login`}
                  className="ch-btn ch-primary-btn d-none d-md-block"
                >
                  {translate("Login")}
                </Link>
              )}

              <button
                onClick={() => handleMobileMenu(true)}
                className="ms-2 ms-md-4 d-lg-none mobile-menu-toggle"
              >
                <svg
                  fill="#02A95C"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5 9 L 5 11 L 45 11 L 45 9 L 5 9 z M 5 24 L 5 26 L 45 26 L 45 24 L 5 24 z M 5 39 L 5 41 L 45 41 L 45 39 L 5 39 z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        otherProps={{ data: pages || [] }}
        mobileCurrencyList={currencyList}
        mobileDefaultCurr={defaultCurr}
        mobileHandleCurrencyChange={handleCurrencyChange}
        mobileLangList={langList}
        mobileHandleLangChange={handleLanguageChange}
        mobileDefaultLang={defLang?.id}
      />
    </>
  );
}
