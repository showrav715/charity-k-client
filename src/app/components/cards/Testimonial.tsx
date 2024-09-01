
import { Testimonial as Itestimonial } from "@/@types/frontend";
import { translate, truncateString } from "@/helper/helper";

import { useState } from "react";

export default function Testimonial({ data }: { data: Itestimonial }) {
  const [show, setShow] = useState(false);

  return (
    <div className="single-testimonial">
      <div className="img-wrapper">
        <img
          width={120}
          height={120}
          src={data.api_photo}
          className="thumb"
          alt="testimonial"
        />
      </div>
      <div className="content-wrapper">
        <h4>{data.name}</h4>
        <div className="contents">

          <p>
            {show ? (
              <>
                {data?.message}{" "}
                <button key="testi-1111" onClick={() => setShow(!show)} className="link">
                  {translate("Less")}
                </button>
              </>
            ) : data?.message?.length > 120 ? (
              <>
                {truncateString(data.message, 120)}{" "}
                <button key="testi-1112" onClick={() => setShow(!show)} className="link">
                  {translate("Read More...")}
                </button>
              </>
            ) : (
              <>
                {data?.message}{" "}
                <button key="testi-1113" onClick={() => setShow(!show)} className="link">
                  {translate("Less")}
                </button>
              </>
            )}
          </p>

        </div>
      </div>
    </div>
  );
}
