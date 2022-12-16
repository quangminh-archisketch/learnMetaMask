import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

const useDetectMobile = () => {
  const [screenWidth] = useWindowSize();
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    setIsMobile(screenWidth < 991);
  }, [screenWidth]);

  return isMobile;
};
export default useDetectMobile;
