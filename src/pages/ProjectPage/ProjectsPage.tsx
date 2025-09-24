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
import CountryFlag from "@/components/common/CountryFlag/CountryFlag.tsx";
import Select from "@/components/common/Select/Select";
import Button from "@/components/common/Button/Button.tsx";
import { X } from 'lucide-react';

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
        countries: string[];
        ratings: string[];
        purpose: string;
        creditDurationMin: string;
        creditDurationMax: string;
        campaignId: string;
        privateId: string;
    }>({
        countries: [],
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
            countries: [] as string[],
            ratings: [] as string[],
            purpose: '',
            creditDurationMin: '',
            creditDurationMax: '',
            campaignId: '',
            privateId: ''
        };

        currentFilters.forEach((filter) => {
            if (filter.id === 'country') {
                newTempFilters.countries = filter.value as string[];
            } else if (filter.id === 'initial_rating') {
                newTempFilters.ratings = filter.value as string[];
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

    const handleCountryChange = (country: string, checked: boolean) => {
        setTempFilters(prev => ({
            ...prev,
            countries: checked
                ? [...prev.countries, country]
                : prev.countries.filter(c => c !== country)
        }));
    };

    const handleSaveFilters = () => {
        const newFilters: FilterInput[] = [];

        // Country filter (multi-select array)
        if (tempFilters.countries.length > 0) {
            newFilters.push({ id: 'country', value: tempFilters.countries });
        }

        // Rating filter (multi-select array)
        if (tempFilters.ratings.length > 0) {
            newFilters.push({ id: 'initial_rating', value: tempFilters.ratings });
        }

        // Purpose filter (single)
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
            countries: [],
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

    const countryOptions = [
        { code: 'lt', label: 'Lietuva' },
        { code: 'lv', label: 'Latvija' },
        { code: 'ee', label: 'Estija' },
        { code: 'es', label: 'Ispanija' }
    ];

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
                                    <AccordionHeader index={0}  >
                                        Šalis
                                    </AccordionHeader>
                                    <AccordionContent index={0}>
                                        <div className={styles.checkboxGrid}>
                                            {countryOptions.map(country => (
                                                <Checkbox
                                                    key={country.code}
                                                    label={country.label}
                                                    checked={tempFilters.countries.includes(country.code)}
                                                    onChange={(checked) => handleCountryChange(country.code, checked)}
                                                    icon={<CountryFlag countryCode={country.code} size="small" />}
                                                />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Initial Rating Filter */}
                                <AccordionItem index={1}>
                                    <AccordionHeader index={1}  >
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
                                    <AccordionHeader index={2}  >
                                        Paskirtis / Tipas
                                    </AccordionHeader>
                                    <AccordionContent index={2}>
                                        <div className={styles.filterContent}>
                                            <Select
                                                options={purposeOptions}
                                                value={tempFilters.purpose}
                                                onChange={(value) => handleTempFilterChange('purpose', value)}
                                                placeholder="Visos paskirtys"
                                                fullWidth
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Credit Duration Filter */}
                                <AccordionItem index={3}>
                                    <AccordionHeader index={3}  >
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
                                    <AccordionHeader index={4}  >
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
                                    <AccordionHeader index={5}  >
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
                                <Button
                                    onClick={handleSaveFilters}
                                    variant="ghost"
                                    color="#E91E63"
                                >
                                    Saugoti filtrus
                                </Button>
                                <Button
                                    onClick={handleClearFilters}
                                    variant="ghost"
                                    color="#666"
                                    icon={<X className={styles.clearIcon}/>}
                                    iconPosition="left"
                                >
                                    Išvalyti
                                </Button>
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
