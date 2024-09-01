
import { Link } from "react-router-dom";

interface CategoryCardProps {
  img: string;
  title: string;
  title_link: string;
}

export default function CategoryCard({
  img,
  title,
  title_link,
}: CategoryCardProps) {
  return (
    <div className="w-full d-block">
      <div className="single-support">
        <div className="overflow-hidden w-full">
          <Link to={title_link}>
            <img
              className="support-img"
              alt="support image"
              width={280}
              height={280}
              src={img}
            />
          </Link>
        </div>
        <h5 className="title">
          <Link to={title_link}>{title}</Link>
        </h5>
      </div>
    </div>
  );
}
