import { Building2, Globe, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage, translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { InfoRow } from "@/components/shared/info-row";
import type { Institution } from "@/data/institutions";

export interface UniInfoSecondCardProps {
  institution: Institution;
  className?: string;
}

const UniInfoSecondCard = ({ institution, className }: UniInfoSecondCardProps) => {
  const { t } = useLanguage();
  const name = t(institution.nameKey);
  const khName = translations.kh[institution.nameKey] ?? name;
  const enName = translations.en[institution.nameKey] ?? name;

  return (
    <Card className={cn("h-fit w-full overflow-hidden rounded-xl", className)}>
      <div className="bg-primary px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src={institution.logo}
            alt={name}
            className="h-14 w-14 shrink-0 rounded-full border-4 border-white bg-white object-cover"
          />
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-bold leading-tight text-white">{khName}</h2>
            <h3 className="text-sm font-medium text-white/80">{enName}</h3>
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
          <Building2 className="h-5 w-5 shrink-0 text-primary" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {institution.departments.length}
            </span>
            <span className="text-xs text-muted-foreground">{t("info.detail.departments")}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">{t("info.detail.about")}</h4>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t(institution.descriptionKey)}
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t pt-4">
          {institution.website && (
            <InfoRow
              icon={<Globe className="h-4 w-4" />}
              value={institution.website}
              href={`https://${institution.website}`}
            />
          )}
          {institution.address && (
            <InfoRow
              icon={<MapPin className="h-4 w-4" />}
              value={institution.address}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UniInfoSecondCard;
