import React, { useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import {
  LayoutGrid,
  History,
  FileText,
  User,
} from "lucide-react";
import Sidebar from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import { NavItem } from "@/components/shared/sidebar";
import { useTheme } from "@/lib/theme";
import { useLanguage } from "@/lib/i18n";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const navItems: NavItem[] = useMemo(
    () => [
      { icon: <LayoutGrid className="h-4 w-4" />, label: t("nav.dashboard"), active: true },
      { icon: <History className="h-4 w-4" />, label: t("nav.history") },
      { icon: <FileText className="h-4 w-4" />, label: t("nav.info") },
      { icon: <User className="h-4 w-4" />, label: t("nav.account") },
    ],
    [t]
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

export default DashboardLayout;
