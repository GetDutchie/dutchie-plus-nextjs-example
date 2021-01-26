import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, (newVal: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function setValue(value: T) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  }

  return [storedValue, setValue];
}
