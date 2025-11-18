import { Loader2 } from "lucide-react";

interface PropertiesHeaderProps {
  total: number;
  isFetching: boolean;
}

export const PropertiesHeader = ({ total, isFetching }: PropertiesHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-3 flex-wrap">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Propiedades Disponibles</h2>
        <div className="flex items-center gap-2">
          {isFetching && <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />}
          <span className="text-base md:text-lg text-muted-foreground font-medium">
            {isFetching ? "Actualizando..." : (
              <>
                <span className="text-primary font-semibold">{total.toLocaleString()}</span>{" "}
                {total === 1 ? "propiedad" : "propiedades"}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

