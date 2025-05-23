import { useState } from "react";
import useSWR from "swr";

/*
 * SWR Lazy Hook
 * @description
 * This hook is a wrapper around SWR (stale-while-revalidate) for lazy loading.
 * It allows you to fetch data only when needed, rather than on component mount.
 *
 * @param key - The key to use for the SWR cache. Can be a string or an array.
 * @param fetcher - The function to fetch data. It should return a promise.
 * @param options - Any additional options to pass to SWR.
 * @returns An object containing the data, error, loading state, and functions to execute the fetch.
 * @example
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * const { data, error, isLoading, execute } = useSWRLazy('/api/data', fetcher);
 *
 * const openModal = () => {
 *   setIsModalOpen(true);
 *   execute(); // Call this function to fetch the data.
 * };
 * @example
 *
 * const [isModalOpen, setIsModalOpen] = useState(false);
 * const { data, error, isLoading, executeWithKey } = useSWRLazy(null, fetcher);
 *
 * const openModal = () => {
 *   executeWithKey('/api/data'); // Call this function to fetch the data with a new key.
 *   setIsModalOpen(true);
 * };
 */
export default function useSWRLazy(
  key: string | [...any] | null,
  fetcher: (
    input: string | Request | URL,
    init?: RequestInit | undefined
  ) => Promise<any>,
  options: any = {}
) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [keyState, setKeyState] = useState<string | [...any] | null>(key);
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    /*conditional fetching */
    shouldFetch ? keyState : null,
    fetcher,
    /* any SWR options */
    { ...options }
  );

  const triggerFetch = () => setShouldFetch(true);
  const triggerFetchWithKey = (newKey: string | [...any]) => {
    setKeyState(() => {
      setShouldFetch(true);
      return newKey;
    });
  };

  return {
    data,
    error,
    isLoading,
    isValidating,
    triggerFetch,
    triggerFetchWithKey,
    mutate,
  };
}
