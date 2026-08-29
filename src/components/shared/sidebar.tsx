import React from "react";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, navItems }) => {
  const { t } = useLanguage();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-white border-r border-gray-100 dark:bg-card dark:border-border transition-all lg:static lg:translate-x-0 lg:overflow-hidden ${
        open ? "translate-x-0 w-full sm:w-64" : "-translate-x-full w-64 lg:w-0"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-5 py-6">
        <img
          src="/images/MES-logo-horizontal.png"
          alt="MES Logo"
          className="h-7 w-auto object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive = item.active;
          return (
            <button
              key={item.label}
              onClick={onClose}
              className={`flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#e3f2fd] text-[#1e88e5] dark:bg-blue-500/15 dark:text-blue-400"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-6 mt-auto">
        <button
          onClick={onClose}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors dark:text-muted-foreground dark:hover:text-foreground dark:hover:bg-accent"
        >
          <LogOut className="h-5 w-5" />
          <span>{t("sidebar.logout")}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;