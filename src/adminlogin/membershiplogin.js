import React, { useState } from 'react';
import { IoIosMailUnread } from "react-icons/io";
import { MdLockClock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import Header from '../header/header';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MembershipLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (validate()) {
      try {
        // Use axios to make a POST request to the API
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/member/membershiplogin`,
          { email, password }
        );

        // Check if login was successful based on the response status
        if (response.data.status === "success") {
          console.log("Login successful", response.data);
          setIsSubmitted(true);

          // Set sessionStorage with fullName and any other relevant data
          const fullName = response.data.user.fullName || '';
          sessionStorage.setItem('fullName', fullName);

          // Navigate to the member dashboard or fallback route
          setTimeout(() => {
            if (fullName) {
              navigate("/memberdashboard", { replace: true });
            } else {
              navigate("/", { replace: true });
            }
          }, 2000);
        } else {
          // Handle unsuccessful login attempt
          console.error("Login failed", response.data);
          setErrors({ form: response.data.message });

          // Clear the error message after 2 seconds
          setTimeout(() => {
            setErrors({ form: '' });
          }, 2000);
        }

      } catch (error) {
        // Handle network or unexpected server errors
        console.error("Error during login:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        setErrors({ form: errorMessage });

        // Clear the error message after 2 seconds
        setTimeout(() => {
          setErrors({ form: '' });
        }, 2000);
      } finally {
        // Reset email, password, and submission status after a delay
        setTimeout(() => {
          setEmail('');
          setPassword('');
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
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Member Login</h2>
          <form onSubmit={handleSubmit} autoComplete='on'>
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
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <p className="py-2 text-end">
              <Link to="/forgotpassword" className="text-blue-500 hover:text-blue-700 underline">ForgotPassword?</Link>
            </p>

            <div className="flex items-center justify-between">
              <button
                className="w-full bg-[#281E5D] hover:bg-blue-800 mt-4 text-white font-bold py-2 px-4 rounded-full
                 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>

            {errors.form && (
              <p className="text-red-500 text-xs mt-1 text-center">{errors.form}</p>
            )}
            <p className="pt-4 text-center">Don't have an account? <Link to="/membership" className="text-blue-500 hover:text-blue-700 underline">Register</Link></p>
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

export default MembershipLogin;