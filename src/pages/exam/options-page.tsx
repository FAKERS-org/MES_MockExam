import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpenCheck } from "lucide-react";
import ExamOptionCard from "@/components/dashboard/exam-option-card";
import { useLanguage } from "@/lib/i18n";
import { findSubject } from "@/data/subjects";

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
          to={`/exam/${institution}`}
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("nav.exam")}
        </Link>
        <h1 className="text-xl font-bold text-foreground">{subjectTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("exam.options.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-4">
        <ExamOptionCard
          title={t("exam.options.standard")}
          description={t("exam.options.standardDesc")}
          iconSrc="/icons/tick-icon.png"
          iconAlt={t("exam.options.standard")}
          onClick={() => {
            navigate(`/exam/${institution}/${subjectId}/take`);
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

      <div className="rounded-xl border border-border bg-muted p-4">
        <div className="mb-3 flex items-center gap-2">
          <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">{t("exam.options.chooseYear")}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedYear === year
                  ? "bg-primary text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-muted-foreground/20"
              }`}
            >
              {year}
            </button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <p className="text-xs text-muted-foreground">{t("exam.options.selectedYear", { year: selectedYear || "-" })}</p>
          {selectedYear && (
            <button
              onClick={() => navigate(`/exam/${institution}/${subjectId}/take`)}
              className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("exam.start")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
