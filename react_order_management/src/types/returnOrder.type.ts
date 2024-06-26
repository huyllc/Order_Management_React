
interface OrderItem {
    id: number;
    product_id: number;
    product_sku: string;
    product_name: string;
    product_price: number;
    quantity: number;
    quantity_can_return: number;
    quantity_return: number;
    status: string;
    total_price: number;
    discount: number;
}

interface IReturnOrderList {
    id: number;
    order_code: string;
    customer_code: string;
    customer_name: string;
    address: string;
    total_price: number;
    note: string;
    list_order: OrderItem[];
    order_details: OrderItem[];
}

export type{
    IReturnOrderList
}
