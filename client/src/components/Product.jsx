import React from 'react'

export default function Product({ product }) {
    return (
        <>
            <div className="product-list">
                <div className="card shadow-sm">
                    <a href=''>
                        <img src={product.thumbnail} alt="" className='prod-image' />
                    </a>
                    <div className="card-body">
                        <p className="card-text">
                            {product.title.substring(0, 25) + "..."}
                        </p>
                        <div className='my-2'>₹ {product.price}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
