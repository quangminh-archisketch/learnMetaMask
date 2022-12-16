import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [size, setSize] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    function updateSize() {
      if (typeof window !== 'undefined') setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
