
import { Helmet } from 'react-helmet';
import { useState } from "react";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';


import {
  GetCampaignDetails,
  GetGateways,
  SubmitCampaign,
} from "@/@actions/frontend";
import { useEffect } from "react";
import { Campaign, PaymentGatewayResponse } from "@/@types/frontend";
import { CardsSkeleton } from "@/app/ui/skeletons";
import {
  CurrencyId,
  ShowConvertPrice,
  ShowCurrencySign,
  ShowCurrencyWithoutConvert,
  translate,
  ShowCurrencyPrice
} from "@/helper/helper";
import { useFormik } from "formik";
import Loader from "@/helper/Loader";
import { useStore } from "@/store/index";



export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { user, settings } = useStore();
  const router = useNavigate();
  const [isTerms, setTerms] = useState(false);
  const [amount, setAmount] = useState(searchParams.get("amount") || 0);
  const [isAnonymous, setAnonymous] = useState(false);
  const [isTips, setIsTips] = useState(true);
  const [campaign, setCampaign] = useState<Campaign>(null);
  const [preloaded, setPreloaded] = useState([]);
  const [method, setMethod] = useState<PaymentGatewayResponse[]>([]);
  const [tips, setTips] = useState<number>(0);
  const currencyId = CurrencyId();

  useEffect(() => {
    const getData = async () => {
      const campaign = await GetCampaignDetails(params?.slug);
      setCampaign(campaign.campaign);
      setPreloaded(campaign.preloaded);
    };
    getData();
  }, []);

  // currency wise gateway fetch
  useEffect(() => {
    const getGateway = async () => {
      const gatewayData = await GetGateways(currencyId);
      setMethod(gatewayData as any);
    };
    getGateway();
    formik.setFieldValue("currency_id", currencyId);
  }, [currencyId]);

  // preloaded amount
  const PreLoadedAmount = (value: number) => {
    if (value < 0) return setAmount(0);
    const amount = ShowConvertPrice({ price: value });
    setAmount(amount as number);
  };

  // total amount
  const total = () => {
    let totalAmount = Number(tips) + Number(amount);
    if (totalAmount < 0) totalAmount = 0;
    return totalAmount.toFixed(2);
  };

  // tips and amount calculation
  useEffect(() => {
    total();

    formik.setValues({
      ...formik.values,
      amount: Number(amount),
      tips: Number(tips),
    });
  }, [tips, amount]);

  // formik

  const schema = yup.object().shape({
    name: isAnonymous
      ? yup.string()
      : yup.string().required("Name is required"),
    email: isAnonymous
      ? yup.string()
      : yup.string().email().required("Email is required"),
    phone: isAnonymous
      ? yup.string()
      : yup.string().required("Phone number is required"),
    address: isAnonymous
      ? yup.string()
      : yup.string().required("Address is required"),
    gateway: yup.string().required("Please select a payment method"),
    amount: yup.number().min(1),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      campaign: params?.slug,
      amount: 0,
      gateway: "",
      currency_id: currencyId as number,
      tips: 0,
      user_id: user ? user?.id : "",
    },

    validationSchema: schema,

    onSubmit: async (values) => {
      const res = await SubmitCampaign(values);
      if (res.status == 1) {
        if (res.url != null && res.url != "") {
          window.location.href = res.url;
        }

        if (res.json != null) {
          router(
            `/checkout/rezorpay?json=${res.json}&notifyUrl=${res.notify_url}&slug=${params?.slug}`
          );
        }

        if (res.json != null && res.gateway == "paystack") {
          router(
            `/checkout/paystack?json=${res.json}&notifyUrl=${res.notify_url}&slug=${params?.slug}`
          );
        }
      }

      return true;
    },
  });

  const { handleSubmit, handleChange, isSubmitting } = formik;

  if (!campaign || !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Checkout")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title={campaign?.title}
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/donation", pageLable: "Donation" },
          {
            pageToLink: "/donation",
            pageLable: campaign?.title,
          },
        ]}
      />

      <div className="ch-checkout-page-wrapper">
        <div className="container">
          <form onSubmit={handleSubmit} className="donation-wrapper">
            <div
              className="make-donation-box"


            >
              <h4 className="checkout-title">{translate("Make a Donation")}</h4>

              <h5>{translate("Enter Amount")}</h5>
              <div className="mb-24">
                <div className="input-with-currency">
                  <span className="currency-icon">
                    <ShowCurrencySign />
                  </span>
                  <input
                    type="number"
                    step="any"
                    name="amount"
                    placeholder={translate("Enter Amount")}
                    className="donation-input mb-0"
                    value={amount}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        setAmount(null);
                      } else {
                        setAmount(Number(e.target.value));
                      }
                    }}
                  />
                </div>

                {formik.errors.amount && formik.touched.amount && (
                  <span className="text-red-400 mt-2 text-capitalize  block">
                    {formik.errors.amount}
                  </span>
                )}
              </div>

              <div className="donation-amount-wrapper mb-40">
                {preloaded.map((preloaded) => (
                  <button
                    type="button"
                    key={preloaded.id}
                    onClick={() => PreLoadedAmount(preloaded.amount as number)}
                    className="fixed-donation-amount"
                  >
                    <ShowCurrencyPrice price={preloaded.amount} />
                  </button>
                ))}
              </div>

              <h5>{translate("Personal Information")}</h5>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="make_anonymous"
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="make_anonymous">
                  {translate("Make me anonymous")}
                </label>
              </div>

              {!isAnonymous && (
                <div className="personal-info-wrapper">
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
                      onChange={handleChange}
                      value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name && (
                      <span className="text-red-400 mt-2 text-capitalize  block">
                        {formik.errors.name}
                      </span>
                    )}
                  </div>

                  <div className="mb-24">
                    <label className="personal-info-label" htmlFor="email">
                      {translate("Your Email")}
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder={translate("Your Email")}
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleChange}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <span className="text-red-400 mt-2 text-capitalize  block">
                        {formik.errors.email}
                      </span>
                    )}
                  </div>

                  <div className="mb-24">
                    <label className="personal-info-label" htmlFor="phone">
                      {translate("Phone")}
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder={translate("Phone")}
                      type="number"
                      id="phone"
                      name="phone"
                      onChange={handleChange}
                      value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone && (
                      <span className="text-red-400 mt-2 text-capitalize  block">
                        {formik.errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="mb-24">
                    <label className="personal-info-label" htmlFor="address">
                      {translate("Address")}
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Address"
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleChange}
                      value={formik.values.address}
                    />
                    {formik.errors.address && formik.touched.address && (
                      <span className="text-red-400 mt-2 text-capitalize  block">
                        {formik.errors.address}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <h5>{translate("Choose Your Payment Method")} </h5>
              <div className="payment-wrapper mb-0">
                {method?.map((gateway) => (
                  <div className="single-payment" key={gateway.id}>
                    <input
                      type="radio"
                      name="gateway"
                      id={gateway.keyword}
                      value={formik.values.gateway}
                      onChange={() => {
                        formik.setFieldValue("gateway", gateway.keyword);
                      }}
                    />

                    <label
                      className={`${formik.values.gateway == gateway.keyword && "selected"
                        }`}
                      htmlFor={gateway.keyword}
                    >
                      <img
                        src={gateway.api_photo}
                        width={144}
                        height={92}
                        alt="payment img"
                        className="payment-img"
                      />
                    </label>
                  </div>
                ))}
              </div>
              {formik.errors.gateway && formik.touched.gateway && (
                <div className="mb-24">
                  <span className="text-red-400 mt-2 text-capitalize  block">
                    {formik.errors.gateway}
                  </span>
                </div>
              )}

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={() => {
                    setTerms(!isTerms);
                  }}
                  value=""
                  id="agree_terms_and_conditions"
                />
                <label
                  className="form-check-label"
                  htmlFor="agree_terms_and_conditions"
                >
                  {translate("I agree to the")} <Link to="#">{translate("terms and conditions")}</Link> {translate("and")}{" "}
                  <Link to="#">{translate("privacy policy")}</Link>
                </label>
              </div>

              <button
                type="submit"
                className={`ch-btn ch-primary-btn w-100 ${(isSubmitting || !isTerms) && "disabled"
                  } `}
                disabled={isSubmitting || !isTerms}
              >
                {translate("donate now")}
                <Loader status={isSubmitting} />
              </button>
            </div>
            <div
              className="make-donation-summary-box"


              data-aos-delay="100"
            >
              <h4 className="checkout-title">{translate("Your Donation Summary")} </h4>
              <div className="single-sm-blog-card single-donation-card">
                <img
                  src={campaign?.api_photo}
                  width={100}
                  height={100}
                  alt="donation image"
                  className="donation-img"
                />
                <div className="sm-blog-content">
                  <h5 className="blog-title">
                    <Link to={`/campaigns/${campaign?.slug}`}>{campaign?.title}</Link>
                  </h5>
                  <Link to={`/campaigns/${campaign?.slug}`} className="date-link">
                    {translate("Created By: Admin")}
                  </Link>
                </div>
              </div>

              <ul className="transection-list">
                <li>
                  <span>{translate("your donation")}</span>
                  <span>
                    <ShowCurrencyWithoutConvert price={Number(amount)} />
                  </span>
                </li>

                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isTips}
                    value=""
                    id="forTips"
                    onChange={() => setIsTips(!isTips)}
                  />
                  <label className="form-check-label" htmlFor="forTips">
                    {translate("Make a donation to Fundorex")}
                  </label>
                </div>

                {isTips && (
                  <li>
                    <span>{translate("Fundorex tip")}</span>
                    <div className="input-with-currency">
                      <span className="currency-icon">
                        <ShowCurrencySign />
                      </span>
                      <input
                        type="number"
                        min={0}
                        className="donation-input"
                        onChange={(e) => setTips(Number(e.target.value))}
                        value={tips}
                      />
                    </div>
                  </li>
                )}
              </ul>
              <div className="total-amount-box">
                <span>{translate("total")}</span>
                <span>
                  <ShowCurrencyWithoutConvert price={Number(total())} />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
