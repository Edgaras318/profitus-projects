import { useEffect, useState, useRef } from "react";
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

    // Track request ID to handle race conditions
    const requestIdRef = useRef(0);

    useEffect(() => {
        // Create a new AbortController for this request
        const controller = new AbortController();
        // Increment and capture the current request ID
        const requestId = ++requestIdRef.current;

        setIsLoading(true);
        setError(null);

        getProjects(params, controller.signal)
            .then(res => {
                // Only update state if this is still the latest request
                if (requestIdRef.current !== requestId || controller.signal.aborted) {
                    return;
                }
                setData(res.data);
                setMeta(res.meta);
            })
            .catch((e: any) => {
                // Don't set error if request was aborted or cancelled
                if (controller.signal.aborted || e.message === 'Request cancelled') {
                    return;
                }
                setError(e.message ?? "Failed to fetch projects");
            })
            .finally(() => {
                // Only update loading state if this is still the latest request
                if (requestIdRef.current === requestId && !controller.signal.aborted) {
                    setIsLoading(false);
                }
            });

        // Cleanup: abort the request when component unmounts or params change
        return () => controller.abort();
    }, [params]);

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
