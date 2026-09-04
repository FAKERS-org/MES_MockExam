import React from "react";

interface CardData {
  id: number;
  khmerTitle: string;
  englishTitle: string;
  website: string;
  address: string;
  logo: React.ReactNode;
}

const cards: CardData[] = [
  {
    id: 1,
    khmerTitle: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    englishTitle: "Institute of Technology of Cambodia",
    website: "itc.edu.kh",
    address: "1295 Aphiwat BLVO, OCIC, Chroy Chongva, Phnom Penh, Phnom Penh",
    logo: (
      <img
        src="/logo-itc-1.png"
        alt="ITC Logo"
        className="w-full h-full object-contain rounded-full"
      />
    ),
  },
  {
    id: 2,
    khmerTitle: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    englishTitle: "Institute of Technology of Cambodia",
    website: "itc.edu.kh",
    address: "1295 Aphiwat BLVO, OCIC, Chroy Chongva, Phnom Penh, Phnom Penh",
    logo: (
      <img
        src="/logo-itc-2.png"
        alt="ITC Logo"
        className="w-full h-full object-contain rounded-full"
      />
    ),
  },
  {
    id: 3,
    khmerTitle: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    englishTitle: "Institute of Technology of Cambodia",
    website: "itc.edu.kh",
    address: "1295 Aphiwat BLVO, OCIC, Chroy Chongva, Phnom Penh, Phnom Penh",
    logo: (
      <img
        src="/logo-itc-3.png"
        alt="ITC Logo"
        className="w-full h-full object-contain rounded-full"
      />
    ),
  },
  {
    id: 4,
    khmerTitle: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    englishTitle: "Institute of Technology of Cambodia",
    website: "itc.edu.kh",
    address: "1295 Aphiwat BLVO, OCIC, Chroy Chongva, Phnom Penh, Phnom Penh",
    logo: (
      <img
        src="/logo-itc-4.png"
        alt="ITC Logo"
        className="w-full h-full object-contain rounded-full"
      />
    ),
  },
];

const GlobeIcon = () => (
  <svg
    className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path strokeWidth="2" d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const InstituteCard: React.FC<{ data: CardData }> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="bg-[#0f4c75] h-20 relative flex items-center px-4">
        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md -mt-2 overflow-hidden">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {data.logo}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 pt-4">
        <h2
          className="text-lg font-bold text-gray-900 mb-0.5"
          style={{ fontFamily: "'Khmer OS', 'Noto Sans Khmer', sans-serif" }}
        >
          {data.khmerTitle}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{data.englishTitle}</p>

        <div className="flex items-start gap-2 mb-2">
          <GlobeIcon />
          <span className="text-sm text-gray-700">{data.website}</span>
        </div>

        <div className="flex items-start gap-2">
          <LocationIcon />
          <span className="text-sm text-gray-700 leading-relaxed">
            {data.address}
          </span>
        </div>
      </div>
    </div>
  );
};

const FilterContext = React.createContext({
  filter: '',
  setFilter: (_value: string) => {}
});

const StatsBar: React.FC<{ total: number }> = ({ total }) => (
  <div className="flex items-center justify-between mb-4 p-4 bg-white rounded-lg shadow-sm">
    <span className="text-gray-700">Total Departments: {total}</span>
    <button
      className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
    >
      Add Department
    </button>
  </div>
);

const InstituteInfoGrid: React.FC = () => {
  const [filter, setFilter] = React.useState('');
  const filteredCards = cards.filter(card => 
    card.englishTitle.toLowerCase().includes(filter.toLowerCase()) ||
    card.khmerTitle.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <div className="min-h-screen bg-slate-100 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Input */}
          <input
            type="text"
            placeholder="Filter departments..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-2 mb-6 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <StatsBar total={filteredCards.length} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <InstituteCard key={card.id} data={card} />
            ))}
          </div>
        </div>
      </div>
    </FilterContext.Provider>
  );
};

export default InstituteInfoGrid;