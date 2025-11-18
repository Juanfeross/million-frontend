import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

interface PropertyImagePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string | null;
  propertyName?: string;
}

export const PropertyImagePreview = ({
  open,
  onOpenChange,
  imageUrl,
  propertyName,
}: PropertyImagePreviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-5xl border-none bg-transparent p-0 shadow-none"
        hideCloseButton
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            {imageUrl ? `Vista ampliada de ${propertyName || "la propiedad"}` : "Sin imagen disponible"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {imageUrl ? `Imagen ampliada de la propiedad ${propertyName || ""}` : "Esta propiedad no tiene imágenes disponibles"}
          </DialogDescription>
        </DialogHeader>
        {imageUrl ? (
          <div className="relative rounded-3xl bg-black/90 p-4">
            <img
              src={imageUrl}
              alt="Vista ampliada"
              className="max-h-[75vh] w-full rounded-2xl object-contain"
              loading="eager"
              decoding="sync"
              fetchpriority="high"
            />
          </div>
        ) : (
          <div className="relative rounded-3xl bg-muted p-4">
            <div className="flex h-[75vh] w-full items-center justify-center">
              <ImagePlaceholder size="lg" />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

