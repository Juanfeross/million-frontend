import { PropertySummary } from "@/types/property";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, User } from "lucide-react";

interface PropertyCardProps {
  property: PropertySummary;
  onClick: () => void;
}

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl border-border/50 bg-card"
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.image || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(event) => {
            (event.currentTarget as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground font-semibold shadow-lg">
            ${property.price.toLocaleString()}
          </Badge>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {property.name}
        </h3>

        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="text-sm line-clamp-2">{property.address}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground pt-2 border-t border-border/50">
          <User className="w-4 h-4" />
          <span className="text-sm">{property.ownerName}</span>
        </div>
      </div>
    </Card>
  );
};
