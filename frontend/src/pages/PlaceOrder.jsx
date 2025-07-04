import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    country: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            )
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(
            backendUrl + '/api/order/placeOrder',
            orderData,
            { headers: { token } }
          )
          // if (response.data.success) {
          //   setCartItems({})
          //   navigate('/orders')

          if (response.data.success) {
            const phoneNumber = "";


            const itemLines = orderItems
              .map(item => `- ${item.name} (${item.size}) x ${item.quantity}`)
              .join("%0A");

            const msg = `Hello, I want to place an order:%0A%0A${itemLines}%0A%0ATotal: ${getCartAmount() + delivery_fee} PKR%0A%0ADelivery Info:%0AName: ${formData.firstName} ${formData.lastName}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AAddress: ${formData.street}, ${formData.city}, ${formData.state}, ${formData.country} - ${formData.zipcode}`;

            const url = `https://wa.me/${phoneNumber}?text=${msg}`;



            window.open(url, "_blank");
            toast.success('Order placed successfully! Redirecting to orders page...');


            setCartItems({});


            setTimeout(() => {
              navigate('/orders');
            }, 1000);
          }

          else {
            toast.error(response.data.message)
          }
          break

        case 'stripe':
          const stripeResponse = await axios.post(
            backendUrl + '/api/order/placeOrderStripe',
            orderData,
            { headers: { token } }
          )
          if (stripeResponse.data.success) {
            window.location.href = stripeResponse.data.url
          } else {
            toast.error(stripeResponse.data.message)
          }
          break

        default:
          break
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 sm:pt-12 px-4 sm:px-8 lg:px-16 xl:px-32 bg-white min-h-screen border-t'
    >
      {/* Left Side - Delivery Info */}
      <div className='space-y-5'>
        <div className='text-xl sm:text-2xl'>
          <Title text1='DELIVERY' text2='INFORMATION' />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row'>
          <input
            required
            onChange={onChangeHandler}
            name='firstName'
            value={formData.firstName}
            className='input-style w-full'
            type='text'
            placeholder='First Name'
          />
          <input
            required
            onChange={onChangeHandler}
            name='lastName'
            value={formData.lastName}
            className='input-style w-full'
            type='text'
            placeholder='Last Name'
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='email'
          value={formData.email}
          className='input-style w-full'
          type='email'
          placeholder='Email Address'
        />
        <input
          required
          onChange={onChangeHandler}
          name='street'
          value={formData.street}
          className='input-style w-full'
          type='text'
          placeholder='Street'
        />

        <div className='flex gap-4 flex-col sm:flex-row'>
          <input
            required
            onChange={onChangeHandler}
            name='city'
            value={formData.city}
            className='input-style w-full'
            type='text'
            placeholder='City'
          />
          <input
            required
            onChange={onChangeHandler}
            name='state'
            value={formData.state}
            className='input-style w-full'
            type='text'
            placeholder='Province'
          />
        </div>

        <div className='flex gap-4 flex-col sm:flex-row'>
          <input
            required
            onChange={onChangeHandler}
            name='zipcode'
            value={formData.zipcode}
            className='input-style w-full'
            type='number'
            placeholder='Zip Code'
          />
          <input
            required
            onChange={onChangeHandler}
            name='country'
            value={formData.country}
            className='input-style w-full'
            type='text'
            placeholder='Country'
          />
        </div>

        <input
          required
          onChange={onChangeHandler}
          name='phone'
          value={formData.phone}
          className='input-style w-full'
          type='number'
          placeholder='Phone Number'
        />
      </div>

      {/* Right Side - Cart & Payment */}
      <div className='space-y-10'>
        <CartTotal />

        <div className='space-y-6'>
          <Title text1='PAYMENT' text2='METHOD' />

          {/* <div className='flex flex-col gap-4 md:flex-row'>
            <div
              onClick={() => setMethod('stripe')}
              className={`payment-option ${method === 'stripe' && 'selected'}`}
            >
              <p
                className={`dot ${method === 'stripe' && 'bg-green-500'}`}
              ></p>
              <img className='h-5 mx-2' src={assets.stripe_logo} alt='Stripe' />
            </div>

            <div
              onClick={() => setMethod('cod')}
              className={`payment-option ${method === 'cod' && 'selected'}`}
            >
              <p
                className={`dot ${method === 'cod' && 'bg-green-500'}`}
              ></p>
              <p className='text-sm font-medium text-gray-600'>Cash on Delivery</p>
            </div>
          </div> */}

          <div className='w-full text-end'>
            <button
              type='submit'
              className='bg-black hover:bg-gray-900 transition text-white px-8 py-3 rounded-lg text-sm font-medium shadow-md'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Utility Styles */}
      <style>{`
        .input-style {
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          transition: border 0.3s ease;
        }
        .input-style:focus {
          outline: none;
          border-color: #4F46E5;
          box-shadow: 0 0 0 1px #4F46E5;
        }
        .payment-option {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }
        .payment-option.selected {
          border-color: #10B981;
          box-shadow: 0 0 0 2px #A7F3D0;
        }
        .dot {
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          border: 2px solid #999;
          margin-right: 0.5rem;
        }
      `}</style>
    </form>
  )
}

export default PlaceOrder
