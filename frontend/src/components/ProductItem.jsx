import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    return (
        <Link to={`/products/${id}`} className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group'>
            <div className='overflow-hidden aspect-square bg-gray-50'>
                <img
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                    src={image[0]}
                    alt=""
                />
            </div>
            <div className='p-4'>
                <p className='text-sm text-gray-700 mb-1 line-clamp-1'>{name}</p>
                <p className='text-sm font-semibold text-gray-900'>{currency}{price}</p>
            </div>
        </Link>

    )
}

export default ProductItem
