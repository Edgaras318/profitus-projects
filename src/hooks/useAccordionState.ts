import { useState, useEffect } from 'react';
import { FILTER_ACCORDION_STORAGE_KEY } from '@/constants/projectFilters';
import { getActiveAccordionItems } from '@/utils/filterHelpers';
import type { TempFilters } from '@/types/projectFilters.types';

const isBrowser = typeof window !== 'undefined';

const readStoredAccordionState = (): number[] | null => {
    if (!isBrowser) {
        return null;
    }

    const savedState = window.localStorage.getItem(FILTER_ACCORDION_STORAGE_KEY);
    if (!savedState) {
        return null;
    }

    try {
        return JSON.parse(savedState);
    } catch {
        window.localStorage.removeItem(FILTER_ACCORDION_STORAGE_KEY);
        return null;
    }
};

const storeAccordionState = (items: number[]) => {
    if (isBrowser) {
        window.localStorage.setItem(
            FILTER_ACCORDION_STORAGE_KEY,
            JSON.stringify(items)
        );
    }
};

const clearStoredAccordionState = () => {
    if (isBrowser) {
        window.localStorage.removeItem(FILTER_ACCORDION_STORAGE_KEY);
    }
};

export const useAccordionState = (tempFilters: TempFilters) => {
    const [userInteracted, setUserInteracted] = useState<boolean>(() => {
        return readStoredAccordionState() !== null;
    });

    const [accordionActiveItems, setAccordionActiveItems] = useState<number[]>(() => {
        return readStoredAccordionState() ?? [];
    });

    useEffect(() => {
        if (!userInteracted) {
            const itemsToOpen = getActiveAccordionItems(tempFilters);
            setAccordionActiveItems(itemsToOpen);
        }
    }, [tempFilters, userInteracted]);

    const handleAccordionChange = (items: number[]) => {
        setAccordionActiveItems(items);
        setUserInteracted(true);
        storeAccordionState(items);
    };

    const resetAccordionState = () => {
        setUserInteracted(false);
        clearStoredAccordionState();
        setAccordionActiveItems([0]);
    };

    return {
        accordionActiveItems,
        handleAccordionChange,
        resetAccordionState
    };
};
