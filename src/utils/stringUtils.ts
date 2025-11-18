/**
 * Utility functions for string manipulation
 */

/**
 * Extracts initials from a person's name
 * @param name - Full name (e.g., "John Doe")
 * @returns Initials (e.g., "JD")
 */
export const getInitials = (name: string): string => {
  if (!name || name.trim().length === 0) return "?";

  const parts = name.trim().split(" ");
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name[0]?.toUpperCase() || "?";
};

