
import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { Settings } from "@/helper/helper";

import { Link, useSearchParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

function FailPayment() {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const message = searchParams.get("message");

  const image = Settings("checkout_faild_photo");
  const text = Settings("checkout_faild_text");

  const settings = useStore((state) => state.settings);

  if ( !settings) return <CardsSkeleton />;
  return (
    <>
      <Helmet>
        <title>{translate("Payment Failed")}</title>
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

            <h4 className="mb-16 text-center text-red">Your Payment Failed</h4>
            <h5 className="text-center text-red">
              {message}
            </h5>
            <p className="mb-40 text-center">
              {text}
            </p>
            <div className="d-flex justify-content-center flex-wrap gap-4">
              <Link to="#" className="ch-btn ch-primary-btn">
                Contact With us
              </Link>
              <Link to={`/checkout/${slug}`} className="ch-btn ch-primary-btn">
                Try again
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
}

export default FailPayment;
