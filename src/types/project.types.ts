export const ProjectStatusEnum = {
    COMING_SOON: 'coming_soon',
    OPEN_FOR_INVESTMENTS: 'open_for_investments',
    FUNDED: 'funded',
    NOT_FUNDED: 'not_funded',
    CONFIRMED: 'confirmed',
    FINISHED: 'finished',
} as const;
export type ProjectStatusEnum = (typeof ProjectStatusEnum)[keyof typeof ProjectStatusEnum];

export const LoanRatioEnum = {
    LTV: 'LTV',
    LTC: 'LTC',
} as const;
export type LoanRatioEnum = (typeof LoanRatioEnum)[keyof typeof LoanRatioEnum];

export const SecurityMeasuresEnum = {
    FIRST_RANK_MORTGAGE: 'first_rank_mortgage',
    SECOND_RANK_MORTGAGE: 'second_rank_mortgage',
} as const;
export type SecurityMeasuresEnum = (typeof SecurityMeasuresEnum)[keyof typeof SecurityMeasuresEnum];

export interface ProjectCardResponse {
    status: ProjectStatusEnum;
    basic_interest: number;
    pid: string;
    investment_purpose: string | null;
    max_bonus_interest: number | null;
    initial_rating: string;
    loan_ratio: LoanRatioEnum;
    loan_ratio_external: number;
    loan_ratio_max: number;
    image_url: string | null;
    project_name: string;
    invested_amount: number;
    required_amount: number;
    days_to_get_money: string;
    funded_duration: string;
    investors: number;
    credit_duration: string;
    preview_url: string;
    country?: string;
    security_measures: SecurityMeasuresEnum;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface ProjectApiResponse {
    data: ProjectCardResponse[];
    links: PaginationLink[];
    meta: PaginationMeta;
}
