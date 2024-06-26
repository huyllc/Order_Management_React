import useReturnOrderId from 'hooks/useReturnOrderId';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { IReturnOrderList } from 'types/returnOrder.type';
import axios from 'axios';
import { API_URL } from 'config';
import { styled } from 'styled-components';
import formatMoney from 'utils/formatMoney';
import Loading from 'components/layout/Loading';

const BodyStyles = styled.div`
    background-color: #E9F5FE;
`;

const ReturnOrderDetailId = () => {
    const { id } = useParams<{ id: string }>();
    const numericId = Number(id);
    const { returnOrder, loading } = useReturnOrderId(numericId);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<IReturnOrderList>({
        mode: "onSubmit",
        defaultValues: {
            order_code: returnOrder.order_code,
            customer_code: returnOrder.customer_code,
            customer_name: returnOrder.customer_name,
            address: returnOrder.address,
            total_price: parseFloat(formatMoney(returnOrder.total_price)),
            note: returnOrder.note,
            list_order: returnOrder.list_order
        }
    });
   
    useEffect(() => {
        reset(returnOrder);
    }, [returnOrder, reset]);

    const createReturnOrder = async (values: IReturnOrderList) => {
        try {
            await axios.post(`${API_URL}/return-order`, values);
            alert('Create Successful');
            navigate('/return-orders');
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
        <div>
            <div className="container-fluid w-100 bg-white h-100 p-3">
                <div className="header_card">
                    <div className="col-auto">
                        <h2 className="header_text">Mã đơn hàng {returnOrder.order_code} </h2>
                    </div>
                </div>
                <div className="body_card h-auto">
                    <form onSubmit={handleSubmit(createReturnOrder)}>
                        <div className='row'>
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
                                        {errors?.customer_code && <p style={{ color: 'red' }}>{errors?.customer_code.message}</p>}
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
                                            name="address"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className='row row-cols-12 mt-3 ms-3'>
                                    <div className='col-md-12 col-sm-12'>
                                        <label>Diễn giải</label>
                                        <textarea 
                                            {...register("note")}
                                            className="form-control shadow-none mt-2 w-100"
                                            name="address"
                                            rows={3}
                                            disabled
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex pe-3 flex-column justify-content-center align-items-end text-end">
                                <h3 className="mb-0">Tổng tiền hoàn trả</h3>
                                <h3>{formatMoney(returnOrder.total_price)}</h3>
                            </div>
                        </div>
                        <div>
                            <table className='table table-hover'>
                                <thead className='table-primary fw-semibold'>
                                    <tr className='text-white'>
                                        <th>Mã sản phẩm</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Thành tiền</th>
                                        <th>Số lượng trả</th>  
                                        <th>% Giảm giá</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {returnOrder.list_order.length > 0 && returnOrder.list_order.map((returnOrders, index) => (
                                        <tr key={index}>
                                            <td>{returnOrders.product_sku}</td>
                                            <td>{returnOrders.product_name}</td>
                                            <td>{formatMoney(returnOrders.product_price)}</td>                      
                                            <td>{returnOrders.quantity_return}</td>
                                            <td>{returnOrders.discount}</td>
                                            <td>{formatMoney(returnOrders.total_price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
};

export default ReturnOrderDetailId;