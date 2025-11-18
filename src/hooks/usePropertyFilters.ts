import { useState, useCallback } from "react";
import { PropertyFilters } from "@/types/property";
import { DEFAULT_PROPERTY_FILTERS } from "@/constants/properties";

export const usePropertyFilters = (initialFilters?: PropertyFilters) => {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters || DEFAULT_PROPERTY_FILTERS);

  const updateFilters = useCallback((newFilters: PropertyFilters) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_PROPERTY_FILTERS);
  }, []);

  const updateFilter = useCallback(<K extends keyof PropertyFilters>(
    key: K,
    value: PropertyFilters[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
    updateFilter,
    setFilters,
  };
};

