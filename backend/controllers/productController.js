import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productmodel.js";

// add products
const addproduct = async (req, res) => {
    try {


        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 =req.files.image1 && req.files.image1[0];
        const image2 =req.files.image2 && req.files.image2[0];
        const image3 =req.files.image3 && req.files.image3[0];
        const image4 =req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})

                return result.secure_url
            })
        )


        // console.log("Product Info:", name, description, price, category, subCategory, sizes, bestseller);
        // console.log("Uploaded Files:", imagesUrl);

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller:bestseller === "true" ? true :false,
            sizes: JSON.parse(sizes),
            image:imagesUrl,
            date: Date.now()

        }

        console.log(productData);

        const product = new ProductModel(productData);

        await product.save()


        


        res.json({
            success:true,
            message:'products added suucefully'
        })


    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })


    }


};

// list all products
const listproduct = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json({
            success:true,
            products
        })

    } catch (error) {

        console.log(error);

        res.json({ success: false, message: error.message })

        
    }
};

// remove products
const removeproduct = async (req, res) => {
    try {

        await ProductModel.findByIdAndDelete(req.body.id);
        res.json({
            succes:true,
            message:"product removed"
        })
        
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })

    }
};



// single product info
const singleproduct = async (req, res) => {
    
    try {
        const {productId} = req.body;

        const product = await ProductModel.findById(productId)

        res.json({
            succes:true,
            product
        })
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })

    }
};

export { addproduct, listproduct, removeproduct, singleproduct };
