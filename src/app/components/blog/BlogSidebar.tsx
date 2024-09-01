import  { useState } from 'react';
import SmBlogCard from '../single/SmBlogCard';
import { useNavigate } from 'react-router-dom';
import { translate } from '@/helper/helper'; // Adjust path based on your project structure

const BlogSidebar = ({ recentBlog }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleType = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('search', searchText);
    navigate(`/blog?${params.toString()}`, { replace: true });
  };

  return (
    <div className="blog-sidebar">
      <div className="sidebar-search-widget single-blog-sidebar-widget">
        <form className="form-wrapper" onSubmit={handleSearch}>
          <input
            placeholder="Search here"
            type="text"
            value={searchText}
            onChange={handleType}
            className="search-input w-100"
          />
          <button type="submit" className="submit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
      <div className="single-blog-sidebar-widget">
        <h5 className="blog-heading">{translate('Recent Post')}</h5>
        <div className="sm-blog-wrapper">
          {recentBlog &&
            recentBlog.map((blog) => (
              <SmBlogCard
                key={blog.id}
                img={blog.api_photo}
                title_link={`/blog/${blog.slug}`}
                title={blog.title.substring(0, 50)}
                date={blog.created_at}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
