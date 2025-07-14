import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

// ==========================
// Global constants
// ==========================
const currency = "USD";
const deliveryCharges = 2;

// ==========================
// Stripe Initialization
// ==========================
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ==========================
// Place Order - Cash on Delivery
// ==========================
const PlaceOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await UserModel.findByIdAndUpdate(userId, { cartData: {} });

        console.log("Address received:", address);

        res.json({
            success: true,
            message: "Order placed successfully",
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in placing order",
        });
    }
};

// ==========================
// Place Order - Stripe
// ==========================
const PlaceOrderStrip = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        // Add delivery charge as a separate item
        line_items.push({
            price_data: {
                currency,
                product_data: { name: "Delivery Charges" },
                unit_amount: deliveryCharges * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        });

        await UserModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({
            success: true,
            message: "Order placed successfully",
            url: session.url,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in placing order",
        });
    }
};

// ==========================
// Verify Stripe Payment
// ==========================
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body;

    try {
        if (success) {
            const order = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });

            // Clear cart
            await UserModel.findByIdAndUpdate(userId, { cartData: {} });

            res.json({
                success: true,
                message: "Payment successful",
                order,
            });

        } else {
            await orderModel.findByIdAndDelete(orderId);

            res.json({
                success: false,
                message: "Payment failed",
            });
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in verifying payment",
        });
    }
};

// ==========================
// Place Order - RazorPay (TODO)
// ==========================
const PlaceOrderRazorPay = async (req, res) => {
    // Not implemented yet
    res.json({ success: false, message: "RazorPay not implemented yet" });
};

// ==========================
// Get All Orders (Admin)
// ==========================
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error fetching all orders",
        });
    }
};

// ==========================
// Get Orders by User (Frontend)
// ==========================
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });

        res.json({
            success: true,
            orders,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in fetching user orders",
        });
    }
};

// ==========================
// Update Order Status
// ==========================
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        res.json({
            success: true,
            message: "Status updated",
            order,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in updating order status",
        });
    }
};

// ==========================
// Export Controllers
// ==========================
export {
    verifyStripe,
    PlaceOrder,
    PlaceOrderStrip,
    PlaceOrderRazorPay,
    userOrders,
    allOrders,
    updateStatus,
};
