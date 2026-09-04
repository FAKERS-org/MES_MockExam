import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, Bell, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

function ExamTopBar() {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="flex w-full items-center justify-between rounded-xl border bg-card px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-foreground">
          Mock Exam — គណិតវិទ្យា
        </h1>
        <span className="text-muted-foreground/50">•</span>
        <span className="text-xs text-muted-foreground">{pathname.split("/").pop()}</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          aria-label="Settings"
        >
          <Settings className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          onClick={() => navigate(-1)}
          aria-label="Close"
        >
          <X className="size-4" />
        </Button>
      </div>
    </header>
  );
}

function ExamLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/40 dark:bg-background">
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
        <ExamTopBar />
        <div className="flex-1 overflow-hidden rounded-xl border bg-card shadow-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ExamLayout;
