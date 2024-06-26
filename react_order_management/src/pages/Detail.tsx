import axios from 'axios';
import { API_URL } from 'config';
import { defaultOrderData} from 'constants/order.const';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IOrder, IOrderDetail, IOrderFormUpdate } from 'types/order.type';
import { useForm } from 'react-hook-form';
import OrderModalPay from 'modules/Order/OrderModalPay';
import OrderDetailHeading from './Order/partials/Detail/OrderDetailHeading';
import OrderDetailTabs from './Order/partials/Detail/OrderDetailTabs';
import OrderDetailForm from './Order/partials/Detail/OrderDetailForm';
import OrderDetailPayment from './Order/partials/Detail/OrderDetailPayment';
import Loading from 'components/layout/Loading';

const keysOrder: (keyof IOrder)[] = [
    'customer_id',
    'sale_id',
    'total_price',
    'final_price',
    'total_paid',
    'order_status',
    'address',
    'is_vat',
    'note',
    'warehouse_id',
    'date_delivery',
    'listOrderDetails'
];

const Detail = React.memo(() => {
    const params = useParams();
    const [orderUpdate, setOrderUpdate] = React.useState<IOrder>(defaultOrderData);
    const [orderInfo, setOrderInfo] = React.useState<any>({});
    const [orderPayments, setOrderPayments] = React.useState<any[]>([]);
    const [orderDetails, setOrderDetails] = React.useState<IOrderDetail[]>([]);
    const [isUpdateProduct, setisUpdateProduct] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const {handleSubmit, register, setValue, unregister, setError, formState: {errors, isSubmitting}} = useForm<IOrderFormUpdate>({
        mode: 'onSubmit',
    });

    const getOrderInfo = async (id: number|any, isLoading = false) => {
        if (!id) {
            return;
        }
        
        try {
            if (isLoading) {
                setLoading(true);
            }
            const urlRequest = `${API_URL}/order/show/${id}`;
            const response = await axios.get(urlRequest);

            if (response.status === 200 && response.data.data) {
                const result = response.data.data;

                //Update Order
                setOrderInfo(result);
                setOrderDetails(result.order_details);
                setOrderPayments(result.payments ?? []);

                const newOrderUpdate: Partial<IOrder> = { ...orderUpdate };
                keysOrder.forEach(key => {
                    if (key === 'listOrderDetails') {
                        newOrderUpdate[key] = result.order_details;
                    } else {
                        newOrderUpdate[key] = result[key];
                    }
                });
                setOrderUpdate(newOrderUpdate as IOrder);

                setValue('sale_id', result.sale_id);
                setValue('address', result.address);
                setValue('note', result.note);
                setisUpdateProduct(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (isLoading) {
                setLoading(false);
            }
        }
    };

    const refreshOrderPage = () => {
        getOrderInfo(params.id);
    };

    React.useEffect(() => {
        getOrderInfo(params.id, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return !loading ? (
        <>      
            <div className='bg-white h-100 p-3'>
                <OrderDetailHeading orderCode={orderInfo.order_code} orderStatus={orderInfo.order_status} />
                <OrderDetailTabs />
                <div className="tab-content" id="orderTabContent">
                    <OrderDetailForm 
                        errors={errors}
                        getOrderInfo={getOrderInfo}
                        handleSubmit={handleSubmit}
                        id={params.id ?? ""}
                        isSubmitting={isSubmitting}
                        isUpdateProduct={isUpdateProduct}
                        setisUpdateProduct={setisUpdateProduct}
                        orderDetails={orderDetails}
                        setOrderDetails={setOrderDetails}
                        orderInfo={orderInfo}
                        orderUpdate={orderUpdate}
                        setOrderUpdate={setOrderUpdate}
                        register={register}
                        unregister={unregister}
                        setValue={setValue}
                        setError={setError}
                    />
                    <OrderDetailPayment payments={orderPayments}/>
                </div>
            </div>
            <OrderModalPay data={orderInfo} refreshOrdersPage={refreshOrderPage}></OrderModalPay>
        </>
    ) : <Loading />;
});

export default Detail;
