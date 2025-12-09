import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../header/header';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import axios from 'axios';
import { GenderEnum, MemberTypeEnum } from '../constant/enum';
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PhoneInput from 'react-phone-input-2'; 
import 'react-phone-input-2/lib/style.css'; 

const Membership = () => {
  const { register, handleSubmit, formState: { errors }, reset, getValues, trigger } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  


  const onSubmit = async (data, event) => {
    event.preventDefault();
    const dateOfBirth = `${data.dobYear}-${data.dobMonth}-${data.dobDay}`;

    const payload = {
      fullName: data.fullName,
      address: data.address,
      dateOfBirth: dateOfBirth,
      gender: data.gender,
      phone: phoneNumber, // Use the phone number state here
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      membershipType: data.membershipType,
      additionalInfo: data.additionalInformation
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/member/membershipregister`, payload);
      if (response.status === 200) {
        setMessage('Your membership registration was successful!');
        setMessageType('success');
        setSnackbarOpen(true); // Open Snackbar on success
        setIsSubmitted(true);
        reset();   //clear all form fields
        setPhoneNumber(''); // Clear the phone number field specifically
      }
    } catch (error) {
      setMessage('Your registration has failed! Please try again.');
      setMessageType('error');
      setSnackbarOpen(true); // Open Snackbar on error
      console.error('Error registering member:', error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header />
      <div className='py-24'>
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl-lg shadow-md">
          <h1 className="text-2xl text-center font-bold mb-10">Register for Membership</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Personal Information Section */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold bg-blue-950 text-white p-2 pl-8 rounded-xl">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700">Full Name</label>
                  <input
                    type="text"
                    className={`p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                    {...register('fullName', { required: true })}
                  />
                  {errors.fullName && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    className={`p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                    {...register('address', { required: true })}
                  />
                  {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm text-gray-700">Date Of Birth</label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input
                        type="text"
                        placeholder="MM"
                        className={`p-2 border ${errors.dobMonth ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                        {...register('dobMonth', { required: true })}
                      />
                      {errors.dobMonth && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="DD"
                        className={`p-2 border ${errors.dobDay ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                        {...register('dobDay', { required: true })}
                      />
                      {errors.dobDay && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="YYYY"
                        className={`p-2 border ${errors.dobYear ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                        {...register('dobYear', { required: true })}
                      />
                      {errors.dobYear && <span className="text-red-500 text-sm">This field is required</span>}
                    </div>
                  </div>
                </div>

                {/* Gender Selection */}
                <div>
                  <label className="block text-gray-700">Gender</label>
                  <div className="flex items-center mt-2 space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value={GenderEnum.MALE}
                        className="mr-2"
                        {...register('gender', { required: true })}
                      />
                      {GenderEnum.MALE}
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value={GenderEnum.FEMALE}
                        className="mr-2"
                        {...register('gender', { required: true })}
                      />
                      {GenderEnum.FEMALE}
                    </label>
                  </div>
                  {errors.gender && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                {/* Phone Number with Country Code */}
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <div>
                                
                               
                                <PhoneInput
    country={'in'}
    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                    inputProps={{
                      name: 'phoneNumber',
                      required: true,
                      autoFocus: true
                    }}
    
    placeholder="Enter Mobile Number"
    type="number"
    
   
    inputStyle={{
        width: '100%',
        padding: '20px',
        paddingLeft: '58px',  
        backgroundColor: '#F1F2F3',
    }}
/>

                               
                            </div>
                  {/* {errors.phoneNumber && <span className="text-red-500 text-sm">This field is required</span>} */}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700">E-mail</label>
                  <input
                    type="email"
                    className={`p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                      {...register('password', {
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
                    </button>
                  </div>
                  {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-xl w-full`}
                      {...register('confirmPassword', {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === getValues('password') || "Passwords do not match",
                      })}
                      onBlur={() => trigger('confirmPassword')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
                    >
                      {showConfirmPassword ? <MdVisibility className="text-gray-400" /> : <MdVisibilityOff className="text-gray-400" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                </div>
              </div>
            </section>

            {/* Membership Type */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold bg-blue-950 text-white p-2 pl-8 rounded-xl">Membership Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {Object.values(MemberTypeEnum).map((type) => (
                  <label className="flex items-center" key={type}>
                    <input
                      type="radio"
                      value={type}
                      className="mr-2"
                      {...register('membershipType', { required: true })}
                    />
                    {type}
                  </label>
                ))}
              </div>
              {errors.membershipType && (
                <span className="text-red-500 text-sm">Please select a membership type</span>
              )}
            </section>

            {/* Additional Information */}
            <section className="mb-6">
              <h2 className="text-xl font-semibold bg-blue-950 text-white p-2 pl-8 rounded-xl">Additional Information</h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-xl mt-2"
                rows="4"
                {...register('additionalInformation')}
              />
            </section>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button type="submit" className="p-2 w-1/4 bg-blue-950 text-white rounded-full">
                Submit
              </button>
            </div>

            <div className="text-center">
              <p className='pt-4 text-center'>
                Already have an account? <Link to="/membershiplogin" className='text-blue-500 hover:text-blue-700 underline'>Login</Link>
              </p>
            </div>
          </form>

          {/* Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 max-w-md mt-16"
          >
            <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
};

export default Membership;


