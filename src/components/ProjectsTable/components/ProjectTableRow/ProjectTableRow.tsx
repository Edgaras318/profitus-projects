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
    const progress = calculateProjectProgress(
        project.invested_amount,
        project.required_amount
    );

    // Fix: Convert null to undefined for max_bonus_interest
    const interestRange = formatInterestRate(
        project.basic_interest,
        project.max_bonus_interest ?? undefined
    );

    return (
        <tr className={styles.row}>
            {/* Project Image */}
            <td className={styles.cell}>
                <ProjectTableImage
                    imageUrl={project.image_url ?? undefined}  // Fix: Convert null to undefined
                    projectName={project.project_name}
                    securityMeasure={project.security_measures}
                    status={project.status}
                />
            </td>

            {/* Project Name */}
            <td className={styles.cell}>
                <div className={styles.projectTitle}>
                    {project.project_name}
                </div>
            </td>

            {/* Rating */}
            <td className={styles.cell}>
                <Rating rating={project.initial_rating} />
            </td>

            {/* Country */}
            <td className={styles.cell}>
                {project.country && (
                    <CountryFlag countryCode={project.country} />
                )}
            </td>

            {/* LTV */}
            <td className={styles.cell}>
                <LTVCell
                    loanRatioExternal={project.loan_ratio_external}
                    loanRatioMax={project.loan_ratio_max}
                />
            </td>

            {/* Invested Amount */}
            <td className={styles.cell}>
                {formatProjectCurrency(project.invested_amount)}
            </td>

            {/* Required Amount */}
            <td className={styles.cell}>
                {formatProjectCurrency(project.required_amount)}
            </td>

            {/* Time */}
            <td className={styles.cell}>
                {project.status === 'open_for_investments'
                    ? formatDuration(Number(project.days_to_get_money))  // Fix: Convert string to number
                    : project.funded_duration}
            </td>

            {/* Users/Investors */}
            <td className={styles.cell}>
                {project.investors}
            </td>

            {/* Date */}
            <td className={styles.cell}>
                {formatMonths(Number(project.credit_duration))}  {/* Fix: Convert string to number */}
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
                    status={project.status}
                    projectId={project.pid}
                    onAction={onProjectAction}
                />
            </td>
        </tr>
    );
};

export default ProjectTableRow;
