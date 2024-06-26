import { ICustomerList } from 'types/Customer';
import { useState } from 'react';
import { ISale } from 'types/sale.type'
import { IWarehouse } from 'types/warehouse,type';
import formatMoney from 'utils/formatMoney';
const FormCreate = (props: any) => {
    const sales: ISale[] = props.sales;
    const warehouses: IWarehouse[] = props.warehouses;
    const customers: ICustomerList[] = props.customers;
    const [stake, setStake] = useState<boolean>(false);
    
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isStake = e.target.value === 'stake';
        setStake(isStake);
        props.onFormCreateChange({ order_status:  e.target.value });
    };
    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        props.onFormCreateChange({ [name]: value });
    };
    
    const totalBeforeVat = props.totalBeforeVat();
    const totalVat = props.totalVat();
    const totalDiscount = props.totalDiscount();
    const totalAmount = totalBeforeVat + totalVat - totalDiscount;
    const remainingAmount = totalAmount - (parseFloat(props.prepaidAmount) || 0);
    return (
        <div className="row mb-5">
            <div className="col-9">
                <div className="row">
                    <div className="col-3 position-relative" >
                        <label htmlFor="customer_code" className="form-label" >Mã khách hàng</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            id="customer_code"
                            value={props.selectedCustomer !== null ? props.selectedCustomer.customer_code : props.searchQueriesCustomer.customer_code}
                            onChange={(e) => props.onInputChangeCustomer(e, 'customer_code')}
                            placeholder='Mã đơn hàng'
                        />
                        <span className="text-danger">{props.errors.customer_id ? "Vui lòng chọn khách hàng": ''}</span>
                        {props.showCustomerDropdown && customers.length > 0 && (
                            <div className="dropdown-menu show w-100 position-absolute" style={{maxHeight: '200px', overflowY: 'auto' }}>
                                {customers.map((customer : ICustomerList, index:number) => (
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        key={customer.id.toString()}
                                        onClick={() => props.onCustomerSelect(customer, index)}
                                    >
                                        {customer.customer_code.toString()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-6">
                        <label htmlFor="customer_name" className="form-label">Tên khách hàng</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customer_name"
                            autoComplete='off'
                            value={props.selectedCustomer !== null ? props.selectedCustomer.name : props.searchQueriesCustomer.name}
                            onChange={(e) => props.onInputChangeCustomer(e, 'name')}
                            placeholder='Mã đơn hàng'
                        />
                        {props.showCustomerDropdown && customers.length > 0 && (
                            <div className="dropdown-menu show" style={{width: '30%',maxHeight: '200px', overflowY: 'auto' }}>
                                {customers.map((customer : ICustomerList, index:number) => (
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        key={customer.id.toString()}
                                        onClick={() => props.onCustomerSelect(customer, index)}
                                    >
                                        {customer.name.toString()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="col-3">
                        <label htmlFor="customer_phone" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customer_phone"
                            value={props.selectedCustomer !== null ? props.selectedCustomer.phone : props.searchQueriesCustomer.phone}
                            onChange={(e) => props.onInputChangeCustomer(e, 'phone')}
                            placeholder='Mã đơn hàng'
                        />
                        {props.showCustomerDropdown && customers.length > 0 && (
                            <div className="dropdown-menu show" style={{width: '10%',maxHeight: '200px', overflowY: 'auto' }}>
                                {customers.map((customer : ICustomerList, index:number) => (
                                    <button
                                        type="button"
                                        className="dropdown-item"
                                        key={customer.id.toString()}
                                        onClick={() => props.onCustomerSelect(customer, index)}
                                    >
                                        {customer.phone.toString()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="sale_id" className="form-label">Nhân viên bán hàng</label>
                        <select 
                            className="form-select" 
                            aria-label="Default select example"
                            value={props.formData.saleId}
                            onChange={handleInputChange}
                            name="saleId"
                        >
                            <option defaultValue={""}>Select a salesperson</option>
                            {sales.map(sale => (
                                <option key={sale.id.toString()} value={sale.id.toString()}>
                                    {sale.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">{props.errors.sale_id ? "Vui lòng chọn người bán hàng": ''}</span>
                    </div>
                    <div className="col-3">
                        <label htmlFor="customer_email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="customer_email" 
                            value={props.selectedCustomer !== null ? props.selectedCustomer.email : ''}
                            readOnly
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="tax_code" className="form-label">Mã số thuế</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="tax_code" 
                            value={props.selectedCustomer !== null ? props.selectedCustomer.tax_code : ''}
                            readOnly
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="warehouse_id" className="form-label">Mã kho hàng</label>
                        <select 
                            className="form-select" 
                            aria-label="Default select example"
                            value={props.formData.warehouse_id}
                            onChange={handleInputChange}
                            name="warehouse_id"
                        >
                            <option defaultValue={""}>Select a warehouse</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">{props.errors.warehouse_id ? "Vui lòng chọn kho hàng": ''}</span>
                    </div>

                </div>
                <div className="row">
                    <div className="col-7">
                        <label htmlFor="customer_address" className="form-label">Địa chỉ khách hàng</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="customer_address" 
                            value={props.formData.address}
                            onChange={handleInputChange}
                            name="address" 
                        />
                        {props.formData.address.length <= 0  && 
                            <span className="text-danger">{props.errors.address ? "Vui lòng nhập địa chỉ": ''}</span>
                        }
                    </div>
                    <div className="col-5">
                        <label htmlFor="node" className="form-label">Diễn giải</label>
                        <textarea 
                            className="form-control" 
                            id="node" 
                            rows={5}
                            value={props.formData.note}
                            onChange={handleInputChange}
                            name="note" 
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="col-3 align-content-center text-end">
                <strong className="text-primary fs-4">Tổng tiền thanh toán</strong><br />
                <h3>{formatMoney(totalAmount || 0)}</h3><br />
                <strong className="fs-4 text-primary">Số tiền đã thanh toán trước</strong><br />
                <h3>{formatMoney(props.prepaidAmount || 0)}</h3><br />
                <strong className="fs-4 text-primary">Tổng tiền còn lại phải trả</strong><br />
                <h3 className="fs-3">{formatMoney(remainingAmount || 0)}</h3>
            </div>
        </div>
    );
};

export default FormCreate;