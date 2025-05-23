import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useSWRLazy from "@/lib/hooks/useSWRLazy";

describe("useSWRLazy", () => {
  it("should not fetch data on mount", () => {
    const fetcher = vi.fn().mockResolvedValue("data");
    const { result } = renderHook(() => useSWRLazy(null, fetcher));

    expect(result.current.data).toBeUndefined();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("should fetch data when triggerFetch is called", async () => {
    const fetcher = vi.fn().mockResolvedValue("data");
    const { result } = renderHook(() => useSWRLazy("/api/test", fetcher));

    await act(async () => {
      result.current.triggerFetch();
    });

    expect(fetcher).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(result.current.data).toBe("data");
    });
  });

  it("fetches with triggerFetchWithKey", async () => {
    const fetcher = vi.fn().mockResolvedValue("NewData");
    const { result } = renderHook(() => useSWRLazy(null, fetcher));

    await act(async () => {
      result.current.triggerFetchWithKey("/api/test");
    });

    expect(fetcher).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(result.current.data).toBe("NewData");
    });
  });
});
