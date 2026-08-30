import React, { useState } from 'react';

const examData = [
  {
    id: 1,
    school: 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា',
    shortName: 'ITC',
    color: 'blue',
    subject: 'គណិតវិទ្យា',
    score: '95/100',
    duration: '01:39 នាទី',
    date: '28-12-2020',
  },
  {
    id: 2,
    school: 'សាកលវិទ្យាល័យជាតិភ្នំពេញ',
    shortName: 'RUPP',
    color: 'orange',
    subject: 'រូបវិទ្យា',
    score: '69/100',
    duration: '01:29 នាទី',
    date: '28-12-2020',
  },
  {
    id: 3,
    school: 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា',
    shortName: 'ITC',
    color: 'blue',
    subject: 'គីមីវិទ្យា',
    score: '99/100',
    duration: '01:59 នាទី',
    date: '28-12-2020',
  },
  {
    id: 4,
    school: 'វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា',
    shortName: 'ITC',
    color: 'blue',
    subject: 'ជីវវិទ្យា',
    score: '77/100',
    duration: '00:49 នាទី',
    date: '28-12-2020',
  },
];

const badgeStyles = {
  blue:   'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950 dark:border-blue-900 dark:text-blue-300',
  orange: 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-950 dark:border-orange-900 dark:text-orange-300',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950 dark:border-indigo-900 dark:text-indigo-300',
  amber:  'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950 dark:border-amber-900 dark:text-amber-300',
};

const instituteLogos: Record<string, string> = {
  ITC: '/images/ITC-logo.png',
  RUPP: '/images/RUPP-logo.png',
};

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
  </svg>
);

const MoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="12" cy="19" r="2"/>
  </svg>
);

const FirstPageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/>
  </svg>
);

const PrevIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const NextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const LastPageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/>
  </svg>
);

export default function ExamResultsTable() {
  const [search, setSearch] = useState('');

  const filtered = examData.filter((row) =>
    row.school.toLowerCase().includes(search.toLowerCase()) ||
    row.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 font-sans text-foreground">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center text-muted-foreground">
            <HomeIcon />
          </div>
          <h1 className="text-lg font-medium text-foreground">មើលពិន្ទុ</h1>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="ស្វែងរក"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-input bg-background rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring w-56"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border text-muted-foreground text-left">
              <th className="py-3 px-4 font-medium w-12">ល.រ</th>
              <th className="py-3 px-4 font-medium">ឈ្មោះសាលា</th>
              <th className="py-3 px-4 font-medium">មុខវិជ្ជា</th>
              <th className="py-3 px-4 font-medium">ពិន្ទុ</th>
              <th className="py-3 px-4 font-medium">រយៈពេលប្រឡង</th>
              <th className="py-3 px-4 font-medium">កាលបរិច្ឆេទ</th>
              <th className="py-3 px-4 font-medium w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, index) => (
              <tr
                key={row.id}
                className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4 text-muted-foreground">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={instituteLogos[row.shortName]}
                      alt={row.school}
                      className="w-8 h-8 rounded-full object-contain border border-border"
                    />
                    <span className="text-foreground">{row.school}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground">{row.subject}</td>
                <td className="py-3 px-4 text-foreground">{row.score}</td>
                <td className="py-3 px-4 text-foreground">{row.duration}</td>
                <td className="py-3 px-4 text-foreground">{row.date}</td>
                <td className="py-3 px-4">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreIcon />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-muted-foreground">
                  មិនមានទិន្នន័យ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-4 text-sm text-muted-foreground">
        <select className="border border-input bg-background text-foreground rounded px-2 py-1 text-sm focus:outline-none">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        <span>1 - 10 of 1000</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors">
            <FirstPageIcon />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors">
            <PrevIcon />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors">
            <NextIcon />
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors">
            <LastPageIcon />
          </button>
        </div>
      </div>
    </div>
  );
}