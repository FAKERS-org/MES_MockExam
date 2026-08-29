import React, { useState } from 'react';

// Navigation items data
const navItems = [
  {
    id: 'dashboard',
    label: 'ផ្ទៃតាប្លូ',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'exams',
    label: 'វិញ្ញាសា',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 'users',
    label: 'អ្នកប្រើប្រាស់',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
  },
  {
    id: 'reports',
    label: 'របាយការណ៍',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const Sidebar = ({ activeId = 'dashboard', onNavigate }) => {
  const [active, setActive] = useState(activeId);

  const handleClick = (id) => {
    setActive(id);
    onNavigate?.(id);
  };

  return (
    <aside
      className="flex h-screen w-64 flex-col bg-white border-r border-gray-100"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-6">
        <div className="flex items-center justify-center w-8 h-8 bg-[#1e88e5] rounded-md text-white font-bold text-lg">
          M
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[#1e88e5] font-bold text-sm tracking-wide">MOCK</span>
          <span className="text-[#1e88e5] font-bold text-sm tracking-wide">EXAM</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-2">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#e3f2fd] text-[#1e88e5]'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
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
          onClick={() => onNavigate?.('logout')}
          className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>ចាកចេញ</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;