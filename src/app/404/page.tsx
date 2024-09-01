
import { Link } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";
import { CardsSkeleton } from "../ui/skeletons";

export default function Custom404() {
  const settings = useStore((state) => state.settings);

  if (!settings) return <CardsSkeleton />;

  return (
    <>
      <Header />
      <div className="container mt-60 mb-120">
        <div className="row justify-content-center">
          <div className="col-lg-8 d-flex flex-column align-items-center justify-content-center">
            <img
              src={`/assets/images/404-img.png`}
              width={1080}
              height={750}
              alt="success image"
              className="mb-60 img-fluid"
              data-aos="fade"

            />
            <Link to="/" className="ch-btn ch-primary-btn"


            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
