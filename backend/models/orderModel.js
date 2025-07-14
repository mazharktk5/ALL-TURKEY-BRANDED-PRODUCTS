// Import mongoose for schema definition and model creation
import mongoose from "mongoose";

// Define the schema for an order
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },            // ID of the user who placed the order
    items: { type: Array, required: true },              // Array of items in the order
    amount: { type: Number, required: true },            // Total amount for the order
    address: { type: Object, required: true },           // Shipping address
    status: {
        type: String,
        required: true,
        default: 'Order Placed'                            // Default status when order is placed
    },
    paymentMethod: { type: String, required: true },     // Method of payment (e.g., COD, online)
    payment: {
        type: Boolean,
        required: true,
        default: false                                     // Default to false until payment is confirmed
    },
    date: { type: Number, required: true },              // Date/time the order was placed (timestamp)
});

// Export the model, reusing it if already defined
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
