


import React, { useEffect, useState } from "react";
import Button from "../../buttons/Button";
import { useStore } from "@/store/index";
import * as Yup from "yup";
import { UserUpdate, getUserDetails } from "@/@actions/user";
import { error, multipleError, success, translate } from "@/helper/helper";
import { useFormik } from "formik";

const ProfileSetting = () => {
  const token = useStore((state) => state.token);
  const setUserFunction = useStore((state) => state.setUser);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    photo: "",
    city: "",
    address: "",
    zip: "",
    country: "",
  });
  const [image, setImage] = useState<string>("");

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required().email(),
    phone: Yup.string().required(),
    city: Yup.string().required(),
    address: Yup.string().required(),
    zip: Yup.string(),
    country: Yup.string(),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getUserDetails(token);
    if (response.status === true) {
      setUser(response.data.user);
    } else {
      error(response.data?.message);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.photo) {
        setImage(user.photo);
      }
      formik.setValues({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: null,
        city: user.city || "",
        address: user.address || "",
        zip: user.zip || "",
        country: user.country || "",
      });
    }
  }, [user]); // This effect will run when `user` changes

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      photo: null as File | null,
      city: "",
      address: "",
      zip: "",
      country: "",
    },

    validationSchema: schema,
    onSubmit: async (values) => {
      const res = await UserUpdate({ ...values }, token);
      if (res.status == true) {
        success(res.success);
        setUserFunction(res?.data);
      } else {
        multipleError(res.errors || res.error);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;

  const handleButtonClick = () => {
    const fileInput = document.getElementById("photo") as HTMLInputElement;
    fileInput.click();
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        formik.setValues({
          ...formik.values,
          photo: file,
        });
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="auc-primary-heading">{translate("Profile Setting")}</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-row-r grid-cols-1 min-768:grid-cols-3 gap-[28px]"
      >
        <div className="col-span-1  min-768:col-span-2 grid grid-cols-1 min-768:grid-cols-2 gap-[28px]">
          {/* First Name */}
          <div className="w-full ">
            <label htmlFor="name">{translate("Name")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && touched.name && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.name)}
              </span>
            )}
          </div>

          {/* User Name */}
          <div className="w-full ">
            <label htmlFor="username">{translate("User Name")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="username"
              id="username"
              placeholder="@testuser"
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && touched.username && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.username)}
              </span>
            )}
          </div>
          {/* Email */}
          <div className="w-full ">
            <label htmlFor="email">{translate("Email")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="email"
              autoComplete="off"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.email)}
              </span>
            )}
          </div>
          {/* Mobile */}
          <div className="w-full ">
            <label htmlFor="phone">{translate("Mobile")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="phone"
              id="phone"
              placeholder="Enter Phone Number"
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && touched.phone && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.phone)}
              </span>
            )}
          </div>
          {/* Address */}
          <div className="w-full ">
            <label htmlFor="address">{translate("Address")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="address"
              id="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
            />
            {errors.address && touched.address && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.address)}
              </span>
            )}
          </div>

          {/* Zip Code */}
          <div className="w-full ">
            <label htmlFor="zip">{translate("Zip Code")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="zip"
              id="zip"
              placeholder="Zip Code"
              value={values.zip}
              onChange={handleChange}
            />
            {errors.zip && touched.zip && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.zip)}
              </span>
            )}
          </div>
          {/* City */}
          <div className="w-full ">
            <label htmlFor="city">{translate("City")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="city"
              id="city"
              placeholder="City"
              value={values.city}
              onChange={handleChange}
            />
            {errors.city && touched.city && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.city)}
              </span>
            )}
          </div>
          {/* Country */}
          <div className="w-full ">
            <label htmlFor="country">{translate("Country")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="country"
              id="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange}
            />
            {errors.country && touched.country && (
              <span className=" text-red-400 capitalize mt-2 inline-block">
                {translate(errors.country)}
              </span>
            )}
          </div>
          {/* Update Profile Button  */}
          <Button
            btnType="submit"
            text={translate("Update Profile")}
            status={isSubmitting}
            styles={"auc-btn-primary min-768:col-span-2 mt-[32px] w-full"}
          />
        </div>
        <div className="col-span-1  order-2 max-768:order-1  flex flex-col items-start gap-[28px]">
          <label htmlFor="photo">
            {image ? (
              <img
                className="rounded-[8px] mb-2 w-full min-768:w-[290px] cursor-pointer"
                src={image}
                width={290}
                height={290}
                alt=""
              />
            ) : (
              "Loading..."
            )}
            {/* Update Profile Picture Button  */}

            <input
              type="file"
              id="photo"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          <Button
            clickHandler={handleButtonClick}
            text={translate("Update Profile Picture")}
            styles={"auc-btn-secondary w-full"}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileSetting;
