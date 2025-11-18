/**
 * Constants related to properties
 */

export const PAGE_SIZE_OPTIONS: number[] = [12, 24, 48];

export const DEFAULT_PROPERTY_FILTERS = {
  name: "",
  address: "",
  minPrice: undefined,
  maxPrice: undefined,
} as const;

export const PROPERTY_GRID_COLUMNS = {
  mobile: "grid-cols-1",
  tablet: "md:grid-cols-2",
  desktop: "lg:grid-cols-3",
} as const;

