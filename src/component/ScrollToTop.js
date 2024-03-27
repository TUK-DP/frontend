import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (props) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("scroll to top!");
  }, [pathname]);

  return <>{props.children}</>;
}

export default ScrollToTop;