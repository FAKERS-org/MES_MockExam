import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { supportedInstitutions } from "@/data/subjects";
import { BookOpen } from "lucide-react";
import { getSubjectCount } from "@/data/subjects";

export default function ExamPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">{t("exam.page.title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("exam.page.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {supportedInstitutions.map((institution) => {
          const name = t(institution.nameKey);
          const count = getSubjectCount(institution.id);
          return (
            <Link
              key={institution.id}
              to={`/exam/${institution.id}`}
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
        })}
      </div>
    </div>
  );
}
