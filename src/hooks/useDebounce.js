import { useEffect, useRef } from 'react';

const useDebounced = (mainfn, delay = 500) => {
  const timerRef = useRef();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const debounce = (...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      mainfn(...args); // Fixed: use 'mainfn' instead of 'fn'
    }, delay);
  };

  return debounce;
};

export default useDebounced;
