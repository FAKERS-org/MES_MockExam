import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface CategoryItem {
  id: string;
  labelKey?: TranslationKey;
  label?: string;
}

const defaultCategories: CategoryItem[] = [
  { id: "all", labelKey: "info.heading.category.all" },
  { id: "crops", labelKey: "info.heading.category.crops" },
  { id: "flowers", labelKey: "info.heading.category.flowers" },
  { id: "aquatic", labelKey: "info.heading.category.aquatic" },
  { id: "forest", labelKey: "info.heading.category.forest" },
  { id: "others", labelKey: "info.heading.category.others" },
];

export interface InfoHeadingProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  categories?: CategoryItem[];
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

export default function InfoHeading({
  title,
  subtitle,
  categories = defaultCategories,
  activeCategory: controlledCategory,
  onCategoryChange,
  className,
}: InfoHeadingProps) {
  const { t } = useLanguage();
  const [internalCategory, setInternalCategory] = useState("all");

  const currentCategory = controlledCategory ?? internalCategory;

  const handleSelect = (id: string) => {
    if (onCategoryChange) {
      onCategoryChange(id);
    } else {
      setInternalCategory(id);
    }
  };

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="w-full max-w-3xl text-center">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title ?? t("info.heading.title")}
        </h1>

        {/* Subtitle / Description */}
        <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {subtitle ?? t("info.heading.subtitle")}
        </p>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Text Size Toggle */}
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-accent"
            aria-label="Toggle text size"
          >
            <span className="text-sm font-medium">T</span>
            <span className="text-xs">↓</span>
          </button>

          {/* Category Filters */}
          {categories.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm",
                currentCategory === cat.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-card text-muted-foreground hover:bg-accent"
              )}
            >
              {cat.label ?? (cat.labelKey ? t(cat.labelKey) : cat.id)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}