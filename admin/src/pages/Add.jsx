import React, { useState } from 'react'
import { assets } from '../assets/assets.js'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)


    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Men')
    const [subCategory, setSubCategory] = useState('Topwear')
    const [price, setPrice] = useState('')
    const [sizes, setSizes] = useState([])
    const [isBestSeller, setIsBestSeller] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const uploadToCloudinary = async (file) => {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "my_unsigned_preset"); // Replace with your actual preset
                data.append("cloud_name", "dfqaf1gg7");

                const res = await fetch("https://api.cloudinary.com/v1_1/dfqaf1gg7/image/upload", {
                    method: "POST",
                    body: data,
                });

                const json = await res.json();
                return json.secure_url;
            };

            // Upload images
            let imageUrls = [];

            if (image1) imageUrls.push(await uploadToCloudinary(image1));
            if (image2) imageUrls.push(await uploadToCloudinary(image2));
            if (image3) imageUrls.push(await uploadToCloudinary(image3));
            if (image4) imageUrls.push(await uploadToCloudinary(image4));

            // Send payload to backend
            const payload = {
                name,
                description,
                category,
                subCategory,
                price,
                bestseller: isBestSeller,
                sizes,
                images: imageUrls,
            };
            // console.log("🔁 Sending payload to backend:", payload);


            const response = await axios.post(`${backendUrl}/api/product/add`, payload, {
                headers: {
                    token,
                    "Content-Type": "application/json"
                },
            });


            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error("Submit error:", error);
            toast.error(error.message);
        }
    };


    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full max-w-4xl p-4 gap-6 bg-white shadow-md rounded-xl">

            <div>
                <label className="text-sm font-semibold mb-2 block">Upload Images</label>
                <div className="flex gap-3 flex-wrap">
                    {[image1, image2, image3, image4].map((img, i) => (
                        <label key={i} htmlFor={`image${i + 1}`}>
                            <img
                                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                                className="w-24 h-24 object-cover border rounded-lg cursor-pointer"
                                alt={`Upload ${i + 1}`}
                            />
                            <input type="file" id={`image${i + 1}`} hidden onChange={(e) => [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])} />
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 font-medium">Product Name</label>
                    <input className="w-full px-3 py-2 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Price</label>
                    <input type="number" className="w-full px-3 py-2 border rounded-md" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Category</label>
                    <select className="w-full px-3 py-2 border rounded-md" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 font-medium">Subcategory</label>
                    <select className="w-full px-3 py-2 border rounded-md" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea className="w-full px-3 py-2 border rounded-md" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div>
                <label className="block mb-1 font-medium">Sizes</label>
                <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                        <button type="button" key={s} onClick={() =>
                            setSizes((prev) => prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s])
                        } className={`px-3 py-1 border rounded-md ${sizes.includes(s) ? 'bg-black text-white' : 'bg-gray-200'}`}>
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isBestSeller} onChange={() => setIsBestSeller(!isBestSeller)} />
                <label className='cursor-pointer'>Add to Bestseller</label>
            </div>

            <button type="submit" className="bg-black cursor-pointer text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-fit">Add Product</button>
        </form>

    )
}

export default Add
