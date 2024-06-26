import { Link, useLocation } from 'react-router-dom';
import { IPagination } from 'types/pagination.type';
import handleSearchPagination from 'utils/handleSearchPagination';

interface IPaginationProps {
    pagination: IPagination,
}

const Pagination = ({pagination} : IPaginationProps) => {
    const location = useLocation();
    const updatedQueryString = handleSearchPagination(location.search);

    return (
        <div className="row align-items-center">
            <strong className='col-1'>Tổng số: {pagination.last_page}</strong>
            <nav aria-label="Page navigation example" className='col-4'>
                <ul className="pagination mb-0">
                    {pagination.links.map((page, index) => (
                        <li className={`page-item ${page.active ? 'active' : ''}`} key={index}>
                            { page.label.includes('Previous') && Number(pagination.current_page) > 1 &&  
                                <Link
                                    to={`${!location.search.includes('search')
                                            ? `?page=${pagination.current_page - 1}` 
                                            : `${updatedQueryString}&page=${pagination.current_page - 1}`
                                    }`}
                                    className="page-link"
                                    aria-label='Previous'
                                >
                                    <span aria-hidden="true">&laquo;</span>
                                </Link>
                            }
                            {!page.label.includes('Previous') && !page.label.includes('Next') && 
                                <Link 
                                    to={`${!location.search.includes('search')
                                        ? `?page=${page.label}` 
                                        : `${updatedQueryString}&page=${page.label}`
                                    }`}
                                    className="page-link" 
                                >
                                    {page.label}
                                </Link>
                            }
                            {page.label.includes('Next') && Number(pagination.current_page) < Number(pagination.last_page) &&
                                <Link 
                                    to={`${!location.search.includes('search')
                                        ? `?page=${pagination.current_page + 1}` 
                                        : `${updatedQueryString}&page=${pagination.current_page + 1}`
                                    }`}
                                    className='page-link'
                                    aria-label='Next'
                                >
                                    <span aria-hidden="true">&raquo;</span>
                                </Link>
                            }
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;