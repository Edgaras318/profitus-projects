import styles from './TableSkeleton.module.scss';

export type ColumnType = 'image' | 'text' | 'progress' | 'button' | 'rating' | 'badge';

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
    columnTypes?: ColumnType[];
    className?: string;
}

const DEFAULT_COLUMN_TYPES: ColumnType[] = [
    'image',
    'text',
    'text',
    'text',
    'rating',
    'text',
    'text',
    'text',
    'text',
    'text',
    'progress',
    'text',
    'button'
];

export default function TableSkeleton({
                                          rows = 10,
                                          columns = 13,
                                          columnTypes = DEFAULT_COLUMN_TYPES,
                                          className = ''
                                      }: TableSkeletonProps) {
    const rowCount = rows || 10;
    const columnCount = columns || 13;

    const actualColumnTypes = [...columnTypes];
    while (actualColumnTypes.length < columnCount) {
        actualColumnTypes.push('text');
    }

    const renderSkeletonCell = (type: ColumnType) => {
        switch (type) {
            case 'image':
                return (
                    <div className={styles.imageSkeleton}>
                        <div className={styles.shimmer} />
                    </div>
                );
            case 'progress':
                return (
                    <div className={styles.progressSkeleton}>
                        <div className={styles.shimmer} />
                    </div>
                );
            case 'button':
                return (
                    <div className={styles.buttonSkeleton}>
                        <div className={styles.shimmer} />
                    </div>
                );
            case 'rating':
                return (
                    <div className={styles.ratingSkeleton}>
                        <div className={styles.shimmer} />
                    </div>
                );
            case 'badge':
                return (
                    <div className={styles.badgeSkeleton}>
                        <div className={styles.shimmer} />
                    </div>
                );
            case 'text':
            default:
                return (
                    <div className={styles.textSkeleton}>
                        <div className={styles.shimmer} />
                    </div>
                );
        }
    };

    return (
        <div
            className={`${styles.skeletonContainer} ${className}`}
            aria-hidden="true"
            role="presentation"
        >
            <table className={styles.skeletonTable}>
                <thead>
                <tr className={styles.headerRow}>
                    {actualColumnTypes.map((_, index) => (
                        <th
                            key={`header-${index}`}
                            className={styles.headerCell}
                            aria-label="Loading"
                        >
                            <div className={styles.shimmer} />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: rowCount }, (_, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className={styles.row}>
                        {actualColumnTypes.map((type, colIndex) => (
                            <td
                                key={`cell-${rowIndex}-${colIndex}`}
                                className={styles.cell}
                                aria-label="Loading content"
                            >
                                {renderSkeletonCell(type)}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
