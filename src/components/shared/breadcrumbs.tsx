import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage, TranslationKey } from "@/lib/i18n";

const routeLabels: Record<string, TranslationKey> = {
  dashboard: "nav.dashboard",
  history: "nav.history",
  info: "nav.info",
  account: "nav.account",
  itc: "overview.institutions.itc",
  usha: "overview.institutions.usha",
  rupp: "overview.institutions.rupp",
  ifl: "overview.institutions.ifl",
};

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="px-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/dashboard"
            className="text-gray-400 transition-colors hover:text-gray-600 dark:text-muted-foreground dark:hover:text-foreground"
          >
            {t("nav.dashboard")}
          </Link>
        </li>
        {segments.slice(1).map((segment, i, arr) => {
          const isLast = i === arr.length - 1;
          const key = routeLabels[segment];
          const label = key ? t(key) : decodeURIComponent(segment);
          const to = "/" + segments.slice(0, i + 2).join("/");
          return (
            <React.Fragment key={`${segment}-${i}`}>
              <li className="flex text-gray-300 dark:text-muted-foreground/50">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current={isLast ? "page" : undefined}>
                {isLast ? (
                  <span className="font-medium text-gray-700 dark:text-foreground">{label}</span>
                ) : (
                  <Link
                    to={to}
                    className="text-gray-400 transition-colors hover:text-gray-600 dark:text-muted-foreground dark:hover:text-foreground"
                  >
                    {label}
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