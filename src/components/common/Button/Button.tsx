import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    color?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export default function Button({
                                   children,
                                   variant = 'primary',
                                   size = 'medium',
                                   onClick,
                                   disabled = false,
                                   className = '',
                                   color,
                                   icon,
                                   iconPosition = 'left'
                               }: ButtonProps) {
    const buttonStyle = color && variant === 'ghost' ? {
        '--custom-color': color,
        color: disabled ? '#B0B0B0' : color
    } as React.CSSProperties : {};

    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            style={buttonStyle}
        >
            {icon && iconPosition === 'left' && (
                <span className={styles.icon}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
                <span className={styles.icon}>{icon}</span>
            )}
        </button>
    );
}
