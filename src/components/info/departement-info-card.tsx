import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Department } from "@/data/institutions";

interface DepartementInfoCardProps {
  department: Department;
  logoSize?: number;
}

const DepartementInfoCard: React.FC<DepartementInfoCardProps> = ({ department, logoSize = 48 }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);

  return (
    <Card
      className="w-full shadow-md rounded-xl overflow-hidden cursor-pointer select-none transition-colors hover:bg-accent/50"
      onClick={toggle}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <img
              src={department.logo}
              alt={t(department.nameKey)}
              className="shrink-0 object-contain"
              style={{ height: logoSize, width: "auto" }}
            />
            <div className="flex flex-col gap-0.5">
              <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-50 leading-snug">
                {t(department.nameKey)}
              </CardTitle>
              <span className="text-sm font-medium text-muted-foreground">
                {t(department.enNameKey)}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </CardHeader>

      {/* Animated expand/collapse */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <CardContent className="pt-0">
            <div className="mt-4 border-t pt-4">
              <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {t("info.department.requirements.heading")}
              </h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
                {department.requirementKeys.map((key, index) => (
                  <li key={index}>{t(key)}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default DepartementInfoCard;
