export type SortId = "basic_interest" | "initial_rating" | "credit_duration";

export interface SortInput {
    id: SortId;
    desc: boolean;
}

export type FilterId =
    | "country"
    | "initial_rating"
    | "purpose"
    | "credit_duration"
    | "campaign_id"
    | "private_id";

export type FilterValue =
    | string
    | number
    | number[]
    | { min?: number; max?: number };

export interface FilterInput {
    id: FilterId;
    value: FilterValue;
}

export interface QueryParams {
    page?: number;
    limit?: number;
    search?: string;
    sort?: SortInput[];
    filters?: FilterInput[];
}
