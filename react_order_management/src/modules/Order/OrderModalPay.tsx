import styled from 'styled-components';
import OrderInfo from './ModalPayment/OrderInfo';
import OrderProduct from './ModalPayment/OrderProduct';
import { EPaymentMethod, IPaymentData } from 'types/payment.type';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import axios from 'axios';
import { API_URL } from 'config';
import React from 'react';
import Loading from 'components/layout/Loading';
import { LoadingOverlayStyles } from 'constants/styles.general.const';
import { useAlert } from 'contexts/alert-context';
import Alert from 'components/layout/Alert';
import formatMoney from 'utils/formatMoney';

interface Props {
    data: any,
    refreshOrdersPage: () => void
}

const ModalDialogStyles = styled.div`
    max-width: 96%;

    .col-left {
        gap: 20px 0;
    }
`;

const ButtonCloseStyles = styled.button`
    position: absolute;
    z-index: 20;
    top: 20px;
    right: 20px;
    cursor: pointer;
`;

const PaymentSchema = yup.object().shape({
    amount: yup
        .number()
        .transform((value, originalValue) => (String(originalValue).trim() === '' ? null : value))
        .required("Vui lòng nhập số tiền thanh toán")
        .typeError("Số tiền thanh toán phải là một số"),
    payment_method: yup
        .mixed<EPaymentMethod>()
        .oneOf(Object.values(EPaymentMethod), 'Phương thức thanh toán không hợp lệ')
        .required('Vui lòng chọn phương thức thanh toán')
});

const OrderModalPay = ({data, refreshOrdersPage}: Props) => {
    const { handleSubmit, register, setValue, reset, formState: { errors, isSubmitting} } = useForm<IPaymentData>({
        resolver: yupResolver(PaymentSchema),
    });

    const [excessMoney, setExcessMoney] = React.useState(0);
    const [originTotalPayment, setOriginTotalPayment] = React.useState(0);
    const [amout, setAmout] = React.useState(0);
    const { showAlert, setShowAlert, setAlertMessage } = useAlert();

    const handlePayment = async (values: IPaymentData) => {
        try {
            const query = `${API_URL}/order/payment/store`;
            
            if (values.amount > data.final_price - data.total_paid) {
                const execessPayment = values.amount - (data.final_price - data.total_paid);

                setExcessMoney(execessPayment);
                setOriginTotalPayment(data.final_price - data.total_paid);
                setAmout(values.amount);
            }
            values = {...values, excess_money: excessMoney};
            const response = await axios.post(query, values);

            if (response.status === 200) {
                refreshOrdersPage();
                setShowAlert(true);
                setAlertMessage('Thanh toán hoá đơn thành công');
                reset();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCloseModal = () => {
        setExcessMoney(0);
    };

    return (
        <div className="modal fade" id="modal-payment" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <ModalDialogStyles className="modal-dialog">
                <form className='form-group position-relative' onSubmit={handleSubmit(handlePayment)}>
                    <div className="modal-content">
                        <div className="modal-header row">
                            <div className="col-12">
                                {showAlert && <Alert />}
                            </div>
                            <div className="col-12 row justify-content-between align-items-center">
                                <h2 className="modal-title fs-5 col-11" id="exampleModalLabel">
                                    Thu tiền đơn hàng: {data?.order_code}
                                </h2>
                                <button type="button" className="btn-close position-relative z-3 col-1" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body">
                            <OrderInfo 
                                data={data} 
                                register={register} 
                                errors={errors}
                                reset={reset}
                                setValue={setValue}
                            />
                            <input type="hidden" {...register('order_id')} defaultValue={data.id}/>
                            <input type="hidden" {...register('customer_id')} defaultValue={data.customer_id}/>
                            <OrderProduct orderDetails={data.order_details ?? []}></OrderProduct>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                            <button type="submit" className={`btn btn-primary ${isSubmitting ? 'disabled' : ''}`}>Lưu</button>
                        </div>
                        {!isSubmitting && excessMoney > 0 && 
                            <ButtonCloseStyles type="button" className="btn btn-secondary" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                Đóng
                            </ButtonCloseStyles>
                        }
                    </div>
                    {isSubmitting && <Loading />}
                    {!isSubmitting && excessMoney > 0 && <LoadingOverlayStyles className="position-absolute w-100 h-100 bg-secondary-subtle">
                        <ul className="list-group shadow-sm position-relative z-3">
                            <li className="list-group-item fs-4 fw-medium">
                                Số tiền cần thanh toán: 
                                <strong className='ps-3 text-primary'>{formatMoney(originTotalPayment)}</strong>
                            </li>
                            <li className="list-group-item fs-4 fw-medium">
                                Số tiền thanh toán: 
                                <strong className='ps-3 text-primary'>{formatMoney(amout)}</strong>
                            </li>
                            <li className="list-group-item fs-4 fw-medium">
                                Số tiền thừa:
                                <strong className='ps-3 text-primary'>{formatMoney(excessMoney)}</strong>
                            </li>
                        </ul>
                    </LoadingOverlayStyles>}
                </form>
            </ModalDialogStyles>
        </div>
    );
};

export default OrderModalPay;