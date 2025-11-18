import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  showSeparator?: boolean;
  className?: string;
}

export const InfoSection = ({ title, children, showSeparator = false, className = "" }: InfoSectionProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
        <div className="mt-2">{children}</div>
      </div>
      {showSeparator && <Separator />}
    </div>
  );
};

