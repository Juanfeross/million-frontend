import { useEffect, useState } from "react";
import { PropertyDetail as PropertyDetailType } from "@/types/property";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { formatNumber } from "@/utils/formatters";
import { PropertyImageCarousel } from "@/components/properties/PropertyImageCarousel";
import { PropertyInfoSection } from "@/components/properties/PropertyInfoSection";
import { PropertyOwnerSection } from "@/components/properties/PropertyOwnerSection";
import { PropertyDetailsSection } from "@/components/properties/PropertyDetailsSection";
import { PropertyTracesSection } from "@/components/properties/PropertyTracesSection";
import { PropertyImagePreview } from "@/components/properties/PropertyImagePreview";

interface PropertyDetailProps {
  property: PropertyDetailType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

export const PropertyDetail = ({
  property,
  open,
  onOpenChange,
  isLoading,
}: PropertyDetailProps) => {
  const {
    validImages,
    activeImage,
    activeImageIndex,
    goToPrevImage,
    goToNextImage,
    goToImage,
    handleImageError,
  } = usePropertyImages({
    images: property?.images,
    singleImage: property?.image,
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    const originalOverflow = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    const handlePageHide = () => {
      document.body.style.overflow = "";
    };

    const handlePageShow = () => {
      if (open) {
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [open]);

  const header = property && (
    <div className="sticky top-0 z-20 flex flex-col gap-1 border-b border-border/60 bg-card/95 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur flex-shrink-0">
      <DialogTitle className="text-2xl sm:text-3xl font-bold text-foreground">
        {property.name}
      </DialogTitle>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
        <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
        <p className="break-words">{property.address}</p>
      </div>
      <div className="flex flex-col gap-1 sm:absolute sm:top-6 sm:right-6 sm:text-right mt-2 sm:mt-0">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Precio
        </span>
        <span className="text-xl sm:text-2xl font-bold text-primary">
          ${formatNumber(property.price)}
        </span>
      </div>
    </div>
  );

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) return;
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="w-full max-w-4xl border-none bg-transparent p-0 shadow-none h-[90vh] max-h-[90vh] flex flex-col"
        hideCloseButton={isLoading}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            {property ? `Detalles de ${property.name}` : "Detalles de la propiedad"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {property ? `Información detallada sobre la propiedad ${property.name}, ubicada en ${property.address}` : "Información detallada de la propiedad"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col h-full max-h-full overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl">
          {isLoading ? (
            <div className="space-y-6 p-6 overflow-y-auto custom-scroll">
              <div className="space-y-2">
                <Skeleton className="h-7 w-2/3 rounded-full" />
                <Skeleton className="h-4 w-1/2 rounded-full" />
              </div>
              <Skeleton className="h-72 w-full rounded-2xl" />
              <div className="grid gap-3 md:grid-cols-2">
                <Skeleton className="h-24 rounded-2xl" />
                <Skeleton className="h-24 rounded-2xl" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-36 rounded-2xl" />
                <Skeleton className="h-36 rounded-2xl" />
              </div>
            </div>
          ) : open && property ? (
            <>
              {header}
              <div className="custom-scroll flex-1 overflow-y-auto min-h-0 px-6 pb-8 pt-6 space-y-6">
                <PropertyImageCarousel
                  images={validImages}
                  activeIndex={activeImageIndex}
                  onPrev={goToPrevImage}
                  onNext={goToNextImage}
                  onImageClick={() => activeImage && setIsPreviewOpen(true)}
                  onThumbnailClick={goToImage}
                  onImageError={handleImageError}
                  propertyName={property.name}
                />

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-6 rounded-2xl border border-border/60 p-5 shadow-sm">
                    <PropertyInfoSection address={property.address} />
                    <PropertyOwnerSection owner={property.owner} ownerName={property.ownerName} />
                  </div>

                  <PropertyDetailsSection codeInternal={property.codeInternal} year={property.year} />

                  {property.traces && property.traces.length > 0 && (
                    <PropertyTracesSection traces={property.traces} />
                  )}
                </div>
              </div>
            </>
          ) : open && !isLoading ? (
            <p className="p-6 text-center text-muted-foreground">
              No se encontró información de la propiedad.
            </p>
          ) : null}
        </div>
      </DialogContent>

      <PropertyImagePreview
        open={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        imageUrl={activeImage}
        propertyName={property?.name}
      />
    </Dialog>
  );
};
