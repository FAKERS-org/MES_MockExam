import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  LayoutGrid,
  History,
  FileText,
  User,
} from "lucide-react";
import Sidebar from "@/components/shared/sidebar";
import TopBar from "@/components/shared/top-bar";
import { NavItem } from "@/components/shared/sidebar";
import { useTheme } from "@/lib/theme";

const navItems: NavItem[] = [
  { icon: <LayoutGrid className="h-4 w-4" />, label: "ផ្ទាំងព័ត៌មាន", active: true },
  { icon: <History className="h-4 w-4" />, label: "ប្រវត្តិការប្រឡង" },
  { icon: <FileText className="h-4 w-4" />, label: "ព័ត៌មាន" },
  { icon: <User className="h-4 w-4" />, label: "គណនី" },
];

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} navItems={navItems} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col bg-slate-50 dark:bg-background">
        <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <TopBar onOpenSidebar={() => setSidebarOpen((o) => !o)} isDark={isDark} onThemeToggle={toggleTheme} />

          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
