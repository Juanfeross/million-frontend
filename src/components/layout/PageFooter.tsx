export const PageFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 mt-16 py-8 px-4 border-t border-border/50">
      <div className="max-w-7xl mx-auto text-center text-muted-foreground">
        <p className="text-sm">© {currentYear} EstateHub - Plataforma de Gestión de Propiedades</p>
      </div>
    </footer>
  );
};

