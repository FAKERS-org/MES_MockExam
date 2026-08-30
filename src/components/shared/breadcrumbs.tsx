import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";
import { institutionLabels } from "@/data/institutions";
import { findSubject } from "@/data/subjects";

interface Crumb {
  label: string;
  to?: string;
}

function Breadcrumbs() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  const segments = pathname.split("/").filter(Boolean);

  const crumbs: Crumb[] = [];
  if (segments.length === 0) {
    crumbs.push({ label: t("nav.dashboard") });
  } else if (segments[0] === "history") {
    crumbs.push({ label: t("nav.history") });
  } else if (segments[0] === "info") {
    crumbs.push({ label: t("nav.info") });
  } else if (segments[0] === "dashboard") {
    crumbs.push({ label: t("nav.dashboard"), to: "/" });
    const [institution, subjectId, action] = segments.slice(1);

    if (institution) {
      const instKey = institutionLabels[institution] as TranslationKey | undefined;
      crumbs.push({
        label: instKey ? t(instKey) : decodeURIComponent(institution),
        to: `/dashboard/${institution}`,
      });

      const found = subjectId ? findSubject(institution, subjectId) : null;
      if (found) {
        if (action === "take") {
          crumbs.push({
            label: t(found.subject.titleKey),
            to: `/dashboard/${institution}/${subjectId}`,
          });
          crumbs.push({ label: t("breadcrumbs.taking") });
        } else {
          crumbs.push({ label: t(found.subject.titleKey) });
        }
      }
    } else {
      crumbs.push({ label: t("nav.dashboard") });
    }
  }

  return (
    <nav aria-label="Breadcrumb" className="px-1">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <Fragment key={i}>
              {i > 0 && (
                <li className="flex text-muted-foreground/50">
                  <ChevronRight className="size-4" />
                </li>
              )}
              <li aria-current={isLast ? "page" : undefined}>
                {isLast || !crumb.to ? (
                  <span className="font-medium text-foreground">{crumb.label}</span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;