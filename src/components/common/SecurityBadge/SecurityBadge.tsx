
import React from 'react';
import type { SecurityMeasuresEnum } from '@/types/project.types';
import styles from './SecurityBadge.module.scss';

interface SecurityBadgeProps {
    securityMeasure: SecurityMeasuresEnum;
    className?: string;
}

export default function SecurityBadge({
                                          securityMeasure,
                                          className = ''
                                      }: SecurityBadgeProps) {
    const getBadgeContent = (measure: SecurityMeasuresEnum): string => {
        switch (measure) {
            case 'first_rank_mortgage':
                return '1st';
            case 'second_rank_mortgage':
                return '2nd';
            default:
                return '?';
        }
    };

    const getBadgeColor = (measure: SecurityMeasuresEnum): string => {
        switch (measure) {
            case 'first_rank_mortgage':
                return 'first';
            case 'second_rank_mortgage':
                return 'second';
            default:
                return 'default';
        }
    };

    const content = getBadgeContent(securityMeasure);
    const colorClass = getBadgeColor(securityMeasure);

    return (
        <span className={`${styles.badge} ${styles[colorClass]} ${className}`}>
            {content}
        </span>
    );
}
