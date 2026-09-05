import type { TranslationKey } from "@/lib/i18n";

export interface ExamResultRow {
  id: number;
  shortName: string;
  schoolKey: TranslationKey;
  subjectKey: TranslationKey;
  score: number;
  maxScore: number;
  durationMinutes: number;
  date: string;
}

export const DEFAULT_HISTORY_RESULTS: ExamResultRow[] = [
  { id: 1, shortName: "ITC", schoolKey: "overview.institutions.itc", subjectKey: "subjects.itc.math", score: 95, maxScore: 100, durationMinutes: 99, date: "2020-12-28" },
  { id: 2, shortName: "RUPP", schoolKey: "overview.institutions.rupp", subjectKey: "subjects.itc.physics", score: 69, maxScore: 100, durationMinutes: 89, date: "2020-12-28" },
  { id: 3, shortName: "ITC", schoolKey: "overview.institutions.itc", subjectKey: "subjects.itc.chemistry", score: 99, maxScore: 100, durationMinutes: 119, date: "2020-12-28" },
  { id: 4, shortName: "ITC", schoolKey: "overview.institutions.itc", subjectKey: "subjects.itc.logic", score: 77, maxScore: 100, durationMinutes: 49, date: "2020-12-28" },
];

export const HISTORY_LOGOS: Record<string, string> = {
  ITC: "/images/ITC-logo.png",
  RUPP: "/images/RUPP-logo.png",
};
