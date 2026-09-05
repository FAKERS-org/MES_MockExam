import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { subjectsByInstitution } from "@/data/subjects";
import type { TranslationKey } from "@/lib/i18n";

export default function ExamPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const allExams = Object.entries(subjectsByInstitution).flatMap(([institutionId, data]) =>
    data.groups.flatMap((group) =>
      group.subjects.map((subject) => ({
        institutionId,
        institutionName: t(data.titleKey),
        subject,
        groupKey: group.groupKey,
        flagCode: group.flagCode,
      }))
    )
  );

  const filteredExams = search.trim()
    ? allExams.filter((exam) => t(exam.subject.titleKey).toLowerCase().includes(search.toLowerCase()))
    : allExams;

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.dashboard")}
        </Link>
        <h1 className="text-xl font-bold text-foreground">{t("exam.page.title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("exam.page.subtitle")}</p>
      </div>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("topbar.searchPlaceholder")}
          className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {filteredExams.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">{t("exam.subjectNotFound")}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredExams.map((exam) => (
            <button
              key={`${exam.institutionId}-${exam.subject.id}`}
              type="button"
              onClick={() => navigate(`/exam/${exam.institutionId}/${exam.subject.id}`)}
              className="flex items-center gap-4 rounded-xl border bg-card p-4 text-left shadow-sm transition-colors hover:border-primary/40 hover:bg-accent/50"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <exam.subject.icon className="size-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{t(exam.subject.titleKey)}</p>
                <p className="truncate text-xs text-muted-foreground">{exam.institutionName}</p>
                {exam.groupKey && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{t(exam.groupKey as TranslationKey)}</p>
                )}
              </div>
              <div className="hidden shrink-0 flex-col items-end gap-1 text-xs text-muted-foreground sm:flex">
                <span className="flex items-center gap-1">
                  <BookOpen className="size-3" />
                  {t("exam.questionCount", { count: exam.subject.questionCount })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {t("exam.durationMinutes", { count: exam.subject.durationMinutes })}
                </span>
                {exam.subject.marks != null && (
                  <span className="flex items-center gap-1">
                    <Star className="size-3" />
                    {t("exam.marks", { count: exam.subject.marks })}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
