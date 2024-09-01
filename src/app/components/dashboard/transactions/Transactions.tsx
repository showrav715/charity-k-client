
import Search from "../search/Search";
import { translate,ShowCurrencyPrice, formatDate } from "./../../../../helper/helper";
import { CardsSkeleton } from "@/app/ui/skeletons";

const Transactions: React.FC<any> = ({
  transactions,
  title,
  isDashboard = true,
}) => {

  const thDataStyle =
    "text-[18px] text-center capitalize leading-[120%] border  py-[19px] text-auc-primary-color";
  const tdStyle =
    "text-[16px] capitalize leading-[150%] border px-[24px] py-[19px] text-auc-text-color text-center";

    if (transactions == undefined) {
      return <CardsSkeleton />;
    }


  return (
    <>
      {isDashboard && (
        <div className="auc-primary-heading-container">
          <h2 className="">{title}</h2>
          <div className="w-full min-768:w-[250px] min-1440:w-[333px] ">
            <Search placeholder="Enter Txn ID" value="txn_id" />
          </div>
        </div>
      )}

      <div className="max-1440:overflow-auto   px-0">
        <table
          suppressHydrationWarning
          data-wow-delay="0.2s"
          className="w-full wow fadeInUp min-w-max table-auto text-left"
        >
          <thead>
            <tr className=" bg-auc-primary-color-300">
              <th className={`${thDataStyle}`}>{translate("ID")}</th>
              <th className={`${thDataStyle} min-992:hidden`}>
                {" "}
                {translate("details")}
              </th>
              <th className={`${thDataStyle} hidden min-992:table-cell`}>
                {translate("Transaction ID")}
              </th>
              <th className={`${thDataStyle} hidden min-992:table-cell`}>
                {translate("Amount")}
              </th>

              <th className={`${thDataStyle} hidden min-992:table-cell`}>
                {translate("Date")}
              </th>
              <th className={`${thDataStyle} hidden min-992:table-cell`}>
                {translate("Remark")}
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 ? (
              transactions?.map((item: any) => {
                const isPositiveAmount = item.type === "+" ? true : false;
                return (
                  <tr key={item.id} className="">
                    <td className={`${tdStyle} w-[75px] !px-[0px]`}>
                      {item.id}
                    </td>
                    {/* for tablet device start */}
                    <td
                      className={`${tdStyle} text-left min-992:hidden max-w-[250px]`}
                    >
                      <div>
                        <ul className="text-left  leading-8">
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Transaction ID")}
                            </span>
                            :
                            <span className="inline-block ms-2">
                              {item.txn_id}
                            </span>
                          </li>
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Amount")}
                            </span>
                            :
                            <span
                              className={` ${
                                isPositiveAmount
                                  ? "!text-auc-primary-color"
                                  : "!text-[red]"
                              }`}
                            >
                              {" "}
                              <ShowCurrencyPrice price={item.amount} />
                            </span>
                          </li>

                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Date")}
                            </span>
                            :{" "}
                            <span className="inline-block ms-2">
                            {formatDate(item.created_at)}
                            </span>
                          </li>
                          <li>
                            <span className="font-semibold capitalize">
                              {translate("Remark")}
                            </span>
                            :
                            <span className="inline-block ms-2">
                              {" "}
                              {item.remark}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </td>
                    {/* for tablet device end */}
                    <td
                      className={`${tdStyle} w-[188px] hidden min-992:table-cell`}
                    >
                      {item.txn_id}
                    </td>

                    <td
                      className={`${tdStyle} w-[161px] ${
                        isPositiveAmount
                          ? "!text-auc-primary-color"
                          : "!text-[red]"
                      } hidden min-992:table-cell`}
                    >
                      <ShowCurrencyPrice price={item.amount} />
                    </td>

                    <td
                      className={`${tdStyle} w-[133px] hidden min-992:table-cell`}
                    >
                      {formatDate(item.created_at)}
                    </td>
                    <td
                      className={`${tdStyle} w-[114px] hidden min-992:table-cell`}
                    >
                      {item.remark}
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
    </>
  );
};

export default Transactions;
