import type { SortInput, SortId } from "@/types/project.api.types";

export function toggleSort(
    current: SortInput[],
    column: SortId
): SortInput[] {
    const existing = current.find(s => s.id === column);

    if (!existing) {
        return [...current, { id: column, desc: false }];
    }

    if (!existing.desc) {
        return current.map(s =>
            s.id === column ? { ...s, desc: true } : s
        );
    }

    return current.filter(s => s.id !== column);
}
