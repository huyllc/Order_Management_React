import React from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
    height: 80px;
    padding: 20px;
`;

const Header = () => {
    return (
        <HeaderStyles className='bg-white row align-items-center justify-content-between'>
            <p className='col-auto'>Hello Admin</p>
        </HeaderStyles>
    );
};

export default Header;