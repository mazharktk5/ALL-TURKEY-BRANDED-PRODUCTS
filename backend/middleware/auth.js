import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.status(401).json({success:false, msg: 'No token, authorization denied' });
    }

    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success:false, msg: 'Token is invalid' });
    }
};

export default authUser;