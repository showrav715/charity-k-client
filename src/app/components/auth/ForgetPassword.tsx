

import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ForgotSubmit } from "@/@actions/auth";
import { Settings, error, success } from "@/helper/helper";
import Loader from "@/helper/Loader";
// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required().email(),
});

export default function ForgetPassWord() {

  const logo = Settings("header_logo");

  const router = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,
    // Handle form submission
    onSubmit: async (values) => {
      const res = await ForgotSubmit(values.email);
      if (res.success == false) {
        error(res.message);
      } else {
        success(res.message);
        router(`/forgot/new-password?email=${values.email}`);
      }
    },
  });
  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      <div className="ch-reg-log-wrapper ch-checkout-page-wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6 d-none d-lg-block pe-5"
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
              {logo != "/.." && (
                  <img
                  width={190}
                  height={60}
                  src={logo}
                  alt="logo"
                  className="logo"
                />
                )}
                <h4 className="mb-24">Forgot Password</h4>

                <div className="personal-info-wrapper w-100 mb-24">
                  <div>
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
                      <span className=" text-red-400 capitalize">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
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
