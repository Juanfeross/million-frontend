interface EmptyStateProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({
  title = "No se encontraron propiedades",
  description = "Intenta ajustar los filtros de búsqueda",
}: EmptyStateProps) => {
  return (
    <div className="text-center py-16">
      <div className="text-muted-foreground text-lg mb-2">{title}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

