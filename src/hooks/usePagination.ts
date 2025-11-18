import { useState, useCallback } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalPages?: number;
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 12,
  totalPages,
}: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = useCallback(
    (newPage: number, maxPages?: number) => {
      if (newPage < 1) return;
      const max = maxPages || totalPages;
      if (max && newPage > max) return;
      setPage(newPage);
    },
    [totalPages],
  );

  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    handlePageChange,
    handlePageSizeChange,
    reset,
  };
};

