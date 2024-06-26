import React, { ChangeEvent } from 'react';
import ButtonActions from './OrderForm/ButtonActions';
import Loading from 'components/layout/Loading';
import ProductsTable from './OrderForm/ProductsTable';
import OrderInfo from './OrderInfo';
import { IOrder, IOrderDetail, IOrderFormUpdate } from 'types/order.type';
import { IProduct } from 'types/product.type';
import { defaultOrderDetail } from 'constants/order.const';
import { FieldErrors, SubmitHandler, UseFormRegister, UseFormSetValue, UseFormUnregister, UseFormSetError } from 'react-hook-form';
import { useAlert } from 'contexts/alert-context';
import { API_URL } from 'config';
import axios from 'axios';

interface Props {
    orderDetails: IOrderDetail[];
    setOrderDetails: React.Dispatch<React.SetStateAction<IOrderDetail[]>>;
    orderUpdate: IOrder;
    setOrderUpdate: React.Dispatch<React.SetStateAction<IOrder>>;
    setValue: UseFormSetValue<IOrderFormUpdate>;
    isUpdateProduct: boolean;
    setisUpdateProduct: React.Dispatch<React.SetStateAction<boolean>>;
    handleSubmit: (onValid: SubmitHandler<IOrderFormUpdate>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<IOrderFormUpdate>;
    errors: FieldErrors<IOrderFormUpdate>;
    unregister: UseFormUnregister<IOrderFormUpdate>;
    orderInfo: any;
    isSubmitting: boolean;
    id: string;
    getOrderInfo: (id: number|any) => void,
    setError: UseFormSetError<IOrderFormUpdate>
}

const OrderDetailForm = (props: Props) => {
    const {
        id,
        orderDetails,
        setOrderDetails,
        orderUpdate,
        setOrderUpdate,
        setValue,
        isUpdateProduct,
        setisUpdateProduct,
        handleSubmit,
        register,
        errors,
        unregister,
        orderInfo,
        isSubmitting,
        getOrderInfo,
        setError
    } = props;

    const { setShowAlert, setAlertMessage } = useAlert();
    const [productsSearch, setProductsSearch] = React.useState<Record<number, IProduct[]>>({});

    const addOrderDetail = () => {
        setOrderDetails([...orderDetails, { ...defaultOrderDetail }]);
    };

    const fetchProduct = async (e: ChangeEvent<HTMLInputElement>, searchBy: string, index: number) => {
        setOrderDetails(prevOrderDetails => {
            const updatedOrderDetails = [...prevOrderDetails];

            updatedOrderDetails[index] = {
                ...updatedOrderDetails[index],
                [searchBy === 'sku' ? 'product_sku' : 'product_name']: e.target.value,
            };
            
            return updatedOrderDetails;
        });

        if (e.target.value === '') {
            setProductsSearch([]);
            return;
        }

        const query = searchBy === 'sku'
            ? `${API_URL}/product/sku?sku=${e.target.value}`
            : `${API_URL}/product/name?name=${e.target.value}`;

        try {
            const response = await axios.get(query);

            if (response.data) {
                setProductsSearch({...productsSearch, [index]: response.data,});
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectProduct = (product: IProduct, index: number) => {
        const updatedOrderDetails = [...orderDetails];
        const totalPrice = product.price * (updatedOrderDetails[index].quantity || 1);
        const finalPrice = totalPrice * (1 - product.discount / 100);

        updatedOrderDetails[index] = {
            ...updatedOrderDetails[index],
            id: 0,
            order_id: parseInt(id ?? "0"),
            product_id: product.id,
            product_sku: product.sku,
            product_name: product.name,
            product_price: product.price,
            discount: product.discount,
            total_price: parseFloat(totalPrice.toFixed(4)),
            final_price: parseFloat(finalPrice.toFixed(4)),
        };

        setOrderDetails(updatedOrderDetails);
        setOrderUpdate({...orderUpdate, listOrderDetails: updatedOrderDetails});
        setisUpdateProduct(true);
        setProductsSearch([]);
        setValue(`productSku.${index}`, product.sku);
        setValue(`productName.${index}`, product.name);
    };

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const newQuantity = parseInt(e.target.value, 10) || 0;

        const updatedOrderDetails = [...orderDetails];
        const productPrice = updatedOrderDetails[index].product_price || 0;
        const productDiscount = updatedOrderDetails[index].discount || 0;
        const newTotalPrice = productPrice * newQuantity;
        const newFinalPrice = newTotalPrice * (1- productDiscount / 100);

        updatedOrderDetails[index] = {
            ...updatedOrderDetails[index],
            quantity: newQuantity,
            total_price: parseFloat(newTotalPrice.toFixed(4)),
            final_price: parseFloat(newFinalPrice.toFixed(4)),
        };

        setOrderDetails(updatedOrderDetails);
        setOrderUpdate({...orderUpdate, listOrderDetails: updatedOrderDetails});
        setisUpdateProduct(true);
    };

    const handleRemoveProduct = (index: number) => {
        if (orderDetails[index].product_id > 0) {
            setisUpdateProduct(true);
        }

        setOrderDetails(prevOrderDetails => {
            const updatedOrderDetails = [...prevOrderDetails];
            updatedOrderDetails.splice(index, 1);
            setOrderUpdate({...orderUpdate, listOrderDetails: updatedOrderDetails});

            return updatedOrderDetails;
        });

        unregister(`productSku.${index}`);
        unregister(`productName.${index}`);
        unregister(`quantity.${index}`);
    };

    const handleUpdateOrder = async (values: IOrderFormUpdate) => {
        console.log(123);
        if (
            isUpdateProduct 
            || orderUpdate.sale_id !== values.sale_id 
            || orderUpdate.address !== values.address 
            || orderUpdate.note !== values.note
        ) {
            const newOrderUpdate = {...orderUpdate,
                sale_id: values.sale_id,
                address: values.address,
                note: values.note,
                total_price: orderUpdate.listOrderDetails.reduce((total, orderDetail) => total + orderDetail.total_price, 0),
                final_price: orderUpdate.listOrderDetails.reduce((total, orderDetail) => total + orderDetail.final_price, 0),
            };

            setOrderUpdate(newOrderUpdate);

            try {
                const response = await axios.put(`${API_URL}/order/update/${id}`, newOrderUpdate);

                if (!response.data.error) {
                    getOrderInfo(id);
                    setShowAlert(true);
                    setAlertMessage('Cập nhật đơn hàng thành công');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data?.errors) {
                        const errors = error.response?.data?.errors;

                        for (const key of Object.keys(errors)) {
                            if (key) {
                                const match = key.match(/\d+/);
                                
                                if (match && Array.isArray(match)) {
                                    const index = +match[0];
                                    setError(`quantity.${index}`, {type: 'manual', message: errors[key][0]});
                                }
                            }
                        }
                    }
                }  
            }   
        }
    };

    return (
        <div id='order-detail-info' className="tab-pane fade show active" role="tabpanel">
            <form onSubmit={handleSubmit(handleUpdateOrder)}>
                <OrderInfo 
                    orderInfo={orderInfo}
                    register={register}
                    errors={errors}
                />
                <ProductsTable 
                    orderStatus={orderInfo.order_status}
                    orderDetails={orderDetails}
                    productsSearch={productsSearch}
                    handleSelectProduct={handleSelectProduct}
                    fetchProduct={fetchProduct}
                    handleQuantityChange={handleQuantityChange}
                    handleRemoveProduct={handleRemoveProduct}
                    register={register}
                    errors={errors}
                />
                <ButtonActions 
                    orderStatus={orderInfo.order_status} 
                    addOrderDetail={addOrderDetail}
                />
                {isSubmitting && <Loading />}
            </form>
        </div>
    );
};

export default OrderDetailForm;