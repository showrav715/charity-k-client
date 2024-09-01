
import { Helmet } from 'react-helmet';
import { Settings, translate } from "@/helper/helper";
import { Link, useSearchParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from '@/app/ui/skeletons';

function SuccessPayment() {
  const [searchParams] = useSearchParams(); // [1
  const txn_id = searchParams.get('txn_id');
  const image = Settings("checkout_success_photo");
  const message = Settings("checkout_success_text");

  const settings = useStore((state) => state.settings);

  if (!settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Success")}</title>
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
            <h4 className="mb-16 text-center">{translate("Thank You")}</h4>
            <h5 className="text-center">
              {translate("Your donation was successfully completed")}{" "}
            </h5>
            <h6 className="text-center">{translate("Your Transaction ID:")} {txn_id}</h6>
            <p className="mb-40 text-center">{message}</p>
            <Link to="/" className="ch-btn ch-primary-btn">
              {translate("Go to Home")}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SuccessPayment;
