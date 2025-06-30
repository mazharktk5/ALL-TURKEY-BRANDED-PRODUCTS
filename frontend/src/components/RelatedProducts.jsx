import React, { use } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useState, useEffect } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            // Filter products based on category and subCategory
            productsCopy = productsCopy.filter(item => {
                return item.category === category && item.subCategory === subCategory;
                setRelated(productsCopy);
            });
            setRelated(productsCopy.slice(0, 5)); // Limit to 4 related products
        }

    }, [products])
    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={"Related"} text2={"Products"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 px-2 sm:px-4'>

                {
                    related.map((item, index) => (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                    ))
                }

            </div>


        </div>
    )
}

export default RelatedProducts
