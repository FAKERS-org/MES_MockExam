import { CheckCircle2, ClipboardList, Clock, Star } from "lucide-react";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n";

interface ExamCardProps {
  title?: string;
  icon?: ReactNode;
  typeLabel?: string;
  questionCount?: number;
  durationMinutes?: number;
  marks?: number;
  buttonText?: string;
  onStart?: () => void;
}

function ExamCard({
  title,
  icon,
  typeLabel,
  questionCount = 30,
  durationMinutes = 120,
  marks,
  buttonText,
  onStart,
}: ExamCardProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 text-card-foreground shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center">
          {icon ?? <ClipboardList className="size-20 text-muted-foreground" />}
        </div>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-lg font-semibold leading-tight">{title ?? t("exam.defaultTitle")}</h3>
          {typeLabel && (
            <span className="inline-flex w-fit items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium">
              {typeLabel}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4" />
              {t("exam.questionCount", { count: questionCount })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" />
              {t("exam.durationMinutes", { count: durationMinutes })}
            </span>
            {marks != null && (
              <span className="flex items-center gap-1.5">
                <Star className="size-4" />
                {t("exam.marks", { count: marks })}
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onStart}
        disabled={!onStart}
        className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {buttonText ?? t("exam.start")}
      </button>
    </div>
  );
}

export default ExamCard;