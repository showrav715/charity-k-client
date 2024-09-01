import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let scrollPosition = 0;
    if (
      searchParams.has("category") ||
      searchParams.has("condition") ||
      searchParams.has("page") ||
      (searchParams.has("sortby") && pathname === "/campaigns")
    ) {
      scrollPosition = 620;
    }

    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: "instant",
      });
    }, 0);
  }, [pathname, searchParams]);

  return null;
};

export default ScrollToTop;
