import styles from './CountryFlag.module.scss';

interface CountryFlagProps {
    countryCode: string;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function CountryFlag({
                                        countryCode,
                                        size = 'small',
                                        className = ''
                                    }: CountryFlagProps) {
    // Map country codes to flag representations
    const getFlagEmoji = (code: string): string => {
        const flagMap: Record<string, string> = {
            'lt': '🇱🇹', // Lithuania
            'lv': '🇱🇻', // Latvia
            'ee': '🇪🇪', // Estonia
            'es': '🇪🇸', // Spain
            'de': '🇩🇪', // Germany
            'fr': '🇫🇷', // France
            'gb': '🇬🇧', // UK
            'us': '🇺🇸', // USA
        };

        return flagMap[code.toLowerCase()] || '🏳️';
    };

    // For better browser support, we could also use CSS background images
    // with actual flag images, but emojis work well for now
    const getFlagColors = (code: string) => {
        const colorMap: Record<string, { primary: string; secondary: string; tertiary?: string }> = {
            'lt': { primary: '#006A44', secondary: '#FDB900', tertiary: '#C1272D' },
            'lv': { primary: '#A4343A', secondary: '#FFFFFF' },
            'ee': { primary: '#0072CE', secondary: '#000000', tertiary: '#FFFFFF' },
            'es': { primary: '#C60B1E', secondary: '#FFC400' },
        };

        return colorMap[code.toLowerCase()] || { primary: '#666', secondary: '#999' };
    };

    return (
        <span className={`${styles.flag} ${styles[size]} ${className}`}>
            <span className={styles.emoji}>
                {getFlagEmoji(countryCode)}
            </span>
        </span>
    );
}
