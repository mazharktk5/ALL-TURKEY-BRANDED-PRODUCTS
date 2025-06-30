import React from 'react'
import { assets } from '../assets/assets'

const Ourpolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row  justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:tex-base text-gray '>
            <div>
                <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We Offer free Exchange policy</p>
            </div>

            <div>
                <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We Offer free Return policy</p>
            </div>

            <div>
                <img src={assets.support_img} alt="" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>Customer Support</p>
                <p className='text-gray-400'>We Offer 24/7 Customer Support</p>
            </div>

        </div>
    )
}

export default Ourpolicy;
