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
import CountryFlag from "@/components/common/CountryFlag/CountryFlag.tsx";
import Select from "@/components/common/Select/Select";
import InputText from "@/components/common/InputText/InputText";
import InputNumber from "@/components/common/InputNumber/InputNumber";
import Button from "@/components/common/Button/Button.tsx";
import { X, Search, Hash } from 'lucide-react';
import type { TempFilters } from '@/types/projectFilters.types';
import { getEmptyTempFilters } from '@/types/projectFilters.types';
import {
    RATING_OPTIONS,
    COUNTRY_OPTIONS,
    PURPOSE_OPTIONS,
    ITEMS_PER_PAGE_OPTIONS,
    FILTER_ACCORDION_STORAGE_KEY
} from '@/constants/projectFilters';
import {
    buildFiltersFromTemp,
    parseTempFiltersFromParams,
    getActiveAccordionItems
} from '@/utils/filterHelpers';

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

    const [tempFilters, setTempFilters] = useState<TempFilters>(getEmptyTempFilters());

    const [userInteracted, setUserInteracted] = useState<boolean>(() => {
        const savedState = localStorage.getItem(FILTER_ACCORDION_STORAGE_KEY);
        return savedState !== null;
    });

    const [accordionActiveItems, setAccordionActiveItems] = useState<number[]>(() => {
        const savedState = localStorage.getItem(FILTER_ACCORDION_STORAGE_KEY);
        if (savedState) {
            try {
                return JSON.parse(savedState);
            } catch (e) {
                localStorage.removeItem(FILTER_ACCORDION_STORAGE_KEY);
            }
        }
        return [];
    });

    React.useEffect(() => {
        const newTempFilters = parseTempFiltersFromParams(params.filters || []);
        setTempFilters(newTempFilters);
    }, [params.filters]);

    React.useEffect(() => {
        if (!userInteracted) {
            const itemsToOpen = getActiveAccordionItems(tempFilters);
            setAccordionActiveItems(itemsToOpen);
        }
    }, [tempFilters, userInteracted]);

    const handleAccordionChange = (items: number[]) => {
        setAccordionActiveItems(items);
        setUserInteracted(true);
        localStorage.setItem(FILTER_ACCORDION_STORAGE_KEY, JSON.stringify(items));
    };

    const handleSort = (column: "basic_interest" | "initial_rating" | "credit_duration") => {
        const newSort = toggleSort(params.sort, column);
        setSort(newSort);
    };

    const handleTempFilterChange = (key: keyof TempFilters, value: any) => {
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
        const newFilters = buildFiltersFromTemp(tempFilters);
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setTempFilters(getEmptyTempFilters());
        resetFilters();
        setUserInteracted(false);
        localStorage.removeItem(FILTER_ACCORDION_STORAGE_KEY);
        setAccordionActiveItems([0]);
    };

    if (isLoading) return <p>Loading projects...</p>;
    if (error) return <p>Failed to load projects: {error}</p>;
    if (!data || data.length === 0) return <p>No projects found</p>;

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>Investavimo galimybės užtikrintos nekilnojamuoju turtu</h1>

                <div className={styles.headerControls}>
                    <FilterBar>
                        <div className={styles.filters}>
                            <Accordion
                                multiple={true}
                                activeItems={accordionActiveItems}
                                onItemsChange={handleAccordionChange}
                            >
                                <AccordionItem index={0}>
                                    <AccordionHeader index={0}>
                                        Šalis
                                    </AccordionHeader>
                                    <AccordionContent index={0}>
                                        <div className={styles.checkboxGrid}>
                                            {COUNTRY_OPTIONS.map(country => (
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

                                <AccordionItem index={1}>
                                    <AccordionHeader index={1}>
                                        Pradinis reitingas
                                    </AccordionHeader>
                                    <AccordionContent index={1}>
                                        <div className={styles.checkboxGrid}>
                                            {RATING_OPTIONS.map(rating => (
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

                                <AccordionItem index={2}>
                                    <AccordionHeader index={2}>
                                        Paskirtis / Tipas
                                    </AccordionHeader>
                                    <AccordionContent index={2}>
                                        <div className={styles.filterContent}>
                                            <Select
                                                options={PURPOSE_OPTIONS}
                                                value={tempFilters.purpose}
                                                onChange={(value) => handleTempFilterChange('purpose', value)}
                                                placeholder="Visos paskirtys"
                                                fullWidth
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem index={3}>
                                    <AccordionHeader index={3}>
                                        Kredito trukmė (mėn.)
                                    </AccordionHeader>
                                    <AccordionContent index={3}>
                                        <div className={styles.rangeInputs}>
                                            <InputNumber
                                                placeholder="Min"
                                                value={tempFilters.creditDurationMin}
                                                onChange={(value) => handleTempFilterChange('creditDurationMin', value)}
                                                min={0}
                                                fullWidth
                                            />
                                            <InputNumber
                                                placeholder="Max"
                                                value={tempFilters.creditDurationMax}
                                                onChange={(value) => handleTempFilterChange('creditDurationMax', value)}
                                                min={0}
                                                fullWidth
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem index={4}>
                                    <AccordionHeader index={4}>
                                        Kampanijos ID
                                    </AccordionHeader>
                                    <AccordionContent index={4}>
                                        <div className={styles.filterContent}>
                                            <InputText
                                                placeholder="Įveskite kampanijos ID"
                                                value={tempFilters.campaignId}
                                                onChange={(value) => handleTempFilterChange('campaignId', value)}
                                                icon={<Hash size={16} />}
                                                fullWidth
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem index={5}>
                                    <AccordionHeader index={5}>
                                        Privatus ID
                                    </AccordionHeader>
                                    <AccordionContent index={5}>
                                        <div className={styles.filterContent}>
                                            <InputText
                                                placeholder="Įveskite privatų ID"
                                                value={tempFilters.privateId}
                                                onChange={(value) => handleTempFilterChange('privateId', value)}
                                                icon={<Search size={16} />}
                                                fullWidth
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>

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

            <main className={styles.main}>
                <ProjectsTable
                    projects={data}
                    onSort={handleSort}
                    currentSort={params.sort}
                />
            </main>

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

            <div className={styles.limitSelector}>
                <label className={styles.limitLabel}>
                    Elementų per puslapį:
                    <select
                        value={params.limit}
                        onChange={(e) => setLimit(Number(e.target.value))}
                        className={styles.limitSelect}
                    >
                        {ITEMS_PER_PAGE_OPTIONS.map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );
}
