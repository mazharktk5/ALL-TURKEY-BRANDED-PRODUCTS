import React from "react";

import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {


    if (!token) {
      console.log("token missing");

      return null;
    }

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders.reverse());

      } else {
        toast.error(response.data.message)
      }


    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");

    }


  }

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(
        backendUrl + '/api/order/updateStatus',
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }

    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  }




  useEffect(() => {
    fetchAllOrders()

  }, [token])



  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Orders</h2>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row justify-between items-start gap-4 border">
            <img src={assets.parcel_icon} className="w-10 h-10" alt="parcel" />
            <div className="flex-1">
              <div className="text-sm text-gray-700">
                {order.items.map((item, i) => (
                  <p key={i}>{item.name} x {item.quantity} ({item.size})</p>
                ))}
              </div>
              <div className="mt-2">
                <p className="font-semibold">{order.address?.firstName} {order.address?.lastName}</p>
                <p className="text-xs text-gray-600">{order.address?.street}, {order.address?.state}, {order.address?.country} - {order.address?.zipcode}</p>
                <p className="text-xs text-gray-600">Phone: {order.address?.phone}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <p className="font-bold text-lg">{currency}{order.amount}</p>
              <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
              <p className="text-sm text-gray-600">Payment Status: {order.payment ? "Paid" : "Unpaid"}</p>
              <select value={order.status} onChange={(e) => statusHandler(e, order._id)} className="border rounded px-2 py-1 text-sm">
                <option value="OrderPlaced">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
            </div>

          </div>
        ))}
      </div>
    </div>

  )
}

export default Orders;