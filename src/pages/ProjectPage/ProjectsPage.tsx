import { useProjects } from "@/hooks/useProjects.ts";
import { toggleSort } from "@/utils/queryHelpers.ts";
import type { ProjectCardResponse } from "@/types/project.types.ts";
import styles from './ProjectsPage.module.scss'
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

    const handleSort = (column: "basic_interest" | "initial_rating" | "credit_duration") => {
        const newSort = toggleSort(params.sort, column);
        setSort(newSort);
    };


    const handleFilterCountry = (country: string) => {
        if (!country) {
            setFilters(params.filters.filter((f) => f.id !== "country"));
        } else {
            const others = params.filters.filter((f) => f.id !== "country");
            setFilters([...others, { id: "country", value: country }]);
        }
    };

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects: {error}</p>;
    if (!data || data.length === 0) return <p>No projects found</p>;

    return (
        <div className={styles.wrapper}>
            <h2>Projects</h2>

            {/* Filter (country) */}
            <label>
                Country:
                <select
                    onChange={(e) => handleFilterCountry(e.target.value)}
                    value={
                        String(params.filters.find(f => f.id === "country")?.value ?? "")
                    }
                >
                    <option value="">All</option>
                    <option value="lt">LT</option>
                    <option value="ee">EE</option>
                    <option value="es">ES</option>
                    <option value="lv">LV</option>
                </select>
            </label>

            <button onClick={resetFilters}>Reset Filters</button>

            {/* Sorting */}
            <div>
                <button onClick={() => handleSort("basic_interest")}>Sort by Interest</button>
                <button onClick={() => handleSort("initial_rating")}>Sort by Rating</button>
                <button onClick={() => handleSort("credit_duration")}>Sort by Duration</button>
            </div>

            {/* Projects list */}
            <ul>
                {data.map((project: ProjectCardResponse) => (
                    <li key={project.pid}>
                        <strong>{project.project_name}</strong> — {project.status} — {project.basic_interest}%
                        — {project.initial_rating}
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            {meta && (
                <div>
                    <button disabled={params.page === 1} onClick={() => setPage(params.page - 1)}>Prev</button>
                    <span>Page {meta.current_page} / {meta.last_page}</span>
                    <button disabled={params.page >= meta.last_page} onClick={() => setPage(params.page + 1)}>Next
                    </button>
                </div>
            )}

            {/* Limit selector */}
            <div>
                <label>
                    Items per page:
                    <select value={params.limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        {[10, 20, 50, 100].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
