import { ORDER_STATUS } from 'constants/order.const';
import React from 'react';

interface Props {
    orderStatus: string,
    addOrderDetail: () => void,
}

const ButtonActions = ({orderStatus, addOrderDetail}: Props) => {
    return (
        <>
            {orderStatus === ORDER_STATUS.none && 
                <div className='row justify-content-between mt-5'>
                    <button type='button' className='btn text-primary col-auto' onClick={addOrderDetail}>+ Thêm hàng</button>
                    <div className="d-flex col-auto gap-3">
                        <button type='button' className='btn btn-secondary col-auto'>Xoá</button>
                        <button type='submit' className='btn btn-primary col-auto'>Lưu</button>
                    </div>
                </div>
            }
        </>
    );
};

export default ButtonActions;