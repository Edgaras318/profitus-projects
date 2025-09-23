
import Button from '@/components/common/Button/Button';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import Rating from '@/components/common/Rating/Rating';
import CountryFlag from '@/components/common/CountryFlag/CountryFlag';
import SecurityBadge from '@/components/common/SecurityBadge/SecurityBadge';
import type { ProjectCardResponse } from '@/types/project.types';
import type { SortInput, SortId } from '@/types/project.api.types';
import styles from './ProjectsTable.module.scss';

interface ProjectsTableProps {
    projects: ProjectCardResponse[];
    onSort?: (column: SortId) => void;
    currentSort?: SortInput[];
}

export default function ProjectsTable({
                                          projects,
                                          onSort,
                                          currentSort = []
                                      }: ProjectsTableProps) {

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('lt-LT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount).replace('EUR', '€');
    };

    const formatDate = (dateString: string): string => {
        // Simple date formatting - you might want to use a proper date library
        return dateString;
    };

    const calculateProgress = (invested: number, required: number): number => {
        return (invested / required) * 100;
    };

    const getSortIcon = (column: string): string => {
        const sortItem = currentSort.find(s => s.id === column);
        if (!sortItem) return '';
        return sortItem.desc ? '↓' : '↑';
    };

    const handleHeaderClick = (column: SortId) => {
        if (onSort) {
            onSort(column);
        }
    };

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.headerRow}>
                    <th className={`${styles.headerCell} ${styles.imageHeader}`}></th>
                    <th className={styles.headerCell}>Pavadinimas</th>
                    <th
                        className={`${styles.headerCell} ${styles.sortable}`}
                        onClick={() => handleHeaderClick('initial_rating')}
                    >
                        Reitingas {getSortIcon('initial_rating')}
                    </th>
                    <th className={styles.headerCell}>Šalis</th>
                    <th className={styles.headerCell}>LTV</th>
                    <th className={styles.headerCell}>Surinkta</th>
                    <th className={styles.headerCell}>Tikslas</th>
                    <th className={styles.headerCell}>Time</th>
                    <th className={styles.headerCell}>Users</th>
                    <th className={styles.headerCell}>Date</th>
                    <th className={styles.headerCell}>Progress bar</th>
                    <th
                        className={`${styles.headerCell} ${styles.sortable}`}
                        onClick={() => handleHeaderClick('basic_interest')}
                    >
                        Interest rate {getSortIcon('basic_interest')}
                    </th>
                    <th className={styles.headerCell}></th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => {
                    const progress = calculateProgress(project.invested_amount, project.required_amount);
                    const interestRange = project.max_bonus_interest
                        ? `${project.basic_interest}-${project.basic_interest + project.max_bonus_interest}%`
                        : `${project.basic_interest}%`;

                    return (
                        <tr key={project.pid} className={styles.row}>
                            {/* Project Image with Security Badge */}
                            <td className={styles.cell}>
                                <div className={styles.imageContainer}>
                                    {project.image_url && (
                                        <div className={styles.imageWrapper}>
                                            <img
                                                src={project.image_url}
                                                alt={project.project_name}
                                                className={styles.projectImage}
                                            />
                                            <SecurityBadge
                                                securityMeasure={project.security_measures}
                                                className={styles.badgeInside}
                                            />
                                        </div>
                                    )}
                                </div>
                            </td>

                            {/* Project Name */}
                            <td className={styles.cell}>
                                <div className={styles.projectTitle}>
                                    {project.project_name}
                                </div>
                            </td>

                            {/* Rating */}
                            <td className={styles.cell}>
                                <Rating rating={project.initial_rating}/>
                            </td>

                            {/* Country */}
                            <td className={styles.cell}>
                                {project.country && (
                                    <CountryFlag countryCode={project.country}/>
                                )}
                            </td>

                            {/* LTV */}
                            <td className={styles.cell}>
                                <div className={styles.ltvInfo}>
                                        <span className={styles.ltvValue}>
                                            {project.loan_ratio_external}%
                                        </span>
                                    <span className={styles.ltvMax}>
                                            (maks. {project.loan_ratio_max}%)
                                        </span>
                                </div>
                            </td>

                            {/* Invested Amount */}
                            <td className={styles.cell}>
                                {formatCurrency(project.invested_amount)}
                            </td>

                            {/* Required Amount */}
                            <td className={styles.cell}>
                                {formatCurrency(project.required_amount)}
                            </td>

                            {/* Time */}
                            <td className={styles.cell}>
                                {project.days_to_get_money}
                            </td>

                            {/* Users/Investors */}
                            <td className={styles.cell}>
                                {project.investors}
                            </td>

                            {/* Date */}
                            <td className={styles.cell}>
                                {formatDate(project.funded_duration)}
                            </td>

                            {/* Progress Bar */}
                            <td className={styles.cell}>
                                <ProgressBar
                                    percentage={progress}
                                    variant="circular"
                                    size={60}
                                />
                            </td>

                            {/* Interest Rate */}
                            <td className={styles.cell}>
                                    <span className={styles.interestRate}>
                                        {interestRange}
                                    </span>
                            </td>

                            {/* Action Button */}
                            <td className={styles.cell}>
                                <Button size="small">
                                    Investuokite
                                </Button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
