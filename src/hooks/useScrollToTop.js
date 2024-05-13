import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = () => {
  const { pathname } = useLocation();
  const scrollComponent = useRef(null);

  useEffect(() => {
    scrollComponent.current.scrollTo(0, 0);
  }, [pathname]);

  return { scrollComponent };
};

export default useScrollToTop;
