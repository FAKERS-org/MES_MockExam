import type { ReactNode } from "react";
import { ArrowRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExamOptionCardProps {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  iconSrc?: string;
  iconAlt?: string;
  onClick?: () => void;
  className?: string;
}

function ExamOptionCard({
  title,
  description,
  icon,
  iconSrc,
  iconAlt,
  onClick,
  className,
}: ExamOptionCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 rounded-xl border bg-card p-5 transition-all duration-150 ease-out hover:bg-muted active:scale-[0.995]",
        className
      )}
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-medium leading-snug text-card-foreground">{title}</h3>
        <div className="flex items-center gap-1.5 text-sm leading-snug text-muted-foreground">
          <Info className="size-4 shrink-0" />
          <span>{description}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {icon ? (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted">
            {icon}
          </div>
        ) : iconSrc ? (
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted">
            <img src={iconSrc} alt={iconAlt ?? ""} width={28} height={28} className="object-contain" />
          </div>
        ) : null}
        <ArrowRight className="size-[18px] text-muted-foreground" />
      </div>
    </div>
  );
}

export default ExamOptionCard;