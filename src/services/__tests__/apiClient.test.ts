import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient } from "../apiClient";

describe("apiClient", () => {
  const originalFetch = global.fetch;
  const mockFetch = vi.fn();

  beforeEach(() => {
    global.fetch = mockFetch as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockFetch.mockClear();
    global.fetch = originalFetch;
  });

  describe("get", () => {
    it("should make GET request successfully", async () => {
      const mockData = { id: 1, name: "Test" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockData,
          message: "Success",
        }),
      });

      const result = await apiClient.get("/api/test");

      expect(result).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const url = callArgs[0] as string;
      const options = callArgs[1] as RequestInit;
      expect(url).toContain("/api/test");
      expect(options.method).toBe("GET");
      expect(options.headers).toMatchObject({
        "Content-Type": "application/json",
      });
    });

    it("should include query parameters in URL", async () => {
      const mockData = { items: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockData,
          message: "Success",
        }),
      } as Response);

      await apiClient.get("/api/test", { page: 1, pageSize: 20 });

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const url = callArgs[0] as string;
      const urlObj = new URL(url);
      expect(urlObj.searchParams.get("page")).toBe("1");
      expect(urlObj.searchParams.get("pageSize")).toBe("20");
    });

    it("should filter out undefined, null, and empty string params", async () => {
      const mockData = { items: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockData,
          message: "Success",
        }),
      } as Response);

      await apiClient.get("/api/test", {
        page: 1,
        name: undefined,
        address: null,
        empty: "",
        valid: "value",
      });

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const url = callArgs[0] as string;
      const urlObj = new URL(url);
      expect(urlObj.searchParams.get("page")).toBe("1");
      expect(urlObj.searchParams.get("valid")).toBe("value");
      expect(urlObj.searchParams.has("name")).toBe(false);
      expect(urlObj.searchParams.has("address")).toBe(false);
      expect(urlObj.searchParams.has("empty")).toBe(false);
    });

    it("should throw error when response is not ok", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          success: false,
          message: "Not found",
        }),
      } as Response);

      await expect(apiClient.get("/api/test")).rejects.toThrow("Not found");
    });

    it("should throw error when payload success is false", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: false,
          message: "Error occurred",
        }),
      } as Response);

      await expect(apiClient.get("/api/test")).rejects.toThrow("Error occurred");
    });

    it("should throw error when JSON parsing fails", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      });

      await expect(apiClient.get("/api/test")).rejects.toThrow(
        "No fue posible leer la respuesta del servidor"
      );
    });

    it("should use default API URL when env var is not set", async () => {
      vi.stubGlobal("import", {
        meta: {
          env: {},
        },
      });
      const mockData = { id: 1 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockData,
          message: "Success",
        }),
      } as Response);

      await apiClient.get("/api/test");

      expect(mockFetch).toHaveBeenCalled();
      const callArgs = mockFetch.mock.calls[0];
      const url = callArgs[0] as string;
      expect(url).toContain("/api/test");
    });
  });
});

