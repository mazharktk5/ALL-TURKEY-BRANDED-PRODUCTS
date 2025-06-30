import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    
    
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: [String], // array of image URLs or file paths
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Men", "Women", "Kids"] // Optional: enforce categories
    },
    subCategory: {
        type: String,
        required: true
    },
    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL"],
        required: true
    },
    date: {
        type: Number,
        default: Date.now
    },
    bestseller: {
        type: Boolean,
        default: false
    }
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel  ;
