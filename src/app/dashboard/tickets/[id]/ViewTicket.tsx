
import { CloseTicket, GetUserReplies, UserTicketReply } from "@/@actions/user";
import Button from "@/app/components/buttons/Button";
import ChatCard from "@/app/components/cards/ChatCard";
import { useStore } from "@/store/index";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { multipleError, success, translate } from "@/helper/helper";

import avaterPhoto from "/assets/images/comment_avater.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { CardsSkeleton } from "@/app/ui/skeletons";

const ViewTicket = () => {
  const params = useParams();

  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const [getReplies, setReplies] = useState([]);
  const [ticket, setTicket] = useState(null);
  const ticket_number = params.ticketId;
  const getData = async () => {
    const response = await GetUserReplies(
      ticket_number as string,
      token as string
    );

    if (response.status == true) {
      setReplies(response.messages);
      setTicket(response.ticket);
    } else {
      multipleError(response.errors || response.error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const schema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },

    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const res = await UserTicketReply(values.message, ticket_number, token);
      if (res.success == true) {
        resetForm();
        success(res.message);
        getData();
      } else {
        multipleError(res.errors || res.error);
      }
    },
  });

  const handleClose = async () => {
    const res = await CloseTicket(ticket_number, token);
    if (res.success == true) {
      success(res.message);
      navigate("/dashboard/tickets");
    } else {
      multipleError(res.errors || res.error);
    }
  };

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  return (
    <div>
      <h2 className="auc-primary-heading-with-extra-mb !mb-[48px]">
        {translate("View Ticket")}
      </h2>
      <div className="mb-[24px] flex flex-col min-768:flex-row gap-[12px] justify-between min-768:items-center">
        <div className="flex flex-col-reverse min-768:flex-row gap-[12px] min-768:items-center h-[42px] ">
          <Button
            text={ticket?.status == 2 ? translate("Closed") : translate("Open")}
            styles={`${ticket?.status == 2 ? "auc-btn-light-red" : "auc-btn-secondary"
              } auc-btn-sm w-[100px]`}
          />
          <h2 className="text-[20px] min-768:text-[24px] min-1200:text-[32px] font-semibold leading-[130%]">
            [{translate("Ticket")} #{ticket_number}]
          </h2>
        </div>
        {ticket?.status == 2 ? null : (
          <Button
            clickHandler={ticket?.status == 2 ? null : handleClose}
            text={ticket?.status == 2 ? translate("Closed") : translate("Close")}
            styles={"auc-btn-light-red !rounded-[20px] auc-btn-sm w-[137px]"}
          />
        )}
      </div>
      <p className="text-[18px] leading-[160%] font-normal text-auc-text-color-800 mb-[24px]">
        <span className="text-auc-text-color-900">{translate("Subject")}:</span>
        {ticket?.subject}
      </p>

      {/* Chat Cards  */}
      <div className="flex flex-col gap-[24px] items-start mb-[40px]">

        {

          getReplies?.length > 0 ?
            getReplies?.map((reply: any) => (
              <ChatCard
                key={reply.id}
                date={reply.api_date}
                message={reply.message}
                isAttached={reply.file == null ? false : true}
                userImg={
                  reply.admin_id == null
                    ? reply.user.api_photo
                    : avaterPhoto
                }
                type={reply.admin_id == null ? "user" : "admin"}
              />
            )) : <CardsSkeleton />
        }


      </div>

      {ticket?.status != 2 && (
        <form className="" onSubmit={handleSubmit}>
          {/* Text Area  */}
          <div className="col-span-1 min-768:col-span-2">
            <label htmlFor="message">{translate("Message")}</label>
            <textarea
              className=" border outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[144px] rounded-[8px] mt-[16px]"
              autoComplete="off"
              name="message"
              id="message"
              placeholder={translate("Type here")}
              value={values.message}
              onChange={handleChange}
            />
          </div>
          <div className=" text-red-400 capitalize mt-2 inline-block">
            {errors.message && touched.message ? translate(errors.message) : null}
          </div>

          <Button
            text={translate("Reply")}
            btnType="submit"
            styles={"auc-btn-primary mt-[32px] w-full"}
            status={isSubmitting}
          />
        </form>
      )}
    </div>
  );
};

export default ViewTicket;
