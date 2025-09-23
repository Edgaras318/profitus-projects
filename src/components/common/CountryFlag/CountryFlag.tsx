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

    return (
        <span className={`${styles.flag} ${styles[size]} ${className}`}>
            <span className={styles.emoji}>
                {getFlagEmoji(countryCode)}
            </span>
        </span>
    );
}
