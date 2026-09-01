import { Card, CardContent } from "@/components/ui/card";
import { useLanguage, translations } from "@/lib/i18n";
import { Building2, Globe, MapPin } from "lucide-react";
import type { Institution } from "@/data/institutions";

const UniInfoSecondCard = ({ institution }: { institution: Institution }) => {
  const { t } = useLanguage();
  const name = t(institution.nameKey);
  const khName = translations.kh[institution.nameKey] ?? name;
  const enName = translations.en[institution.nameKey] ?? name;

  return (
    <Card className="w-full h-fit rounded-xl overflow-hidden">
      {/* Header banner */}
      <div className="bg-[#0f4c81] px-6 py-5">
        <div className="flex items-center gap-4">
          <img
            src={institution.logo}
            alt={name}
            className="h-14 w-14 rounded-full object-cover border-4 border-white bg-white shrink-0"
          />
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-bold leading-tight text-white">{khName}</h2>
            <h3 className="text-sm font-medium text-white/80">{enName}</h3>
          </div>
        </div>
      </div>

      <CardContent className="flex flex-col gap-6 p-6">
        {/* Department count */}
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
          <Building2 className="h-5 w-5 shrink-0 text-[#0f4c81]" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {institution.departments.length}
            </span>
            <span className="text-xs text-muted-foreground">{t("info.detail.departments")}</span>
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-semibold text-foreground">{t("info.detail.about")}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t(institution.descriptionKey)}
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-1 border-t pt-4">
          {institution.website && (
            <a
              href={`https://${institution.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-1.5 text-sm font-medium text-primary hover:underline"
            >
              <Globe className="h-4 w-4 shrink-0 text-[#0f4c81]" />
              <span className="truncate">{institution.website}</span>
            </a>
          )}
          {institution.address && (
            <div className="flex items-start gap-3 py-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#0f4c81] mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {institution.address}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UniInfoSecondCard;
