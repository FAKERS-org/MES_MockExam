import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export interface ExamProgressStatusBarProps {
  progressValue?: number;
  timeLabel?: string;
  className?: string;
}

export function ExamProgressStatusBar({
  progressValue = 81,
  timeLabel = "79:10",
  className,
}: ExamProgressStatusBarProps) {
  return (
    <div className={cn("flex w-full max-w-xl items-center gap-4", className)}>
      {/* Progress Bar Container */}
      <div className="flex-1">
        <Progress
          value={progressValue}
          className="h-3 w-full rounded-full bg-primary/20 [&>div]:rounded-full [&>div]:bg-primary"
        />
      </div>

      {/* Right side Stats Badge / Button */}
      <div className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm">
        <span className="tabular-nums">{timeLabel}</span>
        <span className="h-3 w-px bg-primary-foreground/40" aria-hidden="true" />
        <span className="tabular-nums font-semibold text-white">{progressValue}%</span>
      </div>
    </div>
  );
}