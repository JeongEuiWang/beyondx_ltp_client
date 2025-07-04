import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollInit = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
};

export default useScrollInit;
