import React from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useState, useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);

    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {


        const bestProducts = products.filter((item) => item.bestseller);


        setBestSeller(bestProducts.slice(0, 5));
    }, [products]);


    return (
        <div className='my-10'>

            <div className='text-center text-3xl py-8'>
                <Title text1='Best' text2='Sellers' />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>Explore our best-selling products that customers love.</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 px-2 sm:px-4'>

                {
                    bestSeller.map((item, index) => (
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))

                }
                {bestSeller.length === 0 && <p className='text-center text-red-500'>No best sellers found.</p>}

            </div>
        </div>
    )
}

export default BestSeller
