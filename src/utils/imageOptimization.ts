export const generateImageSrcSet = (baseUrl: string): string | undefined => {
  if (!baseUrl) return undefined;
  if (baseUrl.includes("?") || baseUrl.includes("&")) {
    return undefined;
  }
  return undefined;
};

export const getRecommendedImageSize = (): { width: number; height: number } => {
  if (typeof window === "undefined") {
    return { width: 800, height: 600 };
  }

  const viewportWidth = window.innerWidth;
  
  if (viewportWidth < 768) {
    return { width: 400, height: 300 };
  } else if (viewportWidth < 1024) {
    return { width: 600, height: 450 };
  } else {
    return { width: 800, height: 600 };
  }
};

