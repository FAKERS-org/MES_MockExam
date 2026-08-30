import type { TranslationKey } from "@/lib/i18n";

export interface Institution {
  id: string;
  nameKey: TranslationKey;
  logo: string;
  website?: string;
  address?: string;
}

export const institutions: Institution[] = [
  {
    id: "itc",
    nameKey: "overview.institutions.itc",
    logo: "/images/ITC-logo.png",
    website: "itc.edu.kh",
    address: "Russian Federation Blvd., Toul Kork District, Phnom Penh",
  },
  {
    id: "uhs",
    nameKey: "overview.institutions.usha",
    logo: "/images/UHS-logo.png",
    website: "uhs.edu.kh",
    address: "73 Preah Monivong Blvd, Phnom Penh",
  },
  {
    id: "rupp",
    nameKey: "overview.institutions.rupp",
    logo: "/images/RUPP-logo.png",
    website: "rupp.edu.kh",
    address: "Russian Federation Boulevard (St. 110), Toul Kork, Phnom Penh",
  },
  {
    id: "ifl",
    nameKey: "overview.institutions.ifl",
    logo: "/images/IFL-logo.png",
    website: "ifl.rupp.edu.kh",
    address: "Russian Federation Boulevard (St. 110), Toul Kork, Phnom Penh",
  },
];

export const institutionLabels: Record<string, TranslationKey> = Object.fromEntries(
  institutions.map((institution) => [institution.id, institution.nameKey]),
);