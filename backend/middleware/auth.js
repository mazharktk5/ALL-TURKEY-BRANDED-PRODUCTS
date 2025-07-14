// Import JWT for decoding the token
import jwt from 'jsonwebtoken';

// Middleware to authenticate a general user
const authUser = async (req, res, next) => {
    // Extract token from request headers
    const { token } = req.headers;

    // If token is not provided, deny access
    if (!token) {
        return res.status(401).json({
            success: false,
            msg: 'No token, authorization denied',
        });
    }

    try {
        // Verify and decode the token using the secret key
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request body for downstream usage
        req.body.userId = token_decoded.id;

        // Proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);

        // Handle invalid token errors
        return res.status(401).json({
            success: false,
            msg: 'Token is invalid',
        });
    }
};

export default authUser;
