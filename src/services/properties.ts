import { apiClient } from "@/services/apiClient";
import type { PropertyDetail, PropertyFilters, PropertyListData } from "@/types/property";

const ENDPOINTS = {
  LIST: "/api/properties",
  SEARCH: "/api/properties/search",
  DETAIL: (id: string) => `/api/properties/${id}`,
};

const hasFilters = (filters?: PropertyFilters) => {
  if (!filters) return false;
  return Object.values(filters).some((value) => value !== undefined && value !== null && value !== "");
};

export const propertiesService = {
  getProperties: async (
    filters: PropertyFilters | undefined,
    page: number,
    pageSize: number,
  ): Promise<PropertyListData> => {
    const endpoint = hasFilters(filters) ? ENDPOINTS.SEARCH : ENDPOINTS.LIST;

    const params = {
      page,
      pageSize,
      name: filters?.name?.trim() || undefined,
      address: filters?.address?.trim() || undefined,
      minPrice: filters?.minPrice,
      maxPrice: filters?.maxPrice,
    };

    return apiClient.get<PropertyListData>(endpoint, params);
  },

  getPropertyById: (id: string) => apiClient.get<PropertyDetail>(ENDPOINTS.DETAIL(id)),
};
