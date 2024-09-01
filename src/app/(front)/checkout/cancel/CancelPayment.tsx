
import { Helmet } from 'react-helmet';
import { Settings, translate } from "@/helper/helper";

import { Link, useSearchParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

function CancelPayment() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const image = Settings("checkout_faild_photo");
  const message = Settings("checkout_faild_text");

  const settings = useStore((state) => state.settings);

  if ( !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Payment Cancelled")}</title>
      </Helmet>
      <Header />
      <div className="container mt-60 mb-120">
        <div
          className="row justify-content-center"
        >
          <div className="col-lg-8 d-flex flex-column align-items-center justify-content-center">
            {image != "/.." && (
              <img
                src={image}
                width={450}
                height={541}
                alt="success img"
                className="mb-24 img-fluid"
              />
            )}
            <h4 className="mb-16 text-center">Your Payment Failed</h4>
            <h5 className="text-center">Your payment was not completed</h5>

            <p className="mb-40 text-center">{message}</p>
            <Link to={`/checkout/${slug}`} className="ch-btn ch-primary-btn">
              Try again
            </Link>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
}

export default CancelPayment;
