import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SmBlogCard from '../single/SmBlogCard';
import { translate } from '@/helper/helper';

export default function EventSidebar({ recent_events }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = React.useState('');
  
  const handleType = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    params.set('search', searchText);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div className="blog-sidebar">
      <div className="sidebar-search-widget single-blog-sidebar-widget">
        <form className="form-wrapper" action="#">
          <input
            placeholder={translate('Search here')}
            type="text"
            onChange={handleType}
            className="search-input w-100"
          />
          <button type="button" onClick={handleSearch} className="submit-btn">
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
        <h5 className="blog-heading">{translate('Recent Event')}</h5>
        <div className="sm-blog-wrapper">
          {recent_events &&
            recent_events.map((event) => (
              <SmBlogCard
                key={event.id}
                img={event.api_photo}
                title_link={`/event/${event.slug}`}
                title={event.title.slice(0, 50)}
                date={event.created_at}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
