import { useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { FileText, History, LayoutGrid, User, ClipboardList, Sun, Moon, Bell, Settings, X } from "lucide-react";
import Sidebar, { type NavItem } from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { useLanguage } from "@/lib/i18n";
import { findSubject } from "@/data/subjects";

function ExamTopBar() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { institution = "", subjectId = "" } = useParams();

  const found = findSubject(institution, subjectId);
  const subjectTitle = found ? t(found.subject.titleKey) : "Mock Exam";

  return (
    <header className="flex w-full items-center justify-between rounded-xl border bg-card px-6 py-3 shadow-sm">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-foreground">
          Mock Exam — {subjectTitle}
        </h1>
        <span className="text-muted-foreground/50">•</span>
        <span className="text-xs text-muted-foreground">{institution}/{subjectId}</span>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground" aria-label="Settings">
          <Settings className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          onClick={() => navigate(`/exam/${institution}/${subjectId}`)}
          aria-label="Close"
        >
          <X className="size-4" />
        </Button>
      </div>
    </header>
  );
}

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const isDashboard = pathname === "/";
  const isExam = pathname.startsWith("/exam");
  const isInfo = pathname === "/info" || pathname.startsWith("/info/");

  // Show exam top bar only on take/result routes (has both institution + subjectId)
  const examSegments = pathname.split("/").filter(Boolean);
  const isExamTakeOrResult = false;

  const navItems: NavItem[] = [
    { icon: <LayoutGrid className="size-4" />, label: t("nav.dashboard"), active: isDashboard, to: "/" },
    { icon: <ClipboardList className="size-4" />, label: t("nav.exam"), active: isExam, to: "/exam", comingSoon: true },
    { icon: <History className="size-4" />, label: t("nav.history"), active: pathname === "/history", to: "/history", comingSoon: true },
    { icon: <FileText className="size-4" />, label: t("nav.info"), active: isInfo, to: "/info" },
    { icon: <User className="size-4" />, label: t("nav.profile"), active: pathname === "/profile", to: "/profile", comingSoon: true },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {!isExamTakeOrResult && (
        <>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} navItems={navItems} />

          <div
            className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
              sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            onClick={() => setSidebarOpen(false)}
          />
        </>
      )}

      <div className={isExamTakeOrResult ? "flex min-w-0 flex-1 overflow-hidden" : "flex min-w-0 flex-1 flex-col bg-muted/40 dark:bg-background"}>
        <main className={isExamTakeOrResult ? "flex h-full flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6" : "flex h-screen flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6"}>
          {isExamTakeOrResult ? (
            <ExamTopBar />
          ) : (
            <>
              <TopBar onOpenSidebar={() => setSidebarOpen((o) => !o)} isDark={isDark} onThemeToggle={toggleTheme} />
              <Breadcrumbs />
            </>
          )}
          {isExamTakeOrResult ? (
            <div className="flex-1 overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="flex h-full flex-col overflow-y-auto">
                <Outlet />
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <Outlet />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
