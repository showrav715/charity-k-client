

import { Link } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Settings, error, success, translate } from "../../../helper/helper";
import { useStore } from "../../../store/index";
import { useNavigate } from "react-router-dom";
import { LoginSubmit } from "../../../@actions/auth";
import Loader from "../../../helper/Loader";

import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { CardsSkeleton } from "@/app/ui/skeletons";


const schema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(4),
});

export default function Login() {
  const navigate = useNavigate();

  const [showPass, setshowPass] = useState(false);
  const setToken = useStore((state) => state.setToken);
  const setUser = useStore((state) => state.setUser);
  const settings = useStore((state) => state.settings);

  const logo = Settings("header_logo");

  const formik = useFormik({
    initialValues: {
      email: "user@gmail.com",
      password: "1234",
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,
    // Handle form submission
    onSubmit: async (values) => {
      const res = await LoginSubmit(values.email, values.password);
      setToken(res.data.token);
      setUser(res.data.user);
      if (res.data.email_verify == false) {
        setToken(null);
        setUser(null);
        error(res.message);
        navigate(`/email-verify?email=${values.email}`);
      }

      if (res.status == false) {
        setToken(null);
        setUser(null);
        error(res.error.message);
      } else {
        success(translate("Login Successfully"));
        navigate("/dashboard");

      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  if (!settings) return <CardsSkeleton />;

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="ch-reg-log-wrapper ch-checkout-page-wrapper">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-6 col-xl-7 d-none d-lg-block position-sticky top-4">
                <img
                  src={`/assets/images/auth-img.png`}
                  width={812}
                  height={798}
                  className="log-res-left-img pe-4"
                  alt="auth image"
                />
              </div>
              <div
                className="col-lg-6 col-xl-5"
              >
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
                  <h4 className="mb-20">Welcome Back! Please login</h4>

                  <div className="personal-info-wrapper w-100">
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
                        name="email"
                        id="personal_email"
                        value={values.email}
                        onChange={handleChange}
                      />
                      {errors.email && touched.email && (
                        <span className="mt-2 inline-block text-red-400 capitalize">{errors.email}</span>
                      )}
                    </div>
                    <div className="mb-24">
                      <label
                        className="personal-info-label"
                        htmlFor="personal_pass"
                      >
                        Create Password
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
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          type={`${showPass ? "text" : "password"}`}
                          id="personal_pass"
                        />
                      </div>
                      {errors.password && touched.password && (
                        <span className="mt-2 inline-block text-red-400 capitalize">{errors.password}</span>
                      )}
                    </div>
                  </div>
                  <div className="form-check d-flex align-items-center gap-4 justify-content-between w-100 mb-40">
                    <div>
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
                        Remembar Me
                      </label>
                    </div>
                    <h6 className="dont-hv-acc fz-16 fw-normal mb-0">
                      <Link to="/forgot">Forget Password?</Link>
                    </h6>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ch-btn ch-primary-btn w-100 mb-20"
                  >
                    login
                    <Loader status={isSubmitting} />
                  </button>

                  <h6 className="dont-hv-acc fz-18 text-center">
                    Don&apos;t have an account?
                    <Link to="/register"> Create New Account</Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}
