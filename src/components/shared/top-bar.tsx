import React, { useState } from 'react';
import { Search, Sun, Moon, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopBarProps {
  onSearch?: (query: string) => void;
  onLanguageChange?: (lang: string) => void;
  onThemeToggle?: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
  currentLanguage?: string;
  onOpenSidebar?: () => void;
  isDark?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onLanguageChange,
  onThemeToggle,
  onNotificationsClick,
  notificationCount = 5,
  currentLanguage = 'KH',
  onOpenSidebar,
  isDark = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="flex items-center justify-between w-full px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm dark:bg-card dark:border-border">
      <div className="flex items-center gap-3">
        {onOpenSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={onOpenSidebar}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="relative w-40 sm:w-72">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400 dark:text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="w-full py-2.5 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border-none rounded-xl outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all dark:bg-muted dark:text-foreground dark:placeholder:text-muted-foreground dark:focus:bg-card"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <button
          onClick={() => onLanguageChange?.(currentLanguage === 'KH' ? 'EN' : 'KH')}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors dark:text-foreground dark:hover:bg-accent"
        >
          <img
            src="https://flagcdn.com/w40/kh.png"
            alt="Cambodia"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span>{currentLanguage}</span>
          <svg className="w-4 h-4 text-gray-400 dark:text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2.5 text-gray-500 rounded-md hover:bg-gray-100 transition-colors dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button
          onClick={onNotificationsClick}
          className="relative p-2.5 text-gray-500 rounded-md hover:bg-gray-100 transition-colors dark:text-muted-foreground dark:hover:bg-accent dark:hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-pink-500 rounded-full">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default TopBar;