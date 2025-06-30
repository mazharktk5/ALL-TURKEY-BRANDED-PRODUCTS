import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      {/* Top Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 px-4'>
        {/* Image */}
        <img
          src={assets.contact_img}
          className='w-full md:max-w-[480px] rounded-lg object-cover'
          alt='Contact'
        />

        {/* Info Text */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <div>
            <p className='font-semibold text-xl text-gray-600'>Our Store</p>
            <p className='text-gray-500'>
              12334 Street 5 <br />
              ABC Town, Peshawar
            </p>
          </div>

          <div>
            <p className='text-gray-500'>
              TEL: +92 345 6778 888 <br />
              Email: abc@gmail.com
            </p>
          </div>

          <div>
            <p className='font-semibold text-xl text-gray-600'>Careers</p>
            <p className='text-gray-500'>
              Learn more about our teams and job openings.
            </p>
          </div>

          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white rounded-md cursor-pointer transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact
