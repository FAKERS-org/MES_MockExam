import { Progress } from "@/components/ui/progress";

export function ExamProgressStatusBar() {
  // These values can be easily dynamic based on your application state
  const progressValue = 81;
  const timeLabel = "79:10";

  return (
    <div className="flex w-full max-w-xl items-center gap-4">
      {/* Progress Bar Container */}
      <div className="flex-1">
        <Progress
          value={progressValue}
          className="h-3 w-full bg-primary/20 rounded-full [&>div]:bg-primary [&>div]:rounded-full"
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