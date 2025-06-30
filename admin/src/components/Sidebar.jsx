import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const Sidebar = () => {

  return (
    <div className="w-[18%] min-h-screen bg-white border-r shadow-sm py-6 px-4">
      <nav className="flex flex-col gap-5 text-gray-700 text-sm font-medium">
        <NavLink to="/add" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
          <img src={assets.add_icon} className="w-5 h-5" alt="Add" />
          <span className="hidden md:inline">Add Items</span>
        </NavLink>
        <NavLink to="/list" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
          <img src={assets.order_icon} className="w-5 h-5" alt="List" />
          <span className="hidden md:inline">List Items</span>
        </NavLink>
        <NavLink to="/orders" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition">
          <img src={assets.order_icon} className="w-5 h-5" alt="Orders" />
          <span className="hidden md:inline">Orders</span>
        </NavLink>
      </nav>
    </div>







  )
}

export default Sidebar
