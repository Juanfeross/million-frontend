import { MapPin } from "lucide-react";
import { InfoSection } from "@/components/common/InfoSection";

interface PropertyInfoSectionProps {
  address: string;
}

export const PropertyInfoSection = ({ address }: PropertyInfoSectionProps) => {
  return (
    <InfoSection title="Ubicación" showSeparator>
      <div className="flex items-start gap-2 text-foreground">
        <MapPin className="h-5 w-5 flex-shrink-0 text-primary" />
        <span className="text-base leading-relaxed">{address}</span>
      </div>
    </InfoSection>
  );
};

