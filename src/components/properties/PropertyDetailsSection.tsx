import { Hash, Calendar } from "lucide-react";
import { InfoCard } from "@/components/common/InfoCard";

interface PropertyDetailsSectionProps {
  codeInternal?: string;
  year?: number;
}

export const PropertyDetailsSection = ({ codeInternal, year }: PropertyDetailsSectionProps) => {
  return (
    <div className="space-y-4 rounded-2xl border border-border/60 p-5 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Detalles</h3>
      <div className="grid gap-4">
        {codeInternal && (
          <InfoCard
            icon={<Hash className="h-5 w-5 text-primary" />}
            label="Código interno"
            value={codeInternal}
          />
        )}
        {year && (
          <InfoCard
            icon={<Calendar className="h-5 w-5 text-primary" />}
            label="Año"
            value={year}
          />
        )}
      </div>
    </div>
  );
};

