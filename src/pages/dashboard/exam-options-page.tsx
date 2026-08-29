import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import ExamOptionCard from "@/components/dashboard/exam-option-card";
import { useLanguage } from "@/lib/i18n";
import { findSubject } from "./subjects-data";

const years = ["2023", "2022", "2021", "2020"];

export default function ExamOptionsPage() {
  const { institution = "", subjectId = "" } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>("");

  const found = findSubject(institution, subjectId);
  const subjectTitle = found ? t(found.subject.titleKey) : t("exam.subjectNotFound");

  return (
    <div className="space-y-6">
      <div>
        <Link
          to={`/dashboard/${institution}`}
          className="mb-3 inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-muted-foreground dark:hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.dashboard")}
        </Link>
        <h1 className="text-xl font-bold text-slate-900 dark:text-foreground">{subjectTitle}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-muted-foreground">{t("exam.options.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-4">
        <ExamOptionCard
          title={t("exam.options.standard")}
          description={t("exam.options.standardDesc")}
          iconSrc="/icons/tick-icon.png"
          iconAlt={t("exam.options.standard")}
          onClick={() => {
            navigate(`/dashboard/${institution}/${subjectId}/take`);
          }}
        />
        <ExamOptionCard
          title={t("exam.options.custom")}
          description={t("exam.options.customDesc")}
          iconSrc="/icons/plus-icon.png"
          iconAlt={t("exam.options.custom")}
          onClick={() => {
            setSelectedYear("");
          }}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center gap-2">
          <BookOpenCheck className="h-4 w-4 text-slate-500 dark:text-muted-foreground" />
          <p className="text-sm font-medium text-slate-700 dark:text-muted-foreground">{t("exam.options.chooseYear")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedYear === year
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-muted-foreground dark:hover:bg-slate-700"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400 dark:text-muted-foreground">{t("exam.options.selectedYear", { year: selectedYear || "-" })}</p>
      </div>
    </div>
  );
}
