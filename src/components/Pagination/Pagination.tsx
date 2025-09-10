import React from 'react';
import { createUseStyles } from 'react-jss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 10,
}) => {
  if (totalPages <= 1) return null;
  const classes = useStyles();

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={classes.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${classes.pageBtn} ${
          currentPage === 1 ? classes.disabled : ''
        }`}
      >
        ← Prev
      </button>

      {showPageNumbers && (
        <div className={classes.pageNumbers}>
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className={classes.pageBtn}
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className={classes.pageBtn}>...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${classes.pageBtn} ${
                currentPage === page ? classes.active : ''
              }`}
            >
              {page}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className={classes.pageBtn}>...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className={classes.pageBtn}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${classes.pageBtn} ${
          currentPage === totalPages ? classes.disabled : ''
        }`}
      >
        Next →
      </button>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '32px',
      padding: '20px',
    },
    pageNumbers: {
      display: 'flex',
      gap: '4px',
      '@media (max-width: 480px)': {
        display: 'none',
      },
    },
    pageBtn: {
      padding: '8px 12px',
      border: '1px solid #ddd',
      background: 'Black',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      '&:hover:not(.disabled)': {
        background: 'white',
        color: 'black',
        borderColor: '#bbb',
      },
    },
    active: {
      background: '#667eea !important',
      color: 'white !important',
      borderColor: '#667eea !important',
      '&:hover': {
        background: '#5a6fd8 !important',
      },
    },
    disabled: {
      opacity: '0.5',
      cursor: 'not-allowed !important',
      '&:hover': {
        background: 'white !important',
        borderColor: '#ddd !important',
      },
    },
  },
  { name: 'Pagination' }
);

export default Pagination;
