import React from 'react'
import { assets } from '../assets/assets.js'

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-sm bg-white border-b">
      {/* <img src={assets.logo} className="w-20" alt="Logo" /> */}
      <h2 className='font-bold text-2xl'> TURK BRANDED PRODUCTS ADMIN PANEL</h2>
      <button onClick={() => setToken('')} className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-5 py-2 rounded-full text-sm transition">Logout</button>
    </div>

  )
}


export default Navbar
