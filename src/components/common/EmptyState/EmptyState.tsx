import React from 'react';
import { Inbox, Search, FileX } from 'lucide-react';
import Button from '../Button/Button';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: 'inbox' | 'search' | 'fileX' | React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export default function EmptyState({
                                       title = 'No projects found',
                                       description = 'There are no projects matching your criteria.',
                                       icon = 'inbox',
                                       action,
                                       className = ''
                                   }: EmptyStateProps) {
    const getIcon = () => {
        if (React.isValidElement(icon)) {
            return icon;
        }

        const iconProps = {
            size: 64,
            strokeWidth: 1.5,
            className: styles.icon
        };

        switch (icon) {
            case 'search':
                return <Search {...iconProps} />;
            case 'fileX':
                return <FileX {...iconProps} />;
            case 'inbox':
            default:
                return <Inbox {...iconProps} />;
        }
    };

    return (
        <div className={`${styles.emptyState} ${className}`}>
            <div className={styles.content}>
                {getIcon()}
                <h3 className={styles.title}>{title}</h3>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
                {action && (
                    <div className={styles.action}>
                        <Button
                            variant="primary"
                            size="medium"
                            onClick={action.onClick}
                        >
                            {action.label}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
