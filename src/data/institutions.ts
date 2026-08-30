import type { TranslationKey } from "@/lib/i18n";

export interface Institution {
  id: string;
  nameKey: TranslationKey;
  logo: string;
}

export const institutions: Institution[] = [
  { id: "itc", nameKey: "overview.institutions.itc", logo: "/images/ITC-logo.png" },
  { id: "usha", nameKey: "overview.institutions.usha", logo: "/images/UHS-logo.png" },
  { id: "rupp", nameKey: "overview.institutions.rupp", logo: "/images/RUPP-logo.png" },
  { id: "ifl", nameKey: "overview.institutions.ifl", logo: "/images/IFL-logo.png" },
];

export const institutionLabels: Record<string, TranslationKey> = Object.fromEntries(
  institutions.map((institution) => [institution.id, institution.nameKey]),
);