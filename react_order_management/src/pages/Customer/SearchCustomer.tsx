import makeAnimated from 'react-select/animated';
import styled from 'styled-components';
import Select from 'react-select';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { SearchOrderStatus } from 'constants/search.const';
import React from 'react';
import axios from 'axios';
import { API_URL } from 'config';
import { IOrderSearchParams, ISearchMenu } from 'types/search.type';
import IconFilter from 'components/icons/IconFilter';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MenuSearchStyles = styled.div`
    width: 600px;
    background: white;
    padding: 15px;
    top: 100%;
    border-radius: 6px;
    z-index: 50;
    box-shadow: 0 0 15px rgba(0,0,0,0.4);
    
    ul {
        gap: 15px 0;
        padding-left: 0;
    }

    li {
        display: flex;
        flex-direction: column;
        gap: 8px 0;
        font-size: 14px;
    }

    .react-datepicker-wrapper {
        input {
            width: 100%;
            border: 1px solid hsl(0, 0%, 70%);
            border-radius: 4px;
            min-height: 36px;
            outline: none;
            padding: 0 8px;
        }
    }
`;

const animatedComponents = makeAnimated();

interface Props {
    control: Control<IOrderSearchParams>;
    showFilter: boolean;
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: UseFormSetValue<IOrderSearchParams>
}

const SearchCustomer = React.memo(({control, showFilter, setShowFilter, setValue}: Props) => {
    const [customerPhoneSearchs, setCustomerPhoneSearchs] = React.useState<ISearchMenu[]>([]);
    const menuSearchRef = React.useRef<HTMLDivElement>(null);
    const buttonFilterRef = React.useRef<HTMLButtonElement>(null);
    const urlParams = new URLSearchParams(window.location.search);
    const currentParamsCustomer = urlParams.get('customer');
    const [currentCustomerFilter, setCurrentCustomerFilter] = React.useState<ISearchMenu[]>([]);

    const fetchCustomerPhone = async (value: string) => {
        try {
            const response = await axios.get(`${API_URL}/customer/search?phone=${value}`);

            if (response.status === 200) {
                setCustomerPhoneSearchs(response.data.data);
                console.log(customerPhoneSearchs);
                return response.data.data;
            }
        } catch (error) {
            console.log(error);
        }
    };  

    const handleChangeInputCustomerPhone = (newValue: string, actionMeta: any) => {
        if (actionMeta.action === 'input-change') {
            if (newValue === "") {
                setCustomerPhoneSearchs([]);
            } else {
                fetchCustomerPhone(newValue);
            }
        }
    };
 
    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShowFilter(!showFilter);
    };

    const handleSetCurrentSearch = async () => {
        const date_from = urlParams.get('date_from');
        const date_end = urlParams.get('date_end');
        setValue('date_from', date_from);
        setValue('date_end', date_end);

        if (currentParamsCustomer) {
            const data = await fetchCustomerPhone('');
            const array = currentParamsCustomer.split(",");

            if (data && Array.isArray(data)) {
                const filtered = data.filter(item => array.includes(item.value.toString()));
                setCurrentCustomerFilter(filtered);
            }
        }
    };

    React.useEffect(() => {
        handleSetCurrentSearch();
    }, []);

    return (
        <div className='position-relative'>
            <button type='button' ref={buttonFilterRef} className='btn btn-outline-secondary' onClick={handleButtonClick}>
                <IconFilter />
            </button>
            {showFilter && <MenuSearchStyles ref={menuSearchRef} className='position-absolute menu-search-wrapper'>
                <ul className="row">
                    <li className='col-6'>
                        <label className='fw-medium'>Số điện thoại:</label>
                        <Controller 
                            name='customer'
                            control={control}
                            render={({field}) => (
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={customerPhoneSearchs}
                                    defaultValue={currentCustomerFilter}
                                    {...field}
                                    onInputChange={handleChangeInputCustomerPhone}
                                />
                            )}
                        />
                    </li>
                    <li className='col-6'>
                        <label className='fw-medium'>Từ ngày:</label>
                        <Controller
                            control={control}
                            name='date_from'
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText='Chọn ngày bắt đầu'
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                    dateFormat='dd/MM/YYYY'
                                />
                            )}
                        />
                    </li>
                    <li className='col-6'>
                        <label className='fw-medium'>Đến ngày:</label>
                        <Controller
                            control={control}
                            name='date_end'
                            render={({ field }) => (
                                <DatePicker
                                    placeholderText='Chọn ngày kết thúc'
                                    onChange={(date) => field.onChange(date)}
                                    selected={field.value}
                                    dateFormat='dd/MM/YYYY'
                                />
                            )}
                        />
                    </li>
                </ul>
                <button type='submit' className='btn btn-primary'>Search</button>
            </MenuSearchStyles>}
        </div>
    );
});

export default SearchCustomer;