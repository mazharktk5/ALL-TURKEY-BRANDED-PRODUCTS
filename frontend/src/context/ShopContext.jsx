import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');

    const navigate = useNavigate();



    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size.");
            return;
        }

        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
                toast.success("Item added to cart")


            } else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1


        }


        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

            } catch (error) {
                console.error(error);
                toast.error(error.message)

            }
        }


    };

    // update cart

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity },
                    { headers: { token } }
                );

            } catch (error) {
                console.error(error);
                toast.error(error.message)


            }
        }

    }


    const getCartCount = () => {
        let count = 0;
        for (const item in cartItems) {
            for (const size in cartItems[item]) {
                count += cartItems[item][size];
            }
        }
        return count;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (!itemInfo) continue;
            for (const size in cartItems[itemId]) {
                totalAmount += itemInfo.price * cartItems[itemId][size];
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message || "Failed to load products.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to load products.");
        }
    };

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })

            if (response.data.success) {
                setCartItems(response.data.cartData)
            }


        } catch (error) {
            console.error(error);
            toast.error("Failed to load cart.");

        }
    }



    useEffect(() => {
        getProductsData();
    }, []);



    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'));
        }
    }, [])

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        token,
        setToken,

    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export { ShopContext, ShopContextProvider };