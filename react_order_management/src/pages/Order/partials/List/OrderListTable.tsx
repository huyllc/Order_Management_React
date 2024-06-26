import { ORDER_STATUS } from 'constants/order.const';
import { Link } from 'react-router-dom';
import formatMoney from 'utils/formatMoney';
import { renderStatus } from 'utils/renderOrderStatus';

interface IOrderListTableProps {
    orders: any[],
    setOrderSelected: React.Dispatch<React.SetStateAction<number|null>>
}

const OrderListTable = ({orders, setOrderSelected} : IOrderListTableProps) => {
    const totalPaymentAmount = (orders.reduce((total, order) => total + order.final_price, 0)).toFixed(4);

    return (
        <>
            <table className="table table-hover">
                <thead className='table-primary fw-semibold'>
                    <tr className='text-white'>
                        <th>Mã đơn hàng</th>
                        <th>Ngày lên đơn</th>
                        <th>Tên khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Tổng thanh toán</th>
                        <th>Nhân viên sale</th>
                        <th>Địa chỉ</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {orders.length > 0 && orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order?.order_code}</td>
                            <td>{order?.created_at}</td>
                            <td>{order?.customer_name}</td>
                            <td>{order?.customer_phone}</td>
                            <td>{formatMoney(order?.final_price)}</td>
                            <td>{order?.sale_name}</td>
                            <td>{order?.address}</td>
                            <td>{renderStatus(order?.status)}</td>
                            <td className=''>
                                <div className="d-flex align-items-center gap-1 text-primary">
                                    <Link to={`/orders/${order.id}`} title="Chi tiết">
                                        <i className="fa-solid fa-link"></i>
                                    </Link>
                                    {order?.status !== ORDER_STATUS.done &&
                                        <button className='btn btn-sm text-primary' title="Thu tiền" data-bs-toggle="modal" data-bs-target="#modal-payment" onClick={() => setOrderSelected(order.id)}>
                                            <i className="fa-regular fa-credit-card"></i>
                                        </button>
                                    }
                                    {order?.status === ORDER_STATUS.done && <div className="col-4">
                                        <button className='btn btn-sm text-primary' title="Hoàn trả sản phẩm" data-bs-toggle="modal" data-bs-target="#modal-return-order" onClick={() => setOrderSelected(order.id)}>
                                            <i className="fa-solid fa-truck"></i>
                                        </button>
                                    </div>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                </tbody>
                <tfoot className='table-secondary'>
                    <tr>
                        <td className='fw-semibold'>Tổng</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='fw-semibold'>{formatMoney(totalPaymentAmount)}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default OrderListTable;