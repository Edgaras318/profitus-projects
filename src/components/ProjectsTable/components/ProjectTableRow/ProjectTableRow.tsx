import React from 'react';
import Rating from '@/components/common/Rating/Rating';
import CountryFlag from '@/components/common/CountryFlag/CountryFlag';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import type { ProjectCardResponse } from '@/types/project.types';
import { ProjectTableImage } from '../ProjectTableImage/ProjectTableImage';
import { LTVCell } from '../ProjectTableCell/LTVCell';
import { ActionButtonCell } from '../ProjectTableCell/ActionButtonCell';
import {
    formatProjectCurrency,
    calculateProjectProgress,
    formatInterestRate,
    formatDuration,
    formatMonths
} from '@/utils/formatting';
import styles from './ProjectTableRow.module.scss';

interface ProjectTableRowProps {
    project: ProjectCardResponse;
    onProjectAction?: (projectId: string) => void;
}

export const ProjectTableRow: React.FC<ProjectTableRowProps> = ({
                                                                    project,
                                                                    onProjectAction
                                                                }) => {
    const {
        pid,
        project_name,
        image_url,
        security_measures,
        status,
        invested_amount,
        required_amount,
        basic_interest,
        max_bonus_interest,
        initial_rating,
        country,
        loan_ratio_external,
        loan_ratio_max,
        days_to_get_money,
        funded_duration,
        investors,
        credit_duration
    } = project;

    const progress = calculateProjectProgress(invested_amount, required_amount);
    const interestRange = formatInterestRate(basic_interest, max_bonus_interest);
    const creditDurationDisplay = formatMonths(credit_duration);
    const timeDisplay = status === 'open_for_investments'
        ? formatDuration(days_to_get_money)
        : funded_duration || '—';

    return (
        <tr className={styles.row}>
            {/* Project Image */}
            <td className={styles.cell}>
                <ProjectTableImage
                    imageUrl={image_url ?? undefined}
                    projectName={project_name}
                    securityMeasure={security_measures}
                    status={status}
                />
            </td>

            {/* Project Name */}
            <td className={styles.cell}>
                <div className={styles.projectTitle}>
                    {project_name}
                </div>
            </td>

            {/* Rating */}
            <td className={styles.cell}>
                <Rating rating={initial_rating} />
            </td>

            {/* Country */}
            <td className={styles.cell}>
                {country && (
                    <CountryFlag countryCode={country} />
                )}
            </td>

            {/* LTV */}
            <td className={styles.cell}>
                <LTVCell
                    loanRatioExternal={loan_ratio_external}
                    loanRatioMax={loan_ratio_max}
                />
            </td>

            {/* Invested Amount */}
            <td className={styles.cell}>
                {formatProjectCurrency(invested_amount)}
            </td>

            {/* Required Amount */}
            <td className={styles.cell}>
                {formatProjectCurrency(required_amount)}
            </td>

            {/* Time */}
            <td className={styles.cell}>
                {timeDisplay}
            </td>

            {/* Users/Investors */}
            <td className={styles.cell}>
                {investors}
            </td>

            {/* Date */}
            <td className={styles.cell}>
                {creditDurationDisplay}
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
                <ActionButtonCell
                    status={status}
                    projectId={pid}
                    onAction={onProjectAction}
                />
            </td>
        </tr>
    );
};

export default ProjectTableRow;
