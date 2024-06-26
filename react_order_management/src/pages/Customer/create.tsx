import axios from 'axios';
import { API_URL } from 'config';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ICustomerList } from 'types/customer.type';
import { formData } from './constants/formData';

const BodyStyles = styled.div`
    background-color: #E9F5FE;
`;

const CreateCustomer = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<ICustomerList>({
        mode: "onSubmit",
        defaultValues: {
            type: [],
            name: '',
            customer_code: '',
            email: '',
            tax_code: '',
            address: '',
            phone: '',
        }
    });

    const type = useWatch({
        control,
        name: 'type',
    });

    const createCustomer = async (values: ICustomerList) => {
        try {
            const data = formData(values);
            await axios.post(`${API_URL}/customer`, data);
            alert("Tạo thành công");
            navigate('/customers'); 
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors) {
                    const errors = error.response?.data?.errors;
                    Object.keys(errors).forEach(key => {
                        setError(key as keyof ICustomerList, {type: 'manual', message: errors[key][0]});
                    });
                }
            }
        }
    };

    return (
        <div className="container-fluid d-flex flex-column w-100 bg-white h-100">
            <div className="header_card">
                <div className='col-12 row justify-content-between align-items-center'>
                    <h2 className="header_text">Thêm mới khách hàng </h2>
                </div>
            </div>
            <BodyStyles className="body_card h-auto pb-5 g-0">
                <form onSubmit={handleSubmit(createCustomer)}>
                    <div className='row row-cols-12 mt-3 ms-3'>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    {...register("type", { required: {
                                        value: true,
                                        message: 'Hãy chọn kiểu khách hàng'
                                    } })}
                                    className="form-check-input shadow-none"
                                    type="radio"
                                    value="self"
                                    id="self"
                                />
                                <label className="form-check-label" htmlFor="self">Cá nhân</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    {...register("type")}
                                    className="form-check-input"
                                    type="radio"
                                    value="company"
                                    id="company"
                                />
                                <label className="form-check-label" htmlFor="company">Công ty</label>
                            </div>
                        </div>
                        {errors?.type && <p className="text-danger mt-1">{errors?.type.message}</p>}
                    </div>
                    <div className='row row-cols-12 mt-3 ms-3'>
                        <div className='col-md-3 col-sm-11'>
                            <label>Mã khách hàng</label>
                            {type.includes('self') ? (
                                <input
                                    type="text"
                                    className='form-control shadow-none mt-2 w-100'
                                    disabled
                                />
                            ) : (
                                <input
                                    {...register('customer_code', { required: {
                                        value: true,
                                        message: 'Hãy nhập mã khách hàng'
                                    } })}
                                    type="text"
                                    className='form-control shadow-none mt-2 w-100'
                                />
                            )}
                            {errors?.customer_code && <p className="text-danger mt-1">{errors?.customer_code.message}</p>}
                        </div>
                        <div className='col-md-5 col-sm-11'>
                            <label>Tên khách hàng</label>
                            <input
                                {...register("name", { required: {
                                    value: true,
                                    message: 'Hãy nhập tên'
                                } })}
                                type="text"
                                className="form-control shadow-none mt-2 w-100"
                            />
                           {errors?.name && <p className="text-danger mt-1">{errors?.name.message}</p>}
                        </div>
                    </div>
                    <div className='row row-cols-12 mt-3 ms-3'>
                        <div className='col-md-4 col-sm-11'>
                            <label>Email</label>    
                            <input
                                {...register("email", { required: {
                                    value: true,
                                    message: 'Hãy nhập email'
                                } })}
                                type="email"
                                className="form-control shadow-none mt-2 w-100"
                                name="email"
                            />
                            {errors?.email && <p className="text-danger mt-1">{errors?.email.message}</p>}
                        </div>
                        <div className='col-md-4 col-sm-11'>
                            <label>Số điện thoại</label>
                            <input
                                {...register("phone", { required: {
                                    value: true,
                                    message: 'Hãy nhập số điện thoại'
                                }, pattern: {
                                    value: /^\d+$/,
                                    message: "Số điện thoại chỉ được chứa các ký tự số"
                                } })}
                                type="tel"
                                className='form-control shadow-none mt-2 w-100'
                                name="phone"
                            />
                            {errors?.phone && <p className="text-danger mt-1">{errors?.phone.message}</p>}
                        </div>
                        <div className='col-md-3 col-sm-11'>
                            <label>Mã số thuế</label>
                            {type.includes('self') ? (
                                <input
                                    type="text"
                                    className='form-control shadow-none mt-2 w-100'
                                    name="tax_code"
                                    disabled
                                />
                            ) : (
                                <input
                                    {...register('tax_code', { required: {
                                        value: true,
                                        message: 'Hãy nhập mã số thuế'
                                    } })}
                                    type="text"
                                    className='form-control shadow-none mt-2 w-100'
                                />
                            )}
                             {errors?.tax_code && <p className="text-danger mt-1">{errors?.tax_code.message}</p>}
                        </div>
                    </div>
                    <div className='row row-cols-12 mt-3 ms-3'>
                        <div className='col-md-11 col-sm-11'>
                            <label>Địa chỉ</label>
                            <input
                                {...register("address", { required: {
                                    value: true,
                                    message: 'Hãy nhập địa chỉ'
                                } })}
                                type="text"
                                className="form-control shadow-none mt-2 w-100"
                                name="address"
                            />
                            {errors?.address && <p className="text-danger mt-1">{errors?.address.message}</p>}
                        </div>
                    </div>
                    <div className='row row-cols-12 mt-3 ms-3 '>
                        <div className='col-md-12 col-sm-12 text-center pt-3'>
                            <button className="btn btn-success" type="submit">Thêm mới</button>
                        </div>
                    </div>
                </form>
            </BodyStyles>
        </div>
    );
};

export default CreateCustomer;
