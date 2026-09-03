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
          className="h-3 w-full bg-slate-200 rounded-full [&>div]:bg-blue-800 [&>div]:rounded-full"
        />
      </div>

      {/* Right side Stats Badge / Button */}
      <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white shadow-sm">
        <span className="tabular-nums">{timeLabel}</span>
        <span className="h-3 w-px bg-slate-600" aria-hidden="true" />
        <span className="tabular-nums text-blue-400">{progressValue}%</span>
      </div>
    </div>
  );
}