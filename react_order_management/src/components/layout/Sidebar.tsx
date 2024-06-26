
import { SidebarLink } from "constants/general.const";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SibebarStyles = styled.div`
    .logo-link {
        color: #5D7285;

        img {
            max-height: 63px;
        }
    }

    .nav-link {
        color: #5D7285;

        &.active{
            background: #E9F5FE;
            color: #0C7FDA;
        }
    } 
`;

const Sidebar = () => {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <SibebarStyles className='py-4 px-3 h-100'>
            <Link to='/' className="d-flex gap-2 align-items-center text-decoration-none logo-link mb-5">
                <img srcSet="/logo.svg" loading='lazy' alt="" />
                <h3>DevFast</h3>
            </Link>
            <nav className="nav nav-pills flex-column">
                {SidebarLink.length > 0 && SidebarLink.map((link, index) => {
                    const isActive = link.href === '/' ? pathName === link.href : pathName.includes(link.href);

                    return (
                        <li className="nav-item" key={index}>
                            <Link to={link.href} className={`nav-link px-2 py-3 d-flex align-items-center gap-2 fw-semibold 
                                ${isActive ? 'active' : ''}`}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </nav>
        </SibebarStyles>
    );
};

export default Sidebar;