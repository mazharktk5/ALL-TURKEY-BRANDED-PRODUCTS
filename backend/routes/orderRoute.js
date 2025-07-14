import express from 'express';
import {
    PlaceOrder,
    PlaceOrderStrip,
    PlaceOrderRazorPay,
    userOrders,
    allOrders,
    updateStatus,
    verifyStripe
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// 🛡 Admin-only Routes
orderRouter.post('/updateStatus', adminAuth, updateStatus);   // Update order status
orderRouter.post('/list', adminAuth, allOrders);              // List all orders (admin)

// 🛒 Authenticated User Routes
orderRouter.post('/placeOrder', authUser, PlaceOrder);               // Place order (Cash on Delivery)
orderRouter.post('/placeOrderStripe', authUser, PlaceOrderStrip);    // Place order via Stripe
orderRouter.post('/placeOrderRazorPay', authUser, PlaceOrderRazorPay); // Place order via RazorPay

orderRouter.post('/userOrders', authUser, userOrders);               // Get user-specific orders
orderRouter.post('/verifyStripe', authUser, verifyStripe);           // Stripe payment verification

export default orderRouter;
