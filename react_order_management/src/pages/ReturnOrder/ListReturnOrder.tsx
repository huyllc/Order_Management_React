import React from 'react';
import { Link } from 'react-router-dom';
import formatMoney from 'utils/formatMoney';

interface Props {
    returnOrders: { [key: string]: any };
    deleteReturnOrder: (id: number) => Promise<void>;
}

const ListReturnOrder = ({ returnOrders, deleteReturnOrder }: Props) => {
    const returnOrdersArray = Object.values(returnOrders);

    const lastOccurrenceIndices: { [key: number]: number } = {};

    returnOrdersArray.forEach((returnOrder, index) => {
        lastOccurrenceIndices[returnOrder.order_detail_id] = index;
    });

    return (
        <div>
            <table className="table table-hover">
                <thead className='table-primary fw-semibold'>
                    <tr className='text-white'>
                        <th>#</th>
                        <th>Mã Order</th>
                        <th>Mã khách hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Địa chỉ</th>
                        <th>Tổng giá tiền</th>
                        <th>Ghi chú</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {returnOrdersArray.map((returnOrder, index) => (
                        <tr key={returnOrder.id}>
                            <td>{returnOrder.order_detail_id}</td>
                            <td>{returnOrder.order_code}</td>
                            <td>{returnOrder.customer_code}</td>
                            <td>{returnOrder.customer_name}</td>
                            <td>{returnOrder.address}</td>
                            <td>{formatMoney(returnOrder.total_price)}</td>
                            <td>{returnOrder.note}</td>
                            <td>
                                <div className="d-flex justify-content-end gap-2">
                                    <Link to={`/return-orders/${returnOrder.id}`} className="btn btn-link p-0">
                                        <i className="fa-solid fa-link"></i>
                                    </Link>
                                    {index === lastOccurrenceIndices[returnOrder.order_detail_id] && (
                                        <button
                                            type="button"
                                            className="btn btn-link p-0"
                                            onClick={() => deleteReturnOrder(returnOrder.id)}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListReturnOrder;
