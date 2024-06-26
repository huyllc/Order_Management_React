enum EPaymentMethod {
    Cash = 'cash',
    Credit = 'credit' 
}

interface IPaymentData {
    order_id?: number,
    customer_id?: number,
    amount: number,
    excess_money?: number,
    payment_method: EPaymentMethod
}

export type { IPaymentData };
export { EPaymentMethod };