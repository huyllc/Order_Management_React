import React, { useEffect } from 'react';

import { IOrderSearchParams } from 'types/search.type';
import { useForm } from 'react-hook-form';
import { API_URL } from 'config';
import axios from 'axios';
import { IPagination } from 'types/pagination.type';
import { defaultPagination } from 'constants/general.const';
import { Link } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { ActionsStyles } from 'constants/style.const';
import IconReload from 'components/icons/IconReload';
import Pagination from 'components/layout/Pagination';
import Loading from 'components/layout/Loading';
import ListReturnOrder from './ReturnOrder/ListReturnOrder';

const ReturnOrders = () => {
    const [returnOrders, setReturnOrders] = React.useState<any>({});
    const [pagination, setPagination] = React.useState<IPagination>(defaultPagination);
    const [loading, setLoading] = React.useState<boolean>(false);
    const page = useQuery().get('page') || '1';

    const getReturnOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/return-order?limit=10${page ? `&page=${page}` : ''}`);
            if (response.status === 200) {  
                setReturnOrders(response.data.data);
                setPagination(response.data.meta);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getReturnOrder();
    }, [page]);

    const deleteReturnOrder = async (id :number) => {
        try {
          await axios.delete(`${API_URL}/return-order/${id}`);
          getReturnOrder();
        } catch (error) {
          console.error(error);
        }
    };

    return (
        <div className='w-100 bg-white h-100 p-3'>        
            <div className="header_card">
                <div className='row row-cols-12 pb-3 pt-3'>
                    <div className="col-md-4 col-sm-6">
                        <h2 className="header_text"> Danh sách trả hàng </h2>
                    </div>  
                    <ActionsStyles className='col-md-8 col-sm-6 text-end justify-content-end d-flex gap-2'>
                        <Link to={'/return-orders'} className='btn btn-outline-primary d-flex align-items-center justify-content-center'>
                            <IconReload />
                        </Link>
                    </ActionsStyles>
                </div>
            </div>
            <div className="body_card">
                <ListReturnOrder 
                    returnOrders={returnOrders}
                    deleteReturnOrder={deleteReturnOrder}
                />
            </div>
            <Pagination pagination={pagination}></Pagination>
            {loading && <Loading />}
        </div>   
    );
};

export default ReturnOrders;