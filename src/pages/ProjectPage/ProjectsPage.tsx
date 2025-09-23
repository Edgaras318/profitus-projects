import { useProjects } from "@/hooks/useProjects.ts";
import { toggleSort } from "@/utils/queryHelpers.ts";
import type { ProjectCardResponse } from "@/types/project.types.ts";
import styles from './ProjectsPage.module.scss';
import FilterBar from "@/components/FilterBar/FilterBar";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent
} from "@/components/common/Accordion/Accordion";
import Checkbox from "@/components/common/Checkbox/Checkbox";

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

    // Additional filter handlers for accordion filters
    const handleRatingFilter = (rating: string, checked: boolean) => {
        const others = params.filters.filter((f) => !f.id.startsWith("rating_"));
        if (checked) {
            setFilters([...others, { id: `rating_${rating}`, value: rating }]);
        } else {
            setFilters(others);
        }
    };

    const handleCityFilter = (city: string, checked: boolean) => {
        const others = params.filters.filter((f) => !f.id.startsWith("city_"));
        if (checked) {
            setFilters([...others, { id: `city_${city}`, value: city }]);
        } else {
            setFilters(others);
        }
    };

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects: {error}</p>;
    if (!data || data.length === 0) return <p>No projects found</p>;

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>Investavimo galimybės užtikrintos nekilnojamuoju turtu</h1>
                <FilterBar>
                    <div className={styles.filters}>
                        <Accordion multiple={true} defaultActiveIndex={[0, 1]}>
                            {/* Country Filter */}
                            <AccordionItem index={0}>
                                <AccordionHeader index={0}>
                                    Šalis
                                </AccordionHeader>
                                <AccordionContent index={0}>
                                    <div className={styles.filterContent}>
                                        <label className={styles.selectLabel}>
                                            <select
                                                onChange={(e) => handleFilterCountry(e.target.value)}
                                                value={String(
                                                    params.filters.find((f) => f.id === "country")?.value ?? ""
                                                )}
                                                className={styles.select}
                                            >
                                                <option value="">Visos šalys</option>
                                                <option value="lt">Lietuva</option>
                                                <option value="ee">Estija</option>
                                                <option value="es">Ispanija</option>
                                                <option value="lv">Latvija</option>
                                            </select>
                                        </label>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Rating Filter */}
                            <AccordionItem index={1}>
                                <AccordionHeader index={1}>
                                    Reitingas
                                </AccordionHeader>
                                <AccordionContent index={1}>
                                    <div className={styles.checkboxGroup}>
                                        <Checkbox
                                            label="A+"
                                            checked={params.filters.some(f => f.id === "rating_A+")}
                                            onChange={(checked) => handleRatingFilter("A+", checked)}
                                        />
                                        <Checkbox
                                            label="A"
                                            checked={params.filters.some(f => f.id === "rating_A")}
                                            onChange={(checked) => handleRatingFilter("A", checked)}
                                        />
                                        <Checkbox
                                            label="A-"
                                            checked={params.filters.some(f => f.id === "rating_A-")}
                                            onChange={(checked) => handleRatingFilter("A-", checked)}
                                        />
                                        <Checkbox
                                            label="B+"
                                            checked={params.filters.some(f => f.id === "rating_B+")}
                                            onChange={(checked) => handleRatingFilter("B+", checked)}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* City Filter */}
                            <AccordionItem index={2}>
                                <AccordionHeader index={2}>
                                    Miestas
                                </AccordionHeader>
                                <AccordionContent index={2}>
                                    <div className={styles.checkboxGroup}>
                                        <Checkbox
                                            label="Vilnius"
                                            checked={params.filters.some(f => f.id === "city_vilnius")}
                                            onChange={(checked) => handleCityFilter("vilnius", checked)}
                                        />
                                        <Checkbox
                                            label="Kaunas"
                                            checked={params.filters.some(f => f.id === "city_kaunas")}
                                            onChange={(checked) => handleCityFilter("kaunas", checked)}
                                        />
                                        <Checkbox
                                            label="Klaipėda"
                                            checked={params.filters.some(f => f.id === "city_klaipeda")}
                                            onChange={(checked) => handleCityFilter("klaipeda", checked)}
                                        />
                                        <Checkbox
                                            label="Šiauliai"
                                            checked={params.filters.some(f => f.id === "city_siauliai")}
                                            onChange={(checked) => handleCityFilter("siauliai", checked)}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Purpose Filter */}
                            <AccordionItem index={3}>
                                <AccordionHeader index={3}>
                                    Paskirtis
                                </AccordionHeader>
                                <AccordionContent index={3}>
                                    <div className={styles.checkboxGroup}>
                                        <Checkbox
                                            label="Gyvenamoji"
                                            checked={params.filters.some(f => f.id === "purpose_residential")}
                                            onChange={(checked) => {
                                                const others = params.filters.filter((f) => !f.id.startsWith("purpose_"));
                                                if (checked) {
                                                    setFilters([...others, { id: "purpose_residential", value: "residential" }]);
                                                } else {
                                                    setFilters(others);
                                                }
                                            }}
                                        />
                                        <Checkbox
                                            label="Komercinė"
                                            checked={params.filters.some(f => f.id === "purpose_commercial")}
                                            onChange={(checked) => {
                                                const others = params.filters.filter((f) => !f.id.startsWith("purpose_"));
                                                if (checked) {
                                                    setFilters([...others, { id: "purpose_commercial", value: "commercial" }]);
                                                } else {
                                                    setFilters(others);
                                                }
                                            }}
                                        />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <div className={styles.filterActions}>
                            <button onClick={resetFilters} className={styles.resetButton}>
                                Išvalyti filtrus
                            </button>
                        </div>
                    </div>
                </FilterBar>
            </header>

            {/* Sorting */}
            <div className={styles.sortingBar}>
                <button onClick={() => handleSort("basic_interest")}>Sort by Interest</button>
                <button onClick={() => handleSort("initial_rating")}>Sort by Rating</button>
                <button onClick={() => handleSort("credit_duration")}>Sort by Duration</button>
            </div>

            {/* Projects list */}
            <ul className={styles.projectsList}>
                {data.map((project: ProjectCardResponse) => (
                    <li key={project.pid}>
                        <strong>{project.project_name}</strong> – {project.status} – {project.basic_interest}%
                        – {project.initial_rating}
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            {meta && (
                <div className={styles.pagination}>
                    <button
                        disabled={params.page === 1}
                        onClick={() => setPage(params.page - 1)}
                    >
                        Prev
                    </button>
                    <span>Page {meta.current_page} / {meta.last_page}</span>
                    <button
                        disabled={params.page >= meta.last_page}
                        onClick={() => setPage(params.page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Limit selector */}
            <div className={styles.limitSelector}>
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
