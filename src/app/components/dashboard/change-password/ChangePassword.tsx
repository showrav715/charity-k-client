

import Button from "../../buttons/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ResetPassword } from "@/@actions/user";
import { multipleError, success, translate } from "@/helper/helper";
import { useStore } from "@/store/index";

const ChangePassword = () => {
  const token = useStore((state) => state.token);

  const schema = Yup.object().shape({
    old_pass: Yup.string().required("old pass is a required field"),
    password: Yup.string().required("password is a required field").min(4),
    password_confirmation: Yup.string()
      .required("password confirmation is a required field")
      .min(4),
  });

  const formik = useFormik({
    initialValues: {
      old_pass: "",
      password: "",
      password_confirmation: "",
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,
    // Handle form submission
    onSubmit: async (values) => {
      const res = await ResetPassword(
        values.old_pass,
        values.password,
        values.password_confirmation,
        token
      );

      if (res.status == false) {
        multipleError(res.error);
      } else {
        success(res.message);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  return (
    <>
      <h2 className="auc-primary-heading-with-extra-mb">
        {translate("Change Password")}
      </h2>
      <div className="flex flex-col items-start gap-[20px] min-768:gap-[32px] p-[20px] min-768:p-[40px] min-768:w-[508px] mx-auto rounded-[12px] border border-auc-gray-color bg-auc-white-color">
        <div className="flex w-full py-[15px] min-768:py-[29px] justify-center items-center gap-[10px] rounded-[4px] bg-auc-white-smoke-color">
          <h2 className="text-[20px] min-768:text-[24px] min-1200:text-[32px] font-semibold">
            {translate("Change Password")}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-[32px]"
        >
          {/* Old Password */}
          <div className="w-full">
            <label htmlFor="old_pass">{translate("Old Password")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="password"
              autoComplete="off"
              name="old_pass"
              id="old_pass"
              placeholder="Old Password"
              onChange={handleChange}
              value={values.old_pass}
            />
            {errors.old_pass && touched.old_pass && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.old_pass)}
              </span>
            )}
          </div>
          {/* New Password */}
          <div className="w-full">
            <label htmlFor="newPassword">{translate("New Password")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="password"
              autoComplete="off"
              name="password"
              id="newPassword"
              placeholder="New Password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && touched.password && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.password)}
              </span>
            )}
          </div>
          {/* Confirm New Password */}
          <div className="w-full">
            <label htmlFor="password_confirmation">
              {translate("Confirm New Password")}
            </label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="password"
              autoComplete="off"
              name="password_confirmation"
              id="password_confirmation"
              placeholder="Confirm New Password"
              onChange={handleChange}
              value={values.password_confirmation}
            />
            {errors.password_confirmation && touched.password_confirmation && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.password_confirmation)}
              </span>
            )}
          </div>

          <Button
            btnType="submit"
            status={isSubmitting}
            text={translate("Confirm")}
            styles={"auc-btn-primary w-full"}
          />
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
