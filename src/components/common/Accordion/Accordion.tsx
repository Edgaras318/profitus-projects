import React, { useState, createContext, useContext } from 'react';
import { Plus, Minus, ChevronUp } from 'lucide-react';
import styles from './Accordion.module.scss';

// Types
export type AccordionContextType = {
    activeItems: number[];
    toggleItem: (index: number) => void;
    multiple: boolean;
};

export type AccordionProps = {
    children: React.ReactNode;
    multiple?: boolean;
    defaultActiveIndex?: number | number[] | null;
    className?: string;
};

export type AccordionItemProps = {
    children: React.ReactNode;
    index: number;
    className?: string;
};

export type AccordionHeaderProps = {
    children: React.ReactNode;
    index: number;
    className?: string;
    icon?: 'plus-minus' | 'chevron' | React.ReactElement;
};

export type AccordionContentProps = {
    children: React.ReactNode;
    index: number;
    className?: string;
};

// Create context with default values
const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Main Accordion Component
export function Accordion({
                              children,
                              multiple = false,
                              defaultActiveIndex = null,
                              className = ""
                          }: AccordionProps) {
    const [activeItems, setActiveItems] = useState<number[]>(() => {
        if (defaultActiveIndex === null) {
            return [];
        }
        if (Array.isArray(defaultActiveIndex)) {
            return defaultActiveIndex;
        }
        return [defaultActiveIndex];
    });

    const toggleItem = (index: number) => {
        setActiveItems((prev) => {
            if (multiple) {
                if (prev.includes(index)) {
                    return prev.filter(i => i !== index);
                }
                return [...prev, index];
            } else {
                if (prev.includes(index)) {
                    return [];
                }
                return [index];
            }
        });
    };

    const contextValue: AccordionContextType = {
        activeItems,
        toggleItem,
        multiple
    };

    return (
        <AccordionContext.Provider value={contextValue}>
            <div className={`${styles.wrapper} ${className}`}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

// Accordion Item Component
export function AccordionItem({
                                  children,
                                  index,
                                  className = ""
                              }: AccordionItemProps) {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('AccordionItem must be used within an Accordion');
    }

    const { activeItems } = context;
    const isActive = activeItems.includes(index);

    return (
        <div className={`${styles.item} ${isActive ? styles.active : ''} ${className}`}>
            {children}
        </div>
    );
}

// Accordion Header Component
export function AccordionHeader({
                                    children,
                                    index,
                                    className = "",
                                    icon = "plus-minus"
                                }: AccordionHeaderProps) {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('AccordionHeader must be used within an Accordion');
    }

    const { activeItems, toggleItem } = context;
    const isActive = activeItems.includes(index);

    const renderIcon = () => {
        if (icon === "plus-minus") {
            return isActive ? <Minus size={20} /> : <Plus size={20} />;
        } else if (icon === "chevron") {
            return (
                <ChevronUp
                    size={20}
                    className={`${styles.chevronIcon} ${isActive ? styles.open : ''}`}
                />
            );
        } else if (React.isValidElement(icon)) {
            return icon;
        }
        return null;
    };

    return (
        <button
            type="button"
            className={`${styles.header} ${className}`}
            onClick={() => toggleItem(index)}
            aria-expanded={isActive}
        >
            <span className={styles.title}>{children}</span>
            <span className={styles.icon}>{renderIcon()}</span>
        </button>
    );
}

// Accordion Content Component
export function AccordionContent({
                                     children,
                                     index,
                                     className = ""
                                 }: AccordionContentProps) {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('AccordionContent must be used within an Accordion');
    }

    const { activeItems } = context;
    const isActive = activeItems.includes(index);

    if (!isActive) return null;

    return (
        <div className={`${styles.content} ${className}`}>
            <div className={styles.contentInner}>
                {children}
            </div>
        </div>
    );
}

// Export hook to use accordion context
export function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('useAccordion must be used within an Accordion component');
    }
    return context;
}
