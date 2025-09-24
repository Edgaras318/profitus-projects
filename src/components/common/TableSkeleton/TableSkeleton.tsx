import styles from './TableSkeleton.module.scss';

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    className?: string;
}

export default function TableSkeleton({
                                          rows = 10,
                                          columns = 13,
                                          className = ''
                                      }: TableSkeletonProps) {
    return (
        <div className={`${styles.skeletonContainer} ${className}`}>
            <table className={styles.skeletonTable}>
                <thead>
                <tr className={styles.headerRow}>
                    {Array.from({ length: columns }).map((_, index) => (
                        <th key={`header-${index}`} className={styles.headerCell}>
                            <div className={styles.shimmer} />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className={styles.row}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <td key={`cell-${rowIndex}-${colIndex}`} className={styles.cell}>
                                {colIndex === 0 ? (
                                    // Image skeleton
                                    <div className={styles.imageSkeleton}>
                                        <div className={styles.shimmer} />
                                    </div>
                                ) : colIndex === 10 ? (
                                    // Progress bar skeleton
                                    <div className={styles.progressSkeleton}>
                                        <div className={styles.shimmer} />
                                    </div>
                                ) : colIndex === 12 ? (
                                    // Button skeleton
                                    <div className={styles.buttonSkeleton}>
                                        <div className={styles.shimmer} />
                                    </div>
                                ) : (
                                    // Text skeleton
                                    <div className={styles.textSkeleton}>
                                        <div className={styles.shimmer} />
                                    </div>
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
