
import { recent_blogs } from "@/@types/frontend";
import { AboutPageRecentBlogs } from "@/@actions/frontend";

import { Link } from "react-router-dom";
import  { useEffect, useState } from "react";
import { translate } from "@/helper/helper";

export default function LatestNewsSection() {
  const [blogs, setBlogs] = useState<recent_blogs[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AboutPageRecentBlogs();
        setBlogs(data as recent_blogs[]);
      } catch (error) {
        console.error("Error fetching latest category:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="ch-latest-news-section">
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
                {translate("Insights Hub: Explore Our Latest")}{" "}
                <span>{translate("News")}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="row g-4 g-lg-0">
          {blogs && blogs[0] && (
            <>
              <div
                className="col-lg-55 col-lg-6 col-xl-6 overflow-hidden m-lg-0 p-lg-0"
                
                
              >
                <img
                  width={660}
                  height={480}
                  src={blogs[0]?.api_photo}
                  alt={blogs[0]?.title}
                  className="latest-img"
                />
              </div>
              <div
                className="col-lg-75 col-lg-6 col-xl-6 m-lg-0 p-lg-0"
                
                
              >
                <div className="news-contents right-content">
                  <h3>
                    <Link to={`/blog/${blogs[0]?.slug}`}>
                      {blogs[0]?.title}
                    </Link>
                  </h3>
                  <p>
                    {blogs[0]?.sort_text}
                    <br />
                    <Link to={`/blog/${blogs[0]?.slug}`} className="link">
                      {translate("Read More")}...
                    </Link>
                  </p>
                  <div className="author-box">
                    <img
                      width={60}
                      height={60}
                      src="/assets/images/author1.png"
                      alt="news img"
                    />
                    <div className="content-box">
                      <h5>{translate("By Admin")}</h5>
                      <p>{blogs[0]?.created_at.split("T")[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {blogs && blogs[1] && (
            <>
              <div
                className="col-lg-55 col-lg-6 col-xl-6 overflow-hidden m-lg-0 p-lg-0 mt-60  d-lg-none"
                
                
              >
                <img
                  width={660}
                  height={480}
                  src={blogs[1]?.api_photo}
                  alt={blogs[1]?.title}
                  className="latest-img"
                />
              </div>

              <div
                className="col-lg-57 col-lg-6 col-xl-6 m-lg-0 p-lg-0 mt-60"
                
                
              >
                <div className="news-contents left-content">
                  <h3>
                    <Link to={`/blog/${blogs[0]?.slug}`}>
                      {blogs[1]?.title}
                    </Link>
                  </h3>
                  <p>
                    {blogs[1]?.sort_text}
                    <br />
                    <Link to={`/blog/${blogs[1]?.slug}`} className="link">
                      {translate("Read More")}...
                    </Link>
                  </p>
                  <div className="author-box">
                    <img
                      width={60}
                      height={60}
                      src="/assets/images/author1.png"
                      alt="news img"
                    />
                    <div className="content-box">
                      <h5>{translate("By Admin")}</h5>
                      <p>{blogs[1]?.created_at.split("T")[0]}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-55 col-lg-6 col-xl-6 overflow-hidden m-lg-0 p-lg-0 mt-60 d-none d-lg-block"
                
                
              >
                <img
                  width={660}
                  height={480}
                  src={blogs[1]?.api_photo}
                  alt={blogs[1]?.title}
                  className="latest-img"
                />
              </div>
            </>
          )}

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
