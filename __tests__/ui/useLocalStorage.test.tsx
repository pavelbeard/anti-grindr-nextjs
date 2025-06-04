import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  it("should initialize with the initial value", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );
    expect(result.current[0]).toBe("initialValue");
  });

  it("should update the value in localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify("newValue"));
  });

  it("should read from localStorage on mount", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));

    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    expect(result.current[0]).toBe("storedValue");
  });

  it("should handle JSON parse errors gracefully", () => {
    localStorage.setItem("testKey", "invalidJSON");

    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    expect(result.current[0]).toBe("initialValue");
  });

  it("should update state when localStorage changes externally", async () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initialValue")
    );

    act(() => {
      localStorage.setItem("testKey", JSON.stringify("externalChange"));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: JSON.stringify("externalChange"),
        })
      );
    });

    await waitFor(() => {
      expect(result.current[0]).toBe("externalChange");
    });
  });
});
