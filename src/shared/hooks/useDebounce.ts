import { useState, useEffect } from "react"

const useDebounce = <T = any>(value: T, delay: 500) => {
  const [debounceValue, setDebounceValue] = useState<T>(() => value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;