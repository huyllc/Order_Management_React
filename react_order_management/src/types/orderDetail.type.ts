interface IOrderDetail {
    product_id: number | null,
    product_price: number,
    quantity: number,
    status: string,
    total_price: number,
    final_price: number,
    discount: number,
}

export type {
    IOrderDetail
}