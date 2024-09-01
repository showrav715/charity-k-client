import { contactPageDataResponse } from "@/@types/frontend";
import { translate } from "@/helper/helper";

export default function ContactInfo({
  page_data,
}: {
  page_data: contactPageDataResponse;
}) {
  return (
    <div className="ch-contact-page-infor-area">
      {/* shape */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="201"
        height="201"
        viewBox="0 0 201 201"
        fill="none"
        className="left-phone-shape"
      >
        <g clipPath="url(#clip0_1665_7359)">
          <path
            d="M152.813 132.965C146.247 126.482 138.049 126.482 131.524 132.965C126.546 137.901 121.569 142.836 116.675 147.855C115.337 149.236 114.208 149.528 112.576 148.608C109.356 146.852 105.926 145.43 102.831 143.506C88.4009 134.429 76.3131 122.76 65.6056 109.626C60.2937 103.101 55.5673 96.1164 52.2631 88.2531C51.5939 86.6637 51.7193 85.6181 53.0159 84.3214C57.9933 79.5114 62.8451 74.5759 67.7388 69.6404C74.5564 62.7809 74.5564 54.7503 67.6969 47.849C63.8071 43.9173 59.9173 40.0693 56.0274 36.1377C52.0121 32.1223 48.0386 28.0652 43.9815 24.0917C37.4148 17.6923 29.2168 17.6923 22.6919 24.1335C17.6728 29.069 12.8628 34.13 7.75999 38.9818C3.03363 43.4572 0.649533 48.9365 0.147618 55.3359C-0.64708 65.7506 1.90432 75.5798 5.50137 85.158C12.8628 104.984 24.0722 122.592 37.6657 138.737C56.0274 160.571 77.9444 177.845 103.584 190.309C115.128 195.914 127.09 200.222 140.098 200.933C149.049 201.435 156.829 199.176 163.061 192.191C167.327 187.423 172.137 183.073 176.654 178.514C183.346 171.738 183.388 163.54 176.738 156.848C168.791 148.859 160.802 140.912 152.813 132.965Z"
            fill="#0E2751"
          />
          <path
            d="M144.826 99.6302L160.26 96.9951C157.834 82.816 151.142 69.9754 140.978 59.7698C130.229 49.0205 116.635 42.2446 101.661 40.1533L99.4863 55.6708C111.072 57.3021 121.612 62.5303 129.936 70.8537C137.799 78.7171 142.944 88.6717 144.826 99.6302Z"
            fill="#0E2751"
          />
          <path
            d="M168.957 32.5408C151.139 14.7228 128.595 3.47158 103.708 0L101.533 15.5175C123.032 18.529 142.523 28.2745 157.915 43.6247C172.512 58.2221 182.09 76.6674 185.562 96.9531L200.996 94.3181C196.939 70.8118 185.855 49.4804 168.957 32.5408Z"
            fill="#0E2751"
          />
        </g>
        <defs>
          <clipPath id="clip0_1665_7359">
            <rect width="201" height="201" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="237"
        height="237"
        viewBox="0 0 237 237"
        fill="none"
        className="arrow-shape"
      >
        <path
          d="M236.171 12.9155L135.904 231.679C135.065 233.512 133.643 235.015 131.859 235.953C130.075 236.891 128.031 237.211 126.045 236.864C124.06 236.516 122.246 235.521 120.887 234.033C119.527 232.545 118.7 230.648 118.533 228.639L110.056 126.944L8.36055 118.467C6.35204 118.3 4.45547 117.473 2.96745 116.113C1.47942 114.754 0.483854 112.94 0.13645 110.955C-0.210954 108.969 0.109395 106.925 1.0474 105.141C1.9854 103.357 3.48815 101.935 5.32064 101.096L224.085 0.828745C225.776 0.0536958 227.664 -0.18533 229.495 0.143766C231.326 0.472863 233.012 1.35432 234.327 2.66977C235.643 3.98523 236.524 5.67169 236.854 7.50268C237.183 9.33367 236.946 11.2243 236.171 12.9155Z"
          fill="#0E2751"
        />
      </svg>
      <div className="container">
        <div className="row gy-4 contact-info-wrapper">
          <div
            className="col-lg-4 select-item"
          >
            <div className="single-contact-info">
              <div className="icon-wrapper">
                <img
                  src="/assets/images/email.svg"
                  width={60}
                  height={60}
                  alt="icon"
                  className="contact-icon"
                />
              </div>
              <h3>{translate("Email Address")}</h3>
              {page_data?.email1 && (
                <p className="has-link">
                  <a href={`mailto:${page_data?.email1}`} target="_blank">
                    {page_data?.email1}
                  </a>
                </p>
              )}
              {page_data?.email2 && (
                <p className="has-link">
                  <a href={`mailto:${page_data?.email2}`} target="_blank">
                    {page_data?.email2}
                  </a>
                </p>
              )}
            </div>
          </div>
          <div
            className="col-lg-4 select-item"
          >
            <div className="single-contact-info">
              <div className="icon-wrapper">
                <img
                  src="/assets/images/phone.svg"
                  width={60}
                  height={60}
                  alt="icon"
                  className="contact-icon"
                />
              </div>
              <h3>{translate("Phone Number")}</h3>

              {page_data?.phone1 && (
                <p className="has-link">
                  <a href={`tel:${page_data?.phone1}`}>{page_data?.phone1}</a>
                </p>
              )}

              {page_data?.phone2 && (
                <p className="has-link">
                  <a href={`tel:${page_data?.phone2}`}>{page_data?.phone2}</a>
                </p>
              )}
            </div>
          </div>
          <div
            className="col-lg-4 select-item"
          >
            <div className="single-contact-info">
              <div className="icon-wrapper">
                <img
                  src="/assets/images/location.svg"
                  width={60}
                  height={60}
                  alt="icon"
                  className="contact-icon"
                />
              </div>
              <h3>{translate("Head Office")}</h3>
              {page_data?.address && <p>{page_data?.address}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
