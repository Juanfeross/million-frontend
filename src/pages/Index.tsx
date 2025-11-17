import { useState, useMemo } from "react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyDetail } from "@/components/PropertyDetail";
import { Property, PropertyFilters as PropertyFiltersType } from "@/types/property";
import { mockProperties } from "@/data/mockProperties";
import { Building2 } from "lucide-react";

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<PropertyFiltersType>({
    name: "",
    address: "",
    minPrice: 0,
    maxPrice: 10000000,
  });

  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      const matchesName = property.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesAddress = property.address.toLowerCase().includes(filters.address.toLowerCase());
      const matchesPrice = property.price >= filters.minPrice && property.price <= filters.maxPrice;
      
      return matchesName && matchesAddress && matchesPrice;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 px-4 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-12 h-12 md:w-14 md:h-14" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              EstateHub
            </h1>
          </div>
          <p className="text-center text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Encuentra la propiedad de tus sueños con nuestra plataforma de búsqueda avanzada
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Filters */}
        <PropertyFilters onFilter={setFilters} />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Propiedades Disponibles
          </h2>
          <span className="text-muted-foreground font-medium">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad' : 'propiedades'}
          </span>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={() => setSelectedProperty(property)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-2">
              No se encontraron propiedades
            </div>
            <p className="text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </main>

      {/* Property Detail Modal */}
      <PropertyDetail
        property={selectedProperty}
        open={!!selectedProperty}
        onOpenChange={(open) => !open && setSelectedProperty(null)}
      />

      {/* Footer */}
      <footer className="bg-muted/30 mt-16 py-8 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 EstateHub - Plataforma de Gestión de Propiedades
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
