export interface TempFilters {
    countries: string[];
    ratings: string[];
    purpose: string;
    creditDurationMin: string;
    creditDurationMax: string;
    campaignId: string;
    privateId: string;
}

export const getEmptyTempFilters = (): TempFilters => ({
    countries: [],
    ratings: [],
    purpose: '',
    creditDurationMin: '',
    creditDurationMax: '',
    campaignId: '',
    privateId: ''
});
