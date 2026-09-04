import { Link } from "react-router-dom";
import { Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Institution } from "@/data/institutions";

export interface UniInfoCardProps {
  institution: Institution;
  className?: string;
}

const UniInfoCard = ({ institution, className }: UniInfoCardProps) => {
  const { t } = useLanguage();
  const name = t(institution.nameKey);

  return (
    <Link
      to={`/info/${institution.id}`}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-shadow hover:shadow-xl",
        className
      )}
    >
      {/* Blue Header */}
      <div className="relative h-24 bg-primary">
        {/* Logo positioned to overlap header and body */}
        <div className="absolute -bottom-10 left-6">
          <img
            src={institution.logo}
            alt={name}
            className="h-20 w-20 rounded-full border-4 border-white bg-white object-cover shadow-md"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 px-6 pb-6 pt-14">
        {/* Name */}
        <h1 className="mb-5 text-xl font-bold leading-snug text-foreground">
          {name}
        </h1>

        {/* Website */}
        {institution.website && (
          <div className="mb-3 flex items-center gap-3">
            <Globe className="h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm text-muted-foreground">{institution.website}</span>
          </div>
        )}

        {/* Address */}
        {institution.address && (
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-sm leading-relaxed text-muted-foreground">
              {institution.address}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default UniInfoCard;