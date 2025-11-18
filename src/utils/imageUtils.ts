/**
 * Utility functions for image handling
 */

/**
 * Validates if an image URL is valid (not empty)
 */
export const isValidImageUrl = (url: string | undefined | null): boolean => {
  return Boolean(url && url.trim().length > 0);
};

/**
 * Filters an array of image URLs to only include valid ones
 */
export const filterValidImages = (images: (string | undefined | null)[]): string[] => {
  return images.filter((img): img is string => isValidImageUrl(img));
};

/**
 * Gets valid images from a property, checking both images array and single image
 */
export const getValidPropertyImages = (
  images?: string[],
  singleImage?: string,
): string[] => {
  if (images && images.length > 0) {
    return filterValidImages(images);
  }
  if (singleImage && isValidImageUrl(singleImage)) {
    return [singleImage];
  }
  return [];
};

