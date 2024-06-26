import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IReturnOrderList } from 'types/returnOrder.type';
import formatMoney from 'utils/formatMoney';

interface Props {
    orderInfo: any,
    register: UseFormRegister<IReturnOrderList>,
    errors: FieldErrors<IReturnOrderList>
}

const OrderReturnInfo = ({orderInfo, register, errors}: Props) => {
    return (
        <div className="row">
            <div className='col-md-9 pb-3'>
                <div className='row row-cols-12 mt-3 ms-3'>
                    <div className='col-md-4 col-sm-11'>
                        <label>Mã đơn hàng</label>
                        <input
                            {...register('order_code')}
                            type="text"
                            className='form-control shadow-none mt-2 w-100'
                            disabled
                        />
                    </div>
                    <div className='col-md-4 col-sm-11'>
                        <label>Mã khách hàng</label>
                        <input
                            {...register("customer_code")}
                            type="text"
                            className="form-control shadow-none mt-2 w-100"
                            disabled
                        />
                    </div>
                    <div className='col-md-4 col-sm-11'>
                        <label>Tên khách hàng</label>
                        <input
                            {...register("customer_name")}
                            type="text"
                            className="form-control shadow-none mt-2 w-100"
                            disabled
                        />
                    </div>
                </div>
                <div className='row row-cols-12 mt-3 ms-3'>
                    <div className='col-md-12 col-sm-12'>
                        <label>Địa chỉ giao</label>
                        <input
                            {...register("address")}
                            type="text"
                            className="form-control shadow-none mt-2 w-100"
                            disabled
                        />
                    </div>
                </div>
                <div className='row row-cols-12 mt-3 ms-3'>
                    <div className='col-md-12 col-sm-12'>
                        <label>Diễn giải</label>
                        <textarea
                            {...register("note", { required: {
                                value: true,
                                message: 'Hãy điền lý do trả hàng'
                            } })}

                            className="form-control shadow-none mt-2 w-100"
                            rows={3}
                        />
                        {errors?.note && <p className="text-danger mt-1">{errors?.note.message}</p>}
                    </div>
                </div>
            </div>
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-end text-end">
                <h3 className="mb-0">Tổng tiền hoàn trả</h3>
                <h3>{formatMoney(orderInfo.final_paid ?? 0)}</h3>
            </div>
        </div>
    );
};

export default OrderReturnInfo;