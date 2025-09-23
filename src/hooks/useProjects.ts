// hooks/useProjects.ts
import { useEffect, useState, useCallback } from "react";
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Core fetcher
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await getProjects(params);
            setData(res.data);
            setMeta(res.meta);
        } catch (e: any) {
            setError(e.message ?? "Failed to fetch projects");
        } finally {
            setIsLoading(false);
        }
    }, [params]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Handlers
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
    };
}
