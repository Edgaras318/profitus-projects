import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import type { SortInput, FilterInput } from '@/types/project.api.types';

export interface QueryParams {
    page: number;
    limit: number;
    sort: SortInput[];
    filters: FilterInput[];
}

const DEFAULT_PARAMS: QueryParams = {
    page: 1,
    limit: 10,
    sort: [],
    filters: []
};

export function useQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const params = useMemo((): QueryParams => {
        const page = Number(searchParams.get('page')) || DEFAULT_PARAMS.page;
        const limit = Number(searchParams.get('limit')) || DEFAULT_PARAMS.limit;

        const sort: SortInput[] = [];
        searchParams.getAll('sort[]').forEach(s => {
            try {
                const parsed = JSON.parse(s);
                if (parsed.id) sort.push(parsed);
            } catch {}
        });

        const filters: FilterInput[] = [];
        searchParams.getAll('filters[]').forEach(f => {
            try {
                const parsed = JSON.parse(f);
                if (parsed.id) filters.push(parsed);
            } catch {}
        });

        return { page, limit, sort, filters };
    }, [searchParams]);

    const updateParams = useCallback((updates: Partial<QueryParams>) => {
        setSearchParams(prev => {
            const newParams = new URLSearchParams();

            const page = updates.page ?? params.page;
            const limit = updates.limit ?? params.limit;
            const sort = updates.sort ?? params.sort;
            const filters = updates.filters ?? params.filters;

            if (page !== DEFAULT_PARAMS.page) {
                newParams.set('page', String(page));
            }

            if (limit !== DEFAULT_PARAMS.limit) {
                newParams.set('limit', String(limit));
            }

            sort.forEach(s => {
                newParams.append('sort[]', JSON.stringify(s));
            });

            filters.forEach(f => {
                newParams.append('filters[]', JSON.stringify(f));
            });

            return newParams;
        });
    }, [params, setSearchParams]);

    const setPage = useCallback((page: number) => {
        updateParams({ page });
    }, [updateParams]);

    const setLimit = useCallback((limit: number) => {
        updateParams({ limit, page: 1 });
    }, [updateParams]);

    const setSort = useCallback((sort: SortInput[]) => {
        updateParams({ sort, page: 1 });
    }, [updateParams]);

    const setFilters = useCallback((filters: FilterInput[]) => {
        updateParams({ filters, page: 1 });
    }, [updateParams]);

    const resetFilters = useCallback(() => {
        updateParams({ filters: [], page: 1 });
    }, [updateParams]);

    return {
        params,
        setPage,
        setLimit,
        setSort,
        setFilters,
        resetFilters
    };
}
