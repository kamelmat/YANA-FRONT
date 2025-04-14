import { useState, useEffect } from "react";

type ScreenSize = "sm" | "md" | "lg" | "xl";

const getSize = (): ScreenSize => {
  const width = window.innerWidth;
  if (width < 640) return "sm";
  if (width < 1024) return "md";
  if (width < 1920) return "lg";
  return "xl";
}

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getSize);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}
