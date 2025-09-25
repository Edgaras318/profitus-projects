import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import type { PaginationMeta } from '@/types/project.types.ts';
import styles from './Pagination.module.scss';
import {getPageNumbers} from "@/utils/paginationHelper.ts";

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

    const pageNumbers = useMemo(
        () => getPageNumbers(current_page, last_page, maxPageButtons),
        [current_page, last_page, maxPageButtons]
    );


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

            <div className={styles.pageNavigation}>
                <button
                    className={styles.navButton}
                    onClick={goToFirstPage}
                    disabled={meta.current_page === 1}
                    aria-label="Pirmas puslapis"
                    title="Pirmas puslapis"
                >
                    <ChevronsLeft size={16} />
                </button>

                <button
                    className={styles.navButton}
                    onClick={goToPrevPage}
                    disabled={meta.current_page === 1}
                    aria-label="Ankstesnis puslapis"
                    title="Ankstesnis"
                >
                    <ChevronLeft size={16} />
                </button>

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

                <button
                    className={styles.navButton}
                    onClick={goToNextPage}
                    disabled={meta.current_page >= meta.last_page}
                    aria-label="Kitas puslapis"
                    title="Kitas"
                >
                    <ChevronRight size={16} />
                </button>

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

            <div className={styles.resultsInfo}>
                Rodoma <strong>{meta.from}-{meta.to}</strong> iš <strong>{meta.total}</strong>
            </div>
        </div>
    );
};

export default Pagination;
