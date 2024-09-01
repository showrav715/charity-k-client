
import { Event } from "@/@types/frontend";
import { success, translate } from "@/helper/helper";
import { useCallback, useState } from "react";

import { CopyToClipboard } from "react-copy-to-clipboard";

export default function EventDetailsSidebar({ data }: { data: Event }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 100);
    success("Link Copied");
  }, []);

  return (
    <div className="blog-sidebar"  >
      {/* Event Schedule */}
      <div
        className="single-blog-sidebar-widget"
        
        
      >
        <h5 className="blog-heading">{translate("Event Schedule")}</h5>
        <div className="event-schedule-wrapper">
          <ul>
            <li>
              <span className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
                    stroke="#091E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="content-wrapper">
                <span className="title">{translate("Date")}</span>
                <span className="des">{data.date}</span>
              </span>
            </li>
            <li>
              <span className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#091E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="content-wrapper">
                <span className="title">{translate("Time")}</span>
                <span className="des">
                  {data.start_time} - {data.end_time}
                </span>
              </span>
            </li>
            <li>
              <span className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 8H16M16 8V20.5M16 8L20.5 3.5M21 15.3373V3.8C21 3.51997 21 3.37996 20.9455 3.273C20.8976 3.17892 20.8211 3.10243 20.727 3.0545C20.62 3 20.48 3 20.2 3H8.66274C8.41815 3 8.29586 3 8.18077 3.02763C8.07873 3.05213 7.98119 3.09253 7.89172 3.14736C7.7908 3.2092 7.70432 3.29568 7.53137 3.46863L3.46863 7.53137C3.29568 7.70432 3.2092 7.7908 3.14736 7.89172C3.09253 7.98119 3.05213 8.07873 3.02763 8.18077C3 8.29586 3 8.41815 3 8.66274V20.2C3 20.48 3 20.62 3.0545 20.727C3.10243 20.8211 3.17892 20.8976 3.273 20.9455C3.37996 21 3.51997 21 3.8 21H15.3373C15.5818 21 15.7041 21 15.8192 20.9724C15.9213 20.9479 16.0188 20.9075 16.1083 20.8526C16.2092 20.7908 16.2957 20.7043 16.4686 20.5314L20.5314 16.4686C20.7043 16.2957 20.7908 16.2092 20.8526 16.1083C20.9075 16.0188 20.9479 15.9213 20.9724 15.8192C21 15.7041 21 15.5818 21 15.3373Z"
                    stroke="#091E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="content-wrapper">
                <span className="title">{translate("Event Type")}</span>
                <span className="des">
                  {data.event_type.toLocaleUpperCase()}
                </span>
              </span>
            </li>

            {data.event_type == "online" && (
              <li>
                <span className="icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 7H7C4.23858 7 2 9.23858 2 12C2 14.7614 4.23858 17 7 17H9C11.7614 17 14 14.7614 14 12M16.5 17H17C19.7614 17 22 14.7614 22 12C22 9.23858 19.7614 7 17 7H15C12.2386 7 10 9.23858 10 12"
                      stroke="#091E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="content-wrapper">
                  <span className="title">{translate("Event Link")}</span>
                  <span className="des" id="copy-des">
                    <span>https://meet.google.com/ziv-tpjp-vcs</span>

                    <CopyToClipboard
                      data-bs-toggle="tooltip"
                      title={copied ? "copied" : "copy"}
                      onCopy={onCopy}
                      text={`https://meet.google.com/ziv-tpjp-vcs`}
                    >
                      <span className="copy-icon" id="copy-des-btn">
                        <svg
                          className={`${copied && translate("active")}`}
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 8.5V5.7C8 4.5799 8 4.01984 8.21799 3.59202C8.40973 3.21569 8.71569 2.90973 9.09202 2.71799C9.51984 2.5 10.0799 2.5 11.2 2.5H18.8C19.9201 2.5 20.4802 2.5 20.908 2.71799C21.2843 2.90973 21.5903 3.21569 21.782 3.59202C22 4.01984 22 4.5799 22 5.7V13.3C22 14.4201 22 14.9802 21.782 15.408C21.5903 15.7843 21.2843 16.0903 20.908 16.282C20.4802 16.5 19.9201 16.5 18.8 16.5H16M5.2 22.5H12.8C13.9201 22.5 14.4802 22.5 14.908 22.282C15.2843 22.0903 15.5903 21.7843 15.782 21.408C16 20.9802 16 20.4201 16 19.3V11.7C16 10.5799 16 10.0198 15.782 9.59202C15.5903 9.21569 15.2843 8.90973 14.908 8.71799C14.4802 8.5 13.9201 8.5 12.8 8.5H5.2C4.0799 8.5 3.51984 8.5 3.09202 8.71799C2.71569 8.90973 2.40973 9.21569 2.21799 9.59202C2 10.0198 2 10.5799 2 11.7V19.3C2 20.4201 2 20.9802 2.21799 21.408C2.40973 21.7843 2.71569 22.0903 3.09202 22.282C3.51984 22.5 4.07989 22.5 5.2 22.5Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </CopyToClipboard>
                  </span>
                </span>
              </li>
            )}

            {data.event_type == "offline" && (
              <li>
                <span className="icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 12.5C13.6569 12.5 15 11.1569 15 9.5C15 7.84315 13.6569 6.5 12 6.5C10.3431 6.5 9 7.84315 9 9.5C9 11.1569 10.3431 12.5 12 12.5Z"
                      stroke="#091E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z"
                      stroke="#091E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="content-wrapper">
                  <span className="title">{translate("Location")}</span>
                  <span className="des">
                    House 20, Lake Drive Road, Sector 7, Uttora, Dhaka
                    Bangladesh.
                  </span>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Organizer Details */}
      <div
        className="single-blog-sidebar-widget"
        
        
      >
        <h5 className="blog-heading">{translate("Organizer Details")}</h5>
        <div className="event-schedule-wrapper">
          <ul>
            <li>
              <span className="icon-wrapper">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                    stroke="#091E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="content-wrapper">
                <span className="title">{translate("Name")}</span>
                <span className="des">{data.organizar_name}</span>
              </span>
            </li>

            {data.organizar_email && (
              <li>
                <span className="icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                      stroke="#091E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="content-wrapper">
                  <span className="title">{translate("Email")}</span>
                  <a href={`mailto:${data.organizar_email}`} className="des">
                    {data.organizar_email}
                  </a>
                </span>
              </li>
            )}

            {data.organizar_phone && (
              <li>
                <span className="icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0497 6C15.0264 6.19057 15.924 6.66826 16.6277 7.37194C17.3314 8.07561 17.8091 8.97326 17.9997 9.95M14.0497 2C16.0789 2.22544 17.9713 3.13417 19.4159 4.57701C20.8606 6.01984 21.7717 7.91101 21.9997 9.94M10.2266 13.8631C9.02506 12.6615 8.07627 11.3028 7.38028 9.85323C7.32041 9.72854 7.29048 9.66619 7.26748 9.5873C7.18576 9.30695 7.24446 8.96269 7.41447 8.72526C7.46231 8.65845 7.51947 8.60129 7.63378 8.48698C7.98338 8.13737 8.15819 7.96257 8.27247 7.78679C8.70347 7.1239 8.70347 6.26932 8.27247 5.60643C8.15819 5.43065 7.98338 5.25585 7.63378 4.90624L7.43891 4.71137C6.90747 4.17993 6.64174 3.91421 6.35636 3.76987C5.7888 3.4828 5.11854 3.4828 4.55098 3.76987C4.2656 3.91421 3.99987 4.17993 3.46843 4.71137L3.3108 4.86901C2.78117 5.39863 2.51636 5.66344 2.31411 6.02348C2.08969 6.42298 1.92833 7.04347 1.9297 7.5017C1.93092 7.91464 2.01103 8.19687 2.17124 8.76131C3.03221 11.7947 4.65668 14.6571 7.04466 17.045C9.43264 19.433 12.295 21.0575 15.3284 21.9185C15.8928 22.0787 16.1751 22.1588 16.588 22.16C17.0462 22.1614 17.6667 22 18.0662 21.7756C18.4263 21.5733 18.6911 21.3085 19.2207 20.7789L19.3783 20.6213C19.9098 20.0898 20.1755 19.8241 20.3198 19.5387C20.6069 18.9712 20.6069 18.3009 20.3198 17.7333C20.1755 17.448 19.9098 17.1822 19.3783 16.6508L19.1835 16.4559C18.8339 16.1063 18.6591 15.9315 18.4833 15.8172C17.8204 15.3862 16.9658 15.3862 16.3029 15.8172C16.1271 15.9315 15.9523 16.1063 15.6027 16.4559C15.4884 16.5702 15.4313 16.6274 15.3644 16.6752C15.127 16.8453 14.7828 16.904 14.5024 16.8222C14.4235 16.7992 14.3612 16.7693 14.2365 16.7094C12.7869 16.0134 11.4282 15.0646 10.2266 13.8631Z"
                      stroke="#091E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="content-wrapper">
                  <span className="title">{translate("Phone")}</span>
                  <a href={`tel:${data.organizar_phone}`} className="des">
                    {data.organizar_phone}
                  </a>
                </span>
              </li>
            )}

            {data.website && (
              <li>
                <span className="icon-wrapper">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 9H2M14 17.5L16.5 15L14 12.5M10 12.5L7.5 15L10 17.5M2 7.8L2 16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27977 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3L6.8 3C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8Z"
                      stroke="#091E42"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="content-wrapper">
                  <span className="title">{translate("Website")}</span>
                  <a href={data.website} className="des">
                    {data.website}
                  </a>
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Map Location */}

      {data.map_link && (
        <div
          className="single-blog-sidebar-widget"
          
          
        >
          <h5 className="blog-heading">{translate("Map Location")}</h5>
          <div className="event-schedule-wrapper">
            <iframe
              src={data.map_link}
              width={`100%`}
              height="376"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
