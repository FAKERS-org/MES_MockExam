import { BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage, TranslationKey } from "@/lib/i18n";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

interface Institution {
  id: string;
  nameKey: TranslationKey;
  logo: string;
}

const institutions: Institution[] = [
  { id: "itc", nameKey: "overview.institutions.itc", logo: "/images/ITC-logo.png" },
  { id: "usha", nameKey: "overview.institutions.usha", logo: "/images/UHS-logo.png" },
  { id: "rupp", nameKey: "overview.institutions.rupp", logo: "/images/RUPP-logo.png" },
  { id: "ifl", nameKey: "overview.institutions.ifl", logo: "/images/IFL-logo.png" },
];

// ---------------------------------------------------------------------------
// Page sections
// ---------------------------------------------------------------------------

function ProfileCard() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm dark:bg-card dark:border-border">
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://i.pravatar.cc/112?img=13" alt="" />
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-bold text-slate-900 dark:text-foreground">
          {t("overview.welcome", { name: "យាង អូយអឹង" })}
        </p>
        <p className="text-sm text-slate-500 dark:text-muted-foreground">{t("overview.role")}</p>
      </div>
    </div>
  );
}

function InstitutionCard({ institution }: { institution: Institution }) {
  const { t } = useLanguage();
  const name = t(institution.nameKey);
  return (
    <button className="flex flex-col items-center rounded-xl border bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md dark:bg-card dark:border-border">
      <img
        src={institution.logo}
        alt={name}
        className="mb-4 h-24 w-24 rounded-full object-contain"
      />
      <p className="mb-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-slate-900 dark:text-foreground">
        {name}
      </p>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-muted-foreground">
        <BookOpen className="h-3.5 w-3.5" />
        <span>{t("overview.subjectsLabel")}</span>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <ProfileCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {institutions.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>
    </div>
  );
}
