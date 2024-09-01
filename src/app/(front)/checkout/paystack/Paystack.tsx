
import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { usePaystackPayment } from "react-paystack";
import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

function Paystack() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const json = searchParams.get("json") && JSON.parse(searchParams.get("json"));

  const config = {
    reference: new Date().getTime().toString(),
    email: json.email,
    amount: json.amount * 100,
    publicKey: json?.public_key,
  };

  // you can call this function anything
  const onSuccess = (reference: any) => {
    handleSubmit(reference);
  };

  const handleSubmit = async (reference: any) => {
    const formdata = new FormData();
    formdata.append("trans", reference.trans);
    if (reference.status == "success" && reference.message == "Approved") {
      const res = await fetch(searchParams.get("notifyUrl"), {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formdata,
      });

      const data = await res.json();
      if (data.status == 1) {
        router("/checkout/success?txn_id=" + data.txn_id);
      } else {
        router("/checkout/fail?slug=" + data.slug);
      }
    }
  };

  const onClose = () => {
    router("/checkout/" + searchParams.get("slug"))
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    ok();
  }, [initializePayment]);

  const ok = () => {
    initializePayment({ onSuccess, onClose });
  };

  const settings = useStore((state) => state.settings);

  if ( !settings) return <CardsSkeleton />;

  return <>
   <Header />
    <Helmet>
      <title>{translate("Checkout")}</title>
    </Helmet>
    <Footer /> 
  </>;
}

export default Paystack;
