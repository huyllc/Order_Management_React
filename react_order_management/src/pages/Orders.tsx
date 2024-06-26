import axios from 'axios';
import IconPlus from 'components/icons/IconPlus';
import IconReload from 'components/icons/IconReload';
import Pagination from 'components/layout/Pagination';
import { API_URL } from 'config';
import { defaultPagination } from 'constants/general.const';
import { useQuery } from 'hooks/useQuery';
import OrderListTable from 'pages/Order/partials/List/OrderListTable';
import OrderModalPay from 'modules/Order/OrderModalPay';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OrderModalReturn from 'modules/Order/OrderModalReturn';
import styled from 'styled-components';
import { IPagination } from 'types/pagination.type';
import BlockSearch from 'pages/Order/partials/List/BlockSearch';
import { useForm } from 'react-hook-form';
import { IOrderSearchParams } from 'types/search.type';
import formatDate from 'utils/formatDate';
import Loading from 'components/layout/Loading';

const ActionsStyles = styled.div`
    a {
        width: 40px;
        height: 40px;
    }
`;

const Orders = () => {
    const [orders, setOrders] = React.useState([]);
    const [orderDetail, setOrderDetail] = React.useState({});
    const [pagination, setPagination] = React.useState<IPagination>(defaultPagination);
    const page = useQuery().get('page') || '1';
    const [orderSelected, setOrderSelected] = React.useState<number|null>(null);
    const location = useLocation();
    const {handleSubmit, control, setValue} = useForm<IOrderSearchParams>();
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState(false);

    const getOrdersList = async (query?: string) => {
        setLoading(true);

        try {
            const urlRequest = `
                ${API_URL}/order/list${query ?? ''}${query ? '&limit=5' : '?limit=5'}${page ? `&page=${page}` : ''}
            `;

            const response = await axios.get(urlRequest);

            if (response.status === 200 && response.data.data) {
                setOrders(response.data.data);
                setPagination(response.data.meta);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    };

    const getOrderDetail = async (id: number|null) => {
        if (!id) {
            return;
        }
        try {
            const urlRequest = `${API_URL}/order/show/${id}`;
            const response = await axios.get(urlRequest);

            if (response.status === 200 && response.data.data) {
                const orderData = response.data.data;
                orderData.note = '';
                orderData.list_order.forEach((detail: any) => {
                    detail.total_price = 0;
                    detail.quantity_return = 0;
                });
                setOrderDetail(orderData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshOrdersPage = () => {
        getOrderDetail(orderSelected);
        getOrdersList(location.search);
    };

    const handleSubmitSearch = (values: IOrderSearchParams) => {
        console.log(values);
        values = {...values, 
            date_from: values.date_from ? formatDate(values.date_from): null,
            date_end: values.date_end ? formatDate(values.date_end) : null,
        };

        const queryUrl = formatSearchQueryUrl(values);

        navigate(queryUrl);
        setShowFilter(false);
    };

    const formatSearchQueryUrl = (data: IOrderSearchParams) => {
        let url = '?search=true';

        for(let key in data) {
            if (data.hasOwnProperty(key)) {
                const typedKey = key as keyof IOrderSearchParams;
                const value = data[typedKey];

                if (Array.isArray(value) && value.length > 0) {
                    url += `&${key}=`;

                    // eslint-disable-next-line no-loop-func
                    value.forEach(item => {
                        url += `${item.value},`;
                    });

                    url = url.replace(/(,)+&/g, '&').replace(/,$/, '');
                }
            }
        }

        if (typeof data.date_from === "string") {
            url += `&date_from=${data.date_from}`;
        }

        if (typeof data.date_end === "string") {
            url += `&date_end=${data.date_end}`;
        }

        return url;
    };

    useEffect(() => {
        getOrdersList(location.search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

    useEffect(() => {
        getOrderDetail(orderSelected);
    }, [orderSelected])
    
    return (
        <>
            <div className='bg-white h-100 p-3'>
                <div className="row mb-4">
                    <div className="col-9">
                        <div className="row">
                            <div className="col-3">
                                <form action=""  onSubmit={handleSubmit(handleSubmitSearch)}>
                                    <BlockSearch
                                        control={control}
                                        showFilter={showFilter}
                                        setShowFilter={setShowFilter}
                                        setValue={setValue}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <ActionsStyles className="col-3 d-flex justify-content-end gap-2">
                        <Link to='/orders/add' className='btn btn-primary d-flex align-items-center justify-content-center'>
                            <IconPlus />
                        </Link>
                        <Link to={''} className='btn btn-outline-primary d-flex align-items-center justify-content-center'>
                            <IconReload />
                        </Link>
                    </ActionsStyles>
                </div>
                <OrderListTable orders={orders} setOrderSelected={setOrderSelected}></OrderListTable>
                <Pagination pagination={pagination}></Pagination>
                <OrderModalPay data={orderDetail} refreshOrdersPage={refreshOrdersPage}></OrderModalPay>
                <OrderModalReturn data={orderDetail} toReturnOrdersPage={refreshOrdersPage}></OrderModalReturn>
            </div>
            {loading && <Loading />}
        </>
    );
};

export default Orders;