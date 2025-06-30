import React, { use, useEffect } from 'react'
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';



const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    // Function to handle category filter change
    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }

    // Function to handle subcategory filter change
    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        }
        else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice();

        if (search && showSearch) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilteredProducts(productCopy);
    }

    const sortProduct = (e) => {
        const value = e.target.value;
        let sortedProducts = [...filteredProducts];

        if (value === 'low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (value === 'high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else {
            sortedProducts = products.slice();
        }

        setFilteredProducts(sortedProducts);
    }

    useEffect(() => {
        // Reset filters when products change
        setCategory([]);
        setSubCategory([]);
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);





    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* Filter Options */}
            <div className='min-w-60' >
                <div onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl sm:sticky sm:top-10 flex items-center cursor-pointer gap-2'>
                    FILTER
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </div>

                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 className='min-w-60 sm:sticky sm:top-24 h-fit ${showFilter ? 'block' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-gray-700 text-sm font-light'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Men'} />
                            MEN
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Women'} />WOMEN
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Kids'} />KIDS
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Socks'} />SOCKS
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Underwear'} />UNDERWEAR
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Caps'} />CAPS
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Watches'} />WATCHES
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' onChange={toggleCategory} value={'Shoes'} />SHOES
                        </p>
                    </div>
                </div>
                {/* subcatogaries filter */}

                <div className={`border border-gray-300 pl-5 py-3 my-5 min-w-60 sm:sticky sm:top-100 h-fit ${showFilter ? 'block' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-gray-700 text-sm font-light'>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />TOPWEAR
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />BOTTOMWEAR
                        </p>

                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />WINTERWEAR
                        </p>


                    </div>
                </div>
            </div>

            {/* Right side */}
            <div className='flex-1 px-2 sm:px-0'>
                <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    {/* product sort */}
                    <select className='border border-gray-300 text-sm px-2 py-1 rounded' onChange={sortProduct}>
                        <option value="relevant" >Sort by Relevant</option>
                        <option value="low-to-high">Sort by Low to High</option>
                        <option value="high-to-low">Sort by High to Low</option>
                    </select>
                </div>
                {/* Render your products here */}
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filteredProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} image={item.image} price={item.price} id={item._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection
