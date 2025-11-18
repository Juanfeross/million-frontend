import { useEffect, useMemo, useState } from "react";
import { PropertyDetail as PropertyDetailType } from "@/types/property";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import {
  MapPin,
  User,
  Calendar,
  Hash,
  ChevronLeft,
  ChevronRight,
  ImageOff,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

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
  const images = useMemo(() => {
    // Filtrar imágenes válidas (no vacías)
    const validImages: string[] = [];

    if (property?.images && property.images.length > 0) {
      validImages.push(...property.images.filter(img => img && img.trim().length > 0));
    }

    // Si no hay imágenes en el array, verificar si hay una imagen principal válida
    if (validImages.length === 0 && property?.image && property.image.trim().length > 0) {
      validImages.push(property.image);
    }

    return validImages;
  }, [property?.images, property?.image]);
  const traces = property?.traces ?? [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [property?.idProperty]);

  const activeImage = images[activeImageIndex];

  const goToPrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

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
          ${property.price.toLocaleString()}
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
                {images.length > 0 ? (
                  <>
                    <div className="relative overflow-hidden rounded-2xl border border-border/40">
                      {activeImage && (
                        <img
                          src={activeImage}
                          alt={property.name}
                          className="h-80 w-full cursor-zoom-in object-cover transition duration-200 hover:opacity-95"
                          onError={() => {
                            // Si la imagen falla, no hacer nada - el placeholder se mostrará
                          }}
                          onClick={() => activeImage && setIsPreviewOpen(true)}
                        />
                      )}
                      {images.length > 1 && (
                        <>
                          <button
                            className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary shadow hover:bg-white"
                            onClick={goToPrevImage}
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-primary shadow hover:bg-white"
                            onClick={goToNextImage}
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>
                    {images.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                          <button
                            key={`${image}-${index}`}
                            className={`h-24 w-36 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                              index === activeImageIndex
                                ? "border-primary ring-2 ring-primary/30"
                                : "border-border/40"
                            }`}
                            onClick={() => setActiveImageIndex(index)}
                          >
                            <img
                              src={image}
                              alt={`Miniatura ${index + 1}`}
                              className="h-full w-full object-cover"
                              onError={() => {
                                // Si la miniatura falla, no hacer nada
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-muted">
                    <div className="flex h-80 w-full flex-col items-center justify-center gap-2 text-muted-foreground pointer-events-none">
                      <ImageOff className="h-16 w-16 drop-shadow-sm" />
                      <span className="text-sm font-medium uppercase tracking-wide drop-shadow-sm">Sin imagen</span>
                    </div>
                  </div>
                )}

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-6 rounded-2xl border border-border/60 p-5 shadow-sm">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Ubicación
                      </h3>
                      <div className="mt-2 flex items-start gap-2 text-foreground">
                        <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-base leading-relaxed">
                          {property.address}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Propietario
                      </h3>
                      <div className="mt-3 flex items-center gap-3 text-foreground">
                        {property.owner?.photo ? (
                          <img
                            src={property.owner.photo}
                            alt={property.owner.name}
                            className="h-12 w-12 rounded-full border border-border/50 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary">
                            <User className="hidden" />
                            {(property.owner?.name ?? property.ownerName)
                              .split(" ")
                              .map((word) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                        )}
                        <div className="space-y-1">
                          <p className="text-base font-medium">
                            {property.owner?.name ?? property.ownerName}
                          </p>
                          {property.owner?.address && (
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              {property.owner.address}
                            </p>
                          )}
                          {property.owner?.birthday && (
                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {new Date(
                                property.owner.birthday
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-2xl border border-border/60 p-5 shadow-sm">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Detalles
                    </h3>
                    <div className="grid gap-4">
                      {property.codeInternal && (
                        <div className="flex items-center gap-3 rounded-xl border border-border/50 p-3">
                          <Hash className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">
                              Código interno
                            </p>
                            <p className="text-base font-semibold">
                              {property.codeInternal}
                            </p>
                          </div>
                        </div>
                      )}
                      {property.year && (
                        <div className="flex items-center gap-3 rounded-xl border border-border/50 p-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs uppercase text-muted-foreground">
                              Año
                            </p>
                            <p className="text-base font-semibold">
                              {property.year}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {traces.length > 0 && (
                  <div className="space-y-4 rounded-2xl border border-border/60 p-5 shadow-sm lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Historial de transacciones
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {traces.length} registros
                        </span>
                      </div>
                      <div className="space-y-4">
                        {traces.map((trace, index) => (
                          <div
                            key={trace.idPropertyTrace}
                            className="rounded-2xl border border-border/50 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                          >
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary font-semibold text-xs uppercase tracking-wide">
                                {trace.idPropertyTrace}
                              </div>
                              <span className="text-xs text-muted-foreground">{formatDate(trace.dateSale)}</span>
                            </div>
                            <h4 className="mt-2 text-base font-semibold text-foreground">{trace.name}</h4>
                            <div className="mt-3 flex flex-wrap gap-6 text-sm">
                              <span className="text-muted-foreground">
                                Valor{" "}
                                <strong className="text-foreground">{formatCurrency(trace.value)}</strong>
                              </span>
                              <span className="text-muted-foreground">
                                Impuestos{" "}
                                <strong className="text-foreground">{formatCurrency(trace.tax)}</strong>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent
          className="w-full max-w-5xl border-none bg-transparent p-0 shadow-none"
          hideCloseButton
        >
          <DialogHeader>
            <DialogTitle className="sr-only">
              {activeImage ? `Vista ampliada de ${property?.name || "la propiedad"}` : "Sin imagen disponible"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {activeImage ? `Imagen ampliada de la propiedad ${property?.name || ""}` : "Esta propiedad no tiene imágenes disponibles"}
            </DialogDescription>
          </DialogHeader>
          {activeImage ? (
            <div className="relative rounded-3xl bg-black/90 p-4">
              <img
                src={activeImage}
                alt="Vista ampliada"
                className="max-h-[75vh] w-full rounded-2xl object-contain"
              />
            </div>
          ) : (
            <div className="relative rounded-3xl bg-muted p-4">
              <div className="flex h-[75vh] w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageOff className="h-16 w-16 drop-shadow-sm" />
                <span className="text-sm font-medium uppercase tracking-wide drop-shadow-sm">Sin imagen</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};
