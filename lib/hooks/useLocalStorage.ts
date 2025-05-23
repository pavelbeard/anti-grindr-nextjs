import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

/*
 * SSR friendly useLocalStorage hook, which allows you to avoid hydration mismatch issues.
 * This hook will only run in the browser and will not throw an error during SSR.
 * @param key - The key to store the value under
 * @param initialValue - The initial value to set if the key does not exist
 * @returns - A tuple containing the stored value and a function to update it
 */
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Initialize value with initialValue to avoid hydration mismatch
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // On mount, read the value if it exists in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item) as T);
        } else {
          setStoredValue(initialValue);
        }
      } catch (error) {
        console.error(`error getting localStorage key "${key}":`, error);
      }
    }
  }, [key]);

  const setValue: SetValue<T> = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  }, [key, initialValue]);

  return [storedValue, setValue];
}
