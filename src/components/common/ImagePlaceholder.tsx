import { ImageOff } from "lucide-react";

interface ImagePlaceholderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
};

export const ImagePlaceholder = ({ size = "md", className = "" }: ImagePlaceholderProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 text-muted-foreground ${className}`}>
      <ImageOff className={`${sizeClasses[size]} drop-shadow-sm`} />
      <span className="text-sm font-medium uppercase tracking-wide drop-shadow-sm">Sin imagen</span>
    </div>
  );
};

