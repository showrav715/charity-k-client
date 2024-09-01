
// import "@/public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/bootstrap.min.css";

import React from "react";
import MenuList from "../mobile_menu/List";
import { Link } from "react-router-dom";
import { Settings, translate } from "../../../helper/helper";
import NiceSelect from "../NiceSelect/NiceSelect";
import { PageResponse } from "../../../@types/frontend";
// import { useStore } from "../../../store/index";
import {useStore} from "../../../store/index";


interface MobileMenuProps {
  isDashboard?: boolean;
  mobileCurrencyList?: any;
  mobileDefaultCurr?: any;
  mobileHandleCurrencyChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  mobileLangList?: any;
  mobileDefaultLang?: any;
  mobileHandleLangChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  otherProps?: PageResponse;
}

export default function MobileMenu({
  isDashboard = false,
  mobileCurrencyList,
  mobileDefaultCurr,
  mobileHandleCurrencyChange,
  mobileLangList,
  mobileDefaultLang,
  mobileHandleLangChange,
  otherProps,
}: MobileMenuProps) {

  const token = useStore((state) => state.token);
  const Token = token;
  // mobile menu
  const handleMobileMenu = useStore((state) => state.setMobileMenuOpen);
  const isMobileMenuOpen = useStore((state) => state.isMobileMenuOpen);
  // other pages
  const otherPages = otherProps?.data?.map((page) => {
    return {
      pageToLink: `/page/${page.slug}`,
      pageLable: page.title,
    };
  });




  return (
    <>
      <div
        className={`mobile-menu pp-mobile-menu-wrapper ${isMobileMenuOpen && "active"
          } ${isDashboard && "dashboard-active"}`}
      >
        {!isDashboard && (
          <div className="menu-header">
            <Link
              to="/"
              className="logo"
              onClick={() => handleMobileMenu(false)}
            >
              <img
                width={200}
                height={60}
                src={Settings("header_logo")}
                alt="logo"
                className="img-fluid"
              />
            </Link>
            <button onClick={() => handleMobileMenu(false)} className="close">
              <svg
                fill="#3271A6"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 50 50"
              >
                <path d="M 40.783203 7.2714844 A 2.0002 2.0002 0 0 0 39.386719 7.8867188 L 25.050781 22.222656 L 10.714844 7.8867188 A 2.0002 2.0002 0 0 0 9.2792969 7.2792969 A 2.0002 2.0002 0 0 0 7.8867188 10.714844 L 22.222656 25.050781 L 7.8867188 39.386719 A 2.0002 2.0002 0 1 0 10.714844 42.214844 L 25.050781 27.878906 L 39.386719 42.214844 A 2.0002 2.0002 0 1 0 42.214844 39.386719 L 27.878906 25.050781 L 42.214844 10.714844 A 2.0002 2.0002 0 0 0 40.783203 7.2714844 z"></path>
              </svg>
            </button>
          </div>
        )}
        <ul className="mobile-nav-menu">
          <MenuList hasSubmenu={false} pageLable={translate("Home")} pageToLink="/" />
          <MenuList
            hasSubmenu={true}
            submenu_id="about_link"
            pageLable={translate("About")}
            pageToLink="#"
            submenus={[
              { pageToLink: "/about", pageLable: translate("About Us") },
              { pageToLink: "/volunteers", pageLable: translate("Volunteers") },
              { pageToLink: "/testimonial", pageLable: translate("Testimonial") },
              { pageToLink: "/donor-list", pageLable: translate("Donor List") },
            ]}
          />
          <MenuList
            hasSubmenu={false}
            pageLable={translate("Campaigns")}
            pageToLink="/campaigns"
          />
          <MenuList
            hasSubmenu={true}
            submenu_id="pages_link"
            pageLable={translate("Pages")}
            pageToLink="#"
            submenus={[
              { pageToLink: "/blog", pageLable: translate("Blog") },
              { pageToLink: "/events", pageLable: translate("Events") },
              { pageToLink: "/gallery", pageLable: translate("Gallery") },
              { pageToLink: "/faq", pageLable: translate("FAQ") },
            ]}
          />

          <MenuList
            hasSubmenu={true}
            submenu_id="other_pages"
            pageLable={translate("Other")}
            pageToLink="#"
            submenus={otherPages}
          />

          <MenuList
            hasSubmenu={false}
            pageLable={translate("Contact")}
            pageToLink="/contact"
          />
        </ul>

        <div className="mt-4">
          {/* currency */}
          {mobileCurrencyList && (
            <NiceSelect
              options={mobileCurrencyList}
              onChange={mobileHandleCurrencyChange}
              defaultValue={mobileDefaultCurr && mobileDefaultCurr.id}
              wrapperClass="mobile-nice-select header-currency-wrapper w-100 mb-4 d-sm-none"
            />
          )}

          {/* languages */}
          {mobileLangList && (
            <NiceSelect
              options={mobileLangList}
              onChange={(e) => mobileHandleLangChange(e)}
              defaultValue={mobileDefaultLang}
              wrapperClass="mobile-nice-select header-currency-wrapper w-100 mb-4 d-sm-none"
            />
          )}

          {!Token && (
            <>
              <Link
                className="ch-btn ch-primary-btn w-100 rounded mb-4"
                to={`/login`}
                onClick={() => handleMobileMenu(false)}
              >
                {translate("Login")}
              </Link>

              <Link
                className="ch-btn ch-primary-btn w-100 rounded mb-4"
                to={`/register`}
                onClick={() => handleMobileMenu(false)}
              >
                {translate("Register")}
              </Link>
            </>
          )}



          {Token && (
            <Link
              className="ch-btn ch-primary-btn w-100 rounded mb-4"
              to={`/dashboard`}
              onClick={() => handleMobileMenu(false)}
            >
              {translate("Dashboard")}
            </Link>
          )}
        </div>
      </div>

      {!isDashboard && (
        <div
          className={`mobile-overlay ${isMobileMenuOpen && "active"}`}
          onClick={() => handleMobileMenu(false)}
        >
          <span className="d-none">{translate("overlay")}</span>
        </div>
      )}
    </>
  );
}
