import { useLanguage } from "@/lib/i18n";
import type { Institution } from "@/data/institutions";

const UniInfoCard = ({ institution }: { institution: Institution }) => {
  const { t } = useLanguage();
  const name = t(institution.nameKey);

  return (
    <div className="h-full w-full flex flex-col rounded-2xl overflow-hidden shadow-lg bg-card border border-border">
      {/* Dark Blue Header */}
      <div className="bg-[#0f4c81] h-24 relative">
        {/* Logo positioned to overlap header and body */}
        <div className="absolute -bottom-10 left-6">
          <img
            src={institution.logo}
            alt={name}
            className="w-20 h-20 rounded-full border-4 border-white bg-white shadow-md object-cover"
          />
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 pt-14 pb-6 px-6">
        {/* Name */}
        <h1 className="text-xl font-bold text-foreground mb-5 leading-snug">
          {name}
        </h1>

        {/* Website */}
        {institution.website && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-5 flex items-center justify-center text-[#0f4c81]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <span className="text-muted-foreground text-sm">{institution.website}</span>
          </div>
        )}

        {/* Address */}
        {institution.address && (
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 flex items-center justify-center text-[#0f4c81] mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <span className="text-muted-foreground text-sm leading-relaxed">
              {institution.address}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniInfoCard;