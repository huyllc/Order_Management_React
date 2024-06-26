import axios from "axios";
import { API_URL } from "config";
import { ORDER_STATUS } from "constants/order.const";
import { InputErrorStyles } from "constants/styles.general.const";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IOrderFormUpdate } from "types/order.type";
import { ISale } from "types/sale.type";
import formatMoney from "utils/formatMoney";

interface Props {
    orderInfo: any,
    register: UseFormRegister<IOrderFormUpdate>,
    errors: FieldErrors<IOrderFormUpdate>
}

const OrderInfo = ({orderInfo, register, errors}: Props) => {    
    const [sales, setSales] = React.useState<ISale[]>([]);

    const fetchSales = async () => {
        try {
            const response = await axios.get(`${API_URL}/user/list`);
            if (response.status === 200 && response.data) {
                setSales(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchSales();
    }, []);

    return (
        <div className="row mb-5 align-items-end">
            <div className="row col-10 col-left gy-3">
                <div className="col-3">
                    <label className="form-label">Mã khách hàng</label>
                    <input type="text" className="form-control" disabled defaultValue={orderInfo?.customer_code} />
                </div>
                <div className="col-6">
                    <label className="form-label">Tên Khách hàng</label>
                    <input type="text" className="form-control" disabled defaultValue={orderInfo?.customer_name} />
                </div>
                <div className="col-3">
                    <label className="form-label">Số điện thoại</label>
                    <input type="text" className="form-control" disabled defaultValue={orderInfo?.customer_phone} />
                </div>
                <div className="col-3">
                    <label className="form-label">Nhân viên bán hàng</label>
                    <select 
                        className="form-select" 
                        aria-label="Default select example"
                        disabled={orderInfo.order_status !== ORDER_STATUS.none}
                        defaultValue={orderInfo.sale_id || ''}
                        {...register('sale_id', {
                            required: {
                                value: true,
                                message: 'Vui lòng chọn nhân viên bán hàng'
                            }
                        })}
                    >
                        <option value="">Chọn nhân viên bán hàng</option>
                        {sales.map(sale => (
                            <option 
                                key={sale.id.toString()} 
                                value={sale.id.toString()} 
                                selected={sale.id === orderInfo.sale_id}
                            >
                                {sale.name}
                            </option>
                        ))}
                    </select>
                    {errors?.sale_id && <InputErrorStyles className="text-danger">{errors?.sale_id?.message}</InputErrorStyles>}
                </div>
                <div className="col-6">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" disabled defaultValue={orderInfo?.customer_email} />
                </div>
                <div className="col-3">
                    <label className="form-label">Mã số thuế</label>
                    <input type="text" className="form-control" disabled defaultValue={orderInfo?.customer_tax} />
                </div>
                <div className="col-5 align-self-start">
                    <label className="form-label">Địa chỉ giao hàng</label>
                    <input 
                        type="text" 
                        className="form-control"
                        disabled={orderInfo.order_status !== ORDER_STATUS.none}
                        defaultValue={orderInfo?.address}
                        {...register('address', {
                            required: {
                                value: true,
                                message: 'Vui lòng nhập địa chỉ giao hàng'
                            }
                        })} 
                    />
                </div>
                <div className="col-6">
                    <label className="form-label">Diễn giải</label>
                    <textarea 
                        className="form-control" 
                        defaultValue={orderInfo?.note}
                        disabled={orderInfo.order_status !== ORDER_STATUS.none}
                        {...register('note')} 
                    ></textarea>
                </div>
            </div>
            <div className="col-2">
                <div className="d-flex flex-column align-items-end mb-3">
                    <strong className="mb-0 text-primary">Tổng tiền thanh toán</strong>
                    <h3>{formatMoney(orderInfo.final_price)}</h3>
                </div>
                <div className="d-flex flex-column align-items-end mb-3">
                    <strong className="mb-0 text-primary">Số tiền đã thanh toán</strong>
                    <h3>{formatMoney(orderInfo.total_paid)}</h3>
                </div>
                <div className="d-flex flex-column align-items-end mb-3">
                    <strong className="mb-0 text-primary">Số tiền còn thiếu</strong>
                    <h3>
                        {formatMoney(
                            orderInfo.final_price - orderInfo.total_paid > 0 
                            ? orderInfo.final_price - orderInfo.total_paid 
                            : 0
                        )}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;