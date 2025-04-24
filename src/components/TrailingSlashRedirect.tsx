import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TrailingSlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname !== '/' && pathname.endsWith('/')) {
      const newPathname = pathname.slice(0, -1);
      navigate(newPathname + location.search, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default TrailingSlashRedirect;
