import type { SortInput, SortId } from "@/types/project.api.types";

export function toggleSort(
    current: SortInput[],
    column: SortId
): SortInput[] {
    const existing = current.find(s => s.id === column);

    if (!existing) {
        return [{ id: column, desc: false }];
    }

    if (!existing.desc) {
        return [{ id: column, desc: true }];
    }

    return current.filter(s => s.id !== column);
}
