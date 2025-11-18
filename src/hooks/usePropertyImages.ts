import { useState, useEffect, useMemo } from "react";
import { getValidPropertyImages, isValidImageUrl } from "@/utils/imageUtils";

interface UsePropertyImagesProps {
  images?: string[];
  singleImage?: string;
}

export const usePropertyImages = ({ images, singleImage }: UsePropertyImagesProps) => {
  const [imageError, setImageError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const validImages = useMemo(() => {
    return getValidPropertyImages(images, singleImage);
  }, [images, singleImage]);

  const hasValidImage = validImages.length > 0;
  const activeImage = validImages[activeImageIndex];
  const showPlaceholder = !hasValidImage || imageError;

  useEffect(() => {
    setImageError(false);
    setActiveImageIndex(0);
  }, [validImages.length]);

  const goToPrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setActiveImageIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    if (index >= 0 && index < validImages.length) {
      setActiveImageIndex(index);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return {
    validImages,
    hasValidImage,
    activeImage,
    activeImageIndex,
    showPlaceholder,
    goToPrevImage,
    goToNextImage,
    goToImage,
    handleImageError,
  };
};

