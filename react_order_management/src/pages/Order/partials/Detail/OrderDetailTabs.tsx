import React from 'react';

const OrderDetailTabs = React.memo(() => {
    return (
        <ul className="nav nav-tabs" id="orderTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="order-info-tab" data-bs-toggle="tab" data-bs-target="#order-detail-info" type="button" role="tab" aria-controls="order-detail-info" aria-selected="true">Thông tin đơn hàng</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="order-payment-tab" data-bs-toggle="tab" data-bs-target="#order-detail-payment" type="button" role="tab" aria-controls="order-detail-payment" aria-selected="false">Thông tin thanh toán</button>
            </li>
        </ul>
    );
});

export default OrderDetailTabs;