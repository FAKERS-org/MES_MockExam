import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/i18n";
import { institutions } from "@/data/institutions";
import { subjectsByInstitution } from "@/data/subjects";

const implemented = institutions.filter((institution) => institution.id in subjectsByInstitution);

function ProfileCard() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-card p-5 shadow-sm">
      <Avatar className="size-14">
        <AvatarFallback>YO</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-bold text-foreground">{t("overview.welcome", { name: t("overview.userName") })}</p>
        <p className="text-sm text-muted-foreground">{t("overview.role")}</p>
      </div>
    </div>
  );
}

function InstitutionCard({ institution }: { institution: (typeof implemented)[number] }) {
  const { t } = useLanguage();
  const name = t(institution.nameKey);
  const count = subjectsByInstitution[institution.id]!.groups.reduce(
    (sum, group) => sum + group.subjects.length,
    0,
  );
  return (
    <Link
      to={`/dashboard/${institution.id}`}
      className="flex flex-col items-center rounded-xl border bg-card p-6 text-center shadow-sm transition-shadow hover:shadow-md"
    >
      <img src={institution.logo} alt={name} className="mb-4 size-24 rounded-full object-contain" />
      <p className="mb-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-foreground">{name}</p>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <BookOpen className="size-3.5" />
        <span>{t("overview.subjects", { count })}</span>
      </div>
    </Link>
  );
}

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <ProfileCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {implemented.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>
    </div>
  );
}