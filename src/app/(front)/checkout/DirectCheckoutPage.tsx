
import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

import Select from "react-select";
import {
  CurrencyId,
  ShowConvertPrice,
  ShowCurrencyPrice,
  ShowCurrencyWithoutConvert,
  ShowCurrencySign,
  multipleError,
  translate,
} from "@/helper/helper";
import {
  GetCampaignDetails,
  GetCampaignList,
  GetGateways,
  SubmitCampaign,
} from "@/@actions/frontend";
import { Campaign, PaymentGatewayResponse } from "@/@types/frontend";


import * as yup from "yup";
import { useFormik } from "formik";
import { CardsSkeleton } from "@/app/ui/skeletons";
import Loader from "@/helper/Loader";

export default function DirectCheckoutPage() {
  const [campaign, setCampaign] = useState<Campaign>(null);
  const [amount, setAmount] = useState(0);
  const [filteredCampaignList, setFilteredCampaignList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, settings } = useStore();
  const router = useNavigate();
  const [isTerms, setTerms] = useState(false);
  const [isForm, setisForm] = useState(false);

  const [isAnonymous, setAnonymous] = useState(false);
  const [isTips, setIsTips] = useState(true);
  const [preloaded, setPreloaded] = useState([]);
  const [method, setMethod] = useState<PaymentGatewayResponse[]>([]);
  const [tips, setTips] = useState<number>(0);
  const currencyId = CurrencyId();

  const getCampaign = async () => {
    const response = await GetCampaignList();
    const filter = response.data.map((campaign) => {
      return {
        slug: campaign.slug,
        label: campaign.title,
        value: campaign.title,
      };
    });

    setFilteredCampaignList(filter);
  };

  useEffect(() => {
    getCampaign();
    setLoading(false);
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
    if (value < 0) return setAmount(null);
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
    amount: yup.number().min(1).required("Amount is required"),
    campaign: yup.string().required("Please select a campaign"),

    card_number: !isForm
      ? yup.string()
      : yup.string().required("Card number is required"),
    expiry_month: !isForm
      ? yup.string()
      : yup.string().required("Expiry month is required"),
    expiry_year: !isForm
      ? yup.string()
      : yup.string().required("Expiry month is required"),
    cvv: !isForm
      ? yup.string()
      : yup.string().required("Expiry month is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      campaign: "",
      amount: 0,
      gateway: "",
      currency_id: currencyId as number,
      tips: 0,
      user_id: user ? user?.id : "",
      card_number: "",
      expiry_month: "",
      expiry_year: "",
      cvv: "",
    },

    validationSchema: schema,

    onSubmit: async (values) => {
      const res = await SubmitCampaign(values);
      if (res?.status == 0) {
        multipleError(res.message);
      }

      if (res?.status == 1) {
        if (res.url != null && res.url != "") {
          window.location.href = res.url;
        }

        if (res.json != null && res.json != "") {
          router(
            `/checkout/rezorpay?json=${res.json}&notifyUrl=${res.notify_url}&slug=${campaign?.slug}`
          );
        }

        if (res.json != null && res.gateway == "paystack") {
          router(
            `/checkout/paystack?json=${res.json}&notifyUrl=${res.notify_url}&slug=${campaign?.slug}`
          );
        }



        if (res.gateway != null && res.gateway == "authorize") {
          if (res.status == 1) {
            router(
              `/checkout/success?txn_id=${res.txn_id}&notifyUrl=${res.notify_url}&message=${res?.message}`
            );
          } else {
            router(
              `/checkout/failed?slug=${campaign?.slug}&notifyUrl=${res.notify_url}&message=${res?.message}`
            );
          }
        }


        return true;
      }
    },
  });

  const { handleSubmit, handleChange, isSubmitting } = formik;

  const handleSelectionChange = async (slug: string) => {
    const campaigns = await GetCampaignDetails(slug);
    setCampaign(campaigns.campaign);
    setPreloaded(campaigns.preloaded);
    formik.setFieldValue("campaign", slug);
  };

  if (loading || !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Checkout")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Donate Now"
        menus={[
          { pageToLink: "/", pageLable: "Home" },
          { pageToLink: "/donation", pageLable: "Donation" },
          {
            pageToLink: "/donation",
            pageLable: "Donation",
          },
        ]}
      />

      <div className="ch-checkout-page-wrapper">
        <div className="container">
          <form onSubmit={handleSubmit} className="donation-wrapper">
            <div
              className="make-donation-summary-box d-flex flex-column"


            >
              <h4 className="checkout-title">{translate("Choose Campaign")} </h4>
              <h5>Select Campaign</h5>

              <Select
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    border: "1px solid #028347",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    boxShadow: "none",
                    "&:hover": {
                      border: "1px solid #028347",
                    },
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? "#028347"
                      : state.isFocused
                        ? "#cceede"
                        : "transparent",
                    // color: state.isSelected ? "#000" : "#333",
                  }),
                }}
                options={filteredCampaignList}
                onChange={(e) => handleSelectionChange(e.slug)}
              />

              {formik.errors.campaign && formik.touched.campaign && (
                <span className="text-red-400 mt-2 text-capitalize  block">
                  {formik.errors.campaign}
                </span>
              )}

              <div className="d-block mt-32">
                {campaign && (
                  <div className="single-sm-blog-card single-donation-card">
                    <img
                      src={campaign.api_photo}
                      width={100}
                      height={100}
                      alt="donation image"
                      className="donation-img"
                    />
                    <div className="sm-blog-content">
                      <h5 className="blog-title">
                        <Link to="#">{campaign.title}</Link>
                      </h5>
                      <Link to="#" className="date-link">
                        Created By: {campaign.author}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <ul className="transection-list">
                <li>
                  <span>{translate("your donation")}</span>
                  <span>
                    <ShowCurrencyWithoutConvert price={amount} />
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
                <span>{translate("Total")}</span>
                <span>
                  <ShowCurrencyWithoutConvert price={Number(total())} />
                </span>
              </div>
            </div>
            <div
              className="make-donation-box"


              data-aos-delay="100"
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
                    className="donation-input mb-0"
                    placeholder="Enter Amount"
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
                  <div>
                    <label className="personal-info-label" htmlFor="name">
                      {translate("Your Full Name")}
                    </label>
                    <div className="mb-24">
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
                        <span className="text-red-400 mt-2  block text-capitalize">
                          {formik.errors.name}
                        </span>
                      )}
                    </div>
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
                      placeholder={translate("Address")}
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

              {isForm && (
                <div className="personal-info-wrapper">
                  <h5 className="checkout-title mb-0">
                    {translate("Enter Card Information")}{" "}
                  </h5>
                  <div>
                    <label
                      className="personal-info-label"
                      htmlFor="card_number"
                    >
                      {translate("Enter Card Number")}
                    </label>
                    <div className="mb-24">
                      <input
                        className="personal-info-input mb-0"
                        placeholder="Enter Your Card Number"
                        type="text"
                        id="card_number"
                        name="card_number"
                        onChange={handleChange}
                        value={formik.values.card_number}
                      />
                      {formik.errors.card_number &&
                        formik.touched.card_number && (
                          <span className="text-red-400 mt-2  block text-capitalize">
                            {formik.errors.card_number}
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="expiry_month"
                    >
                      {translate("Enter Expiry Month")}
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Enter Expiry Month"
                      type="text"
                      id="expiry_month"
                      name="expiry_month"
                      onChange={handleChange}
                      value={formik.values.expiry_month}
                    />
                    {formik.errors.expiry_month &&
                      formik.touched.expiry_month && (
                        <span className="text-red-400 mt-2 text-capitalize  block">
                          {formik.errors.expiry_month}
                        </span>
                      )}
                  </div>

                  <div className="mb-24">
                    <label
                      className="personal-info-label"
                      htmlFor="expiry_year"
                    >
                      {translate("Enter Expiry Year")}
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Enter Expiry Year"
                      type="text"
                      id="expiry_year"
                      name="expiry_year"
                      onChange={handleChange}
                      value={formik.values.expiry_year}
                    />
                    {formik.errors.expiry_year &&
                      formik.touched.expiry_year && (
                        <span className="text-red-400 mt-2 text-capitalize  block">
                          {formik.errors.expiry_year}
                        </span>
                      )}
                  </div>

                  <div className="mb-24">
                    <label className="personal-info-label" htmlFor="cvv">
                      {translate("Enter CVV")}
                    </label>
                    <input
                      className="personal-info-input mb-0"
                      placeholder="Enter CVV"
                      type="text"
                      id="cvv"
                      name="cvv"
                      onChange={handleChange}
                      value={formik.values.cvv}
                    />
                    {formik.errors.cvv && formik.touched.cvv && (
                      <span className="text-red-400 mt-2 text-capitalize  block">
                        {formik.errors.cvv}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <h5>{translate("Choose Your Payment Method")}</h5>
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
                        if (gateway.keyword == "authorize") {
                          setisForm(true);
                        } else {
                          setisForm(false);
                        }
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
                donate now
                <Loader status={isSubmitting} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
