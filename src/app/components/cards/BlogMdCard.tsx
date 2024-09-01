import { IBlogMdCard } from "../../../app/interfaces/interfaces";
import { translate } from "../../../helper/helper";
import { Link } from "react-router-dom";

export default function BlogMdCard({
  img,
  title,
  des,
  admin,
  date,
  link_to,
  user_img,
}: IBlogMdCard) {
  return (
    <div className="single-blog-md">
      <div className="img-wrapper">
        <img
          src={img}
          width={424}
          height={250}
          className="blog-img"
          alt="blog img"
        />
      </div>
      <div className="contents-wrapper">
        <h5>
          <Link to={link_to}>{title}</Link>
        </h5>

        <p className="des">{des}</p>
        <div className="btm-wrapper">
          <img
            src={user_img}
            width={424}
            height={250}
            className="user-img"
            alt="blog img"
          />

          <div className="admin-contents">
            <h6>
              {translate("Created By")} : {admin}
            </h6>
            <p>{date.split("T")[0]} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
