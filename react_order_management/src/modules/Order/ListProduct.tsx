import IconPlus from 'components/icons/IconPlus';
import { IOrderDetail } from 'types/orderDetail.type';
import { IProduct } from 'types/product.type'
import formatMoney from 'utils/formatMoney';
interface ListProductProps {
    showDropdown: boolean[];
    searchQueries: { id: string; name: string }[];
    products: IProduct[];
    orderDetail: IOrderDetail[];
    errors: string[];
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => void;
    onProductSelect: (product: IProduct, index: number) => void;
    onAddProduct: () => void;
    onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    totalVat: () => number;
    totalBeforeVat: () => number;
    totalDiscount: () => number;
    onDeleteProduct: (index: number) => void;
}

const ListProduct = (props: ListProductProps) => {
    const {
        showDropdown,
        searchQueries,
        products,
        orderDetail,
        errors,
        onInputChange,
        onProductSelect,
        onAddProduct,
        onQuantityChange,
        totalVat,
        totalBeforeVat,
        onDeleteProduct,
        totalDiscount
    } = props;
    return (
        <div className="row">
            <table className="table table-hover">
                <thead className="table-primary">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã hàng</th>
                        <th scope="col">Tên hàng</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá(VND)</th>
                        <th scope="col">Thành tiền(VND)</th>
                        <th scope="col">% Chiết khấu sẩn phẩm</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail && orderDetail.map((orderDetailItem: IOrderDetail, index: number) => (
                        <tr key={(index)}>
                            <td>{(index + 1)}</td>
                            <td>
                                <div className="dropdown">
                                    {orderDetailItem.product_id !== null ? (
                                        <span>{searchQueries[index].id}</span>
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="product_id"
                                            value={searchQueries[index].id}
                                            onChange={(e) => onInputChange(e, index, 'id')}
                                            placeholder='Mã đơn hàng'
                                        />
                                    )}
                                    <span></span>
                                    {showDropdown[index] && products.length > 0 && (
                                        <div className="dropdown-menu show" style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                                            {products.map((product: IProduct) => (
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    key={product.id.toString()}
                                                    onClick={() => onProductSelect(product, index)}
                                                >
                                                    {product.id.toString()}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {Object.keys(errors).map((key: any) => {
                                        if (key.startsWith(`listProducts.${index}.`)) {
                                            return (
                                                <tr key={`${orderDetailItem.product_id}-${key}`}>
                                                    <td colSpan={8}>
                                                        <div className="text-danger">
                                                            {errors[key] && orderDetailItem['product_id'] === null ? 'Vui lòng nhập sản phẩm' : ''}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </td>
                            <td>
                                <div className="dropdown">
                                    {orderDetailItem.product_id !== null ? (
                                        <span>{searchQueries[index].name}</span>
                                    ) : (
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="product_name"
                                            value={searchQueries[index].name}
                                            onChange={(e) => onInputChange(e, index, 'name')}
                                            placeholder='Tên hàng đơn hàng'
                                        />
                                    )}
                                    {showDropdown[index] && products.length > 0 && (
                                        <div className="dropdown-menu show" style={{ width: '100%', maxHeight: '200px', overflowY: 'auto' }}>
                                            {products.map((product: IProduct) => (
                                                <button
                                                    type="button"
                                                    className="dropdown-item"
                                                    key={product.id.toString()}
                                                    onClick={() => onProductSelect(product, index)}
                                                >
                                                    {product.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={orderDetailItem.quantity.toString()}
                                    min="1"
                                    onChange={(e) => onQuantityChange(e, index)}
                                />
                                {Object.keys(errors).map((key: any) => {
                                    if (key.startsWith(`listProducts.${index}.quantity`)) {
                                        return (
                                            <tr key={`${orderDetailItem.product_id}-${key}`}>
                                                <td colSpan={8}>
                                                    <div className="text-danger">
                                                        {errors[key]}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </td>
                            <td>{orderDetailItem.product_price.toLocaleString('vi-VN') + " VND"}</td>
                            <td>{(orderDetailItem.product_price * orderDetailItem.quantity).toLocaleString('vi-VN')}</td>
                            <td>{orderDetailItem.discount + "%"}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => onDeleteProduct(index)}
                                > Xóa hàng
                                </button>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>
                <tfoot >
                    <tr>
                        <td colSpan={3}>
                            <button type="button" onClick={onAddProduct} className="btn btn-link text-decoration-none text-bg-primary">
                                <IconPlus />
                                <span className="mx-2">Thêm hàng</span>
                            </button>
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td colSpan={2}>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-primary">Tổng tiền hàng</span>
                                <span className="text-primary">{formatMoney(totalBeforeVat())}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-primary">Tổng tiền giảm giá</span>
                                <span className="text-primary">{"-" + formatMoney(totalDiscount())}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-primary">Thuế GTGT(10%)/Tổng tiền hàng</span>
                                <span className="text-primary">{formatMoney(totalVat())}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span className="text-primary">Tổng tiền thanh toán</span>
                                <span className="text-primary">{formatMoney((totalBeforeVat() + totalVat() - totalDiscount()))}</span>
                            </div>

                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ListProduct;