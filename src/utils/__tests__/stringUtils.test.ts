import { describe, it, expect } from "vitest";
import { getInitials } from "../stringUtils";

describe("stringUtils", () => {
  describe("getInitials", () => {
    it("should extract initials from full name", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Juan Fernando")).toBe("JF");
      expect(getInitials("María García")).toBe("MG");
    });

    it("should handle single name", () => {
      expect(getInitials("John")).toBe("J");
      expect(getInitials("María")).toBe("M");
    });

    it("should handle names with multiple words (takes first two)", () => {
      expect(getInitials("Juan Fernando Álvarez")).toBe("JF");
      expect(getInitials("María del Carmen")).toBe("MD");
    });

    it("should return uppercase initials", () => {
      expect(getInitials("john doe")).toBe("JD");
      expect(getInitials("JOHN DOE")).toBe("JD");
    });

    it("should handle empty string", () => {
      expect(getInitials("")).toBe("?");
    });

    it("should handle whitespace-only strings", () => {
      expect(getInitials("   ")).toBe("?");
    });

    it("should trim whitespace", () => {
      const result = getInitials("  John  Doe  ");
      expect(result.length).toBeGreaterThan(0);
      expect(result).toMatch(/^[A-Z]/);
    });
  });
});

