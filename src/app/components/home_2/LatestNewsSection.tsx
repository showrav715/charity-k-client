


import { Link } from "react-router-dom";
import BlogMdCard from "../cards/BlogMdCard";
import { translate } from "../../../helper/helper";

export default function LatestNewsSection({ page_data }) {
  return (
    <section className="ch-latest-news-section ch-latest-news-section-2">
      {/* shapes */}
      <img
        width={37}
        height={68}
        src={`/assets/images/counter-vec1.png`}
        alt={"shape"}
        className={`shape shape1 item-bounce`}
      />
      <img
        width={74}
        height={47}
        src={`/assets/images/tringle-shape1.png`}
        alt={"shape"}
        className={`shape shape2 item-rotate`}
      />

      <div className="container">
        <div className="row justify-content-center mb-40">
          <div className="col-lg-6">
            <div className="title-box text-center">
              <h5
                
                
                className="sm-title"
              >
                {translate("Latest News")}
              </h5>
              <h2   className="title">
                {translate("Insights Hub: Explore Our Latest News")}
              </h2>
            </div>
          </div>
        </div>

        <div className="row gy-4">
          {page_data &&
            page_data?.map((card) => (
              <div
                className="col-md-6 col-lg-4"
                key={card?.id}
                
                
              >
                <BlogMdCard
                  img={card?.api_photo}
                  title={card?.title.substring(0, 60)}
                  des={card?.sort_text.substring(0, 100)}
                  admin={`admin`}
                  user_img="/assets/images/comment_avater.jpg"
                  date={card?.created_at}
                  link_to={`/blog/${page_data[0]?.slug}`}
                />
              </div>
            ))}

          {/* explore all news */}
          <div
            className="col-lg-12 text-center mt-60"
            
            
          >
            <Link to="/blog" className="ch-btn ch-primary-btn">
              {translate("Explore All News")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
