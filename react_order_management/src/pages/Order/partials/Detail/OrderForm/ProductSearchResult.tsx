import styled from 'styled-components';
import { IProduct } from 'types/product.type';

const ProductsResultStyles = styled.ul`
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 10;
    background: white;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
`;

const ResultItemStyles = styled.li`
    cursor: pointer;

    &:hover{
        background: #0d6efd;
        color: white;
    }
`;

interface Props {
    index: number,
    productsSearch: Record<number, IProduct[]>,
    handleSelectProduct: (product: IProduct, index: number) => void
}

const ProductSearchResult = ({productsSearch, index, handleSelectProduct}: Props) => {
    return (
        <ProductsResultStyles className='list-group'>
            {productsSearch[index] && productsSearch[index].map((product) => (
                <ResultItemStyles key={product.id} className='list-group-item' onClick={() => handleSelectProduct(product, index)}>
                        {product.name}
                </ResultItemStyles>
            ))}
        </ProductsResultStyles>
    );
};

export default ProductSearchResult;