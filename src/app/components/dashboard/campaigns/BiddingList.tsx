
const BiddingList = ({ tableHead, tableData }) => {
    const thDataStyle =
        "text-[18px] text-center capitalize leading-[120%] border px-[24px] py-[19px] text-auc-primary-color";
    const tdStyle =
        "text-[16px] capitalize leading-[120%] border px-[24px] py-[19px] text-auc-text-color text-center";
    return (
        <div className="   max-1440:overflow-auto   px-0">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr className="bg-auc-primary-color-300">
                        {tableHead.map((head) => (
                            <th key={head} className={thDataStyle}>
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData
                        .slice(0, 10)
                        .map(
                            ({ bidder, productName, productPrice, bidPrice, bidTime }, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={`${tdStyle} w-[83px]`}>
                                            {`${index <= 8 ? "0" : ""}${index + 1}`}
                                        </td>
                                        <td className={`${tdStyle} w-[150px] !text-left`}>{bidder}</td>
                                        <td className={`${tdStyle} w-[200px] !text-left`}>{productName}</td>
                                        <td className={tdStyle}>
                                            {productPrice}
                                            <br />
                                            USD
                                        </td>
                                        <td className={tdStyle}>
                                            {bidPrice}
                                            <br />
                                            USD
                                        </td>
                                        <td className={`${tdStyle} w-[145px]`}>{bidTime}</td>
                                    </tr>
                                );
                            }
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default BiddingList