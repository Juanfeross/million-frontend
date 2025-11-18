import { useEffect, useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PageJumpInputProps {
  currentPage: number;
  totalPages: number;
  onJump: (page: number) => void;
  disabled?: boolean;
  showLabel?: boolean;
  showTotal?: boolean;
  className?: string;
}

export const PageJumpInput = ({
  currentPage,
  totalPages,
  onJump,
  disabled,
  showLabel = true,
  showTotal = true,
  className,
}: PageJumpInputProps) => {
  const safeTotalPages = totalPages || 1;
  const [value, setValue] = useState(String(currentPage));

  useEffect(() => {
    setValue(String(currentPage));
  }, [currentPage]);

  const submitValue = () => {
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      setValue(String(currentPage));
      return;
    }

    const nextPage = Math.min(Math.max(parsed, 1), safeTotalPages);
    setValue(String(nextPage));
    if (nextPage !== currentPage) {
      onJump(nextPage);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitValue();
    }
  };

  const inputId = "page-jump-input";

  return (
    <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className ?? ""}`}>
      {showLabel && (
        <Label htmlFor={inputId} className="sr-only">
          Ir a página
        </Label>
      )}
      {showLabel && <span aria-hidden="true">Ir a</span>}
      <Input
        id={inputId}
        type="number"
        min={1}
        max={safeTotalPages}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={submitValue}
        onKeyDown={handleKeyDown}
        disabled={disabled || safeTotalPages <= 1}
        aria-label={showLabel ? undefined : `Ir a página, página actual ${currentPage} de ${safeTotalPages}`}
        className={`h-9 w-16 text-center text-foreground ${
          !showLabel && !showTotal ? "w-14 text-sm" : ""
        }`}
      />
      {showTotal && <span aria-hidden="true">/ {safeTotalPages}</span>}
    </div>
  );
};
