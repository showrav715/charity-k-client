import { Event } from "@/@types/frontend";
import CleanContent from "@/app/ui/CleanContent";


export default function EventDetails({ data }: { data: Event }) {
  return (
    <div className="ch-single-blog details-blog"  >
      <div className="overflow-hidden rounded-3">
        <img
          src={data.api_photo}
          width={824}
          height={567}
          alt="blog image"
          className="blog-img"
        />
      </div>

      <h4 className="blog-card-title mt-24">{data.title}</h4>
      <CleanContent content={data.description} classNames="des" />
    </div>
  );
}
