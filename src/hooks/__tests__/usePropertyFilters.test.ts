import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePropertyFilters } from "../usePropertyFilters";
import { DEFAULT_PROPERTY_FILTERS } from "@/constants/properties";

describe("usePropertyFilters", () => {
  it("should initialize with default filters", () => {
    const { result } = renderHook(() => usePropertyFilters());

    expect(result.current.filters).toEqual(DEFAULT_PROPERTY_FILTERS);
  });

  it("should initialize with custom filters", () => {
    const customFilters = {
      name: "Casa",
      address: "Bogotá",
      minPrice: 100000,
      maxPrice: 500000,
    };

    const { result } = renderHook(() => usePropertyFilters(customFilters));

    expect(result.current.filters).toEqual(customFilters);
  });

    it("should update filters correctly", () => {
      const { result } = renderHook(() => usePropertyFilters());

      act(() => {
        result.current.updateFilters({
          name: "Apartamento",
          minPrice: 200000,
        });
      });

      expect(result.current.filters.name).toBe("Apartamento");
      expect(result.current.filters.minPrice).toBe(200000);
      expect(result.current.filters.address).toBeUndefined();
    });

    it("should replace filters completely (not merge)", () => {
      const { result } = renderHook(() =>
        usePropertyFilters({
          name: "Casa",
          address: "Bogotá",
        })
      );

      act(() => {
        result.current.updateFilters({
          minPrice: 100000,
        });
      });

      expect(result.current.filters.name).toBeUndefined();
      expect(result.current.filters.address).toBeUndefined();
      expect(result.current.filters.minPrice).toBe(100000);
    });

  it("should reset filters to default", () => {
    const { result } = renderHook(() =>
      usePropertyFilters({
        name: "Casa",
        address: "Bogotá",
        minPrice: 100000,
        maxPrice: 500000,
      })
    );

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual(DEFAULT_PROPERTY_FILTERS);
  });
});

