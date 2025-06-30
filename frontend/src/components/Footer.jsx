import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='mb-5 w-32' src={assets.logo} alt="" />
                    <p className='text-gray-600 w-full md:w-2/3'>
                        Your trusted source for the latest fashion trends
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, eligendi?
                    </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Email: support@example.com</li>
                        <li>Phone: +1234567890</li>
                        <li>Address: 123 Main St, Anytown, USA</li>
                    </ul>
                </div>
            </div>
            <div className='w-full'>
                <hr />
                <p className='text-center py-5 text-sm'>
                    Copyright© 2025 Your Company. All rights reserved.
                </p>
            </div>
        </>
    )
}

export default Footer
