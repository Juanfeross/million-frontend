import { PageSizeSelector } from "./PageSizeSelector";
import { PaginationControls } from "./PaginationControls";
import { PageJumpInput } from "./PageJumpInput";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  disabled?: boolean;
  showPageSize?: boolean;
  showJump?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  disabled = false,
  showPageSize = true,
  showJump = true,
}: PaginationProps) => {
  const desktopIndicator = (
    <p className="text-sm text-muted-foreground">
      Página {currentPage} de {totalPages}
    </p>
  );

  const mobileInput = (
    <PageJumpInput
      currentPage={currentPage}
      totalPages={totalPages}
      onJump={onPageChange}
      disabled={disabled}
      showLabel={false}
      showTotal={false}
    />
  );

  return (
    <div className="flex flex-col gap-4 border-t border-border/60 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {showPageSize && (
          <div className="flex flex-wrap items-center gap-3">
            <PageSizeSelector
              value={pageSize}
              options={pageSizeOptions}
              onChange={onPageSizeChange}
              disabled={disabled}
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            disabled={disabled}
            middleDesktop={desktopIndicator}
            middleMobile={mobileInput}
          />

          {showJump && totalPages > 1 && (
            <div className="hidden sm:flex sm:items-center sm:justify-end">
              <PageJumpInput
                currentPage={currentPage}
                totalPages={totalPages}
                onJump={onPageChange}
                disabled={disabled}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

