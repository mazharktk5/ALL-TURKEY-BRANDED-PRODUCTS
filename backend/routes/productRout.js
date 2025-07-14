import express from 'express';
import {
    addproduct,
    listproduct,
    removeproduct,
    singleproduct
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// 📦 Add product (Admin only, with image upload)
productRouter.post(
    '/add',
    adminAuth,
    upload.fields([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 }
    ]),
    addproduct
);

// ❌ Remove product (Admin only)
productRouter.post('/remove', adminAuth, removeproduct);

// 🔍 Get single product
productRouter.post('/single', singleproduct);

// 📃 List all products
productRouter.get('/list', listproduct);

export default productRouter;
