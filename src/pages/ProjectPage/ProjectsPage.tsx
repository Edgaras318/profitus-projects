import { useProjects } from '@/hooks/useProjects';
import { useFilterState } from '@/hooks/useFilterState';
import { useAccordionState } from '@/hooks/useAccordionState';
import { toggleSort } from '@/utils/queryHelpers';
import ProjectsTable from '@/components/ProjectsTable/ProjectsTable';
import ProjectsHeader from '@/components/ProjectsHeader/ProjectsHeader';
import ProjectFilters from '@/components/ProjectFilters/ProjectFilters';
import ViewControls from '@/components/ViewControls/ViewControls';
import Pagination from '@/components/Pagination/Pagination';
import LimitSelector from '@/components/LimitSelector/LimitSelector';
import styles from './ProjectsPage.module.scss';

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

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects: {error}</p>;
    if (!data || data.length === 0) return <p>No projects found</p>;

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
                    projects={data}
                    onSort={handleSort}
                    currentSort={params.sort}
                />
            </main>

            {meta && (
                <>
                    <Pagination
                        currentPage={meta.current_page}
                        lastPage={meta.last_page}
                        onPageChange={setPage}
                    />
                    <LimitSelector
                        value={params.limit}
                        onChange={setLimit}
                    />
                </>
            )}
        </div>
    );
}
