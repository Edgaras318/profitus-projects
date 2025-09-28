export const formatProjectCurrency = (amount: number): string => {
    return new Intl.NumberFormat('lt-LT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount).replace('EUR', '€');
};

export const calculateProjectProgress = (
    invested: number,
    required: number
): number => {
    if (required <= 0) return invested > 0 ? 100 : 0;
    const percentage = (invested / required) * 100;
    return Math.min(100, Math.max(0, Number.isFinite(percentage) ? percentage : 0));
};

export const formatInterestRate = (
    basicInterest: number,
    maxBonusInterest?: number
): string => {
    return maxBonusInterest
        ? `${basicInterest.toFixed(1)}-${(basicInterest + maxBonusInterest).toFixed(1)}%`
        : `${basicInterest.toFixed(1)}%`;
};

export const formatDuration = (days?: number | null): string => {
    if (days !== undefined && days !== null && Number.isFinite(days)) {
        return `${days} d.`;
    }

    return '—';
};

export const formatMonths = (months: number): string => {
    return `${months} men.`;
};
