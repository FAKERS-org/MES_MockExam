import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FunctionSquare, Atom, FlaskConical, Brain, Languages, BookText, BookOpen, FileCheck2 } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";
import ExamCard from "@/components/dashboard/exam-card";
import { useLanguage } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";
import type { LucideIcon } from "lucide-react";

interface ExamSubject {
  id: string;
  titleKey: TranslationKey;
  typeKey: TranslationKey;
  icon: LucideIcon;
  questionCount: number;
  durationMinutes: number;
}

interface ExamGroup {
  groupKey?: TranslationKey;
  flagCode?: string;
  subjects: ExamSubject[];
  combinedExam?: boolean;
}

const grammar: ExamSubject = { id: "grammar", titleKey: "subjects.ifl.grammar", typeKey: "examType.mcq", icon: Languages, questionCount: 30, durationHours: 1 };
const vocabulary: ExamSubject = { id: "vocabulary", titleKey: "subjects.ifl.vocabulary", typeKey: "examType.mcq", icon: BookText, questionCount: 30, durationHours: 1 };
const readings: ExamSubject = { id: "readings", titleKey: "subjects.ifl.readings", typeKey: "examType.mcq", icon: BookOpen, questionCount: 30, durationHours: 2 };

const subjectsByInstitution: Record<string, { titleKey: TranslationKey; groups: ExamGroup[] }> = {
  itc: {
    titleKey: "overview.institutions.itc",
    groups: [
      {
        subjects: [
          { id: "math", titleKey: "subjects.itc.math", typeKey: "examType.mcq", icon: FunctionSquare, questionCount: 30, durationHours: 2 },
          { id: "physics", titleKey: "subjects.itc.physics", typeKey: "examType.mcq", icon: Atom, questionCount: 30, durationHours: 2 },
          { id: "chemistry", titleKey: "subjects.itc.chemistry", typeKey: "examType.mcq", icon: FlaskConical, questionCount: 30, durationHours: 2 },
          { id: "logic", titleKey: "subjects.itc.logic", typeKey: "examType.mcq", icon: Brain, questionCount: 30, durationHours: 1 },
        ],
      },
    ],
  },
  ifl: {
    titleKey: "overview.institutions.ifl",
    groups: [
      { groupKey: "subjects.ifl.english", flagCode: "gb", subjects: [grammar, vocabulary, readings], combinedExam: true },
      { groupKey: "subjects.ifl.chinese", flagCode: "cn", subjects: [grammar, vocabulary, readings], combinedExam: true },
      { groupKey: "subjects.ifl.korean", flagCode: "kr", subjects: [grammar, vocabulary, readings], combinedExam: true },
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

  const subjectCount = data.groups.reduce((sum, g) => sum + g.subjects.length, 0);

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

      {data.groups.map((group, gi) => (
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
                  durationHours={subject.durationHours}
                />
              );
            })}
            {group.combinedExam && (
              <ExamCard
                title={t("subjects.ifl.entranceExam")}
                icon={<FileCheck2 className="h-20 w-20 text-emerald-600 dark:text-emerald-400" />}
                typeLabel={t("subjects.ifl.allLanguages")}
                questionCount={group.subjects.reduce((sum, s) => sum + s.questionCount, 0)}
                durationHours={group.subjects.reduce((sum, s) => sum + s.durationHours, 0)}
              />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}