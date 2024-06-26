import { ORDER_STATUS } from 'constants/order.const';
import React, { ChangeEvent } from 'react';
import { IOrderDetail, IOrderFormUpdate } from 'types/order.type';
import ProductSearchResult from './ProductSearchResult';
import { IProduct } from 'types/product.type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { InputErrorStyles } from 'constants/styles.general.const';
import formatMoney from 'utils/formatMoney';

interface Props {
    orderStatus: string,
    orderDetails: IOrderDetail[],
    productsSearch: Record<number, IProduct[]>,
    handleSelectProduct: (product: IProduct, index: number) => void,
    fetchProduct: (e: ChangeEvent<HTMLInputElement>, searchBy: string, index: number) => void,
    handleQuantityChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void,
    handleRemoveProduct: (index: number) => void,
    register: UseFormRegister<any>,
    errors: FieldErrors<IOrderFormUpdate>
}

const ProductsTable: React.FC<Props> = React.memo((props: Props) => {
    const {
        orderStatus, 
        orderDetails, 
        productsSearch,
        handleSelectProduct, 
        fetchProduct, 
        handleQuantityChange,
        handleRemoveProduct,
        register,
        errors
    } = props;

    return (
        <table className="table table-hover">
            <thead className='table-primary fw-semibold'>
                <tr className='text-white'>
                    <th>STT</th>
                    <th>Mã sản phẩm hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                    <th>% Chiết khấu</th>
                    {orderStatus === ORDER_STATUS.none
                        ? <th>Thao tác</th>
                        : null
                    }
                </tr>
            </thead>
            <tbody className='table-body'>
                {orderDetails.length > 0 && orderDetails
                .filter((orderDetails, index, self) =>
                    index === self.findIndex((o) => o.product_id === orderDetails.product_id))
                .map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                        {orderStatus === ORDER_STATUS.none
                            ? <div className='position-relative'>
                                <input
                                    type="text"
                                    className='form-control'
                                    value={item.product_sku}
                                    {...register(`productSku[${index}]`, {
                                        required: {
                                            value: true,
                                            message: 'Vui lòng chọn sản phẩm muốn thêm'
                                        }
                                    })}
                                    onChange={(e) => fetchProduct(e, 'sku', index)}
                                />
                                {errors.productSku && errors.productSku[index] && 
                                    <InputErrorStyles className="text-danger">{errors.productSku[index]?.message}</InputErrorStyles>
                                }
                                <ProductSearchResult 
                                    index={index} 
                                    productsSearch={productsSearch} 
                                    handleSelectProduct={handleSelectProduct}
                                />
                            </div>
                            : item.product_sku
                        }
                        </td>
                        <td>
                            {orderStatus === ORDER_STATUS.none
                                ? <div className='position-relative'>
                                    <input
                                        type="text"
                                        className='form-control'
                                        value={item.product_name}
                                        {...register(`productName[${index}]`, {
                                            required: {
                                                value: true,
                                                message: 'Vui lòng chọn sản phẩm muốn thêm'
                                            }
                                        })}
                                        onChange={(e) => fetchProduct(e, 'name', index)}
                                    />
                                    {errors.productName && errors.productName[index] && 
                                        <InputErrorStyles className="text-danger">{errors.productName[index]?.message}</InputErrorStyles>
                                    }
                                    <ProductSearchResult 
                                        index={index} 
                                        productsSearch={productsSearch} 
                                        handleSelectProduct={handleSelectProduct}
                                    />
                                </div>
                                : item.product_name
                            }
                        </td>
                        <td>
                        {orderStatus === ORDER_STATUS.none
                            ? <>
                                <input
                                    type="number"
                                    className='form-control'
                                    value={item.quantity || ''}
                                    min={1}
                                    {...register(`quantity[${index}]`, {
                                        required: {
                                            value: true,
                                            message: 'Vui lòng nhập số lượng sản phẩm'
                                        }
                                    })}
                                    onChange={(e) => handleQuantityChange(e, index)}
                                />
                                {errors.quantity && errors.quantity[index] && 
                                    <InputErrorStyles className="text-danger">{errors.quantity[index]?.message}</InputErrorStyles>
                                }
                            </>
                            : item.quantity
                        }
                        </td>
                        <td>{formatMoney(item.product_price)}</td>
                        <td>{formatMoney(item.final_price)}</td>
                        <td>{item.discount}</td>
                        {orderStatus === ORDER_STATUS.none
                            ? <td>
                                <button type="button" className='btn btn-danger' onClick={() => handleRemoveProduct(index)}>
                                    Xoá
                                </button>
                            </td>
                            : null
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    );
});

export default ProductsTable;