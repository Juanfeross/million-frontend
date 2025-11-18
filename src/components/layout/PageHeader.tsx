import { Building2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 px-4 md:py-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="bg-background/95 hover:bg-background text-foreground shadow-lg backdrop-blur-sm border border-border/50 transition-all hover:scale-105"
          >
            <Link to="/docs" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Ver documentación</span>
              <span className="sm:hidden">Docs</span>
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-12 h-12 md:w-14 md:h-14" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
        </div>
        <p className="text-center text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">{description}</p>
      </div>
    </header>
  );
};

