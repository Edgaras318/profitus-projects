import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import type { SortInput, SortId } from '@/types/project.api.types';
import styles from './ProjectTableHeader.module.scss';

interface ProjectTableHeaderProps {
    onSort?: (column: SortId) => void;
    currentSort?: SortInput[];
}

export const ProjectTableHeader: React.FC<ProjectTableHeaderProps> = ({
                                                                          onSort,
                                                                          currentSort = []
                                                                      }) => {
    const getAriaSort = (column: SortId): "none" | "ascending" | "descending" => {
        const sortItem = currentSort.find(s => s.id === column);
        if (!sortItem) return "none";
        return sortItem.desc ? "descending" : "ascending";
    };

    const getSortIcon = (column: SortId) => {
        const sortItem = currentSort.find(s => s.id === column);

        if (!sortItem) {
            return <ArrowUpDown size={14} aria-hidden="true" />;
        }

        return sortItem.desc
            ? <ArrowDown className={styles.sortActiveColor} size={14} aria-hidden="true" />
            : <ArrowUp className={styles.sortActiveColor} size={14} aria-hidden="true" />;
    };

    const handleHeaderClick = (column: SortId) => {
        if (onSort) {
            onSort(column);
        }
    };

    return (
        <thead>
        <tr className={styles.headerRow}>
            <th className={`${styles.headerCell} ${styles.imageHeader}`}></th>
            <th className={styles.headerCell}>Pavadinimas</th>

            <th
                scope="col"
                className={`${styles.headerCell} ${styles.sortable}`}
                aria-sort={getAriaSort("initial_rating")}
            >
                <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => handleHeaderClick("initial_rating")}
                >
                    Reitingas {getSortIcon("initial_rating")}
                </button>
            </th>

            <th className={styles.headerCell}>Šalis</th>
            <th className={styles.headerCell}>LTV</th>
            <th className={styles.headerCell}>Surinkta</th>
            <th className={styles.headerCell}>Tikslas</th>
            <th className={styles.headerCell}>Time</th>
            <th className={styles.headerCell}>Users</th>

            <th
                scope="col"
                className={`${styles.headerCell} ${styles.sortable}`}
                aria-sort={getAriaSort("credit_duration")}
            >
                <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => handleHeaderClick("credit_duration")}
                >
                    Date {getSortIcon("credit_duration")}
                </button>
            </th>

            <th className={styles.headerCell}>Progress bar</th>

            <th
                scope="col"
                className={`${styles.headerCell} ${styles.sortable}`}
                aria-sort={getAriaSort("basic_interest")}
            >
                <button
                    type="button"
                    className={styles.sortButton}
                    onClick={() => handleHeaderClick("basic_interest")}
                >
                    Interest rate {getSortIcon("basic_interest")}
                </button>
            </th>

            <th className={styles.headerCell}></th>
        </tr>
        </thead>
    );
};

export default ProjectTableHeader;
