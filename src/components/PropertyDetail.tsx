import { PropertyDetail as PropertyDetailType } from "@/types/property";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Calendar, Hash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertyDetailProps {
  property: PropertyDetailType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLoading: boolean;
}

export const PropertyDetail = ({ property, open, onOpenChange, isLoading }: PropertyDetailProps) => {
  const mainImage = property?.images?.[0] ?? property?.image ?? "/placeholder.svg";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : property ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-foreground">{property.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-xl aspect-video">
                <img
                  src={mainImage}
                  alt={property.name}
                  className="w-full h-full object-cover"
                  onError={(event) => {
                    (event.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground text-lg font-bold px-4 py-2 shadow-xl">
                    ${property.price.toLocaleString()}
                  </Badge>
                </div>
              </div>

              {property.images && property.images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {property.images.slice(1).map((image, index) => (
                    <img
                      key={`${image}-${index}`}
                      src={image}
                      alt={`Imagen ${index + 2} de ${property.name}`}
                      className="w-full h-28 object-cover rounded-lg border border-border/40"
                      onError={(event) => {
                        (event.currentTarget as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Ubicación
                    </h3>
                    <div className="flex items-start gap-2 text-foreground">
                      <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-base">{property.address}</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                      Propietario
                    </h3>
                    <div className="flex items-center gap-3 text-foreground">
                      {property.owner?.photo && (
                        <img
                          src={property.owner.photo}
                          alt={property.owner.name}
                          className="h-12 w-12 rounded-full object-cover border border-border/50"
                        />
                      )}
                      <div>
                        <p className="text-base font-medium">{property.owner?.name ?? property.ownerName}</p>
                        {property.owner?.address && (
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {property.owner.address}
                          </p>
                        )}
                        {property.owner?.birthday && (
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(property.owner.birthday).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Detalles
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {property.codeInternal && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <Hash className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Código interno</p>
                          <p className="text-base font-semibold">{property.codeInternal}</p>
                        </div>
                      </div>
                    )}

                    {property.year && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">Año</p>
                          <p className="text-base font-semibold">{property.year}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground text-center">No se encontró información de la propiedad.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};
