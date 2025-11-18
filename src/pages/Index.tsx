import { useState, lazy, Suspense, useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
const PropertyDetail = lazy(() =>
  import("@/components/properties/PropertyDetail").then(module => ({
    default: module.PropertyDetail
  }))
);
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
  PropertyListData,
  PropertySummary,
} from "@/types/property";
import { propertiesService } from "@/services/properties";
import { usePagination } from "@/hooks/usePagination";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { useLCPImagePreload } from "@/hooks/useLCPImagePreload";
import { isValidImageUrl } from "@/utils/imageUtils";
import { PAGE_SIZE_OPTIONS } from "@/constants/properties";

const Index = () => {
  const { filters, updateFilters, resetFilters } = usePropertyFilters();
  const { page, pageSize, handlePageChange: baseHandlePageChange, handlePageSizeChange } = usePagination({
    initialPage: 1,
    initialPageSize: PAGE_SIZE_OPTIONS[0],
  });
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

  const firstLCPImage = useMemo(() => {
    const firstProperty = data?.items?.[0];
    if (firstProperty && isValidImageUrl(firstProperty.image)) {
      return firstProperty.image;
    }
    return null;
  }, [data?.items]);

  useLCPImagePreload(firstLCPImage);

  const handlePageChange = (newPage: number) => {
    baseHandlePageChange(newPage, totalPages);
  };

  const handleFilters = (nextFilters: typeof filters) => {
    updateFilters(nextFilters);
    handlePageChange(1);
  };

  const handleResetFilters = () => {
    resetFilters();
    handlePageChange(1);
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

      <Suspense fallback={null}>
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
      </Suspense>

      <PageFooter />
    </div>
  );
};

export default Index;
