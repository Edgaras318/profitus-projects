import { useProjects } from '@/hooks/useProjects';
import { useFilterState } from '@/hooks/useFilterState';
import { useAccordionState } from '@/hooks/useAccordionState';
import { toggleSort } from '@/utils/queryHelpers';
import ProjectsTable from '@/components/ProjectsTable/ProjectsTable';
import ProjectsHeader from '@/components/ProjectsHeader/ProjectsHeader';
import ProjectFilters from '@/components/ProjectFilters/ProjectFilters';
import ViewControls from '@/components/ViewControls/ViewControls';
import styles from './ProjectsPage.module.scss';
import Pagination from "@/components/common/Pagination/Pagination.tsx";

export default function ProjectsPage() {
    const {
        data,
        meta,
        isLoading,
        error,
        params,
        setPage,
        setLimit,
        setSort,
        setFilters,
        resetFilters,
        refetch,
    } = useProjects({ limit: 10 });

    const {
        tempFilters,
        handleTempFilterChange,
        handleRatingChange,
        handleCountryChange,
        handleSaveFilters,
        handleClearFilters
    } = useFilterState({
        initialFilters: params.filters,
        onFiltersChange: setFilters,
        onFiltersReset: resetFilters
    });

    const {
        accordionActiveItems,
        handleAccordionChange,
        resetAccordionState
    } = useAccordionState(tempFilters);

    const handleSort = (column: "basic_interest" | "initial_rating" | "credit_duration") => {
        const newSort = toggleSort(params.sort, column);
        setSort(newSort);
    };

    const handleClearAllFilters = () => {
        handleClearFilters();
        resetAccordionState();
    };

    const handleViewChange = (view: 'list' | 'grid') => {
        console.log('View changed to:', view);
    };

    const handleRetry = () => {
        if (refetch) {
            refetch();
        } else {
            setPage(params.page || 1);
        }
    };

    return (
        <div className={styles.wrapper}>
            <ProjectsHeader>
                <ProjectFilters
                    tempFilters={tempFilters}
                    accordionActiveItems={accordionActiveItems}
                    onAccordionChange={handleAccordionChange}
                    onTempFilterChange={handleTempFilterChange}
                    onRatingChange={handleRatingChange}
                    onCountryChange={handleCountryChange}
                    onSaveFilters={handleSaveFilters}
                    onClearFilters={handleClearAllFilters}
                />
                <ViewControls
                    activeView="grid"
                    onViewChange={handleViewChange}
                />
            </ProjectsHeader>

            <main className={styles.main}>
                <ProjectsTable
                    projects={data || []}
                    onSort={handleSort}
                    currentSort={params.sort}
                    isLoading={isLoading}
                    error={error}
                    limit={params.limit}
                    onRetry={handleRetry}
                    onClearFilters={handleClearAllFilters}
                />
            </main>

            {meta && !isLoading && !error && data && data.length > 0 && (
                <Pagination
                    meta={meta}
                    onPageChange={setPage}
                    onLimitChange={setLimit}
                    limitOptions={[10, 20, 50, 100]}
                    maxPageButtons={7}
                />
            )}
        </div>
    );
}
