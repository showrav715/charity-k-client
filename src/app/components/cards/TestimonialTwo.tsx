import { Testimonial as Itestimonial } from "../../../@types/frontend";

export default function TestimonialTwo({
  api_photo,
  message,
  name,
}: Itestimonial) {
  return (
    <div className="single-testimonial-two">
      <img
        width={120}
        height={120}
        src={api_photo}
        alt="testi img"
        className="testi-img"
      />

      <h5 className="title">{name}</h5>
      <p className="des text-center">{message}</p>
    </div>
  );
}
