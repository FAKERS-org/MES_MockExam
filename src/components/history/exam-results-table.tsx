import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Home,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

interface ExamResultRow {
  id: number;
  shortName: string;
  schoolKey: TranslationKey;
  subjectKey: TranslationKey;
  score: number;
  maxScore: number;
  durationMinutes: number;
  date: string;
}

const examResults: ExamResultRow[] = [
  { id: 1, shortName: "ITC", schoolKey: "overview.institutions.itc", subjectKey: "subjects.itc.math", score: 95, maxScore: 100, durationMinutes: 99, date: "2020-12-28" },
  { id: 2, shortName: "RUPP", schoolKey: "overview.institutions.rupp", subjectKey: "subjects.itc.physics", score: 69, maxScore: 100, durationMinutes: 89, date: "2020-12-28" },
  { id: 3, shortName: "ITC", schoolKey: "overview.institutions.itc", subjectKey: "subjects.itc.chemistry", score: 99, maxScore: 100, durationMinutes: 119, date: "2020-12-28" },
  { id: 4, shortName: "ITC", schoolKey: "overview.institutions.itc", subjectKey: "subjects.itc.logic", score: 77, maxScore: 100, durationMinutes: 49, date: "2020-12-28" },
];

const instituteLogos: Record<string, string> = {
  ITC: "/images/ITC-logo.png",
  RUPP: "/images/RUPP-logo.png",
};

const PAGE_SIZES = [10, 20, 50];

function formatDuration(totalMinutes: number): string {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function ExamResultsTable() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]!);

  const query = search.trim().toLowerCase();
  const filtered = examResults.filter(
    (row) =>
      t(row.schoolKey).toLowerCase().includes(query) ||
      t(row.subjectKey).toLowerCase().includes(query),
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  const locale = lang === "kh" ? "km-KH" : "en-GB";
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(locale);

  const changePage = (next: number) => setPage(Math.min(Math.max(1, next), pageCount));
  const onSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const pagerButton =
    "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full border bg-muted text-muted-foreground">
            <Home className="size-4" />
          </div>
          <h1 className="text-lg font-medium text-foreground">{t("history.title")}</h1>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("history.search")}
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-56 rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                <th className="w-12 py-3 px-4 font-medium">{t("history.col.no")}</th>
                <th className="py-3 px-4 font-medium">{t("history.col.school")}</th>
                <th className="py-3 px-4 font-medium">{t("history.col.subject")}</th>
                <th className="py-3 px-4 font-medium">{t("history.col.score")}</th>
                <th className="py-3 px-4 font-medium">{t("history.col.duration")}</th>
                <th className="py-3 px-4 font-medium">{t("history.col.date")}</th>
                <th className="w-12 py-3 px-4 font-medium">{t("history.col.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 transition-colors hover:bg-muted/50"
                >
                  <td className="py-3 px-4 text-muted-foreground">{start + index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={instituteLogos[row.shortName]}
                        alt={t(row.schoolKey)}
                        className="size-8 rounded-full border object-contain"
                      />
                      <span className="text-foreground">{t(row.schoolKey)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-foreground">{t(row.subjectKey)}</td>
                  <td className="py-3 px-4 text-foreground">
                    {row.score}/{row.maxScore}
                  </td>
                  <td className="py-3 px-4 text-foreground">{formatDuration(row.durationMinutes)}</td>
                  <td className="py-3 px-4 text-foreground">{formatDate(row.date)}</td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      aria-label={t("history.actions")}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground">
                    {t("history.empty")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-4 text-sm text-muted-foreground">
        <label className="flex items-center gap-2">
          <span className="sr-only">{t("history.rowsPerPage")}</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="rounded border border-input bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span>
          {t("history.pagination", {
            from: rows.length === 0 ? 0 : start + 1,
            to: start + rows.length,
            total: filtered.length,
          })}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={t("history.firstPage")}
            disabled={currentPage <= 1}
            onClick={() => changePage(1)}
            className={pagerButton}
          >
            <ChevronsLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("history.prevPage")}
            disabled={currentPage <= 1}
            onClick={() => changePage(currentPage - 1)}
            className={pagerButton}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("history.nextPage")}
            disabled={currentPage >= pageCount}
            onClick={() => changePage(currentPage + 1)}
            className={pagerButton}
          >
            <ChevronRight className="size-4" />
          </button>
          <button
            type="button"
            aria-label={t("history.lastPage")}
            disabled={currentPage >= pageCount}
            onClick={() => changePage(pageCount)}
            className={pagerButton}
          >
            <ChevronsRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamResultsTable;