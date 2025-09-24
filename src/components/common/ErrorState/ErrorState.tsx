import React from 'react';
import { AlertCircle, WifiOff, ServerCrash, RefreshCw } from 'lucide-react';
import Button from '../Button/Button';
import styles from './ErrorState.module.scss';

interface ErrorStateProps {
    title?: string;
    description?: string;
    error?: string | Error;
    type?: 'general' | 'network' | 'server';
    onRetry?: () => void;
    showDetails?: boolean;
    className?: string;
}

export default function ErrorState({
                                       title,
                                       description,
                                       error,
                                       type = 'general',
                                       onRetry,
                                       showDetails = false,
                                       className = ''
                                   }: ErrorStateProps) {
    const [detailsExpanded, setDetailsExpanded] = React.useState(false);

    const getErrorInfo = () => {
        switch (type) {
            case 'network':
                return {
                    icon: <WifiOff size={64} strokeWidth={1.5} className={styles.icon} />,
                    title: title || 'Connection Error',
                    description: description || 'Unable to connect to the server. Please check your internet connection and try again.'
                };
            case 'server':
                return {
                    icon: <ServerCrash size={64} strokeWidth={1.5} className={styles.icon} />,
                    title: title || 'Server Error',
                    description: description || 'Something went wrong on our end. Please try again later.'
                };
            case 'general':
            default:
                return {
                    icon: <AlertCircle size={64} strokeWidth={1.5} className={styles.icon} />,
                    title: title || 'Something went wrong',
                    description: description || 'An unexpected error occurred. Please try again.'
                };
        }
    };

    const errorInfo = getErrorInfo();
    const errorMessage = error instanceof Error ? error.message : error;

    return (
        <div className={`${styles.errorState} ${className}`}>
            <div className={styles.content}>
                {errorInfo.icon}
                <h3 className={styles.title}>{errorInfo.title}</h3>
                <p className={styles.description}>{errorInfo.description}</p>

                {showDetails && errorMessage && (
                    <div className={styles.details}>
                        <button
                            className={styles.detailsToggle}
                            onClick={() => setDetailsExpanded(!detailsExpanded)}
                        >
                            {detailsExpanded ? 'Hide' : 'Show'} details
                        </button>
                        {detailsExpanded && (
                            <div className={styles.errorMessage}>
                                <code>{errorMessage}</code>
                            </div>
                        )}
                    </div>
                )}

                {onRetry && (
                    <div className={styles.action}>
                        <Button
                            variant="primary"
                            size="medium"
                            onClick={onRetry}
                            icon={<RefreshCw size={16} />}
                            iconPosition="left"
                        >
                            Try Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
