import { useState, useEffect } from 'react';
import { FILTER_ACCORDION_STORAGE_KEY } from '@/constants/projectFilters';
import { getActiveAccordionItems } from '@/utils/filterHelpers';
import type { TempFilters } from '@/types/projectFilters.types';

export const useAccordionState = (tempFilters: TempFilters) => {
    const [userInteracted, setUserInteracted] = useState<boolean>(() => {
        const savedState = localStorage.getItem(FILTER_ACCORDION_STORAGE_KEY);
        return savedState !== null;
    });

    const [accordionActiveItems, setAccordionActiveItems] = useState<number[]>(() => {
        const savedState = localStorage.getItem(FILTER_ACCORDION_STORAGE_KEY);
        if (savedState) {
            try {
                return JSON.parse(savedState);
            } catch (e) {
                localStorage.removeItem(FILTER_ACCORDION_STORAGE_KEY);
            }
        }
        return [];
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
        localStorage.setItem(FILTER_ACCORDION_STORAGE_KEY, JSON.stringify(items));
    };

    const resetAccordionState = () => {
        setUserInteracted(false);
        localStorage.removeItem(FILTER_ACCORDION_STORAGE_KEY);
        setAccordionActiveItems([0]);
    };

    return {
        accordionActiveItems,
        handleAccordionChange,
        resetAccordionState
    };
};
