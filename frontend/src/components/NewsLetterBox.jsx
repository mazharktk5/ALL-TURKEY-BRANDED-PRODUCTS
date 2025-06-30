import React from 'react'

const NewsLetterBox = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='text-center mt-20 px-4'>
            <p className='text-2xl sm:text-3xl font-semibold text-gray-800'>Subscribe Now & Get 20% Off</p>
            <p className='text-gray-500 mt-2 text-sm sm:text-base'>Join our newsletter and stay updated on the latest offers.</p>

            <form onSubmit={handleSubmit} className='w-full sm:w-3/5 lg:w-2/5 mx-auto flex flex-col sm:flex-row items-center gap-3 mt-6'>
                <input
                    className='w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black text-sm'
                    type="email"
                    placeholder='Enter your email'
                    required
                />
                <button className='bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-gray-900 transition-all' type='submit'>
                    Subscribe
                </button>
            </form>
        </div>

    )
}

export default NewsLetterBox
