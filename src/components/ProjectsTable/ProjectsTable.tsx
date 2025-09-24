import Button from '@/components/common/Button/Button';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import Rating from '@/components/common/Rating/Rating';
import CountryFlag from '@/components/common/CountryFlag/CountryFlag';
import SecurityBadge from '@/components/common/SecurityBadge/SecurityBadge';
import TableSkeleton from '@/components/common/TableSkeleton/TableSkeleton';
import type {ColumnType} from '@/components/common/TableSkeleton/TableSkeleton';
import EmptyState from '@/components/common/EmptyState/EmptyState';
import ErrorState from '@/components/common/ErrorState/ErrorState';
import type { ProjectCardResponse, ProjectStatusEnum } from '@/types/project.types';
import type { SortInput, SortId } from '@/types/project.api.types';
import styles from './ProjectsTable.module.scss';
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface ProjectsTableProps {
    projects: ProjectCardResponse[];
    onSort?: (column: SortId) => void;
    currentSort?: SortInput[];
    isLoading?: boolean;
    error?: Error | string | null;
    limit?: number;
    onRetry?: () => void;
    onClearFilters?: () => void;
}

const PROJECTS_TABLE_COLUMN_TYPES: ColumnType[] = [
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
    'badge',
    'button'
];

export default function ProjectsTable({
                                          projects,
                                          onSort,
                                          currentSort = [],
                                          isLoading = false,
                                          error = null,
                                          limit = 10,
                                          onRetry,
                                          onClearFilters
                                      }: ProjectsTableProps) {

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('lt-LT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount).replace('EUR', '€');
    };

    const calculateProgress = (invested: number, required: number): number => {
        if (required <= 0) {
            return invested > 0 ? 100 : 0;
        }

        const percentage = (invested / required) * 100;

        return Math.min(100, Math.max(0, Number.isFinite(percentage) ? percentage : 0));
    };

    const handleHeaderClick = (column: SortId) => {
        if (onSort) {
            onSort(column);
        }
    };

    const getButtonProps = (status: ProjectStatusEnum) => {
        switch (status) {
            case 'funded':
                return {
                    text: 'Projektas finansuotas',
                    disabled: true,
                    className: styles.fundedButton
                };
            case 'coming_soon':
                return {
                    text: 'Netrukus',
                    disabled: true,
                    className: styles.comingSoonButton
                };
            case 'not_funded':
                return {
                    text: 'Nefinansuotas',
                    disabled: true,
                    className: styles.notFundedButton
                };
            case 'finished':
                return {
                    text: 'Baigtas',
                    disabled: true,
                    className: styles.finishedButton
                };
            case 'confirmed':
                return {
                    text: 'Patvirtintas',
                    disabled: true,
                    className: styles.confirmedButton
                };
            case 'open_for_investments':
            default:
                return {
                    text: 'Investuokite',
                    disabled: false,
                    className: ''
                };
        }
    };

    const getAriaSort = (column: SortId): "none" | "ascending" | "descending" => {
        const sortItem = currentSort!.find(s => s.id === column);
        if (!sortItem) return "none";
        return sortItem.desc ? "descending" : "ascending";
    };

    const getSortIcon = (column: SortId) => {
        const sortItem = currentSort!.find(s => s.id === column);

        if (!sortItem) {
            // unsorted → neutral up/down icon
            return <ArrowUpDown size={14} aria-hidden="true" />;
        }

        return sortItem.desc
            ? <ArrowDown className={'sortActiveIcon'} size={14} aria-hidden="true" />
            : <ArrowUp size={14} aria-hidden="true" />;
    };



    if (isLoading) {
        return (
            <TableSkeleton
                rows={limit}
                columns={13}
                columnTypes={PROJECTS_TABLE_COLUMN_TYPES}
            />
        );
    }

    if (error) {
        const errorType = error.toString().toLowerCase().includes('network')
            ? 'network'
            : error.toString().toLowerCase().includes('server')
                ? 'server'
                : 'general';

        return (
            <ErrorState
                type={errorType}
                error={error}
                onRetry={onRetry}
                showDetails={import.meta.env.MODE === 'development'}
            />
        );
    }

    if (!projects || projects.length === 0) {
        return (
            <EmptyState
                title="No projects found"
                description="There are no projects matching your current filters. Try adjusting your search criteria."
                icon="search"
                action={onClearFilters ? {
                    label: 'Clear Filters',
                    onClick: onClearFilters
                } : undefined}
            />
        );
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
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
                            Time {getSortIcon("credit_duration")}
                        </button>
                    </th>
                    <th className={styles.headerCell}>Users</th>
                    <th className={styles.headerCell}>Date</th>
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
                <tbody>
                {projects.map((project) => {
                    const progress = calculateProgress(project.invested_amount, project.required_amount);
                    const interestRange = project.max_bonus_interest
                        ? `${project.basic_interest.toFixed(1)}-${(project.basic_interest + project.max_bonus_interest).toFixed(1)}%`
                        : `${project.basic_interest.toFixed(1)}%`;

                    const buttonProps = getButtonProps(project.status);

                    return (
                        <tr key={project.pid} className={styles.row}>
                            {/* Project Image with Security Badge and Status Overlay */}
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
                                            {/* Add overlay for funded projects */}
                                            {project.status === 'funded' && (
                                                <div className={styles.fundedOverlay}>
                                                    <span className={styles.overlayText}>
                                                        Projektas<br />finansuotas
                                                    </span>
                                                </div>
                                            )}
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
                                {project.credit_duration} d.
                            </td>

                            {/* Users/Investors */}
                            <td className={styles.cell}>
                                {project.investors}
                            </td>

                            {/* Date */}
                            <td className={styles.cell}>
                                {project.days_to_get_money ? `${project.days_to_get_money} men.` : '—'}
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
                                <div className={`${styles.buttonWrapper} ${buttonProps.className}`}>
                                    <Button
                                        size="small"
                                        disabled={buttonProps.disabled}
                                    >
                                        {buttonProps.text}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}
