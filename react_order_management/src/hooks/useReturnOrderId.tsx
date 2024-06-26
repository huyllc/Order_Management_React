import axios from 'axios';
import { API_URL } from 'config';
import { useAlert } from 'contexts/alert-context';
import React from 'react';
import { IReturnOrderList } from 'types/returnOrder.type';

const useReturnOrderId = (id: number) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [returnOrder, setReturnOrder] = React.useState<IReturnOrderList>({
        id: 0,
        order_code: '',
        customer_code: '',
        customer_name: '',
        address: '',
        total_price: 0,
        note: '',
        list_order: [],
        order_details: []
    });

    const getReturnOrderId = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/return-order/${id}`);
            if (response.status === 200) {
                setReturnOrder(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
        }
    };

    React.useEffect(() => {
        getReturnOrderId();
    }, [id]);

    return { returnOrder, loading };
};

export default useReturnOrderId;
