import NotFounds from "@/app/ui/NotFounds";
import BlogCard from "../single/BlogCard";
import Pagination from "../pagination/Pagination";

export default  function MainBlogLeftSide({ data }) {

  return (
    <>
      <div className="lg-blog-card-wrapper">
        {data?.blogs && data?.blogs?.data?.length > 0 ? (
          data?.blogs?.data?.map((blog) => (
            <div key={blog?.id}  >
              <BlogCard
                img={blog?.api_photo}
                title_link={`/blog/${blog?.slug}`}
                title={blog?.title}
                des={blog?.sort_text}
                userName={`Admin`}
                date={blog?.created_at}
                category={blog?.category?.name}
                category_slug={blog?.category?.slug}
                totalComment={16}
              />
        
            </div>
          ))
        ) : (
          <NotFounds />
        )}

        <Pagination
          last_page={data?.blogs?.last_page}
          per_page={data?.blogs?.per_page}
          total={data?.blogs?.total}
          links={data?.blogs?.links}
        />
      </div>
    </>
  );
}
