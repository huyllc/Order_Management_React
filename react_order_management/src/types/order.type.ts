interface IOrder {
    customer_id: number,
    sale_id: number,
    total_price: number,
    final_price: number,
    total_paid: number,
    order_status: string,
    address: string,
    is_vat: boolean,
    note: string,
    warehouse_id: number,
    date_delivery: string,
    listOrderDetails: IOrderDetail[]
}

interface IOrderDetail {
    id?: number,
    order_id: number,
    product_id: number,
    product_price: number,
    quantity: number,
    quantity_can_return: number,
    quantity_return: number,
    status: string,
    total_price: number,
    final_price: number,
    discount: number,
    product_sku: string,
    product_name: string,
}

interface IOrderFormUpdate {
    productName: string[],
    productSku: string[],
    quantity: number[],
    address: string,
    note: string,
    sale_id: number
}

export type {
    IOrder,
    IOrderDetail,
    IOrderFormUpdate
}