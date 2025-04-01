import { useState, useEffect } from "react";


const getSize = () => {
  const width = window.innerWidth;
  if (width < 640) return "sm";
  if (width < 1024) return "md";
  return "lg";
}

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
