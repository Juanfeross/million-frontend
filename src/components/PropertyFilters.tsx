import { useEffect, useState, type KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Search, RotateCcw } from "lucide-react";
import { PropertyFilters as PropertyFiltersType } from "@/types/property";

interface PropertyFiltersProps {
  value: PropertyFiltersType;
  onFilter: (filters: PropertyFiltersType) => void;
  onReset: () => void;
}

export const PropertyFilters = ({ value, onFilter, onReset }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<PropertyFiltersType>(value);

  useEffect(() => {
    setFilters(value);
  }, [value]);

  const handleSearch = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    onReset();
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="p-6 bg-card border-border/50 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-foreground">
            Nombre de Propiedad
          </Label>
          <Input
            id="name"
            placeholder="Buscar por nombre..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            onKeyPress={handleKeyPress}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-sm font-medium text-foreground">
            Dirección
          </Label>
          <Input
            id="address"
            placeholder="Buscar por dirección..."
            value={filters.address}
            onChange={(e) => setFilters({ ...filters, address: e.target.value })}
            onKeyPress={handleKeyPress}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minPrice" className="text-sm font-medium text-foreground">
            Precio Mínimo
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="$0"
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })
            }
            onKeyPress={handleKeyPress}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice" className="text-sm font-medium text-foreground">
            Precio Máximo
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="$10,000,000"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })
            }
            onKeyPress={handleKeyPress}
            className="bg-background border-border"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSearch}
          className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex-1 md:flex-none"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Limpiar
        </Button>
      </div>
    </Card>
  );
};
