"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ResultsNav({ totalPages }) {
  const MAX_NUM_PAGE_BTNS = 5;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  const currentPage = Math.max(1, Number(params.get("page") ?? 1));

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const goToPage = (page) => {
    const next = clamp(page, 1, totalPages);
    params.set("page", String(next));
    router.push(`${pathname}?${params.toString()}`);
  };

  const getVisiblePages = () => {
    if (!totalPages || totalPages < 1) return [];

    const maxButtons = Math.min(MAX_NUM_PAGE_BTNS, totalPages);
    const half = Math.floor(maxButtons / 2);

    let start = currentPage - half;
    let end = currentPage + half;

    if (maxButtons % 2 === 0) end += 1;

    if (start < 1) {
      start = 1;
      end = maxButtons;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = getVisiblePages();

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="flex items-center gap-4 w-full min-w-4 border-t border-accent py-8 pb-16 ">
      <button
        className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => goToPage(currentPage - 1)}
        disabled={isFirst}
      >
        Prev
      </button>

      {pages.length > 0 && pages[0] > 1 && (
        <>
          <button
            className="w-fit text-secondary border-b border-secondary p-1 min-w-8 cursor-pointer hover:bg-accent"
            onClick={() => goToPage(1)}
          >
            1
          </button>
          {pages[0] > 2 && <span className="px-1 text-secondary">…</span>}
        </>
      )}

      {pages.map((page) => {
        const active = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "w-fit text-white border-0 bg-accent p-1 min-w-8 cursor-pointer"
                : "w-fit text-secondary border-b border-secondary p-1 min-w-8 cursor-pointer hover:bg-accent"
            }
          >
            {page}
          </button>
        );
      })}

      {pages.length > 0 && pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-1 text-secondary">…</span>
          )}
          <button
            className="w-fit text-secondary border-b border-secondary p-1 min-w-8 cursor-pointer hover:bg-accent"
            onClick={() => goToPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="w-fit text-secondary border border-secondary p-1 px-2 cursor-pointer hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => goToPage(currentPage + 1)}
        disabled={isLast}
      >
        Next
      </button>
    </div>
  );
}
