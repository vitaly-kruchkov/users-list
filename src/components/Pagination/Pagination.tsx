import { useMemo } from "react";
import styles from "./Pagination.module.css";

interface Props {
  total: number;
  limit: number;
  skip: number;
  onChange: (skip: number) => void;
}

const Pagination = ({ total, limit, skip, onChange }: Props) => {
  const currentPage = skip / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const pages = useMemo(() => {
    const result: (number | "...")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const isFirst = i === 1;
      const isLast = i === totalPages;
      const isNearCurrent = Math.abs(i - currentPage) <= 1;

      if (isFirst || isLast || isNearCurrent) {
        result.push(i);
      } else if (result[result.length - 1] !== "...") {
        result.push("...");
      }
    }

    return result;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(skip - limit)}
        aria-label="Previous page">
        Prev
      </button>
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            className={page === currentPage ? styles.active : styles.button}
            onClick={() => onChange((page - 1) * limit)}>
            {page}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onChange(skip + limit)}
        aria-label="Next page">
        Next
      </button>
    </div>
  );
};

export default Pagination;
