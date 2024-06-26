export const renderPaymentMethod = (payment_method: 'cash' | 'credit'): string => {
    switch (payment_method) {
        case 'cash':
            return 'Tiền mặt';
        case 'credit':
            return 'Chuyển khoản';
        default:
            return '';
    }
};