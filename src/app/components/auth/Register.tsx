
import { Settings, multipleError, success } from "@/helper/helper";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RegisterSubmit } from "@/@actions/auth";
import Loader from "@/helper/Loader";

export default function Register() {
  const logo = Settings("header_logo");

  const [showPass, setshowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);
  const router = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    name: Yup.string().required(),
    password: Yup.string().required().min(4),
    confirm_password: Yup.string().required('Confirm password is a Required field').min(4),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,
    // Handle form submission
    onSubmit: async (values) => {
      const res = await RegisterSubmit(
        values.email,
        values.password,
        values.confirm_password,
        values.name
      );
      if (res.status == false) {
        multipleError(res.error);
      } else {
        success("Register successfull");
        router("/login");
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } = formik;

  return (
    <div className="ch-reg-log-wrapper ch-checkout-page-wrapper">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 col-xl-7  d-none d-lg-block">
              <img
                src={`/assets/images/auth-img.png`}
                width={812}
                height={798}
                className="log-res-left-img pe-4"
                alt="auth image"
              />
            </div>
            <div className="col-lg-6 col-xl-5">
              <div className="auth-form-wrapper">
              {logo != "/.." && (
                  <img
                  width={190}
                  height={60}
                  src={logo}
                  alt="logo"
                  className="logo"
                />
                )}
                <h4 className="mb-20">Create your Account</h4>
                <div className="personal-info-wrapper w-full">
                  <div className="mb-24">
                    <label className="personal-info-label" htmlFor="name">
                      Your Full Name
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Please enter your full name"
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />

                    {errors.name && touched.name && (
                      <span className=" text-red-400 capitalize mt-2 inline-block">{errors.name}</span>
                    )}
                  </div>

                  <div className="mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="personal_email"
                    >
                      Your Email
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Please enter your email"
                      type="email"
                      id="personal_email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && (
                      <span className=" text-red-400 capitalize mt-2 inline-block">{errors.email}</span>
                    )}
                  </div>

                  <div className="mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="personal_pass"
                    >
                      Create Password
                    </label>
                    <div className="position-relative ">
                      <button
                        onClick={() => setshowPass(!showPass)}
                        className="position-absolute top-50 end-0 translate-middle-y pe-3"
                      >
                        <img
                          src={`/assets/images/${
                            showPass ? "open-eye" : "close-eye"
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
                      <span className=" text-red-400 capitalize mt-2 inline-block">{errors.password}</span>
                    )}
                  </div>

                  <label
                    className="personal-info-label"
                    htmlFor="personal_confirm_pass"
                  >
                    Confirm Password
                  </label>
                  <div className="position-relative mb-24">
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
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                    />

                    {errors.confirm_password && touched.confirm_password && (
                      <span className=" text-red-400 capitalize mt-2 inline-block">
                        {errors.confirm_password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-check align-self-baseline mb-40">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="agree_terms_and_conditions"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="agree_terms_and_conditions"
                  >
                    I agree to the <Link to="#">terms and conditions</Link>{" "}
                    and <Link to="#">privacy policy</Link>
                  </label>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="ch-btn ch-primary-btn w-100 mb-20"
                >
                  Create Account
                  <Loader status={isSubmitting} />
                </button>

                <h6 className="dont-hv-acc fz-18">
                  Don&apos;t an account? <Link to="/login">Login</Link>
                </h6>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
