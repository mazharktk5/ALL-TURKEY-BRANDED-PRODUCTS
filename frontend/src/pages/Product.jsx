import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const found = products.find(item => item._id === productId);
    setProductData(found);
    if (found) {
      setImage(found.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t pt-12 px-4 md:px-12 lg:px-24 transition-opacity duration-500 opacity-100 bg-white text-gray-800">
      {/* Main Product Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto md:w-[20%] gap-3">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Product ${index + 1}`}
                className={`h-20 w-20 object-cover border rounded-lg cursor-pointer ${image === item ? 'border-orange-600' : 'border-gray-300'
                  }`}
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="flex-1">
            <img src={image} alt="Selected Product" className="w-full h-auto rounded-lg shadow-sm" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="half star" className="w-4" />
            <span className="pl-2 text-gray-600">(122 Reviews)</span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Select Size:</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border rounded-md text-sm transition-all duration-200 cursor-pointer ${size === item
                    ? 'border-orange-500 bg-orange-100 text-orange-700'
                    : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="mt-4 w-full sm:w-auto px-8 py-3 text-sm font-medium bg-black text-white rounded-md hover:bg-gray-800 transition-all cursor-pointer"
          >
            ADD TO CART
          </button>

          {/* Assurance Info */}
          <hr className="my-6" />
          <div className="text-sm text-gray-500 space-y-1">
            <p>✅ 100% Original Products</p>
            <p>🚚 Cash on Delivery Available</p>
            <p>🔄 Easy Return & Exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-16">
        <div className="flex border-b">
          <button className="px-5 py-3 text-sm font-semibold border-b-2 border-black">Description</button>
          <button className="px-5 py-3 text-sm text-gray-600 hover:text-black">Reviews (122)</button>
        </div>
        <div className="py-6 px-4 sm:px-6 text-sm text-gray-600 space-y-4 bg-gray-50 border rounded-b-md">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nesciunt repudiandae numquam? A nobis saepe est suscipit culpa hic nemo
            consequuntur, adipisci sed neque quaerat incidunt! Eius pariatur tempore atque.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem consequuntur corrupti omnis placeat iste aperiam, dicta hic. Tenetur,
            accusantium dignissimos?
          </p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-600 text-lg animate-pulse">Loading product...</div>
  );
};

export default Product;
