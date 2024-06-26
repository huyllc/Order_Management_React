import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    customers: any[],
}

const ListCustomer = ({customers} : Props) => {
    return (
        <div>
            <table className="table table-hover">
                <thead className='table-primary fw-semibold'>
                    <tr className='text-white'>
                        <th>Mã khách hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Kiểu</th>
                        <th>Mail</th>
                        <th>Mã số thuế</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {customers.length > 0 && customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.customer_code}</td>
                            <td>{customer.name}</td>
                            <td>{customer.type.includes('self') ? 'Cá nhân' : 'Công ty'}</td>
                            <td>{customer.email}</td>
                            <td>{customer.tax_code === 'null' ? '' : customer.tax_code}</td>
                            <td>{customer.address}</td>
                            <td>{customer.phone}</td>
                            <td>
                                <Link to={`/customers/${customer.id}`}>
                                    <i className="fa-solid fa-link"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    <tr></tr>
                </tbody>
            </table>
        </div>
    );
};

export default ListCustomer;