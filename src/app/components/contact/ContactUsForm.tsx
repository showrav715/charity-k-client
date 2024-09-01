import { ContactSubmit } from "@/@actions/frontend";
import { multipleError, split, translate } from "@/helper/helper";
import { useFormik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";
import Loader from "@/helper/Loader";

export default function ContactUsForm({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  if (subtitle) {
    var { word, last } = split(subtitle, 1);
  } else {
    var { word, last } = split("", 1);
  }


  const contactSchema = object().shape({
    name: string().required(),
    email: string().required(),
    subject: string().required(),
    message: string().required(),
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await ContactSubmit(values);
      if (res.status == false || res.error || res.errors) {
        multipleError(res.error || res.errors);
      } else {
        resetForm();
        toast.success(res.message);
      }
    },
  });

  return (
    <section className="ch-contact-us-form-section">
      <div className="container">
        <div className="row justify-content-center mb-60">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                className="sm-title"
                suppressHydrationWarning
              >
                {title}
              </h5>
              <h2
                data-aos-dealy="100"
                className="title"
              >
                {/* {subtitle} */}
                {word} <span>{last}</span>
              </h2>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center"
        >
          <div className="col-lg-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="contact-us-form ">
                <div className="contact-form-wrapper-ex">
                <input
                  type="text"
                  name="name"
                  value={formik?.values?.name}
                  onChange={formik.handleChange}
                  placeholder="Your Name"
                  className="input-box"
                />
                {formik.errors.name && formik.touched.name && (
                  <span className="text-red-400 block mt-2 capitalize">{translate(formik.errors.name)}</span>
                )}
                </div>

                <div className="contact-form-wrapper-ex">
                <input
                  type="email"
                  name="email"
                  value={formik?.values?.email}
                  onChange={formik.handleChange}
                  placeholder="Your Email"
                  className="input-box"
                />
                {formik.errors.email && formik.touched.email && (
                  <span className=" text-red-400 block mt-2 capitalize">{translate(formik.errors.email)}</span>
                )}
                </div>
                <div className="contact-form-wrapper-ex w-100">
                <input
                  type="text"
                  name="subject"
                  value={formik?.values?.subject}
                  onChange={formik.handleChange}
                  placeholder="Subject"
                  className="input-box w-100"
                />
                {formik.errors.subject && formik.touched.subject && (
                  <span className=" text-red-400 block mt-2 capitalize">{translate(formik.errors.subject)}</span>
                )}
                </div>
                <div className="contact-form-wrapper-ex w-100">
                <textarea
                  name="message"
                  value={formik?.values?.message}
                  onChange={formik.handleChange}
                  rows={4}
                  placeholder="Message"
                  className="input-box textarea-box w-100"
                />
                {formik.errors.message && formik.touched.message && (
                  <span className=" text-red-400 block mt-2 capitalize">{translate(formik.errors.message)}</span>
                )}
                </div>

                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="ch-btn ch-primary-btn w-100"
                >
                  {translate("Send Message")}
                  <Loader status={formik.isSubmitting} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
