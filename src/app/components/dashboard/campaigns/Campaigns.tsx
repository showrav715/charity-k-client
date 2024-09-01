

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICampaignTable, ICampaign } from "../../../interfaces/interfaces";
import Pagination from "../../pagination/Pagination";
import Search from "../search/Search";
import { RemoveCampaign } from "../../../../@actions/user";
import { success, translate, ShowCurrencyPrice } from "../../../../helper/helper";

import { useStore } from "../../../../store/index";

import IconButton from "../../../components/buttons/IconButton"
import { CardsSkeleton } from "@/app/ui/skeletons";

const Campaigns: React.FC<ICampaignTable> = ({ table_data, title }) => {
  const router = useNavigate();
  const token = useStore((state) => state.token);


  if (table_data == undefined) {
    return <CardsSkeleton />;
  }


  const handleDelete = async (id: number) => {
    const res = await RemoveCampaign(id, token);
    if (res.success == true) {
      success(res.message);
      router(-1);
    }
  };


  const thStyles =
    "text-[18px] text-center capitalize leading-[120%] border  py-[19px] text-auc-primary-color";

  return (
    <>
      {/* Search and Title Start */}
      <div className="auc-primary-heading-container">
        <h2>{translate(title)}</h2>
        <div className="w-full min-768:w-[250px] min-1440:w-[333px] ">
          {/* Search */}
          <Search placeholder="Enter Campaign Name" value="search" />
        </div>
      </div>
      {/* Search and Title End */}
      <div className=" max-1440:overflow-auto   px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-auc-primary-color-300">
              <th className={`${thStyles}  min-992:hidden`}>
                {translate("Campaign details")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Campaign Name")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>{translate("Goal")}</th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Funded")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Closed Type")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Status")}
              </th>
              <th className={`${thStyles}`}>{translate("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {table_data?.data?.length > 0 ? (
              table_data?.data.map(
                (
                  {
                    id,
                    slug,
                    title,
                    goal,
                    raised,
                    status,
                    close_type,
                    end_date,
                  }: ICampaign,
                  index: number
                ) => {
                  const tdStyle =
                    "text-[16px] capitalize leading-[120%] border px-[16px] min-1440:px-[24px] py-[19px] text-auc-text-color text-center";

                  return (
                    <tr key={index}>
                      {/* for tablet device start */}
                      <td className={`${tdStyle} min-992:hidden`}>
                        <div>
                          <ul className="text-left leading-8">
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Campaign Name")}
                              </span>
                              :
                              <Link
                                className="inline-block ms-2 text-auc-text-color hover:text-auc-primary-color"
                                to={`/campaigns/${slug}`}
                              >
                                {title.slice(0, 30) +
                                  (title.length > 30 ? "..." : "")}
                              </Link>
                            </li>
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Goal")}
                              </span>
                              :
                              <span className="inline-block ms-2">
                                <ShowCurrencyPrice price={goal} />
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Funded")}
                              </span>
                              :
                              <span className="inline-block ms-2">
                                <ShowCurrencyPrice price={raised} />
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Closed Type")}
                              </span>
                              :
                              <span className="inline-block ms-2">
                                {close_type == "goal" && "Goal Achieved"}
                                {close_type == "end_date" && (
                                  <>
                                    {translate("End Date")}:
                                    <br />
                                    {new Date(end_date).toLocaleDateString()}
                                  </>
                                )}
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Status")}
                              </span>
                              :
                              <span
                                className={`inline-block ms-2 px-[10px] py-[0px] rounded-[4px] text-[14px] 
                                            ${status == 0 && "bg-auc-secondary-color-700"}
                                            ${status == 1 &&
                                  "bg-auc-primary-color text-auc-white-color"
                                  }
                                            ${status == 2 &&
                                  "bg-auc-dark-color-2 text-auc-white-color"
                                  }
                                          `}
                              >
                                {status == 0 && translate("Pending")}
                                {status == 1 && translate("Running")}
                                {status == 2 && translate("Closed")}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                      {/* for tablet device end */}
                      <td
                        className={`${tdStyle} w-[199px] !text-left hidden min-992:table-cell`}
                      >
                        <Link
                          className="text-auc-text-color hover:text-auc-primary-color"
                          to={`/campaigns/${slug}`}
                        >
                          {title.slice(0, 30) +
                            (title.length > 30 ? "..." : "")}
                        </Link>
                      </td>

                      <td
                        className={`${tdStyle}    hidden min-992:table-cell`}
                      >
                        <ShowCurrencyPrice price={goal} />
                      </td>
                      <td className={`${tdStyle}   hidden min-992:table-cell`}>
                        <ShowCurrencyPrice price={raised} />
                      </td>
                      <td
                        className={`${tdStyle}  hidden min-992:table-cell`}
                      >
                        <p>
                          {close_type == "goal" && "Goal Achieved"}
                          {close_type == "end_date" && (
                            <>
                              {translate("End Date")}:
                              <br />
                              {new Date(end_date).toLocaleDateString()}
                            </>
                          )}
                        </p>
                      </td>
                      <td
                        className={`${tdStyle}   hidden min-992:table-cell`}
                      >
                        <p
                          className={`w-[100px] h-[40px] flex items-center justify-center  rounded-[4px] mx-auto  text-[16px] 
                        ${status == 0 && "bg-auc-secondary-color-700"}
                        ${status == 1 &&
                            "bg-auc-primary-color text-auc-white-color"
                            }
                        ${status == 2 &&
                            "bg-auc-dark-color-2 text-auc-white-color"
                            }
                      `}
                        >
                          {status == 0 && translate("Pending")}
                          {status == 1 && translate("Running")}
                          {status == 2 && translate("Closed")}
                        </p>
                      </td>

                      <td className={`${tdStyle} `}>
                        <div className="flex items-center justify-center gap-[12px]">
                          <Link to={`/dashboard/campaigns/edit/${id}`}>
                            <IconButton
                              styles={"auc-icon-btn-blue"}
                              svg={
                                <svg
                                  className="mx-auto"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_1798_798)">
                                    <path
                                      d="M18.9999 12.0462C18.447 12.0462 18 12.4943 18 13.0461V21.0462C18 21.5972 17.5519 22.0461 17.0001 22.0461H3C2.44794 22.0461 2.00006 21.5972 2.00006 21.0462V7.04614C2.00006 6.49518 2.44794 6.0462 3 6.0462H11.0001C11.553 6.0462 12 5.59814 12 5.04626C12 4.4942 11.553 4.04614 11.0001 4.04614H3C1.34601 4.04614 0 5.39215 0 7.04614V21.0462C0 22.7002 1.34601 24.0462 3 24.0462H17.0001C18.6541 24.0462 20.0001 22.7002 20.0001 21.0462V13.0461C20.0001 12.4932 19.5529 12.0462 18.9999 12.0462Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M9.37613 11.1351C9.30618 11.2051 9.25912 11.2941 9.23916 11.39L8.53219 14.9261C8.49924 15.09 8.55124 15.259 8.66916 15.3781C8.76419 15.4731 8.89218 15.524 9.02328 15.524C9.05514 15.524 9.08829 15.5211 9.12124 15.5141L12.6563 14.8071C12.7542 14.787 12.8432 14.7401 12.9123 14.67L20.8242 6.758L17.2892 3.22314L9.37613 11.1351Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M23.2676 0.778152C22.2927 -0.196884 20.7067 -0.196884 19.7325 0.778152L18.3486 2.16206L21.8837 5.6971L23.2676 4.313C23.7396 3.84206 23.9996 3.214 23.9996 2.54604C23.9996 1.87807 23.7396 1.25002 23.2676 0.778152Z"
                                      fill="white"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1798_798">
                                      <rect
                                        width="24"
                                        height="24"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              }
                            />
                          </Link>
                          <IconButton
                            clickHandler={() => handleDelete(Number(id))}
                            styles={"bg-auc-light-red-color"}
                            svg={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <g clipPath="url(#clip0_3085_1266)">
                                  <path
                                    d="M22.8 3.6001H1.2C0.88174 3.6001 0.576515 3.72653 0.351472 3.95157C0.126428 4.17661 0 4.48184 0 4.8001C0 5.11836 0.126428 5.42358 0.351472 5.64863C0.576515 5.87367 0.88174 6.0001 1.2 6.0001H3.6V20.4001C3.60029 21.3548 3.97966 22.2703 4.65473 22.9454C5.3298 23.6204 6.24531 23.9998 7.2 24.0001H16.8C17.7547 23.9998 18.6702 23.6205 19.3453 22.9454C20.0204 22.2703 20.3997 21.3548 20.4 20.4001V6.0001H22.8C23.1183 6.0001 23.4235 5.87367 23.6485 5.64863C23.8736 5.42358 24 5.11836 24 4.8001C24 4.48184 23.8736 4.17661 23.6485 3.95157C23.4235 3.72653 23.1183 3.6001 22.8 3.6001ZM10.8 16.8001C10.8 17.1184 10.6736 17.4236 10.4485 17.6486C10.2235 17.8737 9.91826 18.0001 9.6 18.0001C9.28174 18.0001 8.97652 17.8737 8.75147 17.6486C8.52643 17.4236 8.4 17.1184 8.4 16.8001V10.8001C8.4 10.4818 8.52643 10.1766 8.75147 9.95157C8.97652 9.72653 9.28174 9.6001 9.6 9.6001C9.91826 9.6001 10.2235 9.72653 10.4485 9.95157C10.6736 10.1766 10.8 10.4818 10.8 10.8001V16.8001ZM15.6 16.8001C15.6 17.1184 15.4736 17.4236 15.2485 17.6486C15.0235 17.8737 14.7183 18.0001 14.4 18.0001C14.0817 18.0001 13.7765 17.8737 13.5515 17.6486C13.3264 17.4236 13.2 17.1184 13.2 16.8001V10.8001C13.2 10.4818 13.3264 10.1766 13.5515 9.95157C13.7765 9.72653 14.0817 9.6001 14.4 9.6001C14.7183 9.6001 15.0235 9.72653 15.2485 9.95157C15.4736 10.1766 15.6 10.4818 15.6 10.8001V16.8001Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M9.6 2.4H14.4C14.7183 2.4 15.0235 2.27357 15.2485 2.04853C15.4736 1.82348 15.6 1.51826 15.6 1.2C15.6 0.88174 15.4736 0.576515 15.2485 0.351472C15.0235 0.126428 14.7183 0 14.4 0H9.6C9.28174 0 8.97652 0.126428 8.75147 0.351472C8.52643 0.576515 8.4 0.88174 8.4 1.2C8.4 1.51826 8.52643 1.82348 8.75147 2.04853C8.97652 2.27357 9.28174 2.4 9.6 2.4Z"
                                    fill="white"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3085_1266">
                                    <rect width="24" height="24" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr className="border" key={"no-data-found"}>
                <td className="text-center py-4" colSpan={6}>
                  {translate("No data found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Start  */}
      {table_data?.data?.length > 0 && (
        <Pagination
          last_page={table_data.last_page}
          per_page={table_data.per_page}
          total={table_data.total}
          links={table_data.links}
        />
      )}
      {/* Pagination End  */}


    </>
  );
};

export default Campaigns;
