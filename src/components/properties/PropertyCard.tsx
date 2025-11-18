import { useState, useEffect } from "react";
import { PropertySummary } from "@/types/property";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";
import { isValidImageUrl } from "@/utils/imageUtils";
import { formatNumber } from "@/utils/formatters";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";

interface PropertyCardProps {
  property: PropertySummary;
  onClick: () => void;
  disabled?: boolean;
  isLCP?: boolean; // Indica si es una de las primeras imágenes (LCP candidate)
}

export const PropertyCard = ({ property, onClick, disabled = false, isLCP = false }: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);
  const hasValidImage = isValidImageUrl(property.image);

  useEffect(() => {
    setImageError(false);
  }, [property.idProperty, property.image]);

  const showPlaceholder = !hasValidImage || imageError;

  return (
    <Card
      role="button"
      tabIndex={disabled ? undefined : 0}
      aria-label={`Ver detalles de ${property.name}, ubicada en ${property.address}, precio ${formatNumber(property.price)}`}
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 ${
        disabled
          ? "pointer-events-none opacity-60"
          : "cursor-pointer hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      }`}
      onClick={() => !disabled && onClick()}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {hasValidImage && !imageError && (
          <img
            src={property.image}
            alt={property.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
            loading={isLCP ? "eager" : "lazy"}
            decoding={isLCP ? "sync" : "async"}
            fetchpriority={isLCP ? "high" : "low"}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            width={800}
            height={600}
            onError={() => {
              setImageError(true);
            }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}
        {showPlaceholder && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted">
            <ImagePlaceholder size="md" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary/95 backdrop-blur-sm text-primary-foreground font-semibold shadow-lg px-4 py-1.5 text-sm">
            ${formatNumber(property.price)}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary/70" />
            <span className="text-sm leading-relaxed line-clamp-2">{property.address}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-border/40 pt-4 text-sm">
          <User className="h-4 w-4 text-primary/80" />
          <div className="flex flex-col">
            <span className="font-semibold text-foreground line-clamp-1">{property.ownerName}</span>
            <span className="text-xs text-muted-foreground">Propietario</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
