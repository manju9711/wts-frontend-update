import React, { useState } from 'react';
import { IoIosMailUnread } from "react-icons/io";
import { MdLockClock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Header from '../header/header';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [placeholders, setPlaceholders] = useState({
    email: "Your Email",
    password: "Your Password",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setPlaceholders((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlur = (field, value, placeholder) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [field]: placeholder }));
      setPlaceholders((prev) => ({ ...prev, [field]: placeholder }));
    }
  };

  return (
    <>
    
    <Header/>
    <div className="flex justify-center items-center min-h-screen pt-20">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form onSubmit={handleSubmit} autoComplete='off'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className={`shadow-lg flex items-center border rounded py-2 px-3 hover:border-[#281E5D] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}>
              <IoIosMailUnread className="text-gray-400" />
              <input
                className="ml-2 w-full py-1 px-2 text-gray-700 focus:outline-none"
                id="email"
                type="email"
                placeholder={placeholders.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email', email, 'Your Email')}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className={`shadow-lg flex items-center border rounded py-2 px-3 hover:border-[#281E5D] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}>
              <MdLockClock className="text-gray-400" />
              <input
                className="ml-2 w-full py-1 px-2 text-gray-700 focus:outline-none"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={placeholders.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password', password, 'Your Password')}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-[#281E5D] hover:bg-blue-800 mt-4  text-white font-bold py-2 px-4 rounded-full
               focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <p className='pt-4 text-center'>Don't have an account? <Link to="/membership" className='text-blue-500 hover:text-blue-700 underline'>Register</Link></p>
        </form>
        {isSubmitted && (
          <div className="bg-green-200 text-green-800 p-3 mt-4 rounded-md text-center">
            Your login is successful!
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default LoginForm;