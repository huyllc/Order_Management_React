import axios from 'axios';
import { API_URL } from 'config';
import React from 'react';
import { ICustomerList } from 'types/customer.type';

const useCustomerId = (id: number) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [customer, setCustomer] = React.useState<ICustomerList>({
        id: 0,
        customer_code: '',
        name: '',
        type: [],
        email: '',
        tax_code: '',
        address: '',
        phone: '',
    });

    const getCustomerId = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/customer/show/${id}`);
            if (response.status === 200) {
                setCustomer(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
        }
    };

    React.useEffect(() => {
        getCustomerId();
    }, [id]);

    return { customer, loading };
};

export default useCustomerId;
