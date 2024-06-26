import axios from 'axios';
import IconPlus from 'components/icons/IconPlus';
import IconReload from 'components/icons/IconReload';
import { API_URL } from 'config';
import { defaultPagination } from 'constants/general.const';
import { ActionsStyles } from 'constants/style.const';
import { useQuery } from 'hooks/useQuery';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ICustomerList } from 'types/customer.type';
import { IPagination } from 'types/pagination.type';
import ListCustomer from './Customer/ListCustomer';
import Pagination from 'components/layout/Pagination';
import Loading from 'components/layout/Loading';
import { IOrderSearchParams } from 'types/search.type';
import formatDate from 'utils/formatDate';
import { useForm } from 'react-hook-form';
import SearchCustomer from './Customer/SearchCustomer';

const Customers = () => {
    const [customers, setCustomers] = React.useState<ICustomerList[]>([]);
    const [pagination, setPagination] = React.useState<IPagination>(defaultPagination);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showFilter, setShowFilter] = React.useState<boolean>(false);
    const {handleSubmit, control, setValue} = useForm<IOrderSearchParams>();
    const query = useQuery();
    const location = useLocation();
    const navigate = useNavigate();
    const page = query.get('page') || '1';

    const getCustomers = async (query?: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/customer?limit${query ?? ''}${query ? '&limit=5' : '?limit=5'}${page ? `&page=${page}` : ''}`);

            if (response.status === 200) {  
                setCustomers(response.data.data);
                setPagination(response.data.meta);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        getCustomers(location.search);
    },[location.search]);

    const handleSubmitSearch = (values: IOrderSearchParams) => {
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

    
    return (
        <div className='w-100 bg-white h-100 p-3'>
            <div className="header_card">
                <div className='row row-cols-12 pb-3 pt-3'>
                    <div className='col-md-8 col-sm-6 d-flex col'>
                        <form action="" onSubmit={handleSubmit(handleSubmitSearch)}>
                            <SearchCustomer
                                control={control}
                                showFilter={showFilter}
                                setShowFilter={setShowFilter}
                                setValue={setValue}
                            />
                        </form>
                        <h2 className="header_text ms-3"> Danh sách khách hàng </h2>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <ActionsStyles className='d-flex justify-content-end gap-2'>
                            <Link to={'/customers/add'} className='btn btn-primary d-flex align-items-center justify-content-center'>
                                <IconPlus />
                            </Link>
                            <Link to={'/customers'} className='btn btn-outline-primary d-flex align-items-center justify-content-center'>
                                <IconReload />
                            </Link>
                        </ActionsStyles>
                    </div>  
                </div>
            </div>
            <div className="card_body">
                <ListCustomer 
                    customers={customers}             
                />
                <Pagination pagination={pagination}></Pagination>
            </div>
            {loading && <Loading />}
        </div>
    );
};

export default Customers;