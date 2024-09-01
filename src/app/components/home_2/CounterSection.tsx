

import { HerosectionSkeleton } from "../../../app/ui/skeletons";
import CountUp from "react-countup";
export default function CounterSection({ page_data }) {
  if (!page_data) return <HerosectionSkeleton />;
  return (
    <div
      className="home-2-counter-section"
    >
      <div className="container">
        <div className="counter-wrapper">
          {/* shapes */}
          <img
            width={37}
            height={68}
            src={`/assets/images/counter-vec1.png`}
            alt={"shape"}
            className={`shape shape1`}
          />
          <img
            width={249}
            height={249}
            src={`/assets/images/counter-vec2.png`}
            alt={"shape"}
            className={`shape shape2`}
          />
          <img
            width={249}
            height={249}
            src={`/assets/images/counter-vec3.png`}
            alt={"shape"}
            className={`shape shape3`}
          />
          <img
            width={60}
            height={60}
            src={`/assets/images/counter-vec4.png`}
            alt={"shape"}
            className={`shape shape4`}
          />

          {page_data.map((item) => (
            <div className="single-counter" key={item?.id}>
              <h2 className="counter-amount">
                <span>
                  <CountUp end={item.counter_number} />{" "}
                </span>{" "}
                +
              </h2>
              <h5 className="counter-title">{item.title}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
