import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext)
    const [orderData, setOrderData] = useState([])

    const loadOrderData = async () => {
        try {
            if (!token) return null

            const response = await axios.post(
                backendUrl + '/api/order/userOrders',
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                let allOrdersItem = []
                response.data.orders.map((order) =>
                    order.items.map((item) => {
                        item['status'] = order.status
                        item['payment'] = order.payment
                        item['paymentMethod'] = order.paymentMethod
                        item['date'] = order.date
                        allOrdersItem.push(item)
                    })
                )

                setOrderData(allOrdersItem.reverse())
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        loadOrderData()
    }, [token])

    return (
        <div className="border-t pt-16 px-4 sm:px-8 lg:px-16 bg-gray-50 min-h-screen">
            <div className="text-3xl font-semibold text-center mb-8">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>

            <div className="grid gap-6">
                {orderData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gray-100"
                    >
                        {/* Product Info */}
                        <div className="flex gap-4 w-full md:w-1/2">
                            <img
                                className="w-20 h-20 object-cover rounded-lg border"
                                src={item.image[0]}
                                alt={item.name}
                            />
                            <div className="text-sm sm:text-base text-gray-700">
                                <p className="font-semibold text-lg">{item.name}</p>
                                <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500">
                                    <p>{currency}{item.price}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className="mt-1 text-gray-500">
                                    Date:{' '}
                                    <span className="text-gray-400">
                                        {new Date(item.date).toDateString()}
                                    </span>
                                </p>
                                <p className="text-gray-500">
                                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                                </p>
                            </div>
                        </div>

                        {/* Order Status */}
                        <div className="flex items-center gap-2 w-full justify-center md:justify-center md:w-1/4">
                            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                            <p className="text-sm sm:text-base font-medium text-center">{item.status}</p>
                        </div>

                        {/* Track Button */}
                        <div className="w-full md:w-1/4 flex justify-center md:justify-end">
                            <button
                                onClick={loadOrderData}
                                className="bg-black text-white text-sm px-4 py-2 cursor-pointer rounded-md hover:bg-gray-800 transition duration-300 w-full md:w-auto"
                            >
                                TRACK ORDER
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Orders
