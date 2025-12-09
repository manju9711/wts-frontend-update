import React, { useState, useEffect } from 'react';
import { IoIosMailUnread } from "react-icons/io";
import { MdPhone, MdLockClock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import CmsHeader from '../header/Cmsheader';

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [roleId, setRoleId] = useState('');
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [placeholders, setPlaceholders] = useState({
    name: "Your Full Name",
    email: "Your Email",
    password: "Your Password",
    mobile: "Your Mobile Number",
    roleId: "Select Role"
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch roles from the backend
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/role`);
        setRoles(response.data.roles);
      } catch (error) {
        console.error('Failed to fetch roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    // if (!mobile) newErrors.mobile = "Mobile number is required";
    // else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Mobile number must be 10 digits";
    //   if (!mobile) newErrors.mobile = "Mobile number is required";
    //   else if (!/^\+(\d{1,3})\s\d{1,2}\s\d{8}$/.test(mobile)) {
    //     newErrors.mobile = "Please enter a valid mobile number";
    // } 
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    }
    if (!roleId) newErrors.roleId = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Proceed with user registration using the roleId
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, {
          name,
          email,
          password,
          mobile,
          role_id: roleId, // Updated to send role_id instead of role_name
        });

        setMessage('Your registration is successful!');
        setMessageType('success');
        setSnackbarOpen(true);

        setTimeout(() => {
          navigate('/adminlogin');
        }, 2000);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.error || 'Registration failed.');
        } else {
          setMessage('An unexpected error occurred.');
        }
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
      <CmsHeader />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 smax-w-md mt-16"
      >
        <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <div className="flex justify-center items-center min-h-screen pt-[10%] pb-[5%]">
        <div className="w-full max-w-md bg-white shadow-md rounded p-6 relative">
          <h2 className="text-2xl font-bold pb-4 text-gray-800 text-center">Admin Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Full Name
              </label>
              <div className={`shadow-lg flex items-center border rounded py-2 px-3 hover:border-[#281E5D] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}>
                <MdPerson className="text-gray-400" />
                <input
                  className="ml-2 w-full py-1 px-2 text-gray-700 focus:outline-none"
                  id="name"
                  type="text"
                  placeholder={placeholders.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name', name, 'Your Full Name')}
                  autoComplete='on'
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
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
            <div className="mb-4">
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
                  autoComplete='off'
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                Mobile Number
              </label>
              <div className={`shadow-lg flex items-center border rounded py-2 px-3 hover:border-[#281E5D] ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}>
                <MdPhone className="text-gray-400" />
                <input
                  className="ml-2 w-full py-1 px-2 text-gray-700 focus:outline-none"
                  id="mobile"
                  type="text"
                  placeholder={placeholders.mobile}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  onFocus={() => handleFocus('mobile')}
                  onBlur={() => handleBlur('mobile', mobile, 'Your Mobile Number')}
                  autoComplete='on'
                />
              </div>
              {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roleId">
                Role
              </label>
              <div className={`shadow-lg flex items-center border rounded py-2 px-3 hover:border-[#281E5D] ${errors.roleId ? 'border-red-500' : 'border-gray-300'}`}>
                <select
                  className="ml-2 w-full py-1 px-2 text-gray-700 focus:outline-none"
                  id="roleId"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  onFocus={() => handleFocus('roleId')}
                  onBlur={() => handleBlur('roleId', roleId, 'Select Role')}
                >
                  <option value="" disabled>{placeholders.roleId}</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role._id}>{role.role_name}</option>
                  ))}
                </select>
              </div>
              {errors.roleId && <p className="text-red-500 text-xs mt-1">{errors.roleId}</p>}
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="w-full bg-[#281E5D] hover:bg-blue-800 mt-4 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                Register
              </button>
            </div>
            <div className="text-center">
              <p className='pt-4 text-center'>
                Already have an account? <Link to="/adminlogin" className='text-blue-500 hover:text-blue-700 underline'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
