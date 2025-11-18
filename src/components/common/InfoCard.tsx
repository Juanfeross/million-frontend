import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

export const InfoCard = ({ icon, label, value, className = "" }: InfoCardProps) => {
  return (
    <div className={`flex items-center gap-3 rounded-xl border border-border/50 p-3 ${className}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs uppercase text-muted-foreground">{label}</p>
        <p className="text-base font-semibold">{value}</p>
      </div>
    </div>
  );
};

