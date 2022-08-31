import { useState, useEffect } from 'react';

export const useDebounce = (value: string) => {
  const [debounceValue, setDebounceValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  return debounceValue;
};
