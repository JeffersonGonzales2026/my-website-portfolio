// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Modular system utility to manage universal viewport direct-to-top entry
export default function ScrollToTop({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // When the path changes (navigation occurs), force browser coordinate to 0,0
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Use 'instant' for a modular direct entry as requested
    });
  }, [pathname]);

  return <>{children}</>;
}