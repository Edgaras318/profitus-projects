import React, { useCallback } from 'react';
import type { ProjectCardResponse } from '@/types/project.types';
import type { SortInput, SortId } from '@/types/project.api.types';
import { ProjectTableHeader } from './components/ProjectTableHeader/ProjectTableHeader';
import { ProjectTableRow } from './components/ProjectTableRow/ProjectTableRow';
import { ProjectTableStates } from './components/ProjectTableStates/ProjectTableStates';
import styles from './ProjectsTable.module.scss';

interface ProjectsTableProps {
    projects: ProjectCardResponse[];
    onSort?: (column: SortId) => void;
    currentSort?: SortInput[];
    isLoading?: boolean;
    error?: Error | string | null;
    limit?: number;
    onRetry?: () => void;
    onClearFilters?: () => void;
    onProjectAction?: (projectId: string) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
                                                                projects,
                                                                onSort,
                                                                currentSort = [],
                                                                isLoading = false,
                                                                error = null,
                                                                limit = 10,
                                                                onRetry,
                                                                onClearFilters,
                                                                onProjectAction
                                                            }) => {
    const handleProjectAction = useCallback((projectId: string) => {
        if (onProjectAction) {
            onProjectAction(projectId);
        }
    }, [onProjectAction]);

    return (
        <ProjectTableStates
            isLoading={isLoading}
            error={error}
            isEmpty={!projects || projects.length === 0}
            limit={limit}
            onRetry={onRetry}
            onClearFilters={onClearFilters}
        >
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <ProjectTableHeader
                        onSort={onSort}
                        currentSort={currentSort}
                    />
                    <tbody>
                    {projects.map((project) => (
                        <ProjectTableRow
                            key={project.pid}
                            project={project}
                            onProjectAction={handleProjectAction}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </ProjectTableStates>
    );
};

export default ProjectsTable;
