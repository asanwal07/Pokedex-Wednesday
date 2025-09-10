import { useEffect, useRef } from 'react';

const useDebounced = <T extends (...args: any[]) => void>(
  mainfn: T,
  delay: number = 500
): ((...args: Parameters<T>) => void) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const debounce = (...args: Parameters<T>) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      mainfn(...args);
    }, delay);
  };

  return debounce;
};

export default useDebounced;
