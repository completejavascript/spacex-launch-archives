import { useEffect, useRef, useState } from "react";

export default function useDebounce(value: string, ms = 0) {
  const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, ms]);

  return debouncedValue;
}
