
import { formatDate, translate } from "@/helper/helper";
import { Link } from "react-router-dom";
interface BlogCardProps {
  img: string;
  title_link: string;
  title: string;
  des: string;
  userName: string;
  date: string;
  category?: string;
  category_slug?: string;
  totalComment?: number;
}

export default function BlogCard({
  img,
  title_link,
  title,
  des,
  userName,
  date,
  category,
  category_slug,
}: BlogCardProps) {
  return (
    <div className="ch-single-blog">
      <div className="overflow-hidden rounded-3">
        <img
          src={img}
          width={824}
          height={567}
          alt="blog image"
          className="blog-img"
        />
      </div>
      <div className="blog-meta-wrapper">
        <span className="meta-link">
          <svg
            className="meta-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M12 12.5C14.7614 12.5 17 10.2614 17 7.5C17 4.73858 14.7614 2.5 12 2.5C9.23858 2.5 7 4.73858 7 7.5C7 10.2614 9.23858 12.5 12 12.5Z"
              stroke="#3A4B68"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.5901 22.5C20.5901 18.63 16.7402 15.5 12.0002 15.5C7.26015 15.5 3.41016 18.63 3.41016 22.5"
              stroke="#3A4B68"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="meta-text">{translate("By")}: {userName}</span>
        </span>
        <span className="meta-link">
          <svg
            className="meta-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clipPath="url(#clip0_1726_8766)">
              <path
                d="M19 2H18V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0C16.7348 0 16.4804 0.105357 16.2929 0.292893C16.1054 0.48043 16 0.734784 16 1V2H8V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V2H5C3.67441 2.00159 2.40356 2.52888 1.46622 3.46622C0.528882 4.40356 0.00158786 5.67441 0 7L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H19C20.3256 23.9984 21.5964 23.4711 22.5338 22.5338C23.4711 21.5964 23.9984 20.3256 24 19V7C23.9984 5.67441 23.4711 4.40356 22.5338 3.46622C21.5964 2.52888 20.3256 2.00159 19 2ZM2 7C2 6.20435 2.31607 5.44129 2.87868 4.87868C3.44129 4.31607 4.20435 4 5 4H19C19.7956 4 20.5587 4.31607 21.1213 4.87868C21.6839 5.44129 22 6.20435 22 7V8H2V7ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22Z"
                fill="#3A4B68"
              />
              <path
                d="M12 16.5C12.8284 16.5 13.5 15.8284 13.5 15C13.5 14.1716 12.8284 13.5 12 13.5C11.1716 13.5 10.5 14.1716 10.5 15C10.5 15.8284 11.1716 16.5 12 16.5Z"
                fill="#3A4B68"
              />
              <path
                d="M7 16.5C7.82843 16.5 8.5 15.8284 8.5 15C8.5 14.1716 7.82843 13.5 7 13.5C6.17157 13.5 5.5 14.1716 5.5 15C5.5 15.8284 6.17157 16.5 7 16.5Z"
                fill="#3A4B68"
              />
              <path
                d="M17 16.5C17.8284 16.5 18.5 15.8284 18.5 15C18.5 14.1716 17.8284 13.5 17 13.5C16.1716 13.5 15.5 14.1716 15.5 15C15.5 15.8284 16.1716 16.5 17 16.5Z"
                fill="#3A4B68"
              />
            </g>
            <defs>
              <clipPath id="clip0_1726_8766">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className="meta-text">
            {formatDate(date)}
            
          </span>
        </span>
        <Link className="meta-link" to={`/blog/${category_slug}`}>
          <svg
            className="meta-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M4.40476 16.0264L8.93476 20.5564C10.7948 22.4164 13.8148 22.4164 15.6848 20.5564L20.0748 16.1664C21.9348 14.3064 21.9348 11.2864 20.0748 9.41637L15.5348 4.89637C14.5848 3.94637 13.2748 3.43637 11.9348 3.50637L6.93476 3.74637C4.93476 3.83637 3.34476 5.42637 3.24476 7.41637L3.00476 12.4164C2.94476 13.7664 3.45476 15.0764 4.40476 16.0264Z"
              stroke="#3A4B68"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.73438 12.7266C11.1151 12.7266 12.2344 11.6073 12.2344 10.2266C12.2344 8.84585 11.1151 7.72656 9.73438 7.72656C8.35366 7.72656 7.23438 8.84585 7.23438 10.2266C7.23438 11.6073 8.35366 12.7266 9.73438 12.7266Z"
              stroke="#3A4B68"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M13.2344 17.7266L17.2344 13.7266"
              stroke="#3A4B68"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="meta-text">{category}</span>
        </Link>
        
      </div>

      <h4 className="blog-card-title">
        <Link to={title_link}>{title}</Link>
      </h4>

      <p className="blog-card-des">{des}</p>

      <Link to={title_link} className="ch-btn ch-primary-btn-outline">
        {translate("Read More")}
        <svg
          className="btn-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#clip0_1873_768)">
            <path
              d="M23.12 9.9099L19.25 5.9999C19.157 5.90617 19.0464 5.83178 18.9246 5.78101C18.8027 5.73024 18.672 5.7041 18.54 5.7041C18.408 5.7041 18.2773 5.73024 18.1554 5.78101C18.0336 5.83178 17.923 5.90617 17.83 5.9999C17.6437 6.18726 17.5392 6.44071 17.5392 6.7049C17.5392 6.96909 17.6437 7.22254 17.83 7.4099L21.39 10.9999H1C0.734784 10.9999 0.48043 11.1053 0.292893 11.2928C0.105357 11.4803 0 11.7347 0 11.9999H0C0 12.2651 0.105357 12.5195 0.292893 12.707C0.48043 12.8945 0.734784 12.9999 1 12.9999H21.45L17.83 16.6099C17.7363 16.7029 17.6619 16.8135 17.6111 16.9353C17.5603 17.0572 17.5342 17.1879 17.5342 17.3199C17.5342 17.4519 17.5603 17.5826 17.6111 17.7045C17.6619 17.8263 17.7363 17.9369 17.83 18.0299C17.923 18.1236 18.0336 18.198 18.1554 18.2488C18.2773 18.2996 18.408 18.3257 18.54 18.3257C18.672 18.3257 18.8027 18.2996 18.9246 18.2488C19.0464 18.198 19.157 18.1236 19.25 18.0299L23.12 14.1499C23.6818 13.5874 23.9974 12.8249 23.9974 12.0299C23.9974 11.2349 23.6818 10.4724 23.12 9.9099Z"
              fill="#02A95C"
            />
          </g>
          <defs>
            <clipPath id="clip0_1873_768">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Link>
    </div>
  );
}