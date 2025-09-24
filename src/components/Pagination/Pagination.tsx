import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   lastPage,
                                                   onPageChange
                                               }) => {
    return (
        <div className={styles.pagination}>
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={styles.paginationButton}
            >
                Ankstesnis
            </button>
            <span className={styles.paginationInfo}>
                Puslapis {currentPage} / {lastPage}
            </span>
            <button
                disabled={currentPage >= lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className={styles.paginationButton}
            >
                Kitas
            </button>
        </div>
    );
};

export default Pagination;
