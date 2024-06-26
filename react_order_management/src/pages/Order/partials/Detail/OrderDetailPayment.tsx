import React from 'react';
import formatMoney from 'utils/formatMoney';
import { renderPaymentMethod } from 'utils/renderPaymentMethod';

interface Props {
    payments: any[]
}

const OrderDetailPayment = ({payments} : Props) => {
    return (
        <div id='order-detail-payment' className="tab-pane fade" role="tabpanel">
            <table className="table table-hover mt-4">
                <thead className='table-primary fw-semibold'>
                    <tr className='text-white'>
                        <th>STT</th>
                        <th>Tên khách hàng</th>
                        <th>Số tiền thanh toán</th>
                        <th>Số tiền thừa</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày thanh toán</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {payments.length > 0 && payments.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.customer_name ?? ''}</td>
                            <td>{formatMoney(item.amount ?? 0)}</td>
                            <td>{formatMoney(item.excess_money ?? 0)}</td>
                            <td>{renderPaymentMethod(item.payment_method)}</td>
                            <td>{item.date_payment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailPayment;