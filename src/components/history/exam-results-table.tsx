import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Home,
  MoreHorizontal,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { SearchInput } from "@/components/shared/search-input";
import { cn } from "@/lib/utils";
import { DEFAULT_HISTORY_RESULTS, HISTORY_LOGOS } from "@/data/history";
import type { ExamResultRow } from "@/data/history";

const PAGE_SIZES = [10, 20, 50];

function formatDuration(totalMinutes: number): string {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export interface ExamResultsTableProps {
  data?: ExamResultRow[];
  logos?: Record<string, string>;
  pageSizes?: number[];
  className?: string;
  onRowAction?: (row: ExamResultRow) => void;
}

function ExamResultsTable({
  data = DEFAULT_HISTORY_RESULTS,
  logos = HISTORY_LOGOS,
  pageSizes = PAGE_SIZES,
  className,
  onRowAction,
}: ExamResultsTableProps) {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizes[0]!);

  const query = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      data.filter(
        (row) =>
          t(row.schoolKey).toLowerCase().includes(query) ||
          t(row.subjectKey).toLowerCase().includes(query),
      ),
    [data, query, t],
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
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full border bg-muted text-muted-foreground">
            <Home className="size-4" />
          </div>
          <h1 className="text-lg font-medium text-foreground">{t("history.title")}</h1>
        </div>

        <SearchInput
          value={search}
          onChange={onSearch}
          placeholder={t("history.search")}
          className="w-56"
        />
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-muted-foreground">
                <th className="w-12 px-4 py-3 font-medium">{t("history.col.no")}</th>
                <th className="px-4 py-3 font-medium">{t("history.col.school")}</th>
                <th className="px-4 py-3 font-medium">{t("history.col.subject")}</th>
                <th className="px-4 py-3 font-medium">{t("history.col.score")}</th>
                <th className="px-4 py-3 font-medium">{t("history.col.duration")}</th>
                <th className="px-4 py-3 font-medium">{t("history.col.date")}</th>
                <th className="w-12 px-4 py-3 font-medium">{t("history.col.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b last:border-b-0 transition-colors hover:bg-muted/50"
                >
                  <td className="px-4 py-3 text-muted-foreground">{start + index + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={logos[row.shortName]}
                        alt={t(row.schoolKey)}
                        className="size-8 rounded-full border object-contain"
                      />
                      <span className="text-foreground">{t(row.schoolKey)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{t(row.subjectKey)}</td>
                  <td className="px-4 py-3 text-foreground">
                    {row.score}/{row.maxScore}
                  </td>
                  <td className="px-4 py-3 text-foreground">{formatDuration(row.durationMinutes)}</td>
                  <td className="px-4 py-3 text-foreground">{formatDate(row.date)}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      aria-label={t("history.actions")}
                      onClick={() => onRowAction?.(row)}
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
            {pageSizes.map((size) => (
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
