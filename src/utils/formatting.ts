export const formatProjectCurrency = (amount: number): string => {
    return new Intl.NumberFormat('lt-LT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('EUR', '€');
};

export const calculateProjectProgress = (
    invested: number,
    required: number
): number => {
    if (required <= 0) {
        return invested > 0 ? 100 : 0;
    }

    const percentage = (invested / required) * 100;
    return Math.min(100, Math.max(0, Number.isFinite(percentage) ? percentage : 0));
};

const toNumberOrNull = (value?: number | string | null): number | null => {
    if (value === undefined || value === null) {
        return null;
    }

    const parsed = typeof value === 'string' ? Number(value) : value;
    return Number.isFinite(parsed) ? parsed : null;
};

export const formatInterestRate = (
    basicInterest?: number | null,
    maxBonusInterest?: number | null
): string => {
    const normalizedBasic = toNumberOrNull(basicInterest);
    if (normalizedBasic === null) {
        return '—';
    }

    const normalizedBonus = toNumberOrNull(maxBonusInterest);

    if (normalizedBonus === null || normalizedBonus <= 0) {
        return `${normalizedBasic.toFixed(1)}%`;
    }

    return `${normalizedBasic.toFixed(1)}-${(normalizedBasic + normalizedBonus).toFixed(1)}%`;
};

export const formatDuration = (days?: number | string | null): string => {
    const normalizedDays = toNumberOrNull(days);

    if (normalizedDays === null) {
        return '—';
    }

    return `${Math.max(0, Math.round(normalizedDays))} d.`;
};

export const formatMonths = (months?: number | string | null): string => {
    const normalizedMonths = toNumberOrNull(months);

    if (normalizedMonths === null) {
        return '—';
    }

    return `${Math.max(0, Math.round(normalizedMonths))} men.`;
};
