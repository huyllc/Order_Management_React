import { ORDER_STATUS } from 'constants/order.const';
import React from 'react';

interface Props {
    orderCode: string,
    orderStatus: string
}

const OrderDetailHeading = React.memo(({orderCode, orderStatus}: Props) => {
    return (
        <div className="row align-items-center justify-content-between mb-4">
            <h1 className='col-auto'>Chi tiết đơn hàng: {orderCode}</h1>
            {orderStatus !== ORDER_STATUS.done && <div className='col-auto'>
                <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#modal-payment">Thu tiền ngay</button>
            </div>}
        </div>
    );
});

export default OrderDetailHeading;