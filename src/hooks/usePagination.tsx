import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setCurrentPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    next: () => setCurrentPage((p) => Math.min(p + 1, totalPages)),
    prev: () => setCurrentPage((p) => Math.max(p - 1, 1)),
    reset: () => setCurrentPage(1),
  };
}
