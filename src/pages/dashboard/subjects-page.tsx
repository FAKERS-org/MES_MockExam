import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ExamCard from "@/components/dashboard/exam-card";
import { useLanguage } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

interface ExamSubject {
  id: string;
  titleKey: TranslationKey;
  questionCount: number;
  durationHours: number;
}

const subjectsByInstitution: Record<string, { titleKey: TranslationKey; subjects: ExamSubject[] }> = {
  itc: {
    titleKey: "overview.institutions.itc",
    subjects: [
      { id: "math", titleKey: "subjects.itc.math", questionCount: 30, durationHours: 2 },
      { id: "physics", titleKey: "subjects.itc.physics", questionCount: 30, durationHours: 2 },
      { id: "chemistry", titleKey: "subjects.itc.chemistry", questionCount: 30, durationHours: 2 },
      { id: "logic", titleKey: "subjects.itc.logic", questionCount: 30, durationHours: 1 },
    ],
  },
};

export default function SubjectsPage() {
  const { institution = "" } = useParams();
  const { t } = useLanguage();

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
          {t("overview.subjects", { count: data.subjects.length })}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {data.subjects.map((subject) => (
          <ExamCard
            key={subject.id}
            title={t(subject.titleKey)}
            questionCount={subject.questionCount}
            durationHours={subject.durationHours}
          />
        ))}
      </div>
    </div>
  );
}