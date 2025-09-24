export interface TempFilters {
    countries: string[];
    ratings: string[];
    purpose: string;
    creditDurationMin: string;
    creditDurationMax: string;
    campaignId: string;
    privateId: string;
}

export type TempFilterChangeHandler = <K extends keyof TempFilters>(
    key: K,
    value: TempFilters[K]
) => void;

export const getEmptyTempFilters = (): TempFilters => ({
    countries: [],
    ratings: [],
    purpose: '',
    creditDurationMin: '',
    creditDurationMax: '',
    campaignId: '',
    privateId: ''
});
