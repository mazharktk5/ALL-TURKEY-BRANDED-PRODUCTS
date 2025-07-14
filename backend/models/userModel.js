import mongoose from 'mongoose';

// Define the schema for the User
const userSchema = new mongoose.Schema({

    // User's full name - required
    name: {
        type: String,
        required: true
    },

    // User's email - required and must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },

    // User's password - required (hashed before saving)
    password: {
        type: String,
        required: true
    },

    // Cart data - holds cart items, initialized as empty object
    cartData: {
        type: Object,
        default: {}
    }

}, {
    // Prevent Mongoose from removing empty objects
    minimize: false
});

// Create and export the User model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
