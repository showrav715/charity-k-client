
import TestimonialTwo from "../cards/TestimonialTwo";
import { Settings } from "../../../helper/helper";
import Slider from "react-slick";

export default function TestimonialSection({ page_data }) {
  //  slick start
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  //  slick end

  const testimonial_background = Settings("testimonial_background");

  return (
    <div
      style={{ backgroundImage: `url('${testimonial_background}')` }}
      className="home-2-testimonial-section"
    >
      <div className="container position-relative z-10">
        <svg
          className="left-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M108.391 54.9492C122.123 57.6092 132.5 69.7076 132.5 84.2092C132.5 100.659 119.147 114.012 102.697 114.012C86.2475 114.012 72.895 100.659 72.895 84.2092C72.895 62.2876 80.28 48.6726 88.9483 40.1617C102.219 27.1301 118.838 25.9984 118.838 25.9984C120.53 25.8759 122.134 26.745 122.962 28.2209C123.797 29.6909 123.697 31.5167 122.717 32.8934C122.717 32.8934 114.819 44.0117 109.896 52.2367C109.382 53.1 108.863 54.0509 108.391 54.9492Z"
            fill="#6B788E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.7854 54.9492C56.517 57.6092 66.8945 69.7076 66.8945 84.2092C66.8945 100.659 53.542 114.012 37.092 114.012C20.642 114.012 7.28953 100.659 7.28953 84.2092C7.28953 62.2876 14.6745 48.6726 23.3429 40.1617C36.6137 27.1301 53.2329 25.9984 53.2329 25.9984C54.9245 25.8759 56.5287 26.745 57.357 28.2209C58.1854 29.6909 58.092 31.5167 57.112 32.8934C57.112 32.8934 49.2137 44.0117 44.2904 52.2367C43.777 53.1 43.2579 54.0509 42.7854 54.9492Z"
            fill="#6B788E"
          />
        </svg>

        <svg
          className="right-svg"
          xmlns="http://www.w3.org/2000/svg"
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.6092 85.0508C17.8775 82.3908 7.5 70.2924 7.5 55.7908C7.5 39.3408 20.8525 25.9883 37.3025 25.9883C53.7525 25.9883 67.105 39.3408 67.105 55.7908C67.105 77.7124 59.72 91.3274 51.0517 99.8383C37.7808 112.87 21.1617 114.002 21.1617 114.002C19.47 114.124 17.8658 113.255 17.0375 111.779C16.2033 110.309 16.3025 108.483 17.2825 107.107C17.2825 107.107 25.1808 95.9883 30.1042 87.7633C30.6175 86.9 31.1367 85.9491 31.6092 85.0508Z"
            fill="#6B788E"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M97.2146 85.0508C83.483 82.3908 73.1055 70.2924 73.1055 55.7908C73.1055 39.3408 86.458 25.9883 102.908 25.9883C119.358 25.9883 132.71 39.3408 132.71 55.7908C132.71 77.7124 125.325 91.3274 116.657 99.8383C103.386 112.87 86.7671 114.002 86.7671 114.002C85.0755 114.124 83.4713 113.255 82.643 111.779C81.8146 110.309 81.908 108.483 82.888 107.107C82.888 107.107 90.7863 95.9883 95.7096 87.7633C96.223 86.9 96.7421 85.9491 97.2146 85.0508Z"
            fill="#6B788E"
          />
        </svg>

        <div>
          <Slider {...settings}>
            {page_data?.map((card) => (
              <div className="" key={card.id}>
                <TestimonialTwo
                  id={1}
                  name={card.name}
                  api_photo={card.api_photo}
                  message={card.message}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
