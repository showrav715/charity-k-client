
import { Helmet } from 'react-helmet';
import { translate } from '@/helper/helper';
import { useEffect, useState } from 'react';
import BreadCrumb from '@/app/components/common/BreadCrumb';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { useLocation } from 'react-router-dom';
import { GetBlogList } from '@/@actions/frontend';
import MainBlogLeftSide from '@/app/components/blog/MainBlogLeftSide';
import BlogSidebar from '@/app/components/blog/BlogSidebar';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useStore } from "@/store/index";

const BlogPage = () => {
  const [data, setData] = useState(null);
  const location = useLocation();

  const settings = useStore((state) => state.settings);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = location?.search || '';
        const blogData = await GetBlogList(query);
        setData(blogData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [location?.search]);

  if (!data || !settings) {
    return <CardsSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>{translate("Blog")}</title>
      </Helmet>
      <Header />
      <BreadCrumb
        title="Blog"
        menus={[
          { pageToLink: '/', pageLable: 'Home' },
          { pageToLink: '/blog', pageLable: 'Blog' },
        ]}
      />
      <div className="ch-blog-content-wrapper">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-7 col-xl-8">
              <MainBlogLeftSide data={data} />
            </div>
            <div className="col-lg-5 col-xl-4">
              <BlogSidebar recentBlog={data?.recent_blogs} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
