import type { ReactNode } from "react";
import { Sun, Maximize, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExamHeaderProps {
  title?: ReactNode;
  onThemeToggle?: () => void;
  onFullscreen?: () => void;
  onClose?: () => void;
  className?: string;
}

const ExamHeader = ({
  title = "ការប្រមូលអត្ថបទ",
  onThemeToggle,
  onFullscreen,
  onClose,
  className,
}: ExamHeaderProps) => {
  return (
    <header className={cn("flex items-center justify-between border-b border-border bg-card px-6 py-4", className)}>
      {/* Title */}
      <h1 className="text-xl font-semibold tracking-tight text-primary">
        {title}
      </h1>

      {/* Action Icons */}
      <div className="flex items-center gap-5">
        {onThemeToggle && (
          <button
            type="button"
            onClick={onThemeToggle}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            <Sun size={20} strokeWidth={1.5} />
          </button>
        )}

        {onFullscreen && (
          <button
            type="button"
            onClick={onFullscreen}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fullscreen"
          >
            <Maximize size={18} strokeWidth={1.5} />
          </button>
        )}

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </header>
  );
};

export default ExamHeader;