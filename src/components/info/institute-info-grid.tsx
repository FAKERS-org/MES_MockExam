import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { institutions, type Institution } from "@/data/institutions";
import { SearchInput } from "@/components/shared/search-input";
import UniInfoCard from "@/components/info/uni-info-card";

export interface InstituteInfoGridProps {
  items?: Institution[];
  className?: string;
}

const InstituteInfoGrid: React.FC<InstituteInfoGridProps> = ({
  items = institutions,
  className,
}) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => t(item.nameKey).toLowerCase().includes(q));
  }, [filter, items, t]);

  return (
    <div className={cn("space-y-6", className)}>
      <SearchInput
        value={filter}
        onChange={setFilter}
        placeholder={t("topbar.searchPlaceholder")}
        className="w-full sm:max-w-md"
      />
      <p className="text-sm text-muted-foreground">
        {t("info.detail.departments")}: {filtered.length}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <UniInfoCard key={item.id} institution={item} />
        ))}
      </div>
    </div>
  );
};

export default InstituteInfoGrid;
