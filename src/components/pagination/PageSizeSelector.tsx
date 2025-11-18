import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PageSizeSelectorProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
  disabled?: boolean;
}

export const PageSizeSelector = ({ value, options, onChange, disabled }: PageSizeSelectorProps) => {
  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
      <span>Mostrar</span>
      <Select value={String(value)} onValueChange={(val) => onChange(Number(val))} disabled={disabled}>
        <SelectTrigger className="w-20 h-9 text-sm">
          <SelectValue placeholder="Cantidad" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span>por página</span>
    </div>
  );
};

