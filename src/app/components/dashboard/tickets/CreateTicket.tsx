
import Button from "../../buttons/Button";
import { multipleError, success, translate } from "@/helper/helper";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useStore } from "@/store/index";
import { UserTicketSubmit } from "@/@actions/user";
import { useNavigate } from "react-router-dom";

const CreateTicket = () => {
  const router = useNavigate();

  const token = useStore((state) => state.token);
  const schema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
    subject: Yup.string().required("Subject is required"),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
      subject: "",
    },

    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const res = await UserTicketSubmit(values.subject, values.message, token);
      if (res.success == true) {
        resetForm();
        success(res.message);
        router("/dashboard/tickets");
      } else {
        multipleError(res.errors || res.error);
      }
    },
  });


  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } = formik;


  return (
    <div>
      <h2 className="auc-primary-heading">{translate("Create Tickets")}</h2>
      <form onSubmit={handleSubmit}>
        {/* grid start  */}
        <div className="grid grid-cols-1 gap-[28px]">

          {/* Subject */}
          <div className="w-full">
            <label htmlFor="subject">{translate("Subject")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="subject"
              id="subject"
              placeholder={translate("Subject")}
              onChange={handleChange}
              value={values.subject}
            />
            {errors.subject && touched.subject ? (
              <div className=" text-red-400 capitalize mt-2 inline-block">{errors.subject}</div>
            ) : null}
          </div>

          {/* Text Area  */}
          <div className="col-span-1 min-768:col-span-2">
            <label htmlFor="message">{translate("Message")}</label>
            <textarea
              className=" border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[144px] rounded-[8px] mt-[16px]"
              autoComplete="off"
              name="message"
              id="message"
              placeholder={translate("Type here")}
              onChange={handleChange}
              value={values.message}
            />
            {errors.message && touched.message ? (
              <div className=" text-red-400 capitalize mt-2 inline-block">{errors.message}</div>
            ) : null}
          </div>
        </div>
        {/* grid end */}
        <Button
          btnType="submit"
          status={isSubmitting}
          text={translate("Submit Ticket")}
          styles={"auc-btn-primary mt-[32px] w-full"}
        />
      </form>
    </div>
  );
};

export default CreateTicket;
