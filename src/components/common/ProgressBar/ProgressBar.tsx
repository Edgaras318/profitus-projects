import React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
    percentage: number;
    showLabel?: boolean;
    variant?: 'linear' | 'circular';
    size?: number;
    className?: string;
}

export default function ProgressBar({
                                        percentage,
                                        showLabel = true,
                                        variant = 'circular',
                                        size = 40,
                                        className = ''
                                    }: ProgressBarProps) {
    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    if (variant === 'circular') {
        const radius = (size - 4) / 2;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

        return (
            <div className={`${styles.circularContainer} ${className}`}>
                <svg
                    width={size}
                    height={size}
                    className={styles.circularProgress}
                >
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        className={styles.circularTrack}
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        className={styles.circularBar}
                        style={{
                            strokeDasharray,
                            strokeDashoffset,
                            transform: 'rotate(-90deg)',
                            transformOrigin: `${size / 2}px ${size / 2}px`
                        }}
                    />
                </svg>
                {showLabel && (
                    <span className={styles.circularLabel}>
                        {clampedPercentage.toFixed(1)}%
                    </span>
                )}
            </div>
        );
    }

    // Linear variant (fallback)
    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.progressBar}>
                <div
                    className={styles.progress}
                    style={{ width: `${clampedPercentage}%` }}
                />
            </div>
            {showLabel && (
                <span className={styles.label}>
                    {clampedPercentage.toFixed(1)}%
                </span>
            )}
        </div>
    );
}
