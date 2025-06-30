import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { response } from "express";
import jwt from 'jsonwebtoken'
import validator from 'validator';



const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};



// login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Create JWT token
        const token = createToken(user._id);

        // Login successful
        res.status(200).json({
            success: true,
            message: "Login successful",
            token, // <-- Send the token
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};





// register



const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format"
            });
        }

        if (!validator.isStrongPassword(password, { minLength: 8 })) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long and must have 1 special char i upper case and 1 lower case"
            });
        }

        // Check if user already exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
            cartData: {}
        });

        await newUser.save();

        const token = createToken(newUser._id)


        // response.json({success:true,token})

        res.status(201).json({
            success: true,
            token,
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Register error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


// admin login
const adminLogin = async (req, res) => {

    try {

        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email,process.env.JWT_SECRET)
            res.json(
                {
                success:true,
                token
            }
            )
        }else{
            res.json({
                success:false,
                message:"invalid credintial"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

}

export { loginUser, registerUser, adminLogin }