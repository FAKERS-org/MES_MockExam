import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useLanguage, translations } from "@/lib/i18n";
import type { Institution } from "@/data/institutions";

const UniInfoSecondCard = ({ institution }: { institution: Institution }) => {
  const { t } = useLanguage();
  const name = t(institution.nameKey);
  const khName = translations.kh[institution.nameKey] ?? name;
  const enName = translations.en[institution.nameKey] ?? name;

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-start p-6 gap-4">
        {/* Logo Image */}
        <img
          src={institution.logo}
          alt={name}
          className="h-24 w-24 rounded-full object-cover border"
        />

        {/* Multilingual Names */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold leading-tight">{khName}</h2>
          <h3 className="text-base font-medium text-muted-foreground">{enName}</h3>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-1">
          {institution.website && (
            <a
              href={`https://${institution.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline"
            >
              {institution.website}
            </a>
          )}
          {institution.address && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {institution.address}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UniInfoSecondCard;