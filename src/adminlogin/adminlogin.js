import React, { useState } from 'react';
import { IoIosMailUnread } from "react-icons/io";
import { MdLockClock, MdVisibility, MdVisibilityOff } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import CmsHeader from '../header/Cmsheader';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [placeholders, setPlaceholders] = useState({
    email: "Your Email",
    password: "Your Password",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     try {
  //       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, { email, password });
  //       setMessage('Your login is successful!');
  //       setMessageType('success');
  //       setSnackbarOpen(true);
  
  //       // Store the token and role_id in localStorage
  //       const { token, role } = response.data;
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('role_id', role._id);
  
  //       // Fetch role_name using role_id
  //       const roleResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/role/${role._id}`);
  //       const roleName = roleResponse.data.role.role_name;
  //       localStorage.setItem('role_name', roleName);
  
  //       setTimeout(() => {
  //         // Navigate based on the role
  //         if (roleName === 'admin') {
  //           navigate("/cms");
  //         } else {
  //           navigate("/");
  //         }
  //       }, 2000);
  //     } catch (error) {
  //       console.error('Login error:', error);
  //       setMessage(error.response?.data?.error || 'Login failed');
  //       setMessageType('error');
  //       setSnackbarOpen(true);
  //     }
  //   } else {
  //     setMessage('There are errors in your submission.');
  //     setMessageType('error');
  //     setSnackbarOpen(true);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, { email, password });
        setMessage('Your login is successful!');
        setMessageType('success');
        setSnackbarOpen(true);
  
        const { token, role, user } = response.data;
        const roleResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/role/${role._id}`);
        const roleName = roleResponse.data.role.role_name;
  
        setTimeout(() => {
          if (roleName === 'admin') {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role_id', role._id);
            sessionStorage.setItem('role_name', roleName);
            sessionStorage.setItem('user_name', user.name);
  
            navigate("/cms", { replace: true }); // Navigate to the CMS
          } else {
            navigate("/", { replace: true }); // Navigate to another route for non-admin users
          }
        }, 2000);
      } catch (error) {
        console.error('Login error:', error);
        setMessage(error.response?.data?.error || 'Login failed');
        setMessageType('error');
        setSnackbarOpen(true);
      }
    } else {
      setMessage('There are errors in your submission.');
      setMessageType('error');
      setSnackbarOpen(true);
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

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CmsHeader/>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 max-w-md mt-16"
      >
        <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="w-full max-w-md bg-white shadow-md rounded p-6 relative">
          <h2 className="text-2xl font-bold pb-4 text-gray-800 text-center">Admin Login</h2>
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
                  autoComplete='on'
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
                className="w-full bg-[#281E5D] hover:bg-blue-800 mt-4 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
            <p className='pt-4 text-center'>Don't have an account? <Link to="/adminregister" className='text-blue-500 hover:text-blue-700 underline'>Register</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLoginForm;
