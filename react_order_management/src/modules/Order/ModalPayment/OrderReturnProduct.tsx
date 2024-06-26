import React, { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IReturnOrderList } from 'types/returnOrder.type';
import formatMoney from 'utils/formatMoney';

interface IOrderReturnProductProps {
    orderReturnDetails: any[],
    register: UseFormRegister<IReturnOrderList>,
    errors: FieldErrors<IReturnOrderList>,
    handleQuantityChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void,
}

const OrderReturnProduct = ({ orderReturnDetails, register, handleQuantityChange, errors }: IOrderReturnProductProps) => {
    return (
        <div>
            <table className='table table-hover'>
                <thead className='table-primary fw-semibold'>
                    <tr className='text-white'>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Thành tiền</th>
                        <th>Số lượng</th>
                        <th>Số lượng hàng có thể trả</th>
                        <th>Số lượng trả về</th>
                        <th>% Giảm giá</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orderReturnDetails.length > 0 && orderReturnDetails
                        .filter((returnOrder, index, self) =>
                            index === self.findIndex((o) => o.product_id === returnOrder.product_id))
                        .map((returnOrder, index) => (
                            <tr key={index} className={index.toString()}>    
                                <td>{returnOrder.product_sku}</td>
                                <td>{returnOrder.product_name}</td>
                                <td>{formatMoney(returnOrder.product_price)}</td>
                                <td>{returnOrder.quantity}</td>
                                <td>{returnOrder.quantity_can_return}</td>
                                <td style={{ width: "250px" }}>
                                    <input
                                        {...register(`list_order.${index}.quantity_return`)}
                                        type="number"
                                        className="form-control shadow-none"
                                        onChange={(e) => handleQuantityChange(e, index)}
                                    />
                                    {errors?.list_order?.[index]?.quantity_return && (
                                        <p className="text-danger mt-1">{errors.list_order[index]?.quantity_return?.message}</p>
                                    )}
                                </td>
                                <td>{returnOrder.discount}</td>
                                <td>
                                    {formatMoney(returnOrder.total_price)}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderReturnProduct;
