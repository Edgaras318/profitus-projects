import React, { forwardRef } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import styles from './InputNumber.module.scss';

interface InputNumberProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
    value?: number | string;
    onChange?: (value: number | string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
    error?: boolean;
    min?: number;
    max?: number;
    step?: number;
    showControls?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
    ({
         value,
         onChange,
         placeholder,
         disabled = false,
         className = '',
         fullWidth = true,
         error = false,
         min,
         max,
         step = 1,
         showControls = false,
         icon,
         iconPosition = 'left',
         ...rest
     }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            // Allow empty string for clearing the input
            if (newValue === '') {
                onChange?.('');
                return;
            }
            // Allow typing negative numbers and decimals
            if (newValue === '-' || newValue.endsWith('.')) {
                onChange?.(newValue);
                return;
            }
            // Parse and validate the number
            const parsed = parseFloat(newValue);
            if (!isNaN(parsed)) {
                onChange?.(newValue);
            }
        };

        const handleIncrement = () => {
            if (disabled) return;
            const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value || 0;
            const newValue = currentValue + step;
            if (max !== undefined && newValue > max) return;
            onChange?.(newValue);
        };

        const handleDecrement = () => {
            if (disabled) return;
            const currentValue = typeof value === 'string' ? parseFloat(value) || 0 : value || 0;
            const newValue = currentValue - step;
            if (min !== undefined && newValue < min) return;
            onChange?.(newValue);
        };

        return (
            <div className={`${styles.inputWrapper} ${fullWidth ? styles.fullWidth : ''} ${className}`}>
                {icon && iconPosition === 'left' && (
                    <span className={`${styles.icon} ${styles.iconLeft}`}>{icon}</span>
                )}
                <input
                    ref={ref}
                    type="number"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    min={min}
                    max={max}
                    step={step}
                    className={`${styles.input} ${disabled ? styles.disabled : ''} ${error ? styles.error : ''} ${showControls ? styles.hasControls : ''} ${icon && iconPosition === 'left' ? styles.hasIconLeft : ''} ${icon && iconPosition === 'right' ? styles.hasIconRight : ''}`}
                    {...rest}
                />
                {icon && iconPosition === 'right' && !showControls && (
                    <span className={`${styles.icon} ${styles.iconRight}`}>{icon}</span>
                )}
                {showControls && (
                    <div className={styles.controls}>
                        <button
                            type="button"
                            onClick={handleIncrement}
                            disabled={disabled || (max !== undefined && Number(value) >= max)}
                            className={`${styles.controlButton} ${styles.increment}`}
                            tabIndex={-1}
                        >
                            <ChevronUp size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={disabled || (min !== undefined && Number(value) <= min)}
                            className={`${styles.controlButton} ${styles.decrement}`}
                            tabIndex={-1}
                        >
                            <ChevronDown size={14} />
                        </button>
                    </div>
                )}
            </div>
        );
    }
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
