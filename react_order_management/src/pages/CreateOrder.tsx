import axios from 'axios';
import { API_URL } from 'config';
import { useEffect, useState , useRef } from 'react';
import FormCreate from 'modules/Order/FormCreate';
import { ISale } from 'types/sale.type'
import { IProduct } from 'types/product.type';
import ListProduct from 'modules/Order/ListProduct';
import { IOrderDetail } from 'types/orderDetail.type';
import { IWarehouse } from 'types/warehouse,type';
import { ICustomerList } from 'types/Customer';
import { useNavigate } from "react-router-dom";
import { useAlert } from 'contexts/alert-context';
import Loading from 'components/layout/Loading';
interface FormDataState {
    saleId: number;
    customer_id: string;
    total_price: number;
    final_price: number;
    order_status: string;
    address: string;
    export_bill: number;
    is_vat: number;
    data_delivery: string;
    note: string;
    warehouse_id: string;
    orderDetail: IOrderDetail[]; // Update with your actual type
}

const CreateOrder = () => {
    const [formData, setFormData] = useState<FormDataState>({
        saleId: 0,
        customer_id: '',
        total_price: 0,
        final_price: 0,
        order_status: 'none',
        address: '',
        export_bill: 0,
        is_vat: 1,
        data_delivery: "2024-12-12",
        note: '',
        warehouse_id: '',
        orderDetail: [],
    });
    const handleFormCreateChange = (data: Partial<FormDataState>) => {
        setFormData((prevState) => ({
            ...prevState,
            ...data,
        }));
    };
    const {setAlertMessage,setShowAlert} = useAlert()
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [sales, setSales] = useState<ISale[]>([]);
    const [warehouses, setWarehouses] = useState<IWarehouse[]>([]);
    const [customers, setCustomers] = useState<ICustomerList[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [searchQueries, setSearchQueries] = useState<{ id: string; name: string }[]>([]);
    const [searchQueriesCustomer, setSearchQueriesCustomer] = useState<{ customer_code: string, name: string, phone:string }>({ customer_code: '', name: '', phone: '' });
    const [showDropdown, setShowDropdown] = useState<boolean[]>([]);
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
    const [orderDetail, setOrderDetail] = useState<IOrderDetail[]>([]);
    const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomerList | null>(null);
    const [prepaidAmount, setPrepaidAmount] = useState<number>(0);
    const [errors, setErrors] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [customerApiCalled, setCustomerApiCalled] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/list`);
                if (response.status === 200 && response.data) {
                    setSales(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSales();
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get(`${API_URL}/warehouse/getAll`);
                if (response.status === 200 && response.data) {
                    setWarehouses(response.data);
                } 
            } catch (error) {
                console.log(error);
            }
        };
        fetchWarehouses();
        
    }, []);
    useEffect(() => {
        const fetchProducts = async (idQuery: string, nameQuery: string) => {
            try {
                if (idQuery !== '' || nameQuery !== '') {
                    const response = await axios.get(`${API_URL}/product/search`, {
                        params: {
                            id: idQuery,
                            name: nameQuery
                        }
                    });
                    if (response.status === 200 && response.data.data) {
                        setProducts(response.data.data);
                    }
                }
            } catch (error) {
                console.log(error);
                setProducts([]);
            }
        };
    
        if (editingRowIndex !== null) {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
    
            debounceTimerRef.current = setTimeout(() => {
                const { id, name } = searchQueries[editingRowIndex];
                fetchProducts(id, name);
            }, 300);
        }
    
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQueries, editingRowIndex]);
    useEffect(() => {
        const fetchCustomers = async (customer_code: string, name:string, phone:string) => {
            try {
                if (customer_code !== '' || name !== '' || phone !== '') {
                    const response = await axios.get(`${API_URL}/search/customer`, {
                        params: {
                            customer_code: customer_code,
                            name: name,
                            phone: phone
                        }
                    });
                    if (response.status === 200 && response.data) {
                        setCustomers(response.data.data);
                    }
                }
                
            } catch (error) {
                console.log(error);
            }
        };
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {            
            if (selectedCustomer === null && !customerApiCalled) {
                const { customer_code, name, phone } = searchQueriesCustomer;
                fetchCustomers(customer_code, name, phone);
            }
        }, 300);
    
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    },[searchQueriesCustomer, customerApiCalled, selectedCustomer])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const updatedSearchQueries = [...searchQueries];
        updatedSearchQueries[index] = {
            ...updatedSearchQueries[index],
            [field]: e.target.value
        };
        const shouldShowDropdown = updatedSearchQueries[index].id !== '' || updatedSearchQueries[index].name !== '';
        const updatedShowDropdown = [...showDropdown];
        updatedShowDropdown[index] = shouldShowDropdown;
        
        setSearchQueries(updatedSearchQueries);
        setShowDropdown(updatedShowDropdown);
        setEditingRowIndex(index);
    };
    
    const handleInputChangeCustomer = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const updatedSearchQueriesCustomer = {
            ...searchQueriesCustomer,
            [field]: e.target.value,
        };
        const shouldShowDropdown = updatedSearchQueriesCustomer.customer_code !== '' || updatedSearchQueriesCustomer.name !== '' || updatedSearchQueriesCustomer.phone !== '';
        setSearchQueriesCustomer(updatedSearchQueriesCustomer);
        setShowCustomerDropdown(shouldShowDropdown);
        setCustomerApiCalled(false)
        setSelectedCustomer(null)
    }
    const handleProductSelect = (product: IProduct, index: number) => {
        const updatedOrderDetail = [...orderDetail];
        updatedOrderDetail[index] = {
            ...updatedOrderDetail[index],
            product_id: product.id,
            product_price: product.price,
            discount: product.discount,
            total_price: product.price,
            final_price: parseFloat((product.price * (1 - product.discount / 100)).toFixed(2))
        };
        const updatedSearchQueries = [...searchQueries];
        updatedSearchQueries[index] = {
            id: product.id.toString(),
            name: product.name, // Update the name query
        };
        const updatedShowDropdown = [...showDropdown];
        updatedShowDropdown[index] = false;
        setOrderDetail(updatedOrderDetail);
        setSearchQueries(updatedSearchQueries);
        setShowDropdown(updatedShowDropdown);
        setProducts([]);
    };
    const handleCustomerSelect = (customer: ICustomerList) => {
        setFormData((prevState: any) => ({
            ...prevState,
            customer_id: customer.id,
        }));
        setShowCustomerDropdown(false); // Hide customer dropdown when customer is selected
        setSelectedCustomer(customer);
        const updatedErrors = {
            ...errors,
            customer_id: ""
        };
        setSearchQueriesCustomer({ customer_code: '', name: '', phone: '' })
        setErrors(updatedErrors)
        setCustomerApiCalled(true);
    };
    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedOrderDetail = [...orderDetail];
        updatedOrderDetail[index] = {
            ...updatedOrderDetail[index],
            quantity: parseInt(e.target.value) || 0,
            total_price: updatedOrderDetail[index].product_price * parseInt(e.target.value),
            final_price: parseFloat((updatedOrderDetail[index].product_price * parseInt(e.target.value) * (1 - updatedOrderDetail[index].discount / 100)).toFixed(2))
        };
        setOrderDetail(updatedOrderDetail);
    };
    const handleAddProduct = () => {
        setOrderDetail([...orderDetail, { product_id: null, quantity: 1, product_price: 0, discount: 0, status:'none',total_price: 0, final_price: 0 }]);
        setSearchQueries([...searchQueries, {id: '', name: ''}]);
        setShowDropdown([...showDropdown, false]);
    };
    const handlePrepaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrepaidAmount(parseFloat(e.target.value));
    };

    const calculateItem = (price: number, quantity: number, percent:number): number => {
        return price * quantity * percent / 100;
    };
    const totalVat = (): number => {
        if (orderDetail.length === 0) {
            return 0;
        }
        const totalVat = orderDetail.reduce((totalVat, item) => {
            const itemVat = calculateItem(item.product_price, item.quantity, 10);
            return totalVat + itemVat;
        }, 0);

        return parseFloat(totalVat.toFixed(3));
    };
    const totalBeforeVat = (): number => {
        if (orderDetail.length === 0) {
            return 0;
        }
        const totalItem = orderDetail.reduce((totalItem, item) => {
            return totalItem + item.product_price*item.quantity;
        }, 0);
        
        return parseFloat(totalItem.toFixed(3));
    };
    const calculateTotalDiscount = (): number => {
        if (orderDetail.length === 0) {
            return 0;
        }
        const totalDiscount = orderDetail.reduce((totalDiscount, item) => {
            const itemDiscount = calculateItem(item.product_price, item.quantity, item.discount);
            return totalDiscount + itemDiscount;
        }, 0);

        return parseFloat(totalDiscount.toFixed(3));
    };
    const handleDeleteProduct = (index: number) => {
        const updatedOrderDetail = [...orderDetail];
        updatedOrderDetail.splice(index, 1); // Xóa mục tại chỉ mục
        const updatedSearchQueries = [...searchQueries];
        updatedSearchQueries.splice(index, 1);

        setSearchQueries(updatedSearchQueries);
        setOrderDetail(updatedOrderDetail); // Cập nhật state
        setEditingRowIndex(null);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const totalBeforeVatValue = totalBeforeVat();
        const totalVatValue = totalVat();
        const totalDiscount:number = calculateTotalDiscount();
        const totalPrice = totalBeforeVatValue + totalVatValue - totalDiscount;
        try {
            const orderData = {
                customer_id: formData.customer_id,
                sale_id: formData.saleId,
                total_price: totalPrice,
                final_price: totalPrice - prepaidAmount,
                order_status: formData.order_status,
                address: formData.address,
                export_bill: formData.export_bill,
                is_vat: formData.is_vat,
                date_delivery: formData.data_delivery,
                note: formData.note,
                warehouse_id: formData.warehouse_id,
                listProducts: orderDetail,
            };
            const response = await axios.post(`${API_URL}/order/create`, orderData);
            setLoading(true);
            if (response.status === 200 && response.data) {
                setAlertMessage('Tạo đơn hàng thành công');
                setShowAlert(true);
                setLoading(false);
                navigate("/orders/"+response.data.order_id);
            } else {
                alert('Tạo đơn hàng thất bại.');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data?.errors) {
                    const errors = error.response?.data?.errors;
                    setErrors(errors);
                }
            }

        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h2>Chứng từ bán hàng</h2>
            </div>
        <form onSubmit={handleSubmit}>
            <div className="card-body">
                <FormCreate
                    formData = {formData}
                    onFormCreateChange={handleFormCreateChange}
                    sales={sales}
                    warehouses={warehouses}
                    customers={customers}
                    prepaidAmount={prepaidAmount}
                    totalVat={totalVat}
                    totalBeforeVat={totalBeforeVat}
                    totalDiscount={calculateTotalDiscount}
                    onInputChangeCustomer={handleInputChangeCustomer}
                    onCustomerSelect={handleCustomerSelect}
                    onInputPrepaid={handlePrepaidAmountChange}
                    searchQueriesCustomer={searchQueriesCustomer}
                    showCustomerDropdown={showCustomerDropdown}
                    selectedCustomer={selectedCustomer}
                    errors={errors}
                />
                <ListProduct
                    products={products}
                    searchQueries={searchQueries}
                    orderDetail={orderDetail}
                    onInputChange={handleInputChange}
                    showDropdown={showDropdown}
                    onProductSelect={handleProductSelect}
                    onAddProduct={handleAddProduct}
                    onQuantityChange={handleQuantityChange}
                    totalVat={totalVat}
                    totalBeforeVat={totalBeforeVat}
                    totalDiscount={calculateTotalDiscount}
                    onDeleteProduct={handleDeleteProduct}
                    errors={errors}
                />
                {loading && <Loading />}
            </div>
            <div className="card-footer text-end bg-black">
                <button type="submit" className="btn btn-success">Lưu</button>
            </div>
        </form>
        </div>

    );
};

export default CreateOrder;
