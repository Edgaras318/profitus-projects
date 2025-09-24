import { useEffect, useState, useRef, useCallback } from "react";
import { getProjects } from "@/api/projects.service";
import type { ProjectCardResponse, PaginationMeta } from "@/types/project.types";
import type { SortInput, FilterInput } from "@/types/project.api.types";

type Params = {
    page: number;
    limit: number;
    sort: SortInput[];
    filters: FilterInput[];
};

export function useProjects(initialParams?: Partial<Params>) {
    const [params, setParams] = useState<Params>({
        page: initialParams?.page ?? 1,
        limit: initialParams?.limit ?? 10,
        sort: initialParams?.sort ?? [],
        filters: initialParams?.filters ?? [],
    });

    const [data, setData] = useState<ProjectCardResponse[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const requestIdRef = useRef(0);

    useEffect(() => {
        const controller = new AbortController();
        const requestId = ++requestIdRef.current;

        setIsLoading(true);
        setError(null);

        getProjects(params, controller.signal)
            .then(res => {
                if (requestIdRef.current !== requestId || controller.signal.aborted) {
                    return;
                }
                setData(res.data);
                setMeta(res.meta);
            })
            .catch((e: unknown) => {
                const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';

                if (controller.signal.aborted || errorMessage === 'Request cancelled') {
                    return;
                }
                setError(errorMessage);
            })
            .finally(() => {
                if (requestIdRef.current === requestId && !controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        return () => controller.abort();
    }, [params, refreshKey]);

    const setPage = (page: number) =>
        setParams((prev) => ({ ...prev, page }));

    const setLimit = (limit: number) =>
        setParams((prev) => ({ ...prev, limit, page: 1 }));

    const setSort = (sort: SortInput[]) =>
        setParams((prev) => ({ ...prev, sort, page: 1 }));

    const setFilters = (filters: FilterInput[]) =>
        setParams((prev) => ({ ...prev, filters, page: 1 }));

    const resetFilters = () =>
        setParams((prev) => ({ ...prev, filters: [], page: 1 }));

    const refetch = useCallback(() => {
        setRefreshKey(prev => prev + 1);
    }, []);

    return {
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
    };
}
