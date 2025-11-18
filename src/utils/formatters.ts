/**
 * Utility functions for formatting data
 */

/**
 * Formats a number as currency in USD format
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a date string to a readable format
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Formats a number with locale-specific formatting
 */
export const formatNumber = (value: number): string => {
  return value.toLocaleString("es-ES");
};

