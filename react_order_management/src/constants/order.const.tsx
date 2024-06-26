import { IOrder, IOrderDetail } from "types/order.type"

export const ORDER_STATUS = {
    done: 'done',
    none: 'none', 
    stake: 'stake'
}

export const defaultOrderData: IOrder = {
    customer_id: 0,
    sale_id: 0,
    total_price: 0,
    final_price: 0,
    total_paid: 0,
    order_status: 'none',
    address: '',
    is_vat: true,
    note: '',
    warehouse_id: 0,
    date_delivery: '',
    listOrderDetails: []
};

export const defaultOrderDetail: IOrderDetail = {
    order_id: 0,
    product_id: 0,
    product_price: 0,
    quantity: 0,
    quantity_can_return: 0,
    quantity_return: 0,
    total_price: 0,
    final_price: 0,
    discount: 0,
    status: 'none',
    product_name: '',
    product_sku: '',
}