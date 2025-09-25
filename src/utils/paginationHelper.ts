export function getPageNumbers(
    currentPage: number,
    lastPage: number,
    maxButtons: number
): (number | string)[] {
    if (lastPage <= maxButtons) {
        return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [1];
    const sideCount = Math.floor((maxButtons - 3) / 2); // space for ellipses + ends

    let start = Math.max(2, currentPage - sideCount);
    let end = Math.min(lastPage - 1, currentPage + sideCount);

    // shift window if near edges
    if (start <= 2) {
        end = 1 + (maxButtons - 2);
    }
    if (end >= lastPage - 1) {
        start = lastPage - (maxButtons - 2);
    }

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < lastPage - 1) pages.push("...");
    pages.push(lastPage);

    return pages;
}
