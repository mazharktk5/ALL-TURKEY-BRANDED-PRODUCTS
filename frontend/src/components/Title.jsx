import React from 'react'

const Title = ({ text1, text2 }) => {
    return (
        <div className='inline-flex items-center justify-center gap-3 mb-4'>
            <p className='text-gray-500 text-lg sm:text-xl font-light tracking-wide'>
                {text1} <span className='text-gray-800 font-semibold'>{text2}</span>
            </p>
            <div className='w-10 sm:w-14 h-[2px] bg-gray-600 rounded'></div>
        </div>

    )
}

export default Title
