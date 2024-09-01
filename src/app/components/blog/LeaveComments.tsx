

import { useFormik } from "formik";
import { object, string } from "yup";
import { multipleError, success, translate } from "@/helper/helper";
import { BlogCommentSubmit } from "@/@actions/frontend";
import Loader from "@/helper/Loader";

export default function LeaveComments({ blog_id }) {
 
  const contactSchema = object().shape({
    name: string().required("Name is required"),
    email: string().required("Email is required").email(),
    comment: string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues: {
      blog_id: blog_id,
      name: "",
      email: "",
      comment: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      const res = await BlogCommentSubmit(values);
      if (res.status == false || res.error || res.errors) {
        multipleError(res.error || res.errors);
      } else {
        resetForm();
        success(res.message);

      }
    },
  });

  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    formik;

  return (
    <div
      className="ch-contact-us-form-section leave-blog-comments-form"
      
      
    >
      <h4 className="mb-32">{translate("Leave A Reply")}</h4>
      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className="w-100">
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            className="input-box mb-0"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <span className="text-red-400 mt-2 text-capitalize  block">
              {translate(errors.name)}
            </span>
          )}
        </div>

        <div className="w-100">
          <input
            type="email"
            placeholder="Your Email"
            className="input-box"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email && (
            <span className="text-red-400 mt-2 text-capitalize  block">
              {translate(errors.email)}
            </span>
          )}
        </div>

        <div className="w-100">
          <textarea
            rows={4}
            placeholder="Write Your Comment"
            className="input-box textarea-box w-100"
            name="comment"
            value={values.comment}
            onChange={handleChange}
          />
          {errors.comment && touched.comment && (
            <span className="text-red-400 mt-2 text-capitalize  block">
              {translate(errors.comment)}
            </span>
          )}
        </div>

        <input
          type="hidden"
          name="blog_id"
          value={blog_id}
          className="input-box"
        />

        <button
          disabled={isSubmitting}
          type="submit"
          className="ch-btn ch-primary-btn"
        >
          {translate("Post Your Comment")}
          <Loader status={isSubmitting} />
        </button>
      </form>
    </div>
  );
}
