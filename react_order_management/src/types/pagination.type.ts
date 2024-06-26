interface IPaginationLink {
    url: string|null,
    label: string,
    active: boolean
}

interface IPagination {
    current_page: number,
    from: number,
    last_page: number,
    links: IPaginationLink[],
    path: string,
    per_page: number,
    to: number,
    total: number
};

export type {
    IPagination
}