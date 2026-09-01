import type { TranslationKey } from "@/lib/i18n";

export interface Department {
  id: string;
  nameKey: TranslationKey;
  enNameKey: TranslationKey;
  logo: string;
  requirementKeys: TranslationKey[];
}

export interface Institution {
  id: string;
  nameKey: TranslationKey;
  logo: string;
  website?: string;
  address?: string;
  departments: Department[];
}

export const institutions: Institution[] = [
  {
    id: "itc",
    nameKey: "overview.institutions.itc",
    logo: "/images/ITC-logo.png",
    website: "itc.edu.kh",
    address: "Russian Federation Blvd., Toul Kork District, Phnom Penh",
    departments: [
      {
        id: "gic",
        nameKey: "departments.itc.gic.name",
        enNameKey: "departments.itc.gic.enName",
        logo: "/images/GIC-logo.png",
        requirementKeys: [
          "departments.itc.gic.req.1",
          "departments.itc.gic.req.2",
          "departments.itc.gic.req.3",
          "departments.itc.gic.req.4",
          "departments.itc.gic.req.5",
        ],
      },
    ],
  },
  {
    id: "uhs",
    nameKey: "overview.institutions.usha",
    logo: "/images/UHS-logo.png",
    website: "uhs.edu.kh",
    address: "73 Preah Monivong Blvd, Phnom Penh",
    departments: [],
  },
  {
    id: "rupp",
    nameKey: "overview.institutions.rupp",
    logo: "/images/RUPP-logo.png",
    website: "rupp.edu.kh",
    address: "Russian Federation Boulevard (St. 110), Toul Kork, Phnom Penh",
    departments: [],
  },
  {
    id: "ifl",
    nameKey: "overview.institutions.ifl",
    logo: "/images/IFL-logo.png",
    website: "ifl.rupp.edu.kh",
    address: "Russian Federation Boulevard (St. 110), Toul Kork, Phnom Penh",
    departments: [],
  },
];

export const institutionLabels: Record<string, TranslationKey> = Object.fromEntries(
  institutions.map((institution) => [institution.id, institution.nameKey]),
);