import React, { useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  History,
  FileText,
  User,
} from "lucide-react";
import Sidebar from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { type NavItem } from "@/components/shared/sidebar";
import { useTheme } from "@/lib/theme";
import { useLanguage } from "@/lib/i18n";

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const isDashboard = pathname === "/" || pathname.startsWith("/dashboard");

  const navItems: NavItem[] = useMemo(
    () => [
      { icon: <LayoutGrid className="h-4 w-4" />, label: t("nav.dashboard"), active: isDashboard, to: "/" },
      { icon: <History className="h-4 w-4" />, label: t("nav.history"), active: pathname === "/history", to: "/history" },
      { icon: <FileText className="h-4 w-4" />, label: t("nav.info") },
      { icon: <User className="h-4 w-4" />, label: t("nav.account") },
    ],
    [t, pathname, isDashboard]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} navItems={navItems} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col bg-slate-50 dark:bg-background">
        <main className="flex h-screen flex-1 flex-col gap-4 overflow-y-auto p-4 md:p-6">
          <TopBar onOpenSidebar={() => setSidebarOpen((o) => !o)} isDark={isDark} onThemeToggle={toggleTheme} />

          <Breadcrumbs />

          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
