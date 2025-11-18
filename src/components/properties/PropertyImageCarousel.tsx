import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

interface PropertyImageCarouselProps {
  images: string[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onImageClick: () => void;
  onThumbnailClick: (index: number) => void;
  onImageError?: () => void;
  propertyName: string;
}

export const PropertyImageCarousel = ({
  images,
  activeIndex,
  onPrev,
  onNext,
  onImageClick,
  onThumbnailClick,
  onImageError,
  propertyName,
}: PropertyImageCarouselProps) => {
  const activeImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  if (images.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted">
        <div className="flex h-80 w-full items-center justify-center pointer-events-none">
          <ImagePlaceholder size="lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border border-border/40">
        {activeImage && (
          <img
            src={activeImage}
            alt={propertyName}
            className="h-80 w-full cursor-zoom-in object-cover transition duration-200 hover:opacity-95"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
            onError={onImageError}
            onClick={onImageClick}
          />
        )}
        {hasMultipleImages && (
          <>
            <button
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary shadow hover:bg-white transition-colors"
              onClick={onPrev}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary shadow hover:bg-white transition-colors"
              onClick={onNext}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {hasMultipleImages && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              className={`h-24 w-36 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                index === activeIndex
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border/40"
              }`}
              onClick={() => onThumbnailClick(index)}
              aria-label={`Ver imagen ${index + 1}`}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                sizes="144px"
                onError={onImageError}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

