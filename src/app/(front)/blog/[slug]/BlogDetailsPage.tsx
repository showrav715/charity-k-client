import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { GetSingleBlog } from "@/@actions/frontend";
import { BlogResponse } from "@/@types/frontend";
import BlogComments from "@/app/components/blog/BlogComments";
import BlogDetails from "@/app/components/blog/BlogDetails";
import BlogSidebar from "@/app/components/blog/BlogSidebar";
import LeaveComments from "@/app/components/blog/LeaveComments";
import BreadCrumb from "@/app/components/common/BreadCrumb";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [data, setData] = useState<BlogResponse>();
  const [loading, setLoading] = useState(false);

  const settings = useStore((state) => state.settings);

  useEffect(() => {
    setLoading(true);
    GetSingleBlog(slug)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading || !data || !settings) return <CardsSkeleton />;

  return (
    <>
      <Helmet>
        <title>{translate("Blog Details")}</title>
      </Helmet>
      <Header />
      <Suspense>
        <BreadCrumb
          title="Blog Details"
          menus={[
            { pageToLink: "/", pageLable: "Home" },
            { pageToLink: "/blog", pageLable: "Blog" },
            {
              pageToLink: `/blog/${data.blog?.slug}`,
              pageLable: data?.blog?.title,
            },
          ]}
        />
        <div className="ch-blog-content-wrapper">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-7 col-xl-8">
                <BlogDetails
                  blog={data?.blog}
                  commentCount={data?.comments?.length}
                />
                <BlogComments comments={data?.comments} />
                <LeaveComments blog_id={data?.blog?.id} />
              </div>
              <div className="col-lg-5 col-xl-4">
                <BlogSidebar recentBlog={data.recent_blogs} />
              </div>
            </div>
          </div>
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
