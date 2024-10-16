import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../app/slices/productSlice.js';
import Pagination from './Pagination.jsx';
import Product from './Product.jsx'

export default function Collections() {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    let limit = 60;
    let skip = (currentPage - 1) * limit;
    
    useEffect(() => {
        dispatch(getProducts({ skip: skip, limit: limit }));
    }, [currentPage]);

    const products = useSelector((state) => state.products);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className='container py-4'>
                <div className='d-flex'>
                    <div className='products-contents px-4'>
                        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridGap: "22px" }}>
                            {
                                products && products.meta?.products?.map((product) => {
                                    return (<Product product={product} key={product.id} />);
                                })
                            }
                        </div>
                        <Pagination
                            length={products.meta?.total}
                            productsPerPage={products.meta?.limit}
                            currentPage={currentPage}
                            handlePagination={handlePagination}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}