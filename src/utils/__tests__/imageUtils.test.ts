import { describe, it, expect } from "vitest";
import { isValidImageUrl, filterValidImages, getValidPropertyImages } from "../imageUtils";

describe("imageUtils", () => {
  describe("isValidImageUrl", () => {
    it("should return true for valid URL strings", () => {
      expect(isValidImageUrl("https://example.com/image.jpg")).toBe(true);
      expect(isValidImageUrl("http://example.com/image.png")).toBe(true);
      expect(isValidImageUrl("/path/to/image.jpg")).toBe(true);
    });

    it("should return false for empty strings", () => {
      expect(isValidImageUrl("")).toBe(false);
      expect(isValidImageUrl("   ")).toBe(false);
    });

    it("should return false for null or undefined", () => {
      expect(isValidImageUrl(null)).toBe(false);
      expect(isValidImageUrl(undefined)).toBe(false);
    });
  });

  describe("filterValidImages", () => {
    it("should filter out invalid images", () => {
      const images = [
        "https://example.com/image1.jpg",
        "",
        "https://example.com/image2.jpg",
        null,
        undefined,
        "   ",
      ];

      const result = filterValidImages(images);
      expect(result).toEqual([
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ]);
    });

    it("should return empty array for all invalid images", () => {
      const images = ["", null, undefined, "   "];
      expect(filterValidImages(images)).toEqual([]);
    });

    it("should return all images if all are valid", () => {
      const images = [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ];
      expect(filterValidImages(images)).toEqual(images);
    });
  });

  describe("getValidPropertyImages", () => {
    it("should prioritize images array over single image", () => {
      const images = ["https://example.com/image1.jpg", "https://example.com/image2.jpg"];
      const singleImage = "https://example.com/single.jpg";

      const result = getValidPropertyImages(images, singleImage);
      expect(result).toEqual(images);
    });

    it("should use single image if images array is empty", () => {
      const singleImage = "https://example.com/single.jpg";
      const result = getValidPropertyImages([], singleImage);
      expect(result).toEqual([singleImage]);
    });

    it("should use single image if images array is not provided", () => {
      const singleImage = "https://example.com/single.jpg";
      const result = getValidPropertyImages(undefined, singleImage);
      expect(result).toEqual([singleImage]);
    });

    it("should return empty array if both are invalid", () => {
      expect(getValidPropertyImages([], "")).toEqual([]);
      expect(getValidPropertyImages(undefined, "")).toEqual([]);
      expect(getValidPropertyImages([], undefined)).toEqual([]);
    });
  });
});

