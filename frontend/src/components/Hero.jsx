import React from 'react'
import { assets } from '../assets/assets';

const Hero = () => {
    return (
        <div className='flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md'>
            {/* Left */}
            <div className='w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12'>
                <div className='text-[#414141] space-y-4'>
                    <div className='flex items-center gap-2'>
                        <div className='w-10 h-[2px] bg-[#414141]' />
                        <p className='font-medium text-sm md:text-base tracking-wide'>OUR BEST SELLERS</p>
                    </div>
                    <h1 className='text-3xl lg:text-5xl font-serif leading-snug'>Latest Arrivals</h1>
                    <div className='flex items-center gap-2'>
                        <p className='font-medium text-sm md:text-base'>SHOP NOW</p>
                        <div className='w-10 h-[2px] bg-[#414141]' />
                    </div>
                </div>
            </div>

            {/* Right */}
            <img className='w-full sm:w-1/2 object-cover' src={assets.hero_img} alt="" />
        </div>
    )
}

export default Hero;
