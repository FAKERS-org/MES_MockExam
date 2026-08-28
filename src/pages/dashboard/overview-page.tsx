"use client";

import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BookMarked,
  LogOut,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface UniversityCard {
  id: number;
  name: string;
  logo: React.ReactNode;
  subjects: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────
const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={18} />, label: "ផ្ទៃតាប្លូ", active: true },
  { icon: <BookOpen size={18} />, label: "មើលមុខវិជ្ជា" },
  { icon: <CalendarDays size={18} />, label: "កាលវិភាគ" },
  { icon: <GraduationCap size={18} />, label: "ប្រឡង" },
];

const universities: UniversityCard[] = [
  {
    id: 1,
    name: "វិទ្យាស្ថានបច្ចេកវិទ្យា",
    subjects: 4,
    logo: (
      <div className="w-20 h-20 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-[10px] font-bold text-blue-700 tracking-tighter leading-tight">
            INSTITUTE OF
          </div>
          <div className="text-lg font-black text-blue-800 leading-none">I.T.C</div>
          <div className="text-[8px] text-blue-600 leading-tight">TECHNOLOGY OF CAMBODIA</div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    name: "សាកលវិទ្យាល័យវិទ្យាសាស្រ្តសង្គម",
    subjects: 4,
    logo: (
      <div className="w-20 h-20 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white">
        <div className="text-center px-1">
          <div className="text-[7px] text-blue-700 leading-tight">INSTITUT DES SCIENCES</div>
          <div className="text-[7px] text-blue-700 leading-tight">DE LA SOCIÉTÉ</div>
          <div className="mt-0.5">
            <div className="w-6 h-6 mx-auto border border-blue-600 flex items-center justify-center">
              <div className="w-4 h-4 border border-blue-600" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    name: "សាកលវិទ្យាល័យវិទ្យាសាស្រ្តព័ត៌មាន",
    subjects: 4,
    logo: (
      <div className="w-20 h-20 rounded-full border-2 border-red-300 flex items-center justify-center bg-red-50 overflow-hidden">
        <div className="w-full h-full bg-red-600 rounded-full flex items-center justify-center relative">
          <div className="absolute inset-1 border-2 border-yellow-400 rounded-full" />
          <div className="text-yellow-400 text-xs font-bold z-10">★</div>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    name: "សាកលវិទ្យាល័យភ្នំពេញ (UP)",
    subjects: 4,
    logo: (
      <div className="w-20 h-20 rounded-full border-2 border-blue-200 flex items-center justify-center bg-white">
        <div className="w-14 h-16 bg-blue-900 rounded-b-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 w-full h-4 bg-yellow-500" />
          <div className="w-6 h-6 rounded-full bg-yellow-500 border-2 border-white mt-2" />
        </div>
      </div>
    ),
  },
];

// ─── Components ──────────────────────────────────────────────────────

const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => (
  <>
    {open && (
      <div
        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        onClick={onClose}
      />
    )}
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-100 flex flex-col
        transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div className="leading-none">
            <div className="text-[10px] font-bold text-blue-600 tracking-widest">MOCK</div>
            <div className="text-[10px] font-bold text-gray-800 tracking-widest">EXAM</div>
          </div>
        </div>
        <button
          className="lg:hidden text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <LogOut size={18} />
          <span>ចាកចេញ</span>
        </a>
      </div>
    </aside>
  </>
);

const TopBar: React.FC = () => (
  <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-10">
    {/* Search */}
    <div className="relative w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
      />
    </div>

    {/* Right Actions */}
    <div className="flex items-center gap-3">
      {/* Language */}
      <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 text-sm text-gray-600">
        <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[8px] text-white font-bold">
          KH
        </span>
        <span className="text-xs font-medium">KH</span>
        <ChevronDown size={14} className="text-gray-400" />
      </button>

      {/* Settings */}
      <button className="p-2 rounded-lg hover:bg-gray-50 text-gray-500">
        <Settings size={18} />
      </button>

      {/* Notifications */}
      <button className="relative p-2 rounded-lg hover:bg-gray-50 text-gray-500">
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white flex items-center justify-center font-bold border-2 border-white">
          5
        </span>
      </button>
    </div>
  </header>
);

const UserProfileCard: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 flex items-center gap-4">
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        alt="Profile"
        className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
      />
      <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center border-2 border-white">
        <span className="text-white text-[10px] font-bold">9</span>
      </span>
    </div>
    <div>
      <h2 className="text-base font-bold text-gray-900">សុខស៊ីណា, បញ្ញា ពុទ្ធិ</h2>
      <p className="text-sm text-gray-500 mt-0.5">និស្សិតបច្ចេកវិទ្យា</p>
    </div>
  </div>
);

const UniversityCardComponent: React.FC<{ uni: UniversityCard }> = ({ uni }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer group">
    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
      {uni.logo}
    </div>
    <h3 className="text-sm font-semibold text-gray-800 mb-3 leading-snug min-h-[2.5rem] flex items-center justify-center">
      {uni.name}
    </h3>
    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
      <BookMarked size={14} />
      <span>{uni.subjects} មុខ</span>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────
const DashboardOverviewPage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-56">
        {/* Mobile header with menu button */}
        <div className="lg:hidden h-14 bg-white border-b border-gray-100 flex items-center px-4 sticky top-0 z-30">
          <button
            className="p-2 -ml-2 text-gray-600 hover:text-gray-800"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <span className="ml-3 font-bold text-blue-600 tracking-widest text-sm">MOCK EXAM</span>
        </div>

        <TopBar />

        <main className="p-6 max-w-6xl">
          {/* User Profile */}
          <UserProfileCard />

          {/* University Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {universities.map((uni) => (
              <UniversityCardComponent key={uni.id} uni={uni} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
