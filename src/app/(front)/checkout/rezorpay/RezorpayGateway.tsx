
import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

function RezorpayGateway() {

  const [paymentId, setPaymentId] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const router = useNavigate();
  const [searchParams] = useSearchParams();


  const settings = useStore((state) => state.settings);

  //return true;

  interface IJson {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    mid: string;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
  }

  const slug = searchParams.get("slug");
  const notifyUrl = searchParams.get("notifyUrl");
  const json =
    searchParams.get("json") && (JSON.parse(searchParams.get("json")) as IJson);

  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    notes: {
      address: string;
      merchant_order_id: string;
    };
    theme: {
      color: "#F37254";
    };
    modal: {
      ondismiss: () => void;
      escape: boolean;
      backdropclose: boolean;
    };
    handler: (response: any) => void;
  }

  const options: RazorpayOptions = {
    key: json?.key,
    amount: json?.amount,
    currency: json?.currency,
    name: json?.name || "Announce purchase",
    description: json?.description || "Announce purchase",
    image: json?.image || "/path/to/logo.png",
    order_id: json?.order_id || "order_ABC123",
    prefill: {
      name: json?.prefill?.name || "John Doe",
      email: json?.prefill?.email || "john@example.com",
      contact: json?.prefill?.contact || "9876543210",
    },
    notes: {
      address: "123 Main St, City",
      merchant_order_id: json?.mid,
    },
    theme: {
      color: "#F37254",
    },
    modal: {
      ondismiss: () => {
        router(`/checkout/${slug}`);
      },
      escape: true,
      backdropclose: false,
    },
    handler: async function (response) {
      setPaymentId(response.razorpay_payment_id);
      setSignature(response.razorpay_signature);
      await new Promise((resolve) => setTimeout(resolve, 300));
      await handleSubmit();
    },
  };

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      initializeRazorpay();
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeRazorpay = () => {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async () => {
    const form = document.getElementById("razorpayform") as HTMLFormElement;
    form.submit();
  };
  if (!settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Checkout")}</title>
      </Helmet>
      <Header />
      <div>
        <form id="razorpayform" action={notifyUrl} method="POST">
          <input
            type="hidden"
            name="razorpay_payment_id"
            id="razorpay_payment_id"
            value={paymentId}
          />
          <input
            type="hidden"
            name="razorpay_signature"
            id="razorpay_signature"
            value={signature}
          />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default RezorpayGateway;
