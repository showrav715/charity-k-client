
import DepositAndWithdrowCard from "../../components/cards/DepositAndWithdrowCard";
import { translate } from "@/helper/helper";

const Withdraw = () => {
  const title = "Withdraw Money";
  return (
    <div>
      <h2 className="auc-primary-heading-with-extra-mb">
        {translate("Withdraw Money")}
      </h2>
      <DepositAndWithdrowCard title={title} />
    </div>
  );
};

export default Withdraw;
