export const renderStatus = (status: 'done' | 'stake' | 'none'): string => {
    switch (status) {
        case 'done':
            return 'Đã thanh toán xong';
        case 'stake':
            return 'Đã đặt cọc';
        case 'none':
            return 'Chưa thanh toán';
        default:
            return '';
    }
};