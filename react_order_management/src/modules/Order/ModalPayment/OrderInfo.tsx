import { InputErrorStyles } from "constants/styles.general.const";
import React, { useEffect } from "react";
import { FieldErrors, UseFormRegister, UseFormReset, UseFormSetValue } from "react-hook-form";
import { EPaymentMethod, IPaymentData } from "types/payment.type";
import formatMoney from "utils/formatMoney";

interface Props {
    data: any,
    register: UseFormRegister<IPaymentData>,
    errors: FieldErrors<IPaymentData>,
    reset: UseFormReset<IPaymentData>,
    setValue: UseFormSetValue<IPaymentData>
}

const OrderInfo = ({data, register, errors, setValue, reset}: Props) => {
    const [formatAmount, setFormatAmout] = React.useState('0');

    const handleChangeAmount = (value: string) => {
        if (value === "") {
            setFormatAmout(formatMoney(0));
        } else {
            setFormatAmout(formatMoney(parseFloat(value)));
        }
    };

    useEffect(() => {
        setFormatAmout(formatMoney(0));
        setValue('amount', 0);
        reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className="row mb-5 align-items-end">
            <div className="row col-10 col-left">
                <div className="row gap-5 mb-3">
                    <div className="col-auto">
                        <select 
                            className="form-select" 
                            aria-label="Select Payment Method"
                            {...register('payment_method')}
                        >
                            <option value="">Phương thức thanh toán</option>
                            <option value={EPaymentMethod.Cash}>Tiền mặt</option>
                            <option value={EPaymentMethod.Credit}>Chuyển khoản</option>
                        </select>
                        {errors?.payment_method && <InputErrorStyles className="text-danger">{errors?.payment_method?.message}</InputErrorStyles>}
                    </div>
                    <div className="col-6">
                        <div className="row g-3">
                            <div className="col-auto">
                                <label htmlFor="amount" className="col-form-label">Số tiền thanh toán</label>
                            </div>
                            <div className="col-6">
                                <div className="d-flex gap-2">
                                    <input type="number" id="amount" className="form-control flex-shrink-0" 
                                        {...register('amount')}
                                        min={0}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleChangeAmount(e.target.value);
                                        }}
                                    />
                                    <h4>{formatAmount}</h4>
                                </div>
                                {errors?.amount && <InputErrorStyles className="text-danger">{errors?.amount?.message}</InputErrorStyles>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <label className="form-label">Mã khách hàng</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.customer_code} />
                </div>
                <div className="col-6">
                    <label className="form-label">Tên Khách hàng</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.customer_name} />
                </div>
                <div className="col-3">
                    <label className="form-label">Số điện thoại</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.customer_phone} />
                </div>
                <div className="col-3">
                    <label className="form-label">Nhân viên bán hàng</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.sale_name} />
                </div>
                <div className="col-6">
                    <label className="form-label">Email</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.customer_email} />
                </div>
                <div className="col-3">
                    <label className="form-label">Mã số thuế</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.customer_tax} />
                </div>
                <div className="col-5 align-self-start">
                    <label className="form-label">Địa chỉ giao hàng</label>
                    <input type="text" className="form-control" disabled defaultValue={data?.address} />
                </div>
                <div className="col-6">
                    <label className="form-label">Diễn giải</label>
                    <textarea className="form-control" disabled defaultValue={data?.note}>
                    </textarea>
                </div>
            </div>
            <div className="col-2">
            <div className="d-flex flex-column align-items-end mb-3">
                    <strong className="mb-0 text-primary">Tổng tiền thanh toán</strong>
                    <h3>{formatMoney(data.final_price)}</h3>
                </div>
                <div className="d-flex flex-column align-items-end mb-3">
                    <strong className="mb-0 text-primary">Số tiền đã thanh toán</strong>
                    <h3>{formatMoney(data.total_paid)}</h3>
                </div>
                <div className="d-flex flex-column align-items-end mb-3">
                    <strong className="mb-0 text-primary">Số tiền còn thiếu</strong>
                    <h3>
                        {data.final_price - data.total_paid > 0 
                            ? formatMoney(data.final_price - data.total_paid) 
                            : 0
                        }
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;