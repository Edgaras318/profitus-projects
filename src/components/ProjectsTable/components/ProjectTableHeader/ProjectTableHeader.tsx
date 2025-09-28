import React, { useMemo, useCallback } from 'react';
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
    const sortState = useMemo(() => new Map(currentSort.map(item => [item.id, item])), [currentSort]);

    const getAriaSort = useCallback((column: SortId): 'none' | 'ascending' | 'descending' => {
        const sortItem = sortState.get(column);
        if (!sortItem) return 'none';
        return sortItem.desc ? 'descending' : 'ascending';
    }, [sortState]);

    const getSortIcon = useCallback((column: SortId) => {
        const sortItem = sortState.get(column);

        if (!sortItem) {
            return <ArrowUpDown size={14} aria-hidden="true" />;
        }

        return sortItem.desc
            ? <ArrowDown className={styles.sortActiveColor} size={14} aria-hidden="true" />
            : <ArrowUp className={styles.sortActiveColor} size={14} aria-hidden="true" />;
    }, [sortState]);

    const handleHeaderClick = useCallback((column: SortId) => {
        onSort?.(column);
    }, [onSort]);

    const renderSortableHeader = useCallback((column: SortId, label: string) => (
        <th
            scope="col"
            className={`${styles.headerCell} ${styles.sortable}`}
            aria-sort={getAriaSort(column)}
        >
            <button
                type="button"
                className={styles.sortButton}
                onClick={() => handleHeaderClick(column)}
            >
                {label} {getSortIcon(column)}
            </button>
        </th>
    ), [getAriaSort, getSortIcon, handleHeaderClick]);

    return (
        <thead>
        <tr className={styles.headerRow}>
            <th className={`${styles.headerCell} ${styles.imageHeader}`}></th>
            <th className={styles.headerCell}>Pavadinimas</th>

            {renderSortableHeader('initial_rating', 'Reitingas')}

            <th className={styles.headerCell}>Šalis</th>
            <th className={styles.headerCell}>LTV</th>
            <th className={styles.headerCell}>Surinkta</th>
            <th className={styles.headerCell}>Tikslas</th>
            <th className={styles.headerCell}>Time</th>
            <th className={styles.headerCell}>Users</th>

            {renderSortableHeader('credit_duration', 'Date')}

            <th className={styles.headerCell}>Progress bar</th>

            {renderSortableHeader('basic_interest', 'Interest rate')}

            <th className={styles.headerCell}></th>
        </tr>
        </thead>
    );
};

export default ProjectTableHeader;
