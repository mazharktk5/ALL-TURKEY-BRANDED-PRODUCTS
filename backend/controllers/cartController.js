import UserModel from "../models/userModel.js";

// ==============================
// Add product to cart
// ==============================
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        // Previous logic using direct object manipulation
        // if (!userData.cartData) userData.cartData = {};
        // if (!userData.cartData[itemId]) {
        //     userData.cartData[itemId] = {};
        // }
        // if (!userData.cartData[itemId][size]) {
        //     userData.cartData[itemId][size] = 1;
        // } else {
        //     userData.cartData[itemId][size] += 1;
        // }
        // userData.markModified('cartData');

        // New logic
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1; // Increment quantity if already exists
            } else {
                cartData[itemId][size] = 1; // Set quantity to 1 if size doesn't exist
            }
        } else {
            cartData[itemId] = {}; // Create item entry if not exists
            cartData[itemId][size] = 1; // Set quantity for the given size
        }

        await UserModel.findByIdAndUpdate(userId, { cartData });

        // await userData.save(); // previously used save method

        console.log("[SAVED] Updated Cart:", userData.cartData);

        res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: "Error adding product to cart" });
    }
};

// ==============================
// Update user cart quantity
// ==============================
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity; // Update quantity for item+size

        await UserModel.findByIdAndUpdate(userId, { cartData });

        res.json({
            success: true,
            message: "Cart updated successfully",
        });
    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({ message: "Error updating cart" });
    }
};

// ==============================
// Get user cart
// ==============================
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await UserModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({
            success: true,
            cartData,
        });
    } catch (error) {
        console.error("Get user cart error:", error);
        res.status(500).json({ message: "Error getting user cart" });
    }
};

export { addToCart, updateCart, getUserCart };
