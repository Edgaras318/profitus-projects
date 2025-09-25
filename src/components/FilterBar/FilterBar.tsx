import React from "react";
import { Filter as FilterIcon, ChevronUp } from "lucide-react";
import styles from "./FilterBar.module.scss";

export type FilterBarProps = {
    label?: string;
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
    className?: string;
    toggleButtonRef?: React.Ref<HTMLButtonElement>;
};

export default function FilterBar({
                                      label = "Filtruoti",
                                      isOpen,
                                      onToggle,
                                      children,
                                      className,
                                      toggleButtonRef,
                                  }: FilterBarProps) {
    return (
        <div className={`${styles.wrapper} ${className || ""}`}>
            <button
                type="button"
                aria-expanded={isOpen}
                onClick={onToggle}
                className={styles.toggleButton}
                ref={toggleButtonRef}
            >
                <span className={styles.labelWrapper}>
                    <FilterIcon className={styles.icon} />
                    <span className={styles.label}>{label}</span>
                </span>
                <ChevronUp
                    className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
                />
            </button>

            {isOpen && (
                <div className={styles.content}>
                    {children ?? <PlaceholderFilters />}
                </div>
            )}
        </div>
    );
}

function PlaceholderFilters() {
    return (
        <div className={styles.placeholderGrid}>
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={styles.placeholderItem}>
                    <div className={styles.placeholderLabel} />
                    <div className={styles.placeholderInput} />
                </div>
            ))}
            <div className={styles.actions}>
                <button className={styles.resetButton}>Išvalyti</button>
                <button className={styles.applyButton}>Taikyti</button>
            </div>
        </div>
    );
}
