
import NotFounds from "../../../app/ui/NotFounds";
import { Settings, translate } from "../../../helper/helper";
import { Link } from "react-router-dom";

export default function FAQSection({ page_data }) {
  return (
    <div className="home-2-faq-section">
      <div className="container">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                className="sm-title"
              >
                {translate("FAQ")}
              </h5>
              <h2 className="title">
                {translate("Common Queries: Your Questions Answered")}
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-5 align-items-center">
          <div className="col-lg-6" >
            <div className="custom-faq-wrapper">
              <div className="accordion" id="accordionExample">
                {page_data && page_data?.length > 0 ? (
                  page_data?.map((data) => (
                    <div className="accordion-item" key={data?.id}>
                      <h2
                        className="accordion-header"
                        id={`heading_${data?.id}`}
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseOne_${data?.id}`}
                          aria-expanded={false}
                          aria-controls={`collapseOne_${data?.id}`}
                        >
                          {data?.title}
                        </button>
                      </h2>
                      <div
                        id={`collapseOne_${data?.id}`}
                        className={`accordion-collapse collapse
                          }`}
                        aria-labelledby={`heading_${data?.id}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">{data?.details}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <NotFounds />
                )}
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 d-none d-lg-block"

          >
            <img
              src={Settings("faq_background")}
              width={616}
              height={577}
              alt={`faq img`}
              className="faq-img"
            />
          </div>
        </div>
        <div
          className="col-lg-12 text-center mt-60"
        >
          <Link to="/faq" className="ch-btn ch-primary-btn">
            {translate("Explore All FAQS")}
          </Link>
        </div>
      </div>
    </div>
  );
}
