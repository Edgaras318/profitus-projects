import React, { useState } from 'react';
import { useProjects } from "@/hooks/useProjects.ts";
import { toggleSort } from "@/utils/queryHelpers.ts";
import ProjectsTable from "@/components/ProjectsTable/ProjectsTable";
import styles from './ProjectsPage.module.scss';
import FilterBar from "@/components/FilterBar/FilterBar";
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent
} from "@/components/common/Accordion/Accordion";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import type { FilterInput } from "@/types/project.api.types";

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

    // Temporary state for unsaved filters
    const [tempFilters, setTempFilters] = useState<{
        country: string;
        ratings: string[];
        purpose: string;
        creditDurationMin: string;
        creditDurationMax: string;
        campaignId: string;
        privateId: string;
    }>({
        country: '',
        ratings: [],
        purpose: '',
        creditDurationMin: '',
        creditDurationMax: '',
        campaignId: '',
        privateId: ''
    });

    // Initialize temp filters from current params on mount
    React.useEffect(() => {
        const currentFilters = params.filters || [];
        const newTempFilters = {
            country: '',
            ratings: [] as string[],
            purpose: '',
            creditDurationMin: '',
            creditDurationMax: '',
            campaignId: '',
            privateId: ''
        };

        currentFilters.forEach((filter) => {
            if (filter.id === 'country') {
                newTempFilters.country = filter.value as string;
            } else if (filter.id === 'initial_rating') {
                newTempFilters.ratings.push(filter.value as string);
            } else if (filter.id === 'purpose') {
                newTempFilters.purpose = filter.value as string;
            } else if (filter.id === 'credit_duration') {
                const duration = filter.value as { min?: number; max?: number };
                newTempFilters.creditDurationMin = duration.min?.toString() || '';
                newTempFilters.creditDurationMax = duration.max?.toString() || '';
            } else if (filter.id === 'campaign_id') {
                newTempFilters.campaignId = filter.value as string;
            } else if (filter.id === 'private_id') {
                newTempFilters.privateId = filter.value as string;
            }
        });

        setTempFilters(newTempFilters);
    }, [params.filters]);

    const handleSort = (column: "basic_interest" | "initial_rating" | "credit_duration") => {
        const newSort = toggleSort(params.sort, column);
        setSort(newSort);
    };

    const handleTempFilterChange = (key: keyof typeof tempFilters, value: any) => {
        setTempFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleRatingChange = (rating: string, checked: boolean) => {
        setTempFilters(prev => ({
            ...prev,
            ratings: checked
                ? [...prev.ratings, rating]
                : prev.ratings.filter(r => r !== rating)
        }));
    };

    const handleSaveFilters = () => {
        const newFilters: FilterInput[] = [];

        // Country filter
        if (tempFilters.country) {
            newFilters.push({ id: 'country', value: tempFilters.country });
        }

        // Rating filters (multi-select)
        tempFilters.ratings.forEach(rating => {
            newFilters.push({ id: 'initial_rating', value: rating });
        });

        // Purpose filter
        if (tempFilters.purpose) {
            newFilters.push({ id: 'purpose', value: tempFilters.purpose });
        }

        // Credit duration filter (range)
        if (tempFilters.creditDurationMin || tempFilters.creditDurationMax) {
            newFilters.push({
                id: 'credit_duration',
                value: {
                    min: tempFilters.creditDurationMin ? parseInt(tempFilters.creditDurationMin) : undefined,
                    max: tempFilters.creditDurationMax ? parseInt(tempFilters.creditDurationMax) : undefined
                }
            });
        }

        // Campaign ID filter
        if (tempFilters.campaignId) {
            newFilters.push({ id: 'campaign_id', value: tempFilters.campaignId });
        }

        // Private ID filter
        if (tempFilters.privateId) {
            newFilters.push({ id: 'private_id', value: tempFilters.privateId });
        }

        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setTempFilters({
            country: '',
            ratings: [],
            purpose: '',
            creditDurationMin: '',
            creditDurationMax: '',
            campaignId: '',
            privateId: ''
        });
        resetFilters();
    };

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects: {error}</p>;
    if (!data || data.length === 0) return <p>No projects found</p>;

    const ratingOptions = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 'BBB+', 'BBB', 'BBB-'];
    const purposeOptions = [
        { value: 'real_estate_development', label: 'Nekilnojamojo turto plėtra' },
        { value: 'refinancing', label: 'Refinansavimas' },
        { value: 'working_capital', label: 'Apyvartinis kapitalas' },
        { value: 'real_estate_acquisition', label: 'Nekilnojamojo turto įsigijimas' },
        { value: 'other', label: 'Kita' }
    ];

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>Investavimo galimybės užtikrintos nekilnojamuoju turtu</h1>

                <div className={styles.headerControls}>
                    <FilterBar>
                        <div className={styles.filters}>
                            <Accordion multiple={true} defaultActiveIndex={[0, 1, 2]}>
                                {/* Country Filter */}
                                <AccordionItem index={0}>
                                    <AccordionHeader index={0} icon="chevron">
                                        Šalis
                                    </AccordionHeader>
                                    <AccordionContent index={0}>
                                        <div className={styles.filterContent}>
                                            <select
                                                value={tempFilters.country}
                                                onChange={(e) => handleTempFilterChange('country', e.target.value)}
                                                className={styles.select}
                                            >
                                                <option value="">Visos šalys</option>
                                                <option value="lt">Lietuva</option>
                                                <option value="ee">Estija</option>
                                                <option value="es">Ispanija</option>
                                                <option value="lv">Latvija</option>
                                            </select>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Initial Rating Filter */}
                                <AccordionItem index={1}>
                                    <AccordionHeader index={1} icon="chevron">
                                        Pradinis reitingas
                                    </AccordionHeader>
                                    <AccordionContent index={1}>
                                        <div className={styles.checkboxGrid}>
                                            {ratingOptions.map(rating => (
                                                <Checkbox
                                                    key={rating}
                                                    label={rating}
                                                    checked={tempFilters.ratings.includes(rating)}
                                                    onChange={(checked) => handleRatingChange(rating, checked)}
                                                />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Purpose/Type Filter */}
                                <AccordionItem index={2}>
                                    <AccordionHeader index={2} icon="chevron">
                                        Paskirtis / Tipas
                                    </AccordionHeader>
                                    <AccordionContent index={2}>
                                        <div className={styles.filterContent}>
                                            <select
                                                value={tempFilters.purpose}
                                                onChange={(e) => handleTempFilterChange('purpose', e.target.value)}
                                                className={styles.select}
                                            >
                                                <option value="">Visos paskirtys</option>
                                                {purposeOptions.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Credit Duration Filter */}
                                <AccordionItem index={3}>
                                    <AccordionHeader index={3} icon="chevron">
                                        Kredito trukmė (mėn.)
                                    </AccordionHeader>
                                    <AccordionContent index={3}>
                                        <div className={styles.rangeInputs}>
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={tempFilters.creditDurationMin}
                                                onChange={(e) => handleTempFilterChange('creditDurationMin', e.target.value)}
                                                className={styles.input}
                                                min="0"
                                            />
                                            <span className={styles.rangeSeparator}>-</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={tempFilters.creditDurationMax}
                                                onChange={(e) => handleTempFilterChange('creditDurationMax', e.target.value)}
                                                className={styles.input}
                                                min="0"
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Campaign ID Filter */}
                                <AccordionItem index={4}>
                                    <AccordionHeader index={4} icon="chevron">
                                        Kampanijos ID
                                    </AccordionHeader>
                                    <AccordionContent index={4}>
                                        <div className={styles.filterContent}>
                                            <input
                                                type="text"
                                                placeholder="Įveskite kampanijos ID"
                                                value={tempFilters.campaignId}
                                                onChange={(e) => handleTempFilterChange('campaignId', e.target.value)}
                                                className={styles.input}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Private ID Filter */}
                                <AccordionItem index={5}>
                                    <AccordionHeader index={5} icon="chevron">
                                        Privatus ID
                                    </AccordionHeader>
                                    <AccordionContent index={5}>
                                        <div className={styles.filterContent}>
                                            <input
                                                type="text"
                                                placeholder="Įveskite privatų ID"
                                                value={tempFilters.privateId}
                                                onChange={(e) => handleTempFilterChange('privateId', e.target.value)}
                                                className={styles.input}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

                            {/* Filter Action Buttons */}
                            <div className={styles.filterActions}>
                                <button
                                    onClick={handleSaveFilters}
                                    className={styles.saveButton}
                                >
                                    Saugoti filtrus
                                </button>
                                <button
                                    onClick={handleClearFilters}
                                    className={styles.clearButton}
                                >
                                    <span className={styles.clearIcon}>✕</span>
                                    Išvalyti
                                </button>
                            </div>
                        </div>
                    </FilterBar>

                    <div className={styles.viewControls}>
                        <button className={styles.viewButton} title="List View">
                            <span>☰</span>
                        </button>
                        <button className={`${styles.viewButton} ${styles.active}`} title="Grid View">
                            <span>⚏</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Projects Table */}
            <main className={styles.main}>
                <ProjectsTable
                    projects={data}
                    onSort={handleSort}
                    currentSort={params.sort}
                />
            </main>

            {/* Pagination */}
            {meta && (
                <div className={styles.pagination}>
                    <button
                        disabled={params.page === 1}
                        onClick={() => setPage(params.page - 1)}
                        className={styles.paginationButton}
                    >
                        Ankstesnis
                    </button>
                    <span className={styles.paginationInfo}>
                        Puslapis {meta.current_page} / {meta.last_page}
                    </span>
                    <button
                        disabled={params.page >= meta.last_page}
                        onClick={() => setPage(params.page + 1)}
                        className={styles.paginationButton}
                    >
                        Kitas
                    </button>
                </div>
            )}

            {/* Limit selector */}
            <div className={styles.limitSelector}>
                <label className={styles.limitLabel}>
                    Elementų per puslapį:
                    <select
                        value={params.limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className={styles.limitSelect}
                    >
                        {[10, 20, 50, 100].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
