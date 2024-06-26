import Alert from 'components/layout/Alert';
import Header from 'components/layout/Header';
import Sidebar from 'components/layout/Sidebar';
import { useAlert } from 'contexts/alert-context';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MainStyles = styled.main`
    .main-wrapper {
        background: #ececec;
    }
`;

const MainLayout = () => {
    const {showAlert} = useAlert();

    return (
        <div className='row min-vh-100 g-0' style={{overflow: 'hidden'}}>
            <div className="col-2 shadow-sm">
                <Sidebar />
            </div>
            <div className="col-10 d-flex flex-column">
                <Header />
                <MainStyles className='flex-grow-1'>
                    <div className='main-wrapper h-100 p-3 position-relative'>
                        {showAlert && <Alert />}
                        <Outlet></Outlet>
                    </div>
                </MainStyles>
            </div>
        </div>
    );
};

export default MainLayout;