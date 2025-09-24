import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
}

interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
                                           options,
                                           value,
                                           onChange,
                                           placeholder = 'Pasirinkite',
                                           disabled = false,
                                           className = '',
                                           fullWidth = true
                                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    // Get selected option
    const selectedOption = options.find(opt => opt.value === value);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div
            className={`${styles.select} ${fullWidth ? styles.fullWidth : ''} ${className}`}
            ref={selectRef}
        >
            <button
                type="button"
                className={`${styles.trigger} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
                onClick={handleToggle}
                disabled={disabled}
            >
        <span className={styles.value}>
          {selectedOption?.icon && (
              <span className={styles.icon}>{selectedOption.icon}</span>
          )}
            <span className={styles.label}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </span>
                <ChevronDown
                    className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
                    size={16}
                />
            </button>

            {isOpen && (
                <div className={styles.dropdown}>
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`${styles.option} ${option.value === value ? styles.selected : ''}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.icon && (
                                <span className={styles.optionIcon}>{option.icon}</span>
                            )}
                            <span className={styles.optionLabel}>{option.label}</span>
                            {option.value === value && (
                                <Check className={styles.checkIcon} size={16} />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
