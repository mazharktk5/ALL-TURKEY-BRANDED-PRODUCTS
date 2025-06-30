import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';



const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products]);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='Latest' text2='Collections' />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Discover the latest trends in our collection.</p>
            </div>

            {/* rendering products */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 px-2 sm:px-4'>

                {
                    latestProducts.map((items, index) => (
                        <ProductItem key={index} id={items._id} image={items.image} name={items.name} price={items.price} />
                    ))
                }
            </div>

        </div>
    )
}

export default LatestCollection
