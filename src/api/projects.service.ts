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
    const query: string[] = [];

    if (params.page) query.push(`page=${params.page}`);
    if (params.limit) query.push(`limit=${params.limit}`);

    if (params.sort && params.sort.length > 0) {
        params.sort.forEach((s) => {
            query.push(`sort[]=${encodeURIComponent(JSON.stringify(s))}`);
        });
    }

    if (params.filters && params.filters.length > 0) {
        params.filters.forEach((f) => {
            query.push(`filters[]=${encodeURIComponent(JSON.stringify(f))}`);
        });
    }

    return query.length > 0 ? `?${query.join("&")}` : "";
}

export async function getProjects(params: GetProjectsParams) {
    const query = buildQuery(params);

    const { data } = await api.get<{
        data: ProjectCardResponse[];
        meta: PaginationMeta;
    }>(`/landing/projects${query}`);

    return data;
}
