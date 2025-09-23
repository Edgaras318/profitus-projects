import React from "react";
import styles from "./Checkbox.module.scss";

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: React.ReactNode;
};

export default function Checkbox({ label, checked, onChange, icon }: CheckboxProps) {
    return (
        <label className={styles.checkbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className={`${styles.box} ${checked ? styles.checked : ""}`}>
        {checked && <svg className={styles.tick} viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" />
        </svg>}
      </span>
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{label}</span>
        </label>
    );
}
