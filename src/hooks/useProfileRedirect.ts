import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "./useScreenSize";

export function useProfileRedirect() {
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  useEffect(() => {
    if (screenSize !== "sm") {
      navigate("/profile");
    }
  }, [screenSize, navigate]);
}
