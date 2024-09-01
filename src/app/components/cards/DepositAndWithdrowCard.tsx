

import { number, object, string } from "yup";
import { IDepositAndWithdrowCard } from "../../interfaces/interfaces";
import Button from "../buttons/Button";
import { Settings, multipleError, success, translate,ShowCurrencyPrice } from "@/helper/helper";
import { useFormik } from "formik";
import { SubmitWithdrawRequest } from "@/@actions/user";
import { useStore } from "@/store/index";
import { useNavigate } from "react-router-dom";



const DepositAndWithdrowCard: React.FC<IDepositAndWithdrowCard> = ({
  title,
}) => {

  const withdrawSchema = object().shape({
    amount: number()
      .required("Amount is required")
      .min(Settings("withdraw_min"), "Amount is too low")
      .max(Settings("withdraw_max"), "Amount is too high"),
    details: string().required("Details is required"),
  });

  const token = useStore((state) => state.token);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      amount: "",
      details: "",
    },

    validationSchema: withdrawSchema,

    onSubmit: async (values) => {
      const res = await SubmitWithdrawRequest(values, token);

      if (res?.status == 0 || res?.success == false) {
        multipleError(res.message);
      }

      if (res.success == true) {
        success(res.message);
        navigate("/dashboard/withdraw/log");
      }
    },
  });

  const { values, handleSubmit, handleChange, isSubmitting, touched, errors } =
    formik;

  return (
    <div className="flex flex-col items-start gap-[20px] min-768:gap-[32px] p-[20px] min-768:p-[40px] min-768:w-[508px] mx-auto rounded-[12px] border border-auc-gray-color bg-auc-white-color">
      <div className="flex w-full py-[15px] min-768:py-[29px] justify-center items-center gap-[10px] rounded-[4px] bg-auc-white-smoke-color">
        <h3 className="text-[20px] min-768:text-[24px] min-1200:text-[32px]">
          {translate(title)}
        </h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-[24px]"
      >
        {/* Amount Start */}
        <div className="w-full">
          <label htmlFor="amount">{translate("Amount")}</label>
          <input
            className="auc-common-input mt-[16px] w-full"
            type="name"
            autoComplete="off"
            name="amount"
            id="amount"
            placeholder="Enter Amount"
            value={values.amount}
            onChange={handleChange}
          />

          {touched.amount && errors.amount ? (
            <p className="mt-[8px] text-red-500 text-[16px]">{translate(errors.amount)}</p>
          ) : null}
        </div>

        <div className="w-full">
          <label htmlFor="details">{translate("Enter Account Details")}</label>
          <textarea
            className="border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[120px] rounded-[8px] mt-[16px]"
            autoComplete="off"
            name="details"
            id="details"
            placeholder="Enter Details"
            value={values.details}
            onChange={handleChange}
          ></textarea>

          {touched.details && errors.details ? (
            <p className="mt-[8px] text-red-500 text-[16px]">
              {translate(errors.details)}
            </p>
          ) : null}

          <p className="mt-[8px] leading-[170%] text-auc-text-color-800 text-[16px]">
            {translate("Limit")} <ShowCurrencyPrice price={Settings("withdraw_min")} /> -{" "}
            <ShowCurrencyPrice price={Settings("withdraw_max")} /> , {translate("Charge")}{" "}
            <ShowCurrencyPrice price={Settings("withdraw_charge")} /> ,
          </p>
        </div>

        <Button
          btnType="submit"
          status={isSubmitting}
          text={translate("Confirm")}
          styles={"auc-btn-primary w-full"}
        />
      </form>
    </div>
  );
};

export default DepositAndWithdrowCard;
