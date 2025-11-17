import { Property } from "@/types/property";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MapPin, User, Home, Bath, Maximize } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface PropertyDetailProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyDetail = ({ property, open, onOpenChange }: PropertyDetailProps) => {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-foreground">
            {property.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl aspect-video">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground text-lg font-bold px-4 py-2 shadow-xl">
                ${property.price.toLocaleString()}
              </Badge>
            </div>
          </div>

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
                <div className="flex items-center gap-2 text-foreground">
                  <User className="w-5 h-5 text-primary" />
                  <span className="text-base">{property.owner}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Características
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.bedrooms && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Home className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{property.bedrooms}</div>
                      <div className="text-xs text-muted-foreground">Habitaciones</div>
                    </div>
                  </div>
                )}
                
                {property.bathrooms && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Bath className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{property.bathrooms}</div>
                      <div className="text-xs text-muted-foreground">Baños</div>
                    </div>
                  </div>
                )}
                
                {property.area && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 col-span-2">
                    <Maximize className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{property.area} m²</div>
                      <div className="text-xs text-muted-foreground">Área Total</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {property.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Descripción
                </h3>
                <p className="text-foreground leading-relaxed">{property.description}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
