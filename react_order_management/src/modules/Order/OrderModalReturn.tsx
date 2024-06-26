import React, { ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from 'config';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import OrderReturnProduct from './ModalPayment/OrderReturnProduct';
import { IReturnOrderList } from 'types/returnOrder.type';
import { IOrderDetail } from 'types/order.type';
import OrderReturnInfo from './ModalPayment/OrderReturnInfo';
import { useAlert } from 'contexts/alert-context';
import Loading from 'components/layout/Loading';
import Alert from 'components/layout/Alert';

interface IOrderModalReturnProps {
    data: any,
    toReturnOrdersPage: () => void
}

const ModalDialogStyles = styled.div`
    max-width: 96%;

    .col-left {
        gap: 20px 0;
    }
`;

const OrderReturn = ({ data, toReturnOrdersPage }: IOrderModalReturnProps) => {
    const [orderReturnDetails, setOrderDetails] = React.useState<IOrderDetail[]>([]);
    const [orderInfo, setOrderInfo] = React.useState<any>({});
    const [isCreate, setCreate] = React.useState(false);
    const {showAlert, setAlertMessage,setShowAlert} = useAlert();
    
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm<IReturnOrderList>({
        mode: "onSubmit",
    });
    
    useEffect(() => {
        setOrderInfo(data);
        setOrderDetails(data.list_order);
        reset(data);
    }, [data, reset]);

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(e.target.value, 10) || 0;
        const updatedOrderReturnDetails = [...orderReturnDetails];
        const productPrice = updatedOrderReturnDetails[index].product_price || 0;
        const productDiscount = updatedOrderReturnDetails[index].discount || 0;
        const status = "return";
        const newTotalPrice = productPrice * newQuantity * (1 - productDiscount / 100);
        
        updatedOrderReturnDetails[index] = {
            ...updatedOrderReturnDetails[index],
            status: status,
            quantity_return: newQuantity || 0,
            total_price: parseFloat(newTotalPrice.toFixed(2)) || 0.0,
        };
        
        const filteredOrderReturnDetails = updatedOrderReturnDetails
            .filter((returnOrder, idx, self) =>
                idx === self.findIndex((o) => o.product_id === returnOrder.product_id)
            )

        setOrderDetails(filteredOrderReturnDetails);
        updateTotalPaid(updatedOrderReturnDetails);
        const allQuantitiesFilled = updatedOrderReturnDetails.some(detail => detail.quantity_return !== 0);
        setCreate(allQuantitiesFilled);
    };

    const updateTotalPaid = (orderDetails: IOrderDetail[]) => {
        let finalPaid = orderDetails.reduce((sum, item) => sum + item.total_price, 0);
        finalPaid = finalPaid + (finalPaid * 10 / 100);
        setOrderInfo((prevInfo: any) => ({ ...prevInfo, final_paid: finalPaid.toFixed(2)}));
    };

    useEffect(() => {
    }, [orderReturnDetails]);;

    const createReturnOrder = async (values: IReturnOrderList) => {
        try {
            if (isCreate) {
                const updatedValues = {
                    ...values,
                    list_order: orderReturnDetails,
                    order_detail_id: orderInfo.id,
                    total_price: orderInfo.final_paid,
                };
                const response = await axios.post(`${API_URL}/return-order/${data.id}}`, updatedValues);

                if (response.status === 200) {
                    toReturnOrdersPage();
                    setAlertMessage('Trả đơn hàng thành công');
                    setShowAlert(true);
                    reset();
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors) {
                    const errors = error.response?.data?.errors;
                    Object.keys(errors).forEach(key => {
                        setError(key as keyof IReturnOrderList, {type: 'manual', message: errors[key][0]});
                    });
                }
            }  
        }
    };

    return (
        <div className="modal" id="modal-return-order" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <ModalDialogStyles className="modal-dialog">
                <form onSubmit={handleSubmit(createReturnOrder)} className='postion-relative'>
                    <div className="modal-content bg-white ">
                        <div className="modal-header row">
                            <div className="col-12">
                                {showAlert && <Alert />}
                            </div>
                            <div className='col-12 row justify-content-between align-items-center'>
                                <h1 className="modal-title fs-5 col-11" id="exampleModalLabel">
                                    Mã đơn hàng bị trả {data.order_code}
                                </h1>
                                <button type="button" className="btn-close position-relative z-3 col-1" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className='modal-body row'>
                            <OrderReturnInfo
                                orderInfo={orderInfo}
                                register={register}
                                errors={errors}
                            />
                            <OrderReturnProduct 
                                orderReturnDetails={orderReturnDetails ?? []}
                                register={register}
                                errors={errors}
                                handleQuantityChange={handleQuantityChange}
                            />
                        </div>
                        <div className='modal-footer'>
                            <div className='row row-cols-12 mt-3 ms-3 '>
                                <div className='col-md-12 col-sm-12 text-center pt-3'>
                                    <button className="btn btn-primary" type="submit">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isSubmitting && <Loading />}
                </form>
            </ModalDialogStyles>
        </div>
    );
};

export default OrderReturn;
