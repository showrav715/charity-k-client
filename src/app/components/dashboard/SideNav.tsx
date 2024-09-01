

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix
} from "@material-tailwind/react";
import { sidebarMenusList } from "./Data";
import { useStore } from "../../../store/index";
import { Logout } from "../../../@actions/auth";
import { translate } from "../../../helper/helper";

const SideNav = ({ isMobile = false }) => {
  const correntRoute = useLocation();
  const [open, setOpen] = React.useState({});

  // mobile menu
  const handleMobileMenu = useStore((state) => state.setMobileMenuOpen);

  const handleOpen = (value, lable) => {
    const levelWithoutSpaces = lable?.split(" ")?.join("");
    setOpen((prevOpen) => ({
      [levelWithoutSpaces]: prevOpen[levelWithoutSpaces] === value ? 0 : value
    }));
  };

  // const router = useRouter();
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const token = useStore((state) => state.token);
  const handleLogout = async () => {
    const response = await Logout(token);
    if (response?.status == true) {
      logout();
      navigate("/login");
      // router.refresh();
    }
  };

  const SidebarDefaultStyles = `max-h-screen overflow-scroll scrollbar-hidden  bg-auc-white-color auc-dashboard-sidebar-shadow w-full   min-1200:block min-1440:w-[23.6%]`;

  const SidebarMobileStyles = `${isMobile
    ? "w-full p-[20px]"
    : "hidden min-1024:w-[30%] px-[20px] min-425:px-[24px] py-[20px] min-425:py-[48px]"
    }`;

  return (
    <div className={`${SidebarDefaultStyles} ${SidebarMobileStyles}`}>
      {/* @ts-ignore */}
      <List
        className="p-0"
        placeholder={undefined}
        // onPointerEnterCapture={() => { }}
        // onPointerLeaveCapture={() => { }}
      >
        {sidebarMenusList.map((menu, index) => {
          // if has nested submenu
          if (menu.has_submenu) {
            const key = menu.lable?.split(" ")?.join("");
            return (
              //@ts-ignore
              <Accordion
                // onPointerEnterCapture={() => { }}
                // onPointerLeaveCapture={() => { }}
                key={index}
                open={open[key] === 1}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={`${correntRoute.pathname.includes(menu.link_to)
                      ? "white"
                      : "#3A4B68"
                      }`}
                    className={`mx-auto transition-transform ${open[key] === 1 ? "rotate-180" : ""
                      }`}
                  >
                    <path d="M18.7101 8.2101C18.6171 8.11638 18.5065 8.04198 18.3846 7.99121C18.2628 7.94044 18.1321 7.91431 18.0001 7.91431C17.868 7.91431 17.7373 7.94044 17.6155 7.99121C17.4936 8.04198 17.383 8.11638 17.2901 8.2101L12.7101 12.7901C12.6171 12.8838 12.5065 12.9582 12.3846 13.009C12.2628 13.0598 12.1321 13.0859 12.0001 13.0859C11.868 13.0859 11.7373 13.0598 11.6155 13.009C11.4936 12.9582 11.383 12.8838 11.2901 12.7901L6.71006 8.2101C6.6171 8.11638 6.5065 8.04198 6.38464 7.99121C6.26278 7.94044 6.13207 7.91431 6.00006 7.91431C5.86805 7.91431 5.73734 7.94044 5.61548 7.99121C5.49362 8.04198 5.38302 8.11638 5.29006 8.2101C5.10381 8.39747 4.99927 8.65092 4.99927 8.9151C4.99927 9.17929 5.10381 9.43274 5.29006 9.6201L9.88006 14.2101C10.4426 14.7719 11.2051 15.0875 12.0001 15.0875C12.7951 15.0875 13.5576 14.7719 14.1201 14.2101L18.7101 9.6201C18.8963 9.43274 19.0009 9.17929 19.0009 8.9151C19.0009 8.65092 18.8963 8.39747 18.7101 8.2101Z" />
                  </svg>
                }
                placeholder={undefined}
              >
                {/* @ts-ignore */}
                <ListItem
                  // onPointerEnterCapture={() => { }}
                  // onPointerLeaveCapture={() => { }}
                  suppressHydrationWarning
                  data-wow-delay={`${index !== 0 && "0.2s"}`}
                  className="px-0 py-0 wow fadeInUp"
                  selected={open[key] === 1}
                  placeholder={undefined}
                >
                  <span
                    className={` w-full rounded-[6px] ${correntRoute.pathname.includes(menu.link_to) &&
                      "bg-auc-primary-color"
                      }`}
                  >
                    {/* @ts-ignore  */}
                    <AccordionHeader
                      // onPointerEnterCapture={() => { }}
                      // onPointerLeaveCapture={() => { }}
                      onClick={() => handleOpen(1, menu.lable)}
                      className="border-b-0 px-[10px] min-992:px-[24px] py-[10px] min-992:py-[18px]"
                      placeholder={undefined}
                    >
                      {/* @ts-ignore  */}
                      <ListItemPrefix
                        // onPointerEnterCapture={() => { }}
                        // onPointerLeaveCapture={() => { }}
                        placeholder={undefined}>
                        <span
                          className={`${correntRoute.pathname.includes(menu.link_to) &&
                            "svgWraperOfActiveRoute"
                            }`}
                        >
                          {menu.icon}
                        </span>
                      </ListItemPrefix>

                      <span
                        className={`text-[18px] mr-auto text-auc-gray-color ${correntRoute.pathname.includes(menu.link_to) &&
                          "!text-white"
                          } leading-[120%] font-regular capitalize`}
                      >
                        {translate(menu.lable)}
                      </span>
                    </AccordionHeader>
                  </span>
                </ListItem>
                <AccordionBody className="py-0">
                {/* @ts-ignore  */}
                  <List
                    // onPointerEnterCapture={() => { }}
                    // onPointerLeaveCapture={() => { }}
                    className="ml-[40px] gap-0 p-0" placeholder={undefined}>
                    {menu.submenu.map((item, index) => (
                      // @ts-ignore 
                      <ListItem
                        key={index}
                        className={` rounded-none p-0 border-l ${correntRoute.pathname === item.link_to
                          ? "!text-auc-primary-color !border-auc-primary-color"
                          : "!text-auc-gray-color !border-auc-gray-color"
                          }`}
                        // onPointerEnterCapture={() => { }}
                        // onPointerLeaveCapture={() => { }}
                        placeholder={undefined}
                      >
                        <Link
                          onClick={() => handleMobileMenu(false)}
                          className={`px-[15px] min-992:px-[32px] py-[8px] min-992:py-[13px] w-full block ${correntRoute.pathname === item.link_to
                            ? "!text-auc-primary-color"
                            : "!text-auc-gray-color"
                            }`}
                          key={index}
                          to={item.link_to}
                        >
                          {item.level}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            );
          } else {
            return (
              // @ts-ignore 
              <ListItem
                key={index}
                suppressHydrationWarning
                data-wow-delay={`${index !== 0 && "0.2s"}`}
                className="block p-0 wow fadeInUp"
                placeholder={undefined}
                // onPointerEnterCapture={() => { }}
                // onPointerLeaveCapture={() => { }}

              >
                {/* logout button */}
                {menu?.void && (
                  <button
                    type="button"
                    className={`flex font-regular items-center gap-[16px] px-[10px]  min-992:px-[24px]  py-[10px] min-992:py-[18px] rounded-[6px] font-semibold ${menu.link_to === correntRoute?.pathname &&
                      "bg-auc-primary-color text-white"
                      }`}
                    onClick={() => handleLogout()}
                  >
                    <span
                      className={`${menu.link_to === correntRoute?.pathname &&
                        "svgWraperOfActiveRoute"
                        }`}
                    >
                      {menu.icon}
                    </span>

                    {translate(menu.lable)}
                  </button>
                )}

                {/* single menu */}
                {!menu?.void && (
                  <Link
                    onClick={() => handleMobileMenu(false)}
                    className={`flex items-center gap-[16px] px-[10px] min-992:px-[24px] py-[10px] min-992:py-[18px]  rounded-[6px] ${menu.link_to === correntRoute?.pathname &&
                      "bg-auc-primary-color text-white"
                      }`}
                    to={menu.link_to}
                  >
                    <span
                      className={`${menu.link_to === correntRoute?.pathname &&
                        "svgWraperOfActiveRoute"
                        }`}
                    >
                      {menu.icon}
                    </span>
                    <span
                      className={`text-[18px]  leading-[120%] font-regular capitalize ${correntRoute?.pathname === menu.link_to
                        ? "!text-white"
                        : "!text-auc-gray-color"
                        }`}
                    >
                      {translate(menu.lable)}
                    </span>
                  </Link>
                )}
              </ListItem>
            );
          }
        })}
      </List>
    </div>
  );
};

export default SideNav;
