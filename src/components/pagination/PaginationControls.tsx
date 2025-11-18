import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  middleDesktop?: ReactNode;
  middleMobile?: ReactNode;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  middleDesktop,
  middleMobile,
}: PaginationControlsProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const defaultText = (
    <p className="text-sm text-muted-foreground">Página {currentPage} de {totalPages}</p>
  );

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentPage === 1 || disabled}
        aria-label={`Ir a página anterior, página ${currentPage - 1}`}
      >
        Anterior
      </Button>
      <div className="hidden sm:block" aria-live="polite" aria-atomic="true">
        {middleDesktop ?? defaultText}
      </div>
      <div className="sm:hidden" aria-live="polite" aria-atomic="true">
        {middleMobile ?? defaultText}
      </div>
      <Button
        variant="outline"
        onClick={handleNext}
        disabled={currentPage === totalPages || disabled || totalPages === 0}
        aria-label={`Ir a página siguiente, página ${currentPage + 1}`}
      >
        Siguiente
      </Button>
    </div>
  );
};

