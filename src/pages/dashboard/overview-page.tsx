import { BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

interface Institution {
  id: string;
  name: string;
  subjectsLabel: string;
  logo: string;
}

const institutions: Institution[] = [
  {
    id: "itc",
    name: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
    subjectsLabel: "៤ មុខវិជ្ជា",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/6b/Institute_of_Technology_of_Cambodia_logo.png",
  },
  {
    id: "usha",
    name: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល",
    subjectsLabel: "៤ មុខវិជ្ជា",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/University_of_Health_Sciences_Cambodia_logo.png/220px-University_of_Health_Sciences_Cambodia_logo.png",
  },
  {
    id: "rupp",
    name: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
    subjectsLabel: "៤ មុខវិជ្ជា",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Royal_University_of_Phnom_Penh_logo.png/220px-Royal_University_of_Phnom_Penh_logo.png",
  },
  {
    id: "up",
    name: "សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ (UP)",
    subjectsLabel: "៤ មុខវិជ្ជា",
    logo: "https://placehold.co/96x96/1e3a8a/ffd700?text=UP",
  },
];

// ---------------------------------------------------------------------------
// Page sections
// ---------------------------------------------------------------------------

function ProfileCard() {
  return (
    <div className="flex items-center gap-4 rounded-xl border bg-white p-5">
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://i.pravatar.cc/112?img=13" alt="" />
        <AvatarFallback>YA</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-bold text-slate-900">
          សូមស្វាគមន៍, យាង អូយអឹង
        </p>
        <p className="text-sm text-slate-500">អភិបាលប្រព័ន្ធ</p>
      </div>
    </div>
  );
}

function InstitutionCard({ institution }: { institution: Institution }) {
  return (
    <button className="flex flex-col items-center rounded-xl border bg-white p-6 text-center transition-shadow hover:shadow-md">
      <img
        src={institution.logo}
        alt={institution.name}
        className="mb-4 h-24 w-24 rounded-full object-contain"
      />
      <p className="mb-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-slate-900">
        {institution.name}
      </p>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <BookOpen className="h-3.5 w-3.5" />
        <span>{institution.subjectsLabel}</span>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <ProfileCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {institutions.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>
    </div>
  );
}
