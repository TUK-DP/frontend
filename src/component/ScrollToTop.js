import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // children을 렌더링하여 라우터로 연결된 페이지를 보여줍니다.
  return children;
}
