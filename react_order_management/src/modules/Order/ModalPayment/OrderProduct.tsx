import React from 'react';

interface IOrderProductProps {
    orderDetails: any[]
}

const OrderProduct = ({orderDetails}: IOrderProductProps) => {
    return (
        <>
            <table className="table table-hover">
                <thead className='table-primary fw-semibold'>
                    <tr className='text-white'>
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                        <th>% Thuế GTGT</th>
                        <th>% Chiết khấu</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {orderDetails.length > 0 && orderDetails.map((orderDetail, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{orderDetail?.product_sku}</td>
                            <td>{orderDetail?.product_name}</td>
                            <td>{orderDetail?.quantity}</td>
                            <td>{orderDetail?.product_price}</td>
                            <td>{orderDetail?.product_price * orderDetail?.quantity}</td>
                            <td>10</td>
                            <td>{orderDetail?.discount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default OrderProduct;