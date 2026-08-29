import React from 'react';
import { Info, ArrowRight } from 'lucide-react';

interface ExamOptionCardProps {
  title: string;
  description: string;
  iconSrc?: string;
  iconAlt?: string;
  onClick?: () => void;
}

const ExamOptionCard: React.FC<ExamOptionCardProps> = ({ title, description, iconSrc, iconAlt, onClick }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-150 ease-out hover:bg-muted active:scale-[0.995]"
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="m-0 text-[18px] font-medium leading-snug text-card-foreground">{title}</h3>
        <div className="m-0 flex items-center gap-1.5 text-sm leading-snug text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          <span>{description}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {iconSrc && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted">
            <img src={iconSrc} alt={iconAlt ?? ''} width={28} height={28} className="object-contain" />
          </div>
        )}
        <ArrowRight className="h-[18px] w-[18px] text-muted-foreground" />
      </div>
    </div>
  );
};

export default ExamOptionCard;
