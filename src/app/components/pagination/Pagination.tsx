import { useLocation, useNavigate } from "react-router-dom";
import { PaginationProps } from "@/@types/frontend";

const Pagination = ({ last_page, per_page, total }: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handleCheck = (label: any) => {
    if (label === "&laquo; Previous") {
      if (currentPage > 1) {
        searchParams.set("page", String(currentPage - 1));
      }
    } else if (label === "Next &raquo;") {
      if (currentPage < last_page) {
        searchParams.set("page", String(currentPage + 1));
      }
    } else {
      searchParams.set("page", label);
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= last_page; i++) {
      if (i === 1 || i === last_page || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push("...");
      }
    }

    return pageNumbers.filter((value, index, self) => self.indexOf(value) === index);
  };

  if (per_page > total) return null;

  return (
    <div
      className="flex flex-wrap min-768:col-span-2 min-1440:col-span-3 justify-center gap-[12px] mt-[48px] wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <button
        onClick={() => handleCheck("&laquo; Previous")}
        className="ch-pagination-btn"
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      {renderPageNumbers().map((pg, index) => (
        <button
          onClick={() => handleCheck(pg)}
          key={index}
          className={`ch-pagination-btn ${currentPage === pg ? "active" : ""}`}
          disabled={pg === "..."}
        >
          {pg}
        </button>
      ))}
      <button
        onClick={() => handleCheck("Next &raquo;")}
        className="ch-pagination-btn"
        disabled={currentPage === last_page}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
