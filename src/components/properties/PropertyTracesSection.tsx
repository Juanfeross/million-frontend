import { PropertyTrace } from "@/types/property";
import { formatCurrency, formatDate } from "@/utils/formatters";

interface PropertyTracesSectionProps {
  traces: PropertyTrace[];
}

export const PropertyTracesSection = ({ traces }: PropertyTracesSectionProps) => {
  if (traces.length === 0) return null;

  return (
    <div className="space-y-4 rounded-2xl border border-border/60 p-5 shadow-sm lg:col-span-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Historial de transacciones
        </h3>
        <span className="text-xs text-muted-foreground">{traces.length} registros</span>
      </div>
      <div className="space-y-4">
        {traces.map((trace) => (
          <div
            key={trace.idPropertyTrace}
            className="rounded-2xl border border-border/50 bg-white/80 p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary font-semibold text-xs uppercase tracking-wide">
                {trace.idPropertyTrace}
              </div>
              <span className="text-xs text-muted-foreground">{formatDate(trace.dateSale)}</span>
            </div>
            <h4 className="mt-2 text-base font-semibold text-foreground">{trace.name}</h4>
            <div className="mt-3 flex flex-wrap gap-6 text-sm">
              <span className="text-muted-foreground">
                Valor <strong className="text-foreground">{formatCurrency(trace.value)}</strong>
              </span>
              <span className="text-muted-foreground">
                Impuestos <strong className="text-foreground">{formatCurrency(trace.tax)}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

