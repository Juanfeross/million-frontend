import { PropertySummary } from "@/types/property";
import { PropertyCard } from "@/components/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";

interface PropertiesGridProps {
  properties: PropertySummary[];
  isLoading: boolean;
  isFetching: boolean;
  onPropertyClick: (propertyId: string) => void;
}

export const PropertiesGrid = ({ properties, isLoading, isFetching, onPropertyClick }: PropertiesGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-80 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.idProperty}
          property={property}
          onClick={() => onPropertyClick(property.idProperty)}
          disabled={isFetching}
        />
      ))}
    </div>
  );
};

