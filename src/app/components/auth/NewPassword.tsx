

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import  { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { multipleError, success } from "@/helper/helper";
import { useStore } from "@/store/index";
import { newPasswordSubmit, verifyEmailResendCode } from "@/@actions/auth";
import Loader from "@/helper/Loader";

// Yup schema to validate the form
const schema = Yup.object().shape({
  code: Yup.string().required(),
  password: Yup.string().required().min(4),
  password_confirmation: Yup.string().required("Password confirmation is a required field").min(4),
});

export default function NewPassword() {
  const [searchParams] = useSearchParams();
  const [showPass, setshowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const router = useNavigate();
  const settings = useStore((state) => state.settings);

  const handleRecentOtp = () => {
    
    verifyEmailResendCode(searchParams.get("email")).then((response)=>{
      if (response.success == false) {
        multipleError(response.message);
      } else {
        success(response.message);
      }
    }).catch((error)=>{
      multipleError(error);
    });


  
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      password_confirmation: "",
      password: "",
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,
    // Handle form submission
    onSubmit: async (values) => {
      const res = await newPasswordSubmit(values);
      if (res.status == false || res.success == false) {
        multipleError(res.errors || res.message || res.error);
      } else {
        router("/login");
        success(res.message);
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

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
                <h4 className="mb-60">Forgot Password</h4>

                <div className="personal-info-wrapper w-100">
                  <div className="mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="personal_email"
                    >
                      Enter Verification Code
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Enter Verification Code"
                      type="text"
                      name="code"
                      id="personal_email"
                      value={values.code}
                      onChange={handleChange}
                    />
                    {errors.code && touched.code && (
                      <span className=" text-red-400 capitalize">{errors.code}</span>
                    )}
                  </div>

                  <div className="position-relative mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="personal_pass"
                    >
                      New Password
                    </label>
                    <div className="position-relative">
                      <button
                        type="button"
                        onClick={() => setshowPass(!showPass)}
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      >
                        <img
                          src={`/assets/images/${showPass ? "open-eye" : "close-eye"
                            }.svg`}
                          width={16}
                          height={16}
                          alt="eye icon"
                        />
                      </button>
                      <input
                        className="personal-info-input mb-0"
                        placeholder="Minimum 8 characters"
                        type={`${showPass ? "text" : "password"}`}
                        id="personal_pass"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.password && touched.password && (
                      <span className=" text-red-400 capitalize">{errors.password}</span>
                    )}
                  </div>

                  <div className="position-relative mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="personal_confirm_pass"
                    >
                      Confirm Password
                    </label>
                    <div className="position-relative">

                      <button
                        type="button"
                        onClick={() => setshowConfirmPass(!showConfirmPass)}
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      >
                        <img
                          src={`/assets/images/${showConfirmPass ? "open-eye" : "close-eye"
                            }.svg`}
                          width={16}
                          height={16}
                          alt="eye icon"
                        />
                      </button>
                      <input
                        className="personal-info-input mb-0"
                        placeholder="Confirm Password"
                        type={`${showConfirmPass ? "text" : "password"}`}
                        id="personal_confirm_pass"
                        name="password_confirmation"
                        value={values.password_confirmation}
                        onChange={handleChange}
                      />
                    </div>

                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <span className=" text-red-400 capitalize">
                          {errors.password_confirmation}
                        </span>
                      )}
                  </div>

                  <button
                    type="button"
                    onClick={handleRecentOtp}
                    className="dont-hv-acc resend-otp fz-18 text-center mb-3"
                  >
                    Resend OTP
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
