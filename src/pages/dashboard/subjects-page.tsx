import { Link, useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, FileCheck2 } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";
import ExamCard from "@/components/dashboard/exam-card";
import { useLanguage } from "@/lib/i18n";
import { subjectsByInstitution } from "./subjects-data";

export default function SubjectsPage() {
  const { institution = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [langFilter, setLangFilter] = useState<string | null>(null);

  const data = subjectsByInstitution[institution];
  if (!data) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-sm text-slate-500 dark:text-muted-foreground">{t('exam.subjectNotFound')}</p>
        <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:underline">
          {t("nav.dashboard")}
        </Link>
      </div>
    );
  }

  const subjectCount = data.groups.reduce((sum, g) => sum + g.subjects.length, 0);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasLangFilter = data.groups.some((g) => g.groupKey);
    return data.groups
      .filter((g) => !hasLangFilter || !langFilter || g.groupKey === langFilter)
      .map((g) => ({
        ...g,
        subjects: q
          ? g.subjects.filter((s) => t(s.titleKey).toLowerCase().includes(q))
          : g.subjects,
      }))
      .filter((g) => g.subjects.length > 0);
  }, [data, query, langFilter, t]);

  return (
    <div className="space-y-6">
      <div>
        <Link
          to="/dashboard"
          className="mb-3 inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-muted-foreground dark:hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.dashboard")}
        </Link>
        <h1 className="text-xl font-bold text-slate-900 dark:text-foreground">{t(data.titleKey)}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-muted-foreground">
          {t("overview.subjects", { count: subjectCount })}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("topbar.searchPlaceholder")}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-foreground dark:placeholder:text-muted-foreground"
          />
        </div>

        {data.groups.some((g) => g.groupKey) && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setLangFilter(null)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                langFilter === null
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-muted-foreground dark:hover:bg-slate-700"
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
                  key={g.groupKey}
                  onClick={() => setLangFilter(langFilter === groupKey ? null : groupKey)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    langFilter === groupKey
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-muted-foreground dark:hover:bg-slate-700"
                  }`}
                >
                  {g.flagCode && <span className={`fi fi-${g.flagCode} rounded-sm text-xs`} />}
                  {t(g.groupKey!)}
                </button>
                );
              })}
          </div>
        )}
      </div>

      {filteredGroups.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-muted-foreground">{t("exam.subjectNotFound")}</p>
      )}

      {filteredGroups.map((group, gi) => (
        <section key={gi} className="space-y-3">
          {group.groupKey && (
            <div className="flex items-center gap-2">
              {group.flagCode && <span className={`fi fi-${group.flagCode} rounded-sm text-lg`} />}
              <h2 className="text-base font-semibold text-slate-900 dark:text-foreground">{t(group.groupKey)}</h2>
            </div>
          )}
          <div className="flex flex-col gap-4">
            {group.subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <ExamCard
                  key={subject.id}
                  title={t(subject.titleKey)}
                  icon={<Icon className="h-20 w-20 text-slate-600 dark:text-muted-foreground" />}
                  typeLabel={t(subject.typeKey)}
                  questionCount={subject.questionCount}
                  durationMinutes={subject.durationMinutes}
                  marks={subject.marks}
                  onStart={() => navigate(`/dashboard/${institution}/${subject.id}`)}
                />
              );
            })}
            {group.combinedExam && !query.trim() && (
              <ExamCard
                title={t("subjects.ifl.entranceExam")}
                icon={<FileCheck2 className="h-20 w-20 text-emerald-600 dark:text-emerald-400" />}
                typeLabel={t("subjects.ifl.allLanguages")}
                questionCount={group.subjects.reduce((sum, s) => sum + s.questionCount, 0)}
                durationMinutes={group.subjects.reduce((sum, s) => sum + s.durationMinutes, 0)}
                marks={group.subjects.reduce((sum, s) => sum + (s.marks ?? 0), 0)}
              />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}