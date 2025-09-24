import api from "@/api/axiosInstance";
import type { ProjectCardResponse, PaginationMeta } from "@/types/project.types";
import type { SortInput, FilterInput } from "@/types/project.api.types";

type GetProjectsParams = {
    page?: number;
    limit?: number;
    sort?: SortInput[];
    filters?: FilterInput[];
};

// Encode arrays as query params
function buildQuery(params: GetProjectsParams): string {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.set("page", String(params.page));
    if (params.limit) searchParams.set("limit", String(params.limit));

    params.sort?.forEach(s =>
        searchParams.append("sort[]", JSON.stringify(s))
    );

    params.filters?.forEach(f =>
        searchParams.append("filters[]", JSON.stringify(f))
    );

    const qs = searchParams.toString();
    return qs ? `?${qs}` : "";
}

export async function getProjects(
    params: GetProjectsParams,
    signal?: AbortSignal
) {
    const query = buildQuery(params);

    const { data } = await api.get<{
        data: ProjectCardResponse[];
        meta: PaginationMeta;
    }>(`/landing/projects${query}`, {
        ...(signal && { signal })
    });

    return data;
}
