import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Login = ({ setToken }) => {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle login form submission
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const response = await axios.post(`${backendUrl}/api/user/admin`, {
                email,
                password,
            });

            if (response.data.success) {
                setToken(response.data.token);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); // fixed: used correct error.message
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

                <form onSubmit={onSubmitHandler}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-600 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
