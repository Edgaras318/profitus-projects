import React from 'react';
import styles from './Rating.module.scss';

interface RatingProps {
    rating: string;
    className?: string;
}

export default function Rating({ rating, className = '' }: RatingProps) {
    // Determine color based on rating
    const getRatingColor = (rating: string): string => {
        const normalizedRating = rating.toUpperCase();

        if (normalizedRating.includes('A')) {
            return 'excellent';
        } else if (normalizedRating.includes('B')) {
            return 'good';
        } else if (normalizedRating.includes('C')) {
            return 'fair';
        } else {
            return 'poor';
        }
    };

    const colorClass = getRatingColor(rating);

    return (
        <span className={`${styles.rating} ${styles[colorClass]} ${className}`}>
            {rating}
        </span>
    );
}
