import { useEffect, useRef } from 'react';

export const useDebounce = (callback: any, mount = 500) => {
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(callback, 500);
  }, [callback, mount]);
};
