import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyDetail } from "@/components/PropertyDetail";
import {
  PropertyDetail as PropertyDetailType,
  PropertyFilters as PropertyFiltersType,
  PropertyListData,
  PropertySummary,
} from "@/types/property";
import { propertiesService } from "@/services/properties";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const DEFAULT_FILTERS: PropertyFiltersType = {
  name: "",
  address: "",
  minPrice: undefined,
  maxPrice: undefined,
};

const PAGE_SIZE_OPTIONS = ["12", "20", "50"];

const Index = () => {
  const [filters, setFilters] = useState<PropertyFiltersType>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<PropertyListData>({
    queryKey: ["properties", filters, page, pageSize],
    queryFn: () => propertiesService.getProperties(filters, page, pageSize),
    placeholderData: keepPreviousData,
  });

  const {
    data: propertyDetail,
    isFetching: isDetailLoading,
  } = useQuery<PropertyDetailType>({
    queryKey: ["property-detail", selectedPropertyId],
    queryFn: () => propertiesService.getPropertyById(selectedPropertyId || ""),
    enabled: !!selectedPropertyId,
  });

  const properties: PropertySummary[] = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const handleFilters = (nextFilters: PropertyFiltersType) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || (data?.totalPages && nextPage > data.totalPages)) return;
    setPage(nextPage);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const isEmpty = !isLoading && properties.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 px-4 md:py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Building2 className="w-12 h-12 md:w-14 md:h-14" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">EstateHub</h1>
          </div>
          <p className="text-center text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Encuentra la propiedad de tus sueños con nuestra plataforma de búsqueda avanzada
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <PropertyFilters value={filters} onFilter={handleFilters} onReset={handleResetFilters} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Propiedades Disponibles</h2>
          <span className="text-muted-foreground font-medium">
            {isFetching ? "Actualizando..." : `${total} ${total === 1 ? "propiedad" : "propiedades"}`}
          </span>
        </div>

        {isError && (
          <Alert variant="destructive">
            <AlertTitle>Error al cargar propiedades</AlertTitle>
            <AlertDescription>{(error as Error)?.message ?? "Intenta nuevamente en unos segundos."}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : isEmpty ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground text-lg mb-2">No se encontraron propiedades</div>
            <p className="text-sm text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.idProperty}
                property={property}
                onClick={() => setSelectedPropertyId(property.idProperty)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/60 pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Mostrar</span>
            <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Cantidad" />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option} / página
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>resultados</span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isFetching}
            >
              Anterior
            </Button>
            <p className="text-sm text-muted-foreground">
              Página {page} de {totalPages}
            </p>
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || isFetching || totalPages === 0}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </main>

      <PropertyDetail
        property={propertyDetail ?? null}
        open={!!selectedPropertyId}
        isLoading={isDetailLoading}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPropertyId(null);
          }
        }}
      />

      <footer className="bg-muted/30 mt-16 py-8 px-4 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-sm">© 2024 EstateHub - Plataforma de Gestión de Propiedades</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
