import mongoose from 'mongoose';

// Define the schema for the Product
const productSchema = new mongoose.Schema({

    // Product name - required and trimmed
    name: {
        type: String,
        required: true,
        trim: true
    },

    // Product description - required and trimmed
    description: {
        type: String,
        required: true,
        trim: true
    },

    // Product price - required and must be >= 0
    price: {
        type: Number,
        required: true,
        min: 0
    },

    // Product images - array of image URLs (strings), required
    image: {
        type: [String],
        required: true
    },

    // Main category - must be one of the predefined options
    category: {
        type: String,
        required: true,
        enum: ["Men", "Women", "Kids", "Shoes"]
    },

    // Sub-category - required (e.g., Shirts, Pants, etc.)
    subCategory: {
        type: String,
        required: true
    },

    // Available sizes - array of allowed size values
    sizes: {
        type: [String],
        enum: ["S", "M", "L", "XL", "XXL"],
        required: true
    },

    // Product listing date - defaults to current timestamp
    date: {
        type: Number, // Consider using 'Date' type instead
        default: Date.now
    },

    // Bestseller flag - defaults to false
    bestseller: {
        type: Boolean,
        default: false
    }

    // You can add a 'stock' field here if needed
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

// Create and export the Product model
const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
