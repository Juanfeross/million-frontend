import { Building2 } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground py-16 px-4 md:py-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-12 h-12 md:w-14 md:h-14" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
        </div>
        <p className="text-center text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">{description}</p>
      </div>
    </header>
  );
};

