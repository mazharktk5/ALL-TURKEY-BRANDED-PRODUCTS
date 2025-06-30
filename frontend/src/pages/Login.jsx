import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'signup') {
        const response = await axios.post(
          backendUrl + '/api/user/register',
          { name, email, password },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
          setName('');
          setEmail('');
          setPassword('');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          backendUrl + '/api/user/login',
          { email, password },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(response.data.message);
          setEmail('');
          setPassword('');
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md mx-auto mt-16 gap-6 p-6 bg-white shadow-md rounded-xl text-gray-800"
    >
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold capitalize">{currentState}</h2>
        <div className="h-[2px] w-10 bg-gray-800 mx-auto mt-1 rounded" />
      </div>

      {/* Input Fields */}
      {currentState === 'signup' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        placeholder="Password"
        required
      />

      {/* Links */}
      <div className="w-full flex justify-between text-sm text-gray-600">
        <p className="cursor-pointer hover:underline">Forgot Password?</p>
        <p
          onClick={() => setCurrentState(currentState === 'login' ? 'signup' : 'login')}
          className="cursor-pointer hover:underline"
        >
          {currentState === 'login' ? 'Create Account' : 'Login'}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 mt-2 rounded-md hover:bg-gray-800 transition-all cursor-pointer"
      >
        {currentState === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
