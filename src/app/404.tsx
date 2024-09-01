import { translate } from "@/helper/helper";

import { Link } from "react-router-dom";

export default function Custom404() {
  return (
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
          <Link to="#" className="ch-btn ch-primary-btn" 
               
              
          >
            {translate("Back to Home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
