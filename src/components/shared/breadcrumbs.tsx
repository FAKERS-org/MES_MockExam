import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage, TranslationKey } from "@/lib/i18n";
import { subjectsByInstitution } from "@/pages/dashboard/subjects-data";

const institutionLabels: Record<string, TranslationKey> = {
  itc: "overview.institutions.itc",
  usha: "overview.institutions.usha",
  rupp: "overview.institutions.rupp",
  ifl: "overview.institutions.ifl",
};

interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs: Crumb[] = [{ label: t("nav.dashboard"), to: "/dashboard" }];

  if (segments[0] === "dashboard") {
    const institution = segments[1];
    const subjectId = segments[2];
    const action = segments[3];

    if (institution) {
      const instKey = institutionLabels[institution];
      crumbs.push({
        label: instKey ? t(instKey) : decodeURIComponent(institution),
        to: `/dashboard/${institution}`,
      });

      let subjectTitle: string | null = null;
      if (subjectId) {
        const data = subjectsByInstitution[institution];
        if (data) {
          for (const group of data.groups) {
            const subject = group.subjects.find((s) => s.id === subjectId);
            if (subject) {
              subjectTitle = t(subject.titleKey);
              break;
            }
          }
        }
      }

      if (subjectTitle) {
        if (action === "take") {
          crumbs.push({
            label: subjectTitle,
            to: `/dashboard/${institution}/${subjectId}`,
          });
          crumbs.push({ label: t("breadcrumbs.taking") });
        } else {
          crumbs.push({ label: subjectTitle });
        }
      }
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="px-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <li className="flex text-gray-300 dark:text-muted-foreground/50">
                  <ChevronRight className="h-4 w-4" />
                </li>
              )}
              <li aria-current={isLast ? "page" : undefined}>
                {isLast || !crumb.to ? (
                  <span className="font-medium text-gray-700 dark:text-foreground">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="text-gray-400 transition-colors hover:text-gray-600 dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;