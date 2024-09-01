

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { EmailVerification, verifyEmailResendCode } from "@/@actions/auth";
import { success, multipleError } from "@/helper/helper";
import toast from "react-hot-toast";
import { useStore } from "@/store/index";
import Loader from "@/helper/Loader";

// Yup schema to validate the form
const schema = Yup.object().shape({
  code: Yup.string().required(),
});

export default function EmailVerify({ searchParams }) {
  const router = useNavigate();
  const settings = useStore((state) => state.settings);

  const handleRecentOtp = async () => {
    const response = await verifyEmailResendCode(searchParams.email);
    if (response.success == false) {
      multipleError(response.message);
    } else {
      success(response.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      code: "",
    },

    validationSchema: schema,
    onSubmit: async (values) => {
      const res = await EmailVerification(searchParams.email, values.code);
      if (res.success == false) {
        multipleError(res.message);
      } else {
        toast.success(res.message);
        router("/login");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit,isSubmitting } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className="ch-reg-log-wrapper ch-checkout-page-wrapper">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-none d-lg-block"
              
              
            >
              <img
                src={`/assets/images/auth-img.png`}
                width={812}
                height={798}
                className="log-res-left-img"
                alt="auth image"
              />
            </div>
            <div
              className="col-lg-6"
              
              
            >
              <div className="auth-form-wrapper">
                <img
                  width={190}
                  height={60}
                  src={settings?.header_logo}
                  alt="logo"
                  className="logo"
                />
                <h4 className="mb-60">Email Verification</h4>

                <div className="personal-info-wrapper w-100">
                  <div>
                    <label className="personal-info-label" htmlFor="code">
                      Enter Otp Code
                    </label>
                    <input
                      className="personal-info-input"
                      placeholder="Please enter Otp code here"
                      type="text"
                      name="code"
                      id="code"
                      value={values.code}
                      onChange={handleChange}
                    />
                    {errors.code && touched.code && (
                      <span className=" text-red-400">{errors.code}</span>
                    )}
                  </div>

                  <button
                  type="button"
                    onClick={handleRecentOtp}
                    className="dont-hv-acc fz-18 text-center mb-3"
                  >
                    Recent Otp
                  </button>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="ch-btn ch-primary-btn w-100 mb-40"
                >
                  Submit
                  <Loader status={isSubmitting} />
                </button>

                <h6 className="dont-hv-acc fz-18 text-center">
                  <Link to="/login"> Go to Login</Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
