import { MapPin, Calendar, User } from "lucide-react";
import { InfoSection } from "@/components/common/InfoSection";
import { getInitials } from "@/utils/stringUtils";
import { PropertyOwner } from "@/types/property";

interface PropertyOwnerSectionProps {
  owner?: PropertyOwner;
  ownerName: string;
}

export const PropertyOwnerSection = ({ owner, ownerName }: PropertyOwnerSectionProps) => {
  const displayName = owner?.name ?? ownerName;

  return (
    <InfoSection title="Propietario">
      <div className="flex items-center gap-3 text-foreground">
        {owner?.photo ? (
          <img
            src={owner.photo}
            alt={displayName}
            className="h-12 w-12 rounded-full border border-border/50 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold uppercase text-primary">
            <User className="hidden" />
            {getInitials(displayName)}
          </div>
        )}
        <div className="space-y-1">
          <p className="text-base font-medium">{displayName}</p>
          {owner?.address && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {owner.address}
            </p>
          )}
          {owner?.birthday && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(owner.birthday).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </InfoSection>
  );
};

