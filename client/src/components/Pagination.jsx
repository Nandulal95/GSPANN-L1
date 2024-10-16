import React from 'react';

const Pagination = ({ productsPerPage, length, currentPage,handlePagination }) => {
    const paginationNumbers = [];

    for (let i = 1; i <= Math.ceil(length / productsPerPage); i++) {
        paginationNumbers.push(i);
    }

    return (
        <>
            <nav ariaabel="Page navigation">
                <ul className="pagination justify-content-end mt-4">
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePagination(currentPage - 1)}>
                            <span>Previous</span>
                        </button>
                    </li>
                    {
                        paginationNumbers.map((pageNumber) => {
                            return (
                                <li className={"page-item"+ (currentPage == pageNumber ? ' active' : '')}  key={pageNumber}>
                                    <button className="page-link" onClick={(e) => handlePagination(pageNumber)}>
                                        <span>{pageNumber}</span>
                                    </button>
                                </li>
                            )
                        })
                    }
                    <li className="page-item">
                        <button className="page-link" onClick={() => handlePagination(currentPage + 1)}>
                            <span>Next</span>
                        </button>
                    </li>
                </ul>
            </nav >
        </>
    );
};
export default Pagination;