import { useState, useEffect } from 'react';
import type { FilterInput } from '@/types/project.api.types';
import type { TempFilters, TempFilterChangeHandler } from '@/types/projectFilters.types';
import {
    getEmptyTempFilters,
} from '@/types/projectFilters.types';
import {
    buildFiltersFromTemp,
    parseTempFiltersFromParams
} from '@/utils/filterHelpers';

interface UseFilterStateProps {
    initialFilters?: FilterInput[];
    onFiltersChange: (filters: FilterInput[]) => void;
    onFiltersReset: () => void;
}

export const useFilterState = ({
                                   initialFilters = [],
                                   onFiltersChange,
                                   onFiltersReset
                               }: UseFilterStateProps) => {
    const [tempFilters, setTempFilters] = useState<TempFilters>(() =>
        parseTempFiltersFromParams(initialFilters)
    );

    useEffect(() => {
        setTempFilters(parseTempFiltersFromParams(initialFilters));
    }, [initialFilters]);

    const handleTempFilterChange: TempFilterChangeHandler = (key, value) => {
        setTempFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleRatingChange = (rating: string, checked: boolean) => {
        setTempFilters(prev => ({
            ...prev,
            ratings: checked
                ? [...prev.ratings, rating]
                : prev.ratings.filter(r => r !== rating)
        }));
    };

    const handleCountryChange = (country: string, checked: boolean) => {
        setTempFilters(prev => ({
            ...prev,
            countries: checked
                ? [...prev.countries, country]
                : prev.countries.filter(c => c !== country)
        }));
    };

    const handleSaveFilters = () => {
        const newFilters = buildFiltersFromTemp(tempFilters);
        onFiltersChange(newFilters);
    };

    const handleClearFilters = () => {
        setTempFilters(getEmptyTempFilters());
        onFiltersReset();
    };

    return {
        tempFilters,
        handleTempFilterChange,
        handleRatingChange,
        handleCountryChange,
        handleSaveFilters,
        handleClearFilters
    };
};
