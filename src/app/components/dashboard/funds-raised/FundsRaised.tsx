

import React from "react";
import IconButton from "../../buttons/IconButton";
import { ILogsTable } from "../../../interfaces/interfaces";
import DonationDetailsCard from "../../cards/DonationDetailsCard";
import Search from "../search/Search";
import { translate,ShowCurrencyPrice, formatDate } from "@/helper/helper";
import { CardsSkeleton } from "@/app/ui/skeletons";


const thStyle =
  "text-[18px] text-center capitalize leading-[120%] border px-3 py-[19px] text-auc-primary-color";

const MyDonation: React.FC<ILogsTable> = ({ title, table_data }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState<any>({});
  const handleOpenModal = (campaign: any) => {
    setModalData(campaign);
    setOpenModal(!openModal);
  };

  if (table_data == undefined) {
    return <CardsSkeleton />;
  }


  return (
    <>
      {/* Search and Title Start */}
      <div className="auc-primary-heading-container">
        <h2 className="">{translate(title)}</h2>
        <div className="w-full min-768:w-[250px] min-1440:w-[333px] ">
          {/* Search */}
          <Search placeholder="Enter Txn ID" value="txn_id" />
        </div>
      </div>
      {/* Search and Title End */}

      {/* Table Start  */}
      <div className="overflow-auto  px-0">
        <table className="text-left table-auto min-w-max w-full">
          <thead>
            <tr className="bg-auc-primary-color-300">
              <th className={`${thStyle} hidden min-992:table-cell`}>
                {translate("ID")}
              </th>
              <th className={`${thStyle}  min-992:hidden`}>
                {translate("Details")}
              </th>
              <th className={`${thStyle} hidden min-992:table-cell`}>
                {translate("Donar Name")}
              </th>
              <th className={`${thStyle} w-[220px] hidden min-992:table-cell`}>
                {translate("Campaign Name")}
              </th>
              <th className={`${thStyle} hidden min-992:table-cell`}>
                {translate("Amount")}
              </th>
              <th className={`${thStyle} hidden min-992:table-cell`}>
                {translate("Date")}
              </th>
              <th className={`${thStyle}`}>{translate("Action")}</th>
            </tr>
          </thead>
          <tbody>
            {table_data?.data?.length > 0 ? (
              table_data?.data?.map((item: any) => {
                const tdStyle =
                  "text-[16px] capitalize leading-[120%] border px-[16px] py-[19px] text-auc-text-color text-center";
                return (
                  <tr key={item.id}>
                    <td
                      className={`${tdStyle} !mx-[0px] hidden min-992:table-cell`}
                    >
                      {item.id}
                    </td>

                    {/* for tablet device only start */}
                    <td
                      className={`${tdStyle} !mx-[0px]  min-992:hidden max-w-[250px]`}
                    >
                      <div>
                        <ul className="text-left  leading-8">
                          <li>
                            <span className="font-semibold capitalize">
                              {" "}
                              {translate("ID")}
                            </span>
                            :
                            <span className={`inline-block ms-2`}>
                              {" "}
                              {item.id}
                            </span>
                          </li>
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Donar Name")}
                            </span>
                            :
                            <span className={`inline-block ms-2`}>
                              {" "}
                              {item?.user?.name || "Anonymous"}
                            </span>
                          </li>
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Campaign Name")}
                            </span>
                            :
                            <span className={`inline-block ms-2 `}>
                              {" "}
                              {item.campaign.title}
                            </span>
                          </li>
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Amount")}
                            </span>
                            :
                            <span className={`inline-block ms-2`}>
                              <ShowCurrencyPrice price={item.total} />
                            </span>
                          </li>
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Date")}
                            </span>
                            :
                            <span className={`inline-block ms-2`}>
                              {" "}
               
                                {formatDate(item.created_at)}
                             
                            </span>
                          </li>
                        </ul>
                      </div>
                    </td>
                    {/* for tablet device only end */}

                    <td
                      className={`${tdStyle}  !text-left hidden min-992:table-cell`}
                    >
                      {item?.user?.name || "Anonymous"}
                    </td>
                    <td
                      className={`${tdStyle}  !text-left hidden min-992:table-cell`}
                    >
                      {item.campaign.title}
                    </td>

                    <td className={`${tdStyle} hidden min-992:table-cell`}>
                      <ShowCurrencyPrice price={item.total} />
                    </td>
                    <td className={`${tdStyle}  hidden min-992:table-cell`}>
                    {formatDate(item.created_at)}
                    </td>
                    <td className={`${tdStyle}`}>
                      {/* View button  */}
                      <IconButton
                        styles={"auc-icon-btn-primary mx-auto"}
                        clickHandler={() => handleOpenModal(item)}
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
              })
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
      {/* Table End  */}
      <DonationDetailsCard
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        data={modalData}
      />
    </>
  );
};

export default MyDonation;
