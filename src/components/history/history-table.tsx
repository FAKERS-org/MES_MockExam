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
  blue:   'bg-blue-50 border-blue-200 text-blue-600',
  orange: 'bg-orange-50 border-orange-200 text-orange-600',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
  amber:  'bg-amber-50 border-amber-200 text-amber-700',
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
    <div className="space-y-4 font-sans text-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gray-100 bg-gray-50 flex items-center justify-center text-gray-500">
            <HomeIcon />
          </div>
          <h1 className="text-lg font-medium text-gray-700">មើលពិន្ទុ</h1>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="ស្វែងរក"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-100 w-56"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-left">
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
                className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-500">{index + 1}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={instituteLogos[row.shortName]}
                      alt={row.school}
                      className="w-8 h-8 rounded-full object-contain border border-gray-100"
                    />
                    <span>{row.school}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{row.subject}</td>
                <td className="py-3 px-4">{row.score}</td>
                <td className="py-3 px-4">{row.duration}</td>
                <td className="py-3 px-4">{row.date}</td>
                <td className="py-3 px-4">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreIcon />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-400">
                  មិនមានទិន្នន័យ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-4 mt-4 text-sm text-gray-600">
        <select className="border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
        <span>1 - 10 of 1000</span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <FirstPageIcon />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <PrevIcon />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <NextIcon />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
            <LastPageIcon />
          </button>
        </div>
      </div>
    </div>
  );
}