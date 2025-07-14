// Import JWT for token verification
import jwt from "jsonwebtoken";

// Middleware to authenticate admin user
const adminAuth = async (req, res, next) => {
    try {
        // Extract token from request headers
        const { token } = req.headers;

        // If token is missing, deny access
        if (!token) {
            return res.json({
                success: false,
                message: "Access Denied",
            });
        }

        // Verify and decode the token using the secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the decoded token matches the admin email
        if (token_decode !== process.env.ADMIN_EMAIL) {
            return res.json({
                success: false,
                message: "Access Denied",
            });
        }

        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.log(error);

        // Handle token verification or other errors
        res.json({
            success: false,
            message: error.message, // fixed mistake: used literal string before
        });
    }
};

export default adminAuth;
