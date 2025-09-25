import React, { useMemo } from 'react';
import styles from './Pagination.module.scss';

interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface EnhancedPaginationProps {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    limitOptions?: number[];
    maxPageButtons?: number;
    className?: string;
}

const Pagination: React.FC<EnhancedPaginationProps> = ({
                                                           meta,
                                                           onPageChange,
                                                           onLimitChange,
                                                           limitOptions = [10, 20, 50, 100],
                                                           maxPageButtons = 7,
                                                           className = ''
                                                       }) => {
    const { current_page, last_page } = meta;

    const pageNumbers = useMemo(() => {
        const pages: (number | string)[] = [];

        if (last_page <= maxPageButtons) {
            // Show all pages if total is less than max
            for (let i = 1; i <= last_page; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (current_page > 3) {
                pages.push('...');
            }

            // Calculate range around current page
            let start = Math.max(2, current_page - 1);
            let end = Math.min(last_page - 1, current_page + 1);

            // Adjust range if at boundaries
            if (current_page <= 3) {
                end = Math.min(5, last_page - 1);
            } else if (current_page >= last_page - 2) {
                start = Math.max(2, last_page - 4);
            }

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (current_page < last_page - 2) {
                pages.push('...');
            }

            // Always show last page
            pages.push(last_page);
        }

        return pages;
    }, [current_page, last_page, maxPageButtons]);

    const handlePageClick = (page: number | string) => {
        if (typeof page === 'number' && page !== meta.current_page) {
            onPageChange(page);
        }
    };

    const goToFirstPage = () => onPageChange(1);
    const goToLastPage = () => onPageChange(meta.last_page);
    const goToPrevPage = () => onPageChange(Math.max(1, meta.current_page - 1));
    const goToNextPage = () => onPageChange(Math.min(meta.last_page, meta.current_page + 1));

    return (
        <div className={`${styles.paginationContainer} ${className}`}>
            {/* Items per page selector */}
            <div className={styles.limitSection}>
                <span className={styles.limitLabel}>Rodyti</span>
                <select
                    value={meta.per_page}
                    onChange={(e) => onLimitChange(Number(e.target.value))}
                    className={styles.limitSelect}
                >
                    {limitOptions.map(limit => (
                        <option key={limit} value={limit}>{limit}</option>
                    ))}
                </select>
                <span className={styles.limitLabel}>puslapyje</span>
            </div>

            {/* Page navigation */}
            <div className={styles.pageNavigation}>
                {/* First page button */}
                <button
                    className={styles.navButton}
                    onClick={goToFirstPage}
                    disabled={meta.current_page === 1}
                    aria-label="Pirmas puslapis"
                    title="Pirmas puslapis"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M11 17L6 12L11 7M18 17L13 12L18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Previous page button */}
                <button
                    className={styles.navButton}
                    onClick={goToPrevPage}
                    disabled={meta.current_page === 1}
                    aria-label="Ankstesnis puslapis"
                    title="Ankstesnis"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Page number buttons */}
                <div className={styles.pageNumbers}>
                    {pageNumbers.map((page, index) => (
                        <button
                            key={index}
                            className={`${styles.pageButton} ${
                                page === meta.current_page ? styles.active : ''
                            } ${page === '...' ? styles.ellipsis : ''}`}
                            onClick={() => handlePageClick(page)}
                            disabled={page === '...'}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next page button */}
                <button
                    className={styles.navButton}
                    onClick={goToNextPage}
                    disabled={meta.current_page >= meta.last_page}
                    aria-label="Kitas puslapis"
                    title="Kitas"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                {/* Last page button */}
                <button
                    className={styles.navButton}
                    onClick={goToLastPage}
                    disabled={meta.current_page >= meta.last_page}
                    aria-label="Paskutinis puslapis"
                    title="Paskutinis puslapis"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M13 17L18 12L13 7M6 17L11 12L6 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* Results info */}
            <div className={styles.resultsInfo}>
                Rodoma <strong>{meta.from}-{meta.to}</strong> iš <strong>{meta.total}</strong>
            </div>
        </div>
    );
};

export default Pagination;
