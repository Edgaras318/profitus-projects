import React from 'react';
import { ITEMS_PER_PAGE_OPTIONS } from '@/constants/projectFilters';
import styles from './LimitSelector.module.scss';

interface LimitSelectorProps {
    value: number;
    onChange: (limit: number) => void;
}

const LimitSelector: React.FC<LimitSelectorProps> = ({ value, onChange }) => {
    return (
        <div className={styles.limitSelector}>
            <label className={styles.limitLabel}>
                Elementų per puslapį:
                <select
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className={styles.limitSelect}
                >
                    {ITEMS_PER_PAGE_OPTIONS.map(n => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default LimitSelector;
