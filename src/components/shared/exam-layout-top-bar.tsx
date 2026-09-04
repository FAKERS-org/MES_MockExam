import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Bell, Settings, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExamLayoutTopBarProps {
  title?: ReactNode;
  isDark?: boolean;
  onThemeToggle?: () => void;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onClose?: () => void;
  className?: string;
}

export function ExamLayoutTopBar({
  title = "Mockexam on Math",
  isDark = false,
  onThemeToggle,
  onNotificationsClick,
  onSettingsClick,
  onClose,
  className,
}: ExamLayoutTopBarProps) {
  return (
    <header className={cn("flex h-14 items-center justify-between border-b border-border bg-background px-4", className)}>
      {/* Left: Title */}
      <div className="flex items-center">
        <h1 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      {/* Right: action icons */}
      <div className="flex items-center gap-1">
        {onThemeToggle && (
          <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={onThemeToggle}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        )}
        {onNotificationsClick && (
          <Button variant="ghost" size="icon" aria-label="Notifications" onClick={onNotificationsClick}>
            <Bell className="h-5 w-5" />
          </Button>
        )}
        {onSettingsClick && (
          <Button variant="ghost" size="icon" aria-label="Settings" onClick={onSettingsClick}>
            <Settings className="h-5 w-5" />
          </Button>
        )}
        {onClose && (
          <Button variant="ghost" size="icon" aria-label="Close" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}