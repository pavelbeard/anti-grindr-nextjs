import { useEffect, useState } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  const isClient = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (isClient) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`error getting localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isClient) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    if (!isClient) return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue
            ? (JSON.parse(event.newValue) as T)
            : initialValue;
          setStoredValue(newValue);
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue, isClient]);

  return [storedValue, setValue];
}
