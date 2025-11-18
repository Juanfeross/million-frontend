import { describe, it, expect, vi, beforeEach } from "vitest";
import { propertiesService } from "../properties";
import { apiClient } from "../apiClient";
import type { PropertyFilters } from "@/types/property";

describe("propertiesService", () => {
  const mockGet = vi.fn();

  beforeEach(() => {
    vi.spyOn(apiClient, "get").mockImplementation(mockGet);
  });

  describe("getProperties", () => {
    it("should call LIST endpoint when no filters are provided", async () => {
      const mockData = { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
      mockGet.mockResolvedValueOnce(mockData);

      await propertiesService.getProperties(undefined, 1, 20);

      expect(mockGet).toHaveBeenCalledWith("/api/properties", {
        page: 1,
        pageSize: 20,
        name: undefined,
        address: undefined,
        minPrice: undefined,
        maxPrice: undefined,
      });
    });

    it("should call SEARCH endpoint when filters are provided", async () => {
      const filters: PropertyFilters = {
        name: "Casa",
        address: "Bogotá",
        minPrice: 100000,
        maxPrice: 500000,
      };
      const mockData = { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
      mockGet.mockResolvedValueOnce(mockData);

      await propertiesService.getProperties(filters, 1, 20);

      expect(mockGet).toHaveBeenCalledWith("/api/properties/search", {
        page: 1,
        pageSize: 20,
        name: "Casa",
        address: "Bogotá",
        minPrice: 100000,
        maxPrice: 500000,
      });
    });

    it("should trim name and address filters", async () => {
      const filters: PropertyFilters = {
        name: "  Casa  ",
        address: "  Bogotá  ",
      };
      const mockData = { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
      mockGet.mockResolvedValueOnce(mockData);

      await propertiesService.getProperties(filters, 1, 20);

      expect(mockGet).toHaveBeenCalledWith(
        "/api/properties/search",
        expect.objectContaining({
          name: "Casa",
          address: "Bogotá",
        })
      );
    });

    it("should convert empty strings to undefined and use LIST endpoint", async () => {
      const filters: PropertyFilters = {
        name: "",
        address: "",
      };
      const mockData = { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 };
      mockGet.mockResolvedValueOnce(mockData);

      await propertiesService.getProperties(filters, 1, 20);

      expect(mockGet).toHaveBeenCalledWith(
        "/api/properties",
        expect.objectContaining({
          name: undefined,
          address: undefined,
        })
      );
    });
  });

  describe("getPropertyById", () => {
    it("should call DETAIL endpoint with correct id", async () => {
      const mockData = {
        idProperty: "123",
        name: "Test Property",
        address: "Test Address",
        price: 100000,
        image: "test.jpg",
        ownerName: "Test Owner",
      };
      mockGet.mockResolvedValueOnce(mockData);

      const result = await propertiesService.getPropertyById("123");

      expect(mockGet).toHaveBeenCalledWith("/api/properties/123");
      expect(result).toEqual(mockData);
    });
  });
});

