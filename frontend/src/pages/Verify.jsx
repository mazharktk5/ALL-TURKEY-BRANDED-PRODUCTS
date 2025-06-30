import React, { useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useContext } from 'react'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)

    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');


    const verifyPayment = async () => {

        try {
            if (!token) {
                console.log("Token missing");
                navigate('/cart');
                return;
            }
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { orderId, success }, { headers: { token } });
            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
            } else {
                console.log(response.data.message);
                navigate('/cart');
            }





        } catch (error) {
            console.log(error);
            navigate('/cart')

        }


    }

    useEffect(() => {
        if (token) {
            verifyPayment();
        }

    }, [token])

    return (
        <div>
            verify page
        </div>
    )
}

export default Verify
