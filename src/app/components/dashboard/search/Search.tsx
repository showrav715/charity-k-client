import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const Search = ({ placeholder, value }) => {

  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    setSearch(initialSearch);
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set(value, search);
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex items-center">
      <input
        className="flex outline-auc-primary-color justify-center items-center gap-[10px] border border-auc-border-color px-[16px] py-[19px] w-full h-[48px]  min-768:h-[60px] rounded-l-[8px] relative -right-2"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
        name="search"
        id="search"
        placeholder={placeholder || "Enter your search here"}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="flex items-center justify-center w-[60px] p-[12px] min-768:p-[18px]  gap-[10px] rounded-r-[8px] bg-auc-primary-color hover:bg-auc-primary-hover-color transition-all ease-in-out duration-300 relative"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M23.5783 21.5722L18.9657 16.9596C20.3637 15.1296 21.1303 12.9099 21.1306 10.5677C21.1306 7.74502 20.0313 5.09112 18.0351 3.09523C16.0392 1.09934 13.3856 0 10.5626 0C7.73998 0 5.08608 1.09934 3.09019 3.09523C-1.03006 7.21583 -1.03006 13.9202 3.09019 18.0401C5.08608 20.0363 7.73998 21.1357 10.5626 21.1357C12.9049 21.1354 15.1246 20.3687 16.9546 18.9708L21.5671 23.5833C21.8446 23.8611 22.2088 24 22.5727 24C22.9366 24 23.3008 23.8611 23.5783 23.5833C24.1339 23.0281 24.1339 22.1274 23.5783 21.5722ZM5.10136 16.0289C2.09016 13.0177 2.09051 8.11794 5.10136 5.1064C6.56009 3.64802 8.49973 2.84453 10.5626 2.84453C12.6259 2.84453 14.5652 3.64802 16.0239 5.1064C17.4826 6.56512 18.2861 8.50476 18.2861 10.5677C18.2861 12.6309 17.4826 14.5702 16.0239 16.0289C14.5652 17.4877 12.6259 18.2912 10.5626 18.2912C8.49973 18.2912 6.56009 17.4877 5.10136 16.0289Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}

export default Search;
