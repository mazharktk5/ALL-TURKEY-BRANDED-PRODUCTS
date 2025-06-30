import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productmodel.js";

// add products
const addproduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Parse sizes if it's a JSON string
        const parsedSizes = Array.isArray(sizes) ? sizes : JSON.parse(sizes);

        // Upload images to Cloudinary
        const imageUrls = req.body.images; // Already uploaded from frontend


        // Prepare product data
        const productData = {
            name,
            description,
            category,
            subCategory,
            price: Number(price),
            bestseller: bestseller === "true" || bestseller === true,
            sizes: parsedSizes,
            image: imageUrls,
            date: Date.now()
        };

        console.log("Received payload:", req.body);


        const product = new ProductModel(productData);
        await product.save();

        res.json({
            success: true,
            message: "Product added successfully"
        });

    } catch (error) {
        console.error("Add Product Error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// list all products
const listproduct = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.json({
            success: true,
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
            succes: true,
            message: "product removed"
        })

    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })

    }
};



// single product info
const singleproduct = async (req, res) => {

    try {
        const { productId } = req.body;

        const product = await ProductModel.findById(productId)

        res.json({
            succes: true,
            product
        })
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })

    }
};

export { addproduct, listproduct, removeproduct, singleproduct };
