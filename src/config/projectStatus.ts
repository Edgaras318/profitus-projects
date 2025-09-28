import type { ProjectStatusEnum } from '@/types/project.types.ts';

interface StatusConfig {
    text: string;
    disabled: boolean;
    className: string;
    showOverlay?: boolean;
    overlayText?: string;
}

export const PROJECT_STATUS_CONFIG: Record<ProjectStatusEnum, StatusConfig> = {
    funded: {
        text: 'Projektas finansuotas',
        disabled: true,
        className: 'fundedButton',
        showOverlay: true,
        overlayText: 'Projektas\nfinansuotas'
    },
    coming_soon: {
        text: 'Netrukus',
        disabled: true,
        className: 'comingSoonButton'
    },
    not_funded: {
        text: 'Nefinansuotas',
        disabled: true,
        className: 'notFundedButton'
    },
    finished: {
        text: 'Baigtas',
        disabled: true,
        className: 'finishedButton'
    },
    confirmed: {
        text: 'Patvirtintas',
        disabled: true,
        className: 'confirmedButton'
    },
    open_for_investments: {
        text: 'Investuokite',
        disabled: false,
        className: 'defaultButton'
    }
} as const;
