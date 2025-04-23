import { useEffect, useState } from 'react';

type ScreenSize = 'sm' | 'md' | 'lg' | 'xl';

const getSize = (width: number): ScreenSize => {
  if (width < 640) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1920) return 'lg';
  return 'xl';
};

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => getSize(window.screen.width));

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getSize(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;
