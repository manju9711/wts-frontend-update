import React, { useState } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import Header from '../header/header';
import axios from 'axios';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const ResetPassword = () => {
  // const { token } = useParams();  // Retrieve the token from URL
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');  // Retrieves token from query parameters

  console.log("Token from URL query parameters:", token);

  const [formData, setFormData] = useState({ newPassword: '', confirmNewPassword: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validate = () => {
    const { newPassword, confirmNewPassword } = formData;
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/member/reset-password?token=${token}`,  // Send token as a query parameter
          {
            newPassword: formData.newPassword,
            confirmNewPassword: formData.confirmNewPassword
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.status === 'success') {
          setSuccessMessage('Password reset successful! Redirecting...');
          setTimeout(() => navigate('/membershiplogin'), 2000);
        } else {
          setError(response.data.message || 'Failed to reset password');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen pt-20">
        <div className="w-full max-w-md bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Reset Password</h2>

          <form onSubmit={handleSubmit} autoComplete="on">
            {/* New Password Field */}
            <div>
              <label className="block text-gray-700">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                >
                  {showPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password Field */}
            <div className="mt-4">
              <label className="block text-gray-700">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  className={`p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                >
                  {showConfirmPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

            {/* Submit Button */}
            <button
              className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#281E5D] hover:bg-blue-800'} mt-4 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>

            <p className="pt-4 text-center">
              Don't have an account? <Link to="/membershiplogin" className="text-blue-500 hover:text-blue-700 underline">Login</Link>
            </p>
          </form>

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-200 text-green-800 p-3 mt-4 rounded-md text-center">
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;