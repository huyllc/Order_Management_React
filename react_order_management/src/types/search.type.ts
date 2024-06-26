interface ISearchMenu {
    value: any,
    label: string
}

interface IOrderSearchParams {
    order: ISearchMenu[],
    customer: ISearchMenu[],
    sale: ISearchMenu[],
    order_status: ISearchMenu[],
    date_from: any,
    date_end: any
}

export type { ISearchMenu, IOrderSearchParams };