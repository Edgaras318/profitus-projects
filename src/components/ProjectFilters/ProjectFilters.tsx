import React, { useState, useRef } from 'react';
import { X, Search, Hash } from 'lucide-react';
import FilterBar from '@/components/FilterBar/FilterBar';
import {
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionContent
} from '@/components/common/Accordion/Accordion';
import Checkbox from '@/components/common/Checkbox/Checkbox';
import CountryFlag from '@/components/common/CountryFlag/CountryFlag';
import Select from '@/components/common/Select/Select';
import InputText from '@/components/common/InputText/InputText';
import InputNumber from '@/components/common/InputNumber/InputNumber';
import Button from '@/components/common/Button/Button';
import type { TempFilters, TempFilterChangeHandler } from '@/types/projectFilters.types';
import { RATING_OPTIONS, COUNTRY_OPTIONS, PURPOSE_OPTIONS } from '@/constants/projectFilters';
import styles from './ProjectFilters.module.scss';

interface ProjectFiltersProps {
    tempFilters: TempFilters;
    accordionActiveItems: number[];
    onAccordionChange: (items: number[]) => void;
    onTempFilterChange: TempFilterChangeHandler;
    onRatingChange: (rating: string, checked: boolean) => void;
    onCountryChange: (country: string, checked: boolean) => void;
    onSaveFilters: () => void;
    onClearFilters: () => void;
}

interface FilterSection {
    index: number;
    title: string;
    render: () => React.ReactNode;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
                                                           tempFilters,
                                                           accordionActiveItems,
                                                           onAccordionChange,
                                                           onTempFilterChange,
                                                           onRatingChange,
                                                           onCountryChange,
                                                           onSaveFilters,
                                                           onClearFilters
                                                       }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    // Fix: Allow null in the type definition for strict TypeScript compliance
    const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleSave = () => {
        onSaveFilters();
        setIsFilterOpen(false);
        toggleButtonRef.current?.focus();
    };

    const handleClear = () => {
        onClearFilters();
        setIsFilterOpen(false);
        toggleButtonRef.current?.focus();
    };

    const filterSections: FilterSection[] = [
        {
            index: 0,
            title: 'Šalis',
            render: () => (
                <div className={styles.checkboxGrid}>
                    {COUNTRY_OPTIONS.map(country => (
                        <Checkbox
                            key={country.code}
                            label={country.label}
                            checked={tempFilters.countries.includes(country.code)}
                            onChange={(checked) => onCountryChange(country.code, checked)}
                            icon={<CountryFlag countryCode={country.code} size="small" />}
                        />
                    ))}
                </div>
            )
        },
        {
            index: 1,
            title: 'Pradinis reitingas',
            render: () => (
                <div className={styles.checkboxGrid}>
                    {RATING_OPTIONS.map(rating => (
                        <Checkbox
                            key={rating}
                            label={rating}
                            checked={tempFilters.ratings.includes(rating)}
                            onChange={(checked) => onRatingChange(rating, checked)}
                        />
                    ))}
                </div>
            )
        },
        {
            index: 2,
            title: 'Paskirtis / Tipas',
            render: () => (
                <div className={styles.filterContent}>
                    <Select
                        options={PURPOSE_OPTIONS}
                        value={tempFilters.purpose}
                        onChange={(value) => onTempFilterChange('purpose', value)}
                        placeholder="Visos paskirtys"
                        fullWidth
                    />
                </div>
            )
        },
        {
            index: 3,
            title: 'Kredito trukmė (mėn.)',
            render: () => (
                <div className={styles.rangeInputs}>
                    <InputNumber
                        placeholder="Min"
                        value={tempFilters.creditDurationMin}
                        onChange={(value) =>
                            onTempFilterChange('creditDurationMin', value === '' ? '' : String(value))
                        }
                        min={0}
                        fullWidth
                    />
                    <InputNumber
                        placeholder="Max"
                        value={tempFilters.creditDurationMax}
                        onChange={(value) =>
                            onTempFilterChange('creditDurationMax', value === '' ? '' : String(value))
                        }
                        min={0}
                        fullWidth
                    />
                </div>
            )
        },
        {
            index: 4,
            title: 'Kampanijos ID',
            render: () => (
                <div className={styles.filterContent}>
                    <InputText
                        placeholder="Įveskite kampanijos ID"
                        value={tempFilters.campaignId}
                        onChange={(value) => onTempFilterChange('campaignId', value)}
                        icon={<Hash size={16} />}
                        fullWidth
                    />
                </div>
            )
        },
        {
            index: 5,
            title: 'Privatus ID',
            render: () => (
                <div className={styles.filterContent}>
                    <InputText
                        placeholder="Įveskite privatų ID"
                        value={tempFilters.privateId}
                        onChange={(value) => onTempFilterChange('privateId', value)}
                        icon={<Search size={16} />}
                        fullWidth
                    />
                </div>
            )
        }
    ];

    return (
        <FilterBar
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen((prev) => !prev)}
            toggleButtonRef={toggleButtonRef}
        >
            <div className={styles.filters}>
                <Accordion
                    multiple={true}
                    activeItems={accordionActiveItems}
                    onItemsChange={onAccordionChange}
                >
                    {filterSections.map(({ index, title, render }) => (
                        <AccordionItem key={index} index={index}>
                            <AccordionHeader index={index}>
                                {title}
                            </AccordionHeader>
                            <AccordionContent index={index}>
                                {render()}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className={styles.filterActions}>
                    <Button
                        onClick={handleSave}
                        variant="ghost"
                        color="#E91E63"
                    >
                        Saugoti filtrus
                    </Button>
                    <Button
                        onClick={handleClear}
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
    );
};

export default ProjectFilters;
