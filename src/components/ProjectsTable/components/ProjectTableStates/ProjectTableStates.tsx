import React from 'react';
import TableSkeleton from '@/components/common/TableSkeleton/TableSkeleton';
import EmptyState from '@/components/common/EmptyState/EmptyState';
import ErrorState from '@/components/common/ErrorState/ErrorState';
import type { ColumnType } from '@/components/common/TableSkeleton/TableSkeleton';

interface ProjectTableStatesProps {
    isLoading?: boolean;
    error?: Error | string | null;
    isEmpty?: boolean;
    limit?: number;
    onRetry?: () => void;
    onClearFilters?: () => void;
    children: React.ReactNode;
}

const PROJECTS_TABLE_COLUMN_TYPES: ColumnType[] = [
    'image',
    'text',
    'rating',
    'text',
    'text',
    'text',
    'text',
    'text',
    'text',
    'text',
    'progress',
    'text',
    'button'
];

export const ProjectTableStates: React.FC<ProjectTableStatesProps> = ({
                                                                          isLoading,
                                                                          error,
                                                                          isEmpty,
                                                                          limit = 10,
                                                                          onRetry,
                                                                          onClearFilters,
                                                                          children
                                                                      }) => {
    if (isLoading) {
        return (
            <TableSkeleton
                rows={limit}
                columns={13}
                columnTypes={PROJECTS_TABLE_COLUMN_TYPES}
            />
        );
    }

    if (error) {
        const errorMessage = typeof error === 'string' ? error : error.message ?? error.toString();
        const normalizedMessage = errorMessage.toLowerCase();
        const errorType = normalizedMessage.includes('network')
            ? 'network'
            : normalizedMessage.includes('server')
                ? 'server'
                : 'general';

        return (
            <ErrorState
                type={errorType}
                error={errorMessage}
                onRetry={onRetry}
                showDetails={import.meta.env.MODE === 'development'}
            />
        );
    }

    if (isEmpty) {
        return (
            <EmptyState
                title="No projects found"
                description="There are no projects matching your current filters. Try adjusting your search criteria."
                icon="search"
                action={onClearFilters ? {
                    label: 'Clear Filters',
                    onClick: onClearFilters
                } : undefined}
            />
        );
    }

    return <>{children}</>;
};

export default ProjectTableStates;
