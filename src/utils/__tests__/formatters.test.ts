import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate, formatNumber } from "../formatters";

describe("formatters", () => {
  describe("formatCurrency", () => {
    it("should format number as USD currency", () => {
      const result1 = formatCurrency(1000);
      const result2 = formatCurrency(250000);
      const result3 = formatCurrency(0);
      
      expect(result1).toContain("US$");
      expect(result2).toContain("US$");
      expect(result2).toMatch(/250/);
      expect(result3).toContain("0");
    });

    it("should not include decimal places", () => {
      const result = formatCurrency(1234.56);
      expect(result).not.toContain(",");
      expect(result).toContain("1235");
    });

    it("should handle large numbers", () => {
      const result = formatCurrency(1000000);
      expect(result).toMatch(/1[.\s]?000[.\s]?000/);
      expect(result).toContain("US$");
    });
  });

  describe("formatDate", () => {
    it("should format date string correctly", () => {
      const date = "2023-01-15T00:00:00Z";
      const result = formatDate(date);
      expect(result).toContain("2023");
      expect(result).toMatch(/\d{1,2}/);
    });

    it("should handle different date formats", () => {
      const date = "2024-12-25";
      const result = formatDate(date);
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });
  });

  describe("formatNumber", () => {
    it("should format number with locale formatting", () => {
      expect(formatNumber(1000)).toMatch(/1000/);
      expect(formatNumber(1000000)).toMatch(/1[.\s]?000[.\s]?000/);
      expect(formatNumber(123)).toBe("123");
    });

    it("should handle zero", () => {
      expect(formatNumber(0)).toBe("0");
    });

    it("should handle negative numbers", () => {
      expect(formatNumber(-1000)).toMatch(/-1000/);
    });
  });
});

