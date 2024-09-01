

import { useState, useEffect } from "react";
import { VolunteerData } from "../../../@actions/frontend";
import { Volunteer } from "../../../@types/frontend";
import TeamCardTwo from "../single/TeamCardTwo";
import { translate } from "../../../helper/helper";
import Slider from "react-slick";
import { CategoriesSliderSettings } from "../../../config/frontend";

export default function VolunteersSection() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await VolunteerData();
    setVolunteers(data.volunteers as any);
  };

  return (
    <section className="ch-vounteers-section">
      <img
        src="/assets/images/hand-shape.svg"
        width={200}
        height={200}
        alt="hand-shape"
        className="hand-shape item-rotate"
      />
      <svg
        className="pointer-shape"
        xmlns="http://www.w3.org/2000/svg"
        width="278"
        height="279"
        viewBox="0 0 278 279"
        fill="none"
      >
        <path
          d="M101.754 188.832H158.265L165.626 158.143C165.501 144.359 165.626 141.864 165.813 138.932C165.937 136.25 166.125 133.194 166.125 119.908C166.125 108.805 153.151 107.87 151.903 112.797C151.841 112.86 151.841 112.984 151.841 113.047L152.277 131.572C152.34 134.815 147.35 134.94 147.287 131.697C147.1 122.902 146.976 114.107 146.539 105.312C146.102 98.0144 131.631 97.2035 131.694 103.94L132.255 128.204C132.318 131.447 127.328 131.572 127.265 128.266L126.704 104.002C126.641 99.0124 120.342 97.8897 116.474 98.95C114.541 99.5114 112.857 100.572 112.233 102.256L112.482 128.204C112.482 131.447 107.555 131.51 107.492 128.266L107.243 101.819V74.4992C107.243 68.1994 99.5086 64.8312 94.8928 69.3845C93.583 70.6944 92.7721 72.5032 92.7721 74.4992C92.7721 82.8574 92.8345 86.9741 92.8969 90.2176C93.0216 96.5798 93.084 99.8856 92.585 113.67V141.677C92.585 144.982 87.595 144.982 87.595 141.677V118.161C73.1865 128.266 78.3636 146.729 86.2228 162.323C89.8405 169.496 94.0196 176.107 97.2007 181.16C99.1967 184.341 100.818 186.96 101.754 188.832ZM161.072 237.234H98.0739C98.0116 237.234 97.8868 237.234 97.8244 237.234V281.021H161.072V237.234ZM169.555 224.26V201.868C169.555 197.439 165.937 193.884 161.571 193.884H98.0739C93.7077 193.884 90.09 197.502 90.09 201.868V224.26C90.09 228.689 93.7077 232.244 98.0739 232.244H161.571C165.937 232.244 169.555 228.689 169.555 224.26ZM209.662 210.413H266.173L273.533 179.725C273.409 165.94 273.533 163.445 273.721 160.514C273.845 157.832 274.032 154.775 274.032 141.489C274.032 130.387 260.996 129.451 259.811 134.379C259.811 134.441 259.749 134.566 259.749 134.628L260.185 153.153C260.248 156.397 255.258 156.522 255.195 153.278C255.008 144.483 254.883 135.689 254.384 126.956C253.948 119.658 239.477 118.847 239.539 125.584L240.101 149.848C240.163 153.091 235.173 153.216 235.111 149.972L234.549 125.709C234.487 120.719 228.187 119.596 224.32 120.656C222.324 121.155 220.702 122.278 220.078 123.9L220.266 149.848C220.266 153.091 215.338 153.153 215.276 149.91L215.026 123.463V96.1432C215.026 89.8433 207.292 86.4751 202.676 91.0285C201.366 92.3383 200.555 94.1472 200.555 96.1432C200.555 104.501 200.618 108.618 200.68 111.862C200.805 118.224 200.867 121.53 200.368 135.314V163.321C200.368 166.626 195.378 166.626 195.378 163.321V139.805C180.97 149.91 186.209 168.373 194.006 183.966C197.624 191.14 201.803 197.751 204.984 202.804C207.042 205.922 208.726 208.542 209.662 210.413ZM268.918 258.816H205.982C205.857 258.816 205.795 258.816 205.732 258.816V281.021H268.98V258.816H268.918ZM277.463 245.842V223.45C277.463 219.021 273.845 215.466 269.479 215.466H205.982C201.553 215.466 197.998 219.083 197.998 223.45V245.842C197.998 250.271 201.616 253.826 205.982 253.826H269.417C273.783 253.826 277.463 250.271 277.463 245.842ZM172.986 8.50698C184.026 -0.66207 200.243 -0.0383241 210.473 10.1911C221.326 21.0443 221.326 38.6339 210.473 49.5494L174.67 85.3524C173.672 86.3504 172.112 86.3504 171.114 85.3524L133.627 47.8653C122.026 36.326 122.899 17.3018 135.561 6.7605C146.601 -2.40856 162.943 -1.66006 172.986 8.50698ZM38.5687 180.162C53.4762 168.248 75.6191 178.852 75.6191 197.938C75.6191 203.802 73.3736 209.602 68.9451 214.031L40.2528 242.723C39.2548 243.721 37.6954 243.721 36.7598 242.723L6.6953 212.659C-2.78563 203.178 -2.09951 187.584 8.31703 178.977C17.1118 171.616 30.2105 172.178 38.5687 180.162Z"
          fill="#15315F"
        />
      </svg>

      <div className="container position-relative z-3">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-7 col-xl-6">
            <div className="title-box text-center">
              <h5
                className="sm-title text-white"
              >
                {translate("Our Volunteers")}
              </h5>
              <h2
                className="title text-white"
              >
                {translate("Dedicated")} <span>{translate("volunteers")}</span>{" "}
                {translate("who always support us")}
              </h2>
            </div>
          </div>
        </div>

        {/* dynamic */}
        <Slider {...CategoriesSliderSettings}>
          {volunteers &&
            volunteers.map((card) => (
              <div
                className="col-lg-33"
                key={card.id}
              >
                <TeamCardTwo
                  img={card.photo}
                  name={card.name}
                  desig={card.designation}
                  facebook={card.facebook}
                  twitter={card.twitter}
                  instagram={card.instagram}
                  linkedin={card.linkedin}
                />
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
}
