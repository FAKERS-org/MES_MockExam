import { useState } from 'react';
import { useLanguage } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";

const categories: { id: string; labelKey: TranslationKey }[] = [
  { id: 'all', labelKey: 'info.heading.category.all' },
  { id: 'crops', labelKey: 'info.heading.category.crops' },
  { id: 'flowers', labelKey: 'info.heading.category.flowers' },
  { id: 'aquatic', labelKey: 'info.heading.category.aquatic' },
  { id: 'forest', labelKey: 'info.heading.category.forest' },
  { id: 'others', labelKey: 'info.heading.category.others' },
];

export default function InfoHeading() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-center max-w-3xl w-full">

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
          {t("info.heading.title")}
        </h1>

        {/* Subtitle / Description */}
        <p className="text-sm text-muted-foreground md:text-base mb-6 leading-relaxed max-w-2xl mx-auto">
          {t("info.heading.subtitle")}
        </p>

        {/* Controls Row */}
        <div className="flex flex-wrap items-center justify-center gap-2">

          {/* Text Size Toggle */}
          <button
            className="w-9 h-9 rounded-full bg-card border border-border text-muted-foreground flex items-center justify-center hover:bg-accent transition-colors shadow-sm"
            aria-label="Toggle text size"
          >
            <span className="text-sm font-medium">T</span>
            <span className="text-xs">↓</span>
          </button>

          {/* Category Filters */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                ${activeCategory === cat.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md'
                  : 'bg-card text-muted-foreground border-border hover:bg-accent shadow-sm'
                }
              `}
            >
              {t(cat.labelKey)}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}