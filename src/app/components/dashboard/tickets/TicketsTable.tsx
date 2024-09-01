


import React from "react";
import IconButton from "../../buttons/IconButton";
import { ITicketsTable } from "../../../interfaces/interfaces";
import { translate } from "@/helper/helper";

const TicketsTable: React.FC<ITicketsTable> = ({ table_data }) => {
  const tdStyle =
    "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";
  const thStyles =
    "text-[18px] text-center capitalize leading-[120%] border px-[24px] py-[19px] text-auc-primary-color";

  return (
    <>
      <div className="max-1440:overflow-auto   px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="bg-auc-primary-color-300">
              <th className={`${thStyles} min-992:hidden`}>
                {translate("Details")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Ticket No.")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Subject")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Status")}
              </th>
              <th className={`${thStyles} hidden min-992:table-cell`}>
                {translate("Last Reply Time")}
              </th>
              <th className={`${thStyles} w-[60px]`}>{translate("View")}</th>
            </tr>
          </thead>
          <tbody>
            {table_data?.length > 0 ? (
              table_data.map(
                ({ ticket_num, subject, status, last_message, id }) => {
                  return (
                    <tr key={id}>
                      {/* for tablet device start */}
                      <td className={`${tdStyle} min-992:hidden`}>
                        <div>
                          <ul className="text-left leading-8">
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Ticket No.")}
                              </span>
                              :
                              <span className="inline-block ms-2">
                                {ticket_num}
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Subject")}
                              </span>
                              :
                              <span className="inline-block ms-2">
                                {subject.slice(0, 25) + "..."}
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
                        ${
                          status == 1 &&
                          "bg-auc-primary-color text-auc-white-color"
                        }
                        
                        ${
                          status == 2 &&
                          "bg-auc-dark-color-2 text-auc-white-color"
                        }
                      `}
                              >
                                {status == 0 && translate("Pending")}
                                {status == 1 && translate("Active")}
                                {status == 2 && translate("Closed")}
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold capitalize">
                                {translate("Last Reply Time")}
                              </span>
                              :
                              <span className="inline-block ms-2">
                                {" "}
                                {last_message && last_message.api_date}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </td>
                      {/* for tablet device end */}

                      <td
                        className={`${tdStyle} w-[120px] hidden min-992:table-cell`}
                      >
                        {ticket_num}
                      </td>
                      <td
                        className={`${tdStyle} w-[202px] !text-left hidden min-992:table-cell`}
                      >
                        {subject.slice(0, 25) + "..."}
                      </td>

                      <td
                        className={`${tdStyle} !px-0 w-[132px] hidden min-992:table-cell `}
                      >
                        <p
                          className={`w-[100px] h-[40px] flex items-center justify-center  rounded-[4px] mx-auto  text-[16px] 
                        ${status == 0 && "bg-auc-secondary-color-700"}
                        ${
                          status == 1 &&
                          "bg-auc-primary-color text-auc-white-color"
                        }
                        
                        ${
                          status == 2 &&
                          "bg-auc-dark-color-2 text-auc-white-color"
                        }
                      `}
                        >
                          {status == 0 && translate("Pending")}
                          {status == 1 && translate("Active")}
                          {status == 2 && translate("Closed")}
                        </p>
                      </td>
                      <td
                        className={`${tdStyle} w-[202px] !text-left hidden min-992:table-cell`}
                      >
                        {last_message && last_message.api_date}
                      </td>
                      <td className={`${tdStyle} `}>
                        {/* View button  */}
                        <IconButton
                          styles={"auc-icon-btn-primary mx-auto"}
                          isLink={true}
                          href={`/dashboard/tickets/${ticket_num}`}
                          svg={
                            <svg
                              className="mx-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <g clipPath="url(#clip0_1595_1756)">
                                <path
                                  d="M12 4.84692C7.41454 4.84692 3.25621 7.35567 0.187788 11.4305C-0.0625959 11.7644 -0.0625959 12.2308 0.187788 12.5646C3.25621 16.6444 7.41454 19.1532 12 19.1532C16.5855 19.1532 20.7438 16.6444 23.8122 12.5695C24.0626 12.2357 24.0626 11.7693 23.8122 11.4354C20.7438 7.35567 16.5855 4.84692 12 4.84692ZM12.3289 17.0372C9.28506 17.2286 6.7714 14.7199 6.96287 11.6711C7.11998 9.15745 9.15741 7.12001 11.6711 6.96291C14.7149 6.77144 17.2286 9.28019 17.0371 12.329C16.8751 14.8377 14.8377 16.8752 12.3289 17.0372ZM12.1767 14.7101C10.537 14.8132 9.18196 13.4631 9.28997 11.8233C9.37343 10.4683 10.4732 9.37347 11.8282 9.2851C13.4679 9.182 14.823 10.5321 14.7149 12.1719C14.6266 13.5318 13.5268 14.6266 12.1767 14.7101Z"
                                  fill="white"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1595_1756">
                                  <rect width="24" height="24" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          }
                        />
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
    </>
  );
};

export default TicketsTable;
