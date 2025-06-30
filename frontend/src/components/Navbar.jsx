import { assets } from '../assets/assets.js';
import { NavLink, Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems,
    } = useContext(ShopContext);

    const logOut = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({}); // ✅ Fix: Clear cart immediately
        toast.success('Logged Out');
    };

    return (
        <div className="flex justify-between items-center py-5 font-medium">
            <Link to="/">
                <img src={assets.logo} className="w-36" alt="Logo" />
            </Link>

            <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/about" className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/contact" className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
                <NavLink to="/collection" className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
                </NavLink>
            </ul>

            <div className="flex items-center gap-6">
                <img
                    onClick={() => setShowSearch(true)}
                    src={assets.search_icon}
                    alt="Search"
                    className="w-5 cursor-pointer"
                />

                <div className="relative group">
                    <img
                        onClick={() => token ? null : navigate('/login')}
                        src={assets.profile_icon}
                        className="w-5 cursor-pointer"
                        alt="profile"
                    />
                    {/* drop down  */}
                    {token && (
                        <div className="absolute right-0 pt-4 hidden group-hover:block z-50">
                            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500 rounded shadow-lg">
                                <p className="cursor-pointer hover:text-black hover:bg-gray-100 p-1">
                                    Profile
                                </p>
                                <p
                                    onClick={() => navigate('/orders')}
                                    className="cursor-pointer hover:text-black hover:bg-gray-100 p-1"
                                >
                                    Orders
                                </p>
                                <p
                                    onClick={logOut}
                                    className="cursor-pointer hover:text-black hover:bg-gray-100 p-1 text-red-500"
                                >
                                    Logout
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <Link to="/cart" className="relative">
                    <img
                        src={assets.cart_icon}
                        className="w-5 min-w-5 cursor-pointer"
                        alt="cart"
                    />
                    <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
                        {getCartCount()}
                    </p>
                </Link>

                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className="w-5 min-w-5 cursor-pointer sm:hidden"
                    alt="menu"
                />
            </div>

            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'
                    }`}
            >
                <div className="flex flex-col text-gray-600">
                    <div
                        onClick={() => setVisible(false)}
                        className="flex cursor-pointer items-center gap-4 p-3"
                    >
                        <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="back" />
                        <p>Back</p>
                    </div>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/"
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/about"
                    >
                        ABOUT
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/contact"
                    >
                        CONTACT
                    </NavLink>
                    <NavLink
                        onClick={() => setVisible(false)}
                        className="py-2 pl-6 border"
                        to="/collection"
                    >
                        COLLECTION
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
