import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyDetail } from "@/components/PropertyDetail";
import { PageHeader } from "@/components/layout/PageHeader";
import { PageFooter } from "@/components/layout/PageFooter";
import { PropertiesHeader } from "@/components/properties/PropertiesHeader";
import { PropertiesGrid } from "@/components/properties/PropertiesGrid";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/pagination/Pagination";
import { PageSizeSelector } from "@/components/pagination/PageSizeSelector";
import {
  PropertyDetail as PropertyDetailType,
  PropertyFilters as PropertyFiltersType,
  PropertyListData,
  PropertySummary,
} from "@/types/property";
import { propertiesService } from "@/services/properties";

const DEFAULT_FILTERS: PropertyFiltersType = {
  name: "",
  address: "",
  minPrice: undefined,
  maxPrice: undefined,
};

const PAGE_SIZE_OPTIONS = [12, 24, 48];

const Index = () => {
  const [filters, setFilters] = useState<PropertyFiltersType>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
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

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  const isEmpty = !isLoading && properties.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="EstateHub"
        description="Encuentra la propiedad de tus sueños con nuestra plataforma de búsqueda avanzada"
      />

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-6">
        <PropertyFilters
          value={filters}
          onFilter={handleFilters}
          onReset={handleResetFilters}
          disabled={isFetching}
        />

        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <PropertiesHeader total={total} isFetching={isFetching} />
          {!isEmpty && (
            <div className="self-start sm:self-auto w-full sm:w-auto">
              <PageSizeSelector
                value={pageSize}
                options={PAGE_SIZE_OPTIONS}
                onChange={handlePageSizeChange}
                disabled={isFetching}
              />
            </div>
          )}
        </div>

        {isError && <ErrorState message={(error as Error)?.message} />}

        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <PropertiesGrid
              properties={properties}
              isLoading={isLoading}
              isFetching={isFetching}
              onPropertyClick={setSelectedPropertyId}
            />

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              pageSize={pageSize}
              pageSizeOptions={PAGE_SIZE_OPTIONS}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              disabled={isFetching}
            />
          </>
        )}
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

      <PageFooter />
    </div>
  );
};

export default Index;
