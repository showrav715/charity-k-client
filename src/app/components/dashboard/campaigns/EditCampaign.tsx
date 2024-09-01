


import React, { useState, useEffect } from "react";
import NiceSelect from "../../NiceSelect/NiceSelect";
import Button from "../../buttons/Button";
import { useFormik } from "formik";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import SelectDate from "../../SelectDate/SelectDate";
import { RemoveGalleryPhoto, UpdateCampaign } from "@/@actions/user";
import { useStore } from "@/store/index";
import ReactQuill from "react-quill";

import {
  ShowConvertPrice,
  multipleError,
  success,
  translate,
  CurrencyCode
} from "@/helper/helper";
import { useNavigate } from "react-router-dom";



interface ICreateCampaign {
  title: string;
  categoryList: any;
  campaign: any;
}

const EditCampaign: React.FC<ICreateCampaign> = ({
  title,
  categoryList,
  campaign,
}: ICreateCampaign) => {


  const router = useNavigate();
  const token = useStore((state) => state.token);

  const [uploadedImg, setUploadedImg] = React.useState([]);
  const [gallery, setGallery] = useState([] as any);
  const [image, setImage] = useState<string>("");


  const schema = Yup.object().shape({
    title: Yup.string().required(),
    category_id: Yup.number().required("Please select a category"),
    photo: Yup.mixed().notRequired(),
    goal: Yup.number().required(),
    description: Yup.string().required(),
    is_faq: Yup.boolean().required(),
    is_preloaded: Yup.boolean().required(),
    location: Yup.string().required(),
    benefits: Yup.number().required(),
    end_date: Yup.string().required(),
    video_link: Yup.string().required("Please enter a video link"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      category_id: "" as string | number | null,
      photo: null as File | null | string,
      goal: "" as number | string,
      description: "",
      is_faq: false,
      is_preloaded: false,
      location: "",
      benefits: "" as string | number,
      end_date: new Date() as Date | string,
      video_link: "",
      gallery: [] as File[] | any,
      faq_title: [],
      faq_content: [],
    },
    // Pass the Yup schema to validate the form
    validationSchema: schema,
    // Handle form submission
    onSubmit: async (values) => {
 
      const res = await UpdateCampaign({ ...values }, campaign?.id, token);
      if (res.status == false || res.error || res.errors) {
        multipleError(res.error || res.errors);
      } else {
        success(res.message);
        router("/dashboard/campaigns/all");
      }
    },
  });

  useEffect(() => {
    if (campaign) {
      if (campaign.api_photo) {
        setImage(campaign.api_photo);
      }

      setGallery(campaign.galleries);

      const faqcheck = campaign?.faqs?.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          content: item.content,
        };
      });

      const end_date = new Date(campaign?.end_date || Date());

      formik.setValues({
        ...formik.values,
        title: campaign.title,
        category_id: campaign.category_id,
        goal: Number(ShowConvertPrice({ price: campaign.goal })),
        description: campaign.description,
        is_faq: campaign.is_faq,
        is_preloaded: campaign.is_preloaded,
        location: campaign.location,
        benefits: campaign.benefits,
        end_date: end_date,
        video_link: campaign.video_link,
        gallery: [],
        faq_title: faqcheck?.map((item: any) => item.title),
        faq_content: faqcheck?.map((item: any) => item.content),
      });
    }
  }, [campaign]);

  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } =
    formik;
  const handleUploadedImage = (event, index = null) => {
    const files = event.target.files;

    const imagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file as Blob)
    );

    let updatedState = [];

    if (index !== null) {
      // Update the image at the specified index
      updatedState = [
        ...uploadedImg.slice(0, index),
        ...imagesArray,
        ...uploadedImg.slice(index + 1),
      ];

      const newFiles = Array.from(event.target.files);
      const currentGallery = formik.values.gallery;
      const updatedGallery = [...currentGallery];

      // Replace the file at the specified index with the new file
      updatedGallery[index] = newFiles[0];

      formik.setValues({
        ...formik.values,
        gallery: updatedGallery,
      });
    } else {
      updatedState = [...uploadedImg, ...imagesArray];

      const newFiles = Array.from(event.target.files);
      const currentGallery = formik.values.gallery;
      const updatedGallery = [...currentGallery, ...newFiles];

      formik.setValues({
        ...formik.values,
        gallery: updatedGallery,
      });
    }

    setUploadedImg(updatedState);
  };

  const handleCategory = (id: number) => {
    formik.setValues({
      ...formik.values,
      category_id: id,
    });
  };

  const setEndDate = (date: Date) => {
    formik.setValues({
      ...formik.values,
      end_date: date,
    });
  };

  const setDescription = (description: string) => {
    formik.setValues({
      ...formik.values,
      description: description,
    });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
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

  const cate_options = categoryList?.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  

  const handleGalleryRemove = async (id: number, type: string) => {
    if (type == "id") {
      const res = await RemoveGalleryPhoto(id, token);
      if (res.success == false || res.error || res.errors) {
        multipleError(res.error || res.errors);
      } else {
        success(res.message);
        const updatedGallery = gallery.filter((img: any) => img.id !== id);
        setGallery(updatedGallery);
      }
    } else {
      const updatedGallery = uploadedImg.filter(( index) => index !== id);
      setUploadedImg(updatedGallery);
    }
  };

  
  return (
    <div>
      <h2 className="auc-primary-heading">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 min-768:grid-cols-2  gap-x-[28px] gap-y-[32px]">
          <div className="col-span-2">
            <label htmlFor="campaign-name">{translate("Campaign Name")}</label>
            <input
              className="border  !outline-auc-primary-color border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              type="name"
              autoComplete="off"
              name="title"
              id="campaign-name"
              placeholder="Campaign Name"
              value={values.title}
              onChange={handleChange}
            />
            {errors.title && touched.title && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.title}</span>
            )}
          </div>
          <div>
            <label htmlFor="category">{translate("Category")}</label>
            <div className="mt-[16px] w-full">
              <NiceSelect
                options={cate_options}
                onChange={(e) => handleCategory(e.id)}
                defaultValue={Number(values?.category_id)}
                wrapperClass=""
              />
            </div>
            {errors.category_id && touched.category_id && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.category_id}</span>
            )}
          </div>

          <div>
            <label htmlFor="goal-Amount">
              {translate("Goal Amount")} (<CurrencyCode />)
            </label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="goal"
              id="goal-Amount"
              placeholder="$0.00"
              value={values.goal}
              onChange={handleChange}
            />
            {errors.goal && touched.goal && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.goal}</span>
            )}
          </div>

          <div>
            <label htmlFor="location">{translate("Loaction")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="location"
              id="location"
              placeholder="Enter Location"
              value={values.location}
              onChange={handleChange}
            />
            {errors.location && touched.location && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.location}</span>
            )}
          </div>

          <div>
            <label htmlFor="benefits">{translate("People Benefits")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="benefits"
              id="benefits"
              placeholder="People Benefits"
              value={values.benefits}
              onChange={handleChange}
            />
            {errors.benefits && touched.benefits && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.benefits}</span>
            )}
          </div>

          <div>
            <label htmlFor="product-name">
              {translate("End date (Deadline)")}
            </label>
            <SelectDate
              setEndDate={setEndDate}
              values={values?.end_date}
              style={
                "border outline-auc-primary-color text-[#6b788e] border-auc-text-color-500 px-[24px] py-[19px]  w-full h-[60px] rounded-[8px] mt-[16px]"
              }
            />
            {errors.end_date && touched.end_date && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.end_date}</span>
            )}
          </div>

          <div>
            <label htmlFor="benefits">{translate("Video Link")}</label>
            <input
              className="auc-common-input mt-[16px] w-full"
              type="text"
              autoComplete="off"
              name="video_link"
              id="video_link"
              placeholder="Video Link"
              value={values.video_link}
              onChange={handleChange}
            />
            {errors.video_link && touched.video_link && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.video_link}</span>
            )}
          </div>

          {/* text area  */}
          <div className="col-span-1 min-768:col-span-2 mb-9 ">
            <label htmlFor="productDescriptionBox">
              {translate("Product Description")}
            </label>
            <ReactQuill
              className="h-[200px] mt-4"
              theme="snow"
              value={values.description}
              onChange={setDescription}
            />
          </div>
          {errors.description && touched.description && (
            <span className=" text-red-400 capitalize -mt-2 inline-block">{errors.description}</span>
          )}

          <div className="col-span-1 min-768:col-span-2">
            <label htmlFor="photo">
              <span className="">
                {translate("Upload Image")}
              </span>

              <img
                className="rounded-[8px] my-2 w-[200px] h-[200px] cursor-pointer object-cover"
                src={image ? image : "/assets/img/image-uplod.png"}
                width={200}
                height={200}
                alt=""
              />
              <input
                type="file"
                id="photo"
                onChange={handleImage}
                className="hidden"
              />
            </label>
            {errors.photo && touched.photo && (
              <span className=" text-red-400 capitalize mt-2 inline-block">{errors.photo}</span>
            )}
          </div>

          {/* Upload Image Start  */}
          <div className="col-span-1 min-768:col-span-2 ">
            <label htmlFor="product-name">
              {translate("Upload Image")}
            </label>
            <div className="grid grid-cols-1 min-768:grid-cols-2 min-1200:grid-cols-3 min-1440:grid-cols-4 mt-[16px] gap-[26px] p-[24px] border border-auc-border-color rounded-[8px] overflow-hidden">
              {gallery?.length > 0 &&
                gallery.map((img: { id: number; photo: string }) => (
                  <div key={img.id} className="relative">
                    <span
                      onClick={() => handleGalleryRemove(img.id, "id")}
                      className="absolute top-[10px] right-[10px] text-center cursor-pointer text-white rounded-[50%] bg-red-600 hover:bg-red-500 w-[25px] h-[25px] inline-flex justify-center items-center"
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </span>
                    <img
                      className="w-[200px] h-[200px] object-cover rounded-[8px]"
                      src={`${img.photo}`}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                ))}
              {uploadedImg?.length > 0 &&
                uploadedImg.map((img, index) => (
                  <div key={index} className="relative">
                    <span
                      onClick={() => handleGalleryRemove(index, "index")}
                      className="absolute right-1 text-center cursor-pointer text-white rounded-[50%] bg-red-600 w-5"
                    >
                      x
                    </span>
                    <img
                      className="w-full h-full object-cover rounded-[8px]"
                      src={`${img}`}
                      width={200}
                      height={200}
                      alt=""
                    />
                  </div>
                ))}
              {uploadedImg?.length <= 7 && (
                <div className="relative cursor-pointer">
                  <img
                    className="w-full h-full"
                    src="/assets/img/image-uplod.png"
                    width={200}
                    height={200}
                    alt=""
                  />
                  <input
                    className="absolute outline-auc-primary-color top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    type="file"
                    autoComplete="off"
                    name="product-name"
                    id="product-name"
                    multiple
                    accept="image/*"
                    onChange={(event) => handleUploadedImage(event)}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Upload Image End */}

          {/* product specifications container start */}
          <div className="col-span-1 min-768:col-span-2 ">
            <label htmlFor="product-name">{translate("Campaign Faq")}</label>
            <div className="flex flex-col mt-[16px] gap-[24px]">
              {values.faq_title?.map((faq_title, index) => (
                <>
                  <div
                    key={index}
                    className="  items-center p-[15px] min-768:p-0   min-768:border-0 rounded-[8px]"
                  >
                    <div className="flex flex-wrap gap-[20px]  min-768:flex-nowrap mb-[24px]">
                      <input
                        className="auc-common-input w-full min-768:w-[40%]  flex-1"
                        type="text"
                        autoComplete="off"
                        name={`faq_title[${index}]`}
                        id="specification-name"
                        placeholder="Question"
                        value={faq_title}
                        onChange={handleChange}
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          values.faq_title.splice(index, 1);
                          values.faq_content.splice(index, 1);
                          formik.setValues({
                            ...values,
                            faq_title: values.faq_title,
                            faq_content: values.faq_content,
                          });
                        }}
                        type="submit"
                        className="auc-btn-light-red rounded-[8px] w-[48px] min-768:w-[60px] h-[48px] min-768:h-[60px] flex justify-center items-center"
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.667 5.33333V2.66667C22.667 1.95942 22.386 1.28115 21.8859 0.781049C21.3858 0.280952 20.7076 0 20.0003 0L12.0003 0C11.2931 0 10.6148 0.280952 10.1147 0.781049C9.61461 1.28115 9.33366 1.95942 9.33366 2.66667V5.33333H2.66699V8H5.33366V28C5.33366 29.0609 5.75509 30.0783 6.50523 30.8284C7.25538 31.5786 8.27279 32 9.33366 32H22.667C23.7279 32 24.7453 31.5786 25.4954 30.8284C26.2456 30.0783 26.667 29.0609 26.667 28V8H29.3337V5.33333H22.667ZM14.667 22.6667H12.0003V14.6667H14.667V22.6667ZM20.0003 22.6667H17.3337V14.6667H20.0003V22.6667ZM20.0003 5.33333H12.0003V2.66667H20.0003V5.33333Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                    </div>
                    <input
                      className="auc-common-input  w-[calc(100%-72px)] min-768:w-[calc(100%-84px)]"
                      type="text"
                      autoComplete="off"
                      name={`faq_content[${index}]`}
                      id="specification-value"
                      placeholder="Answer"
                      value={values.faq_content[index]}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                text={"Add Faq"}
                styles={
                  "auc-btn-secondary w-full min-768:w-[170px] ml-auto mt-[32px]"
                }
                clickHandler={(e) => {
                  e.preventDefault();
                  formik.setValues({
                    ...formik.values,
                    faq_title: [...formik.values.faq_title, ""],
                    faq_content: [...formik.values.faq_content, ""],
                  });
                }}
              />
            </div>
          </div>
          {/* product specifications container end */}
        </div>
        <Button
          text="Submit"
          status={isSubmitting}
          btnType="submit"
          styles={"auc-btn-primary w-full mt-[48px]"}
        />
      </form>
    </div>
  );
};

export default EditCampaign;
