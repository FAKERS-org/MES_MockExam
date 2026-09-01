import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import type { Institution } from "@/data/institutions";

const DepartementInfoCard: React.FC<{ institution: Institution }> = ({ institution }) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const requirements = [
    "info.department.requirements.1",
    "info.department.requirements.2",
    "info.department.requirements.3",
    "info.department.requirements.4",
    "info.department.requirements.5",
  ];

  return (
    <Card className="w-full shadow-md rounded-xl">
      <CardHeader>
        <div className="flex items-start gap-3">
          <img
            src={institution.logo}
            alt={t(institution.nameKey)}
            className="h-12 w-12 rounded-full object-cover border border-border shrink-0"
          />
          <CardTitle className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-50 leading-snug">
            {t("info.department.title")}
          </CardTitle>
        </div>
      </CardHeader>

      {/* Conditionally render content based on isOpen state */}
      {isOpen && (
        <CardContent className="pt-0">
          <div className="mt-4 border-t pt-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              {t("info.department.requirements.heading")}
            </h4>
            <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
              {requirements.map((key, index) => (
                <li key={index}>{t(key as never)}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}

      <CardFooter className="flex justify-end pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5"
        >
          {isOpen ? (
            <>
              {t("info.department.close")}
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {t("info.department.open")}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DepartementInfoCard;