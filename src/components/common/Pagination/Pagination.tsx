import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { PaginationMeta } from '@/types/project.types.ts';
import styles from './Pagination.module.scss';

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

            // Calculate available slots for middle pages
            // We reserve 2 slots for first and last page
            // We may need up to 2 slots for ellipses
            const availableSlots = maxPageButtons - 2; // Subtract first and last
            const middleSlots = Math.max(1, availableSlots - 2); // Reserve space for potential ellipses

            // Calculate the range of pages to show around current page
            const halfRange = Math.floor(middleSlots / 2);

            // Determine if we need ellipsis before
            const needsStartEllipsis = current_page > 2 + halfRange;
            // Determine if we need ellipsis after
            const needsEndEllipsis = current_page < last_page - 1 - halfRange;

            // Calculate actual available slots for numbers (not ellipses)
            const actualMiddleSlots = availableSlots - (needsStartEllipsis ? 1 : 0) - (needsEndEllipsis ? 1 : 0);

            let start: number;
            let end: number;

            if (!needsStartEllipsis && !needsEndEllipsis) {
                // All pages between first and last can fit
                start = 2;
                end = last_page - 1;
            } else if (!needsStartEllipsis) {
                // Pages are clustered at the start
                start = 2;
                end = Math.min(start + actualMiddleSlots - 1, last_page - 1);
            } else if (!needsEndEllipsis) {
                // Pages are clustered at the end
                end = last_page - 1;
                start = Math.max(2, end - actualMiddleSlots + 1);
            } else {
                // Current page is in the middle, show range around it
                const halfActual = Math.floor(actualMiddleSlots / 2);
                start = current_page - halfActual;
                end = current_page + halfActual;

                // Adjust if we have an odd number of slots (favor showing more after current)
                if (actualMiddleSlots % 2 !== 0) {
                    end++;
                }

                // Ensure we don't overlap with first/last pages
                start = Math.max(2, start);
                end = Math.min(last_page - 1, end);
            }

            // Add start ellipsis if needed
            if (start > 2) {
                pages.push('...');
            }

            // Add the calculated range
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add end ellipsis if needed
            if (end < last_page - 1) {
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
                    <ChevronsLeft size={16} />
                </button>

                {/* Previous page button */}
                <button
                    className={styles.navButton}
                    onClick={goToPrevPage}
                    disabled={meta.current_page === 1}
                    aria-label="Ankstesnis puslapis"
                    title="Ankstesnis"
                >
                    <ChevronLeft size={16} />
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
                    <ChevronRight size={16} />
                </button>

                {/* Last page button */}
                <button
                    className={styles.navButton}
                    onClick={goToLastPage}
                    disabled={meta.current_page >= meta.last_page}
                    aria-label="Paskutinis puslapis"
                    title="Paskutinis puslapis"
                >
                    <ChevronsRight size={16} />
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
