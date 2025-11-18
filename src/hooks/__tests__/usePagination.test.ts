import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePagination } from "../usePagination";

describe("usePagination", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(12);
  });

  it("should initialize with custom values", () => {
    const { result } = renderHook(() =>
      usePagination({
        initialPage: 2,
        initialPageSize: 24,
        totalPages: 10,
      })
    );

    expect(result.current.page).toBe(2);
    expect(result.current.pageSize).toBe(24);
  });

  it("should change page correctly", () => {
    const { result } = renderHook(() =>
      usePagination({
        initialPage: 1,
        totalPages: 10,
      })
    );

    act(() => {
      result.current.handlePageChange(3);
    });

    expect(result.current.page).toBe(3);
  });

  it("should not change page if out of bounds", () => {
    const { result } = renderHook(() =>
      usePagination({
        initialPage: 1,
        totalPages: 5,
      })
    );

    act(() => {
      result.current.handlePageChange(10);
    });

    expect(result.current.page).toBe(1);
  });

  it("should not change page if less than 1", () => {
    const { result } = renderHook(() =>
      usePagination({
        initialPage: 3,
        totalPages: 10,
      })
    );

    act(() => {
      result.current.handlePageChange(0);
    });

    expect(result.current.page).toBe(3);
  });

  it("should change page size and reset to page 1", () => {
    const { result } = renderHook(() =>
      usePagination({
        initialPage: 5,
        initialPageSize: 12,
      })
    );

    act(() => {
      result.current.handlePageSizeChange(24);
    });

    expect(result.current.pageSize).toBe(24);
    expect(result.current.page).toBe(1);
  });

  it("should not automatically reset page when totalPages changes", () => {
    const { result, rerender } = renderHook(
      ({ totalPages }) => usePagination({ initialPage: 5, totalPages }),
      {
        initialProps: { totalPages: 10 },
      }
    );

    expect(result.current.page).toBe(5);

    rerender({ totalPages: 0 });

    expect(result.current.page).toBe(5);
  });
});

