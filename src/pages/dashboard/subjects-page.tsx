import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, FileCheck2, Search } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";
import ExamCard from "@/components/dashboard/exam-card";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { subjectsByInstitution } from "@/data/subjects";

export default function SubjectsPage() {
  const { institution = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<string | null>(null);

  const data = subjectsByInstitution[institution];
  const subjectCount = data ? data.groups.reduce((sum, g) => sum + g.subjects.length, 0) : 0;

  const filteredGroups = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const hasLangFilter = data.groups.some((g) => g.groupKey);
    return data.groups
      .filter((g) => !hasLangFilter || !langFilter || g.groupKey === langFilter)
      .map((g) => ({
        ...g,
        subjects: q ? g.subjects.filter((s) => t(s.titleKey).toLowerCase().includes(q)) : g.subjects,
      }))
      .filter((g) => g.subjects.length > 0);
  }, [data, query, langFilter, t]);

  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-muted-foreground">{t("exam.subjectNotFound")}</p>
        <Link to="/" className="text-sm font-medium text-primary hover:underline">
          {t("nav.dashboard")}
        </Link>
      </div>
    );
  }

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
        <h1 className="text-xl font-bold text-foreground">{t(data.titleKey)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("overview.subjects", { count: subjectCount })}</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("topbar.searchPlaceholder")}
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        {data.groups.some((g) => g.groupKey) && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setLangFilter(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                langFilter === null
                  ? "bg-primary text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
            >
              {t("filter.all")}
            </button>
            {data.groups
              .filter((g) => g.groupKey)
              .map((g) => {
                const groupKey = g.groupKey as string;
                return (
                  <button
                    key={groupKey}
                    onClick={() => setLangFilter(langFilter === groupKey ? null : groupKey)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                      langFilter === groupKey
                        ? "bg-primary text-white"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {g.flagCode && <span className={`fi fi-${g.flagCode} rounded-sm text-xs`} />}
                    {t(groupKey as TranslationKey)}
                  </button>
                );
              })}
          </div>
        )}
      </div>

      {filteredGroups.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">{t("exam.subjectNotFound")}</p>
      )}

      {filteredGroups.map((group, gi) => (
        <section key={gi} className="space-y-3">
          {group.groupKey && (
            <div className="flex items-center gap-2">
              {group.flagCode && <span className={`fi fi-${group.flagCode} rounded-sm text-lg`} />}
              <h2 className="text-base font-semibold text-foreground">{t(group.groupKey)}</h2>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {group.subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <ExamCard
                  key={subject.id}
                  title={t(subject.titleKey)}
                  icon={<Icon className="h-20 w-20 text-muted-foreground" />}
                  typeLabel={t(subject.typeKey)}
                  questionCount={subject.questionCount}
                  durationMinutes={subject.durationMinutes}
                  marks={subject.marks}
                  onStart={() => navigate(`/dashboard/${institution}/${subject.id}`)}
                />
              );
            })}
            {group.combinedExam && !query.trim() && group.subjects[0] && (
              <ExamCard
                title={t("subjects.ifl.entranceExam")}
                icon={<FileCheck2 className="h-20 w-20 text-emerald-600 dark:text-emerald-400" />}
                typeLabel={t("subjects.ifl.allLanguages")}
                questionCount={group.subjects.reduce((sum, s) => sum + s.questionCount, 0)}
                durationMinutes={group.subjects.reduce((sum, s) => sum + s.durationMinutes, 0)}
                marks={group.subjects.reduce((sum, s) => sum + (s.marks ?? 0), 0)}
                onStart={() => navigate(`/dashboard/${institution}/${group.subjects[0]!.id}`)}
              />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}