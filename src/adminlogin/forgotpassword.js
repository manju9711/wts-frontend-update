import React, { useState } from 'react';
import axios from 'axios';
import { IoIosMailUnread } from "react-icons/io";
import Header from '../header/header';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validate = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/member/forgot-password`,
          { email }
        );

        if (response.data.status === "success") {
          setIsSubmitted(true);
          setSuccessMessage('A password reset link has been sent to your email.');

        } else {
          setError(response.data.message);  // Handle API error
        }
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'An unexpected error occurred';
        setError(errorMessage);
      } finally {
        setTimeout(() => {
          setEmail('');
          setIsSubmitted(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="w-full max-w-md bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Forgot Password</h2>
              <p className='text-gray-500 text-center pb-2'>
                Remember your password? <Link to="/membershiplogin" className="text-blue-500 hover:text-blue-700 underline">Login here</Link>
              </p>

          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className={`shadow-lg flex items-center border rounded py-2 px-3 hover:border-[#281E5D] ${error ? 'border-red-500' : 'border-gray-300'}`}>
                <IoIosMailUnread className="text-gray-400" />
                <input
                  className="ml-2 w-full py-1 px-2 text-gray-700 focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              className="w-full bg-[#281E5D] hover:bg-blue-800 mt-4 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </form>

          {isSubmitted && (
            <div className="bg-green-200 text-green-800 p-3 mt-4 rounded-md text-center">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;