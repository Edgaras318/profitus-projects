import React, { forwardRef } from 'react';
import styles from './InputText.module.scss';

interface InputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    error?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
    ({
         value,
         onChange,
         placeholder,
         disabled = false,
         className = '',
         fullWidth = true,
         error = false,
         icon,
         iconPosition = 'left',
         ...rest
     }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value);
        };

        return (
            <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
        {icon && iconPosition === 'left' && (
            <span className={`${styles.icon} ${styles.iconLeft}`}>{icon}</span>
        )}
        <input
            ref={ref}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''} ${icon && iconPosition === 'left' ? styles.hasIconLeft : ''} ${icon && iconPosition === 'right' ? styles.hasIconRight : ''}`}
        {...rest}
        />
        {icon && iconPosition === 'right' && (
            <span className={`${styles.icon} ${styles.iconRight}`}>{icon}</span>
        )}
        </div>
    );
    }
);

InputText.displayName = 'InputText';

export default InputText;
