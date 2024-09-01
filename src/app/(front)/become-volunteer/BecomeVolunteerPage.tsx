
import { Helmet } from 'react-helmet';

import BreadCrumb from "@/app/components/common/BreadCrumb";
import { object, string } from "yup";
import { useFormik } from "formik";
import {  multipleError, success, translate } from "@/helper/helper";
// import { Settings, multipleError, success, translate } from "@/helper/helper";
import { VolunteerSubmit } from "@/@actions/frontend";
import Loader from "@/helper/Loader";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

let schema = object({
  name: string().required(),
  designation: string().required(),
  photo: string().required(),
  cv: string().required(),
  description: string().required(),
});

export default function BecomeVolunteerPage() {
  const settings = useStore((state) => state.settings);

  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      photo: null as File,
      cv: null as File,
      description: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const res = await VolunteerSubmit(values);

      if (res.status == false || res.error || res.errors) {
        multipleError(res.error || res.errors);
      } else {
        resetForm();
        formik.setFieldValue("photo", null);
        formik.setFieldValue("cv", null);
        success(res.message);
      }
    },
  });

  const { handleSubmit, handleChange, values, isSubmitting } =
    formik;

  if (!settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Become a Volunteer")}</title>
      </Helmet>
      <Header />
      <form onSubmit={handleSubmit}>


        <BreadCrumb
          title="Become a Volunteer"
          menus={[
            { pageToLink: "/", pageLable: "Home" },
            { pageToLink: "/become-volunteer", pageLable: "Become a Volunteer" },
          ]}
        />

        <div className="ch-reg-log-wrapper ch-checkout-page-wrapper ch-voluteer-form pt-120">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 d-none d-lg-block"
                data-aos="fade-"

              >
                <img
                  // src={Settings("volunteers_background")}
                  src={settings?.["volunteers_background"]}
                  width={772}
                  height={901}
                  className="log-res-left-img"
                  alt="auth image"
                />
              </div>
              <div
                className="col-lg-6"


              >
                <div className="auth-form-wrapper w-100">
                  <h4 className="mb-60 text-center">
                    {translate("Become a Volunteer")} <br />
                    <span>{translate("Fill out the form below")}</span>
                  </h4>
                  <div className="personal-info-wrapper w-100">
                    <div className="mb-24">
                      <label className="personal-info-label" htmlFor="name">
                        {translate("Your Full Name")}
                      </label>
                      <input
                        className="personal-info-input mb-0"
                        placeholder={translate("Your Full Name")}
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <span className="text-red-400 mt-2 text-capitalize  block">
                          {formik.errors.name}
                        </span>
                      )}
                    </div>

                    <div className="mb-24">
                      <label
                        className="personal-info-label"
                        htmlFor="designation"
                      >
                        {translate("Your Designation")}
                      </label>
                      <input
                        className="personal-info-input mb-0 "
                        placeholder={translate("Your Designation")}
                        type="text"
                        id="designation"
                        name="designation"
                        value={values.designation}
                        onChange={handleChange}
                      />
                      {formik.errors.designation &&
                        formik.touched.designation && (
                          <span className="text-red-400 mt-2  block text-capitalize">
                            {formik.errors.designation}
                          </span>
                        )}
                    </div>

                    {/* social link */}
                    <div>
                      <label className="personal-info-label" htmlFor="facebook">
                        {translate("Facebook Link")}
                      </label>
                      <input
                        className="personal-info-input"
                        placeholder="Facebook Link"
                        type="text"
                        id="facebook"
                        name="facebook"
                        value={values.facebook}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="personal-info-label" htmlFor="twitter">
                        Twitter Link
                      </label>
                      <input
                        className="personal-info-input"
                        placeholder="Twitter Link"
                        type="text"
                        id="twitter"
                        name="twitter"
                        value={values.twitter}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="personal-info-label" htmlFor="instragram">
                        Instragram Link
                      </label>
                      <input
                        className="personal-info-input"
                        placeholder="Instragram Link"
                        type="text"
                        id="instragram"
                        name="instagram"
                        value={values.instagram}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="personal-info-label" htmlFor="linkedin">
                        Linkedin Link
                      </label>
                      <input
                        className="personal-info-input"
                        placeholder="Linkedin Link"
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={values.linkedin}
                        onChange={handleChange}
                      />
                    </div>

                    {/* social link */}

                    <div>
                      {/* photo */}
                      <label className="personal-info-label" htmlFor="photo">
                        Upload Your photo
                      </label>
                      <div className="position-relative mb-24">
                        <label
                          htmlFor="photo"
                          className="position-absolute top-50 end-0 translate-middle-y pe-3"
                        >
                          <img
                            src={`/assets/images/upload.svg`}
                            width={24}
                            height={24}
                            alt="upload icon"
                          />
                        </label>
                        <input
                          className="personal-info-input mb-0"
                          placeholder="Upload CV"
                          type={`file`}
                          id="photo"
                          name="photo"
                          onBlur={formik.handleBlur}
                          onChange={(event) => {
                            formik.setFieldValue(
                              "photo",
                              event.currentTarget.files[0]
                            );
                          }}
                        />

                        {formik.errors.photo && formik.touched.photo && (
                          <span className="text-red-400 mt-2  block text-capitalize">
                            {formik.errors.photo as string}
                          </span>
                        )}
                      </div>

                      {/* cv */}

                      <label className="personal-info-label" htmlFor="cv">
                        Upload Your CV <small>(.pdf)</small>
                      </label>
                      <div className="position-relative mb-24">
                        <label
                          htmlFor="cv"
                          className="position-absolute top-50 end-0 translate-middle-y pe-3"
                        >
                          <img
                            src={`/assets/images/upload.svg`}
                            width={24}
                            height={24}
                            alt="upload icon"
                          />
                        </label>
                        <input
                          className="personal-info-input mb-0"
                          placeholder="Upload CV"
                          type={`file`}
                          id="cv"
                          name="cv"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "cv",
                              event.currentTarget.files[0]
                            );
                          }}
                          onBlur={formik.handleBlur}
                        />
                        {formik.errors.cv && formik.touched.cv && (
                          <span className="text-red-400 mt-2  block text-capitalize">
                            {formik.errors.cv as string}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        className="personal-info-label"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        placeholder="Case Description.."
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleChange}
                        rows={4}
                        className="personal-info-input"
                      ></textarea>
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="ch-btn ch-primary-btn w-100 mb-40"
                  >
                    Send Message
                    <Loader status={isSubmitting} />
                  </button>
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
