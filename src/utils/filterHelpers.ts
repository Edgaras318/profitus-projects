import type { FilterInput } from '@/types/project.api.types';
import type { TempFilters } from '@/types/projectFilters.types';

export const buildFiltersFromTemp = (tempFilters: TempFilters): FilterInput[] => {
    const filters: FilterInput[] = [];

    if (tempFilters.countries.length > 0) {
        filters.push({ id: 'country', value: tempFilters.countries });
    }

    if (tempFilters.ratings.length > 0) {
        filters.push({ id: 'initial_rating', value: tempFilters.ratings });
    }

    if (tempFilters.purpose) {
        filters.push({ id: 'purpose', value: tempFilters.purpose });
    }

    if (tempFilters.creditDurationMin || tempFilters.creditDurationMax) {
        filters.push({
            id: 'credit_duration',
            value: {
                min: tempFilters.creditDurationMin ? parseInt(tempFilters.creditDurationMin) : undefined,
                max: tempFilters.creditDurationMax ? parseInt(tempFilters.creditDurationMax) : undefined
            }
        });
    }

    if (tempFilters.campaignId) {
        filters.push({ id: 'campaign_id', value: tempFilters.campaignId });
    }

    if (tempFilters.privateId) {
        filters.push({ id: 'private_id', value: tempFilters.privateId });
    }

    return filters;
};

export const parseTempFiltersFromParams = (filters: FilterInput[] = []): TempFilters => {
    const tempFilters: TempFilters = {
        countries: [],
        ratings: [],
        purpose: '',
        creditDurationMin: '',
        creditDurationMax: '',
        campaignId: '',
        privateId: ''
    };

    filters.forEach((filter) => {
        switch (filter.id) {
            case 'country':
                tempFilters.countries = filter.value as string[];
                break;
            case 'initial_rating':
                tempFilters.ratings = filter.value as string[];
                break;
            case 'purpose':
                tempFilters.purpose = filter.value as string;
                break;
            case 'credit_duration': {
                const duration = filter.value as { min?: number; max?: number };
                tempFilters.creditDurationMin = duration.min?.toString() || '';
                tempFilters.creditDurationMax = duration.max?.toString() || '';
                break;
            }
            case 'campaign_id':
                tempFilters.campaignId = filter.value as string;
                break;
            case 'private_id':
                tempFilters.privateId = filter.value as string;
                break;
        }
    });

    return tempFilters;
};

export const getActiveAccordionItems = (tempFilters: TempFilters): number[] => {
    const itemsToOpen: number[] = [];

    if (tempFilters.countries.length > 0) itemsToOpen.push(0);
    if (tempFilters.ratings.length > 0) itemsToOpen.push(1);
    if (tempFilters.purpose) itemsToOpen.push(2);
    if (tempFilters.creditDurationMin || tempFilters.creditDurationMax) itemsToOpen.push(3);
    if (tempFilters.campaignId) itemsToOpen.push(4);
    if (tempFilters.privateId) itemsToOpen.push(5);

    return itemsToOpen.length > 0 ? itemsToOpen : [0];
};
