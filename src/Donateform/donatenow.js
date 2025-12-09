import React, { useState } from 'react';
import donate from './image/donate-now-01a4ffd9.png';
import Header from '../header/header';


const DonateNow = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [amount, setAmount] = useState('50');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Validate amount to be a number greater than 0
    if (!isNaN(value) && parseInt(value) >= 0) {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const errors = {};
    if (!firstName) {
      errors.firstName = 'First Name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last Name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Proceed with form submission
      console.log('Form submitted!');
    }
  };

  return (
    <>
    
    <Header/>
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 pt-20">
      
      <div className="w-full  flex justify-center overflow-y-auto max-h-screen">
        <img src={donate} alt="Donation" className="w-5/6 h-auto" />
      </div>
      <div className="w-full  bg-white px-8 pb-8 rounded-lg max-h-screen overflow-auto relative">
        <div className="sticky top-0 bg-white py-4 w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Donate Now</h2>
        </div>
        <form onSubmit={handleSubmit}>

<div className="mb-4">
            <label className="block text-gray-900 font-bold mb-2">Select Payment Method</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center mr-4 font-bold border-2 border-blue-500 lg:w-80 rounded-lg p-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="form-radio"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={() => setPaymentMethod('PayPal')}
                />
                <span className="ml-2">PayPal</span>
              </label>
              <label className="flex items-center font-bold border-2 border-blue-500 lg:w-80 rounded-lg p-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="form-radio"
                  value="Offline"
                  checked={paymentMethod === 'Offline'}
                  onChange={() => setPaymentMethod('Offline')}
                />
                <span className="ml-2">Offline Donation</span>
              </label>
            </div>
          </div>

          {paymentMethod === 'Offline' ? (
            <div className="mb-4">
            <h3 className="text-lg font-semibold">Purpose:</h3>
            <p>First of all, THANKS a bunch for donating to World Tamil Siragam, appreciate it. Your contribution is valuable and capable of making a significant difference for the development of Tamil and Tamil community living in North America and all over the world. This doc provides various modes of payments available to send your donations to World Tamil Siragam.</p>
            <h3 className="text-lg font-semibold mt-4">NOTE:</h3>
            <p>PLEASE DO NOT USE these payment options if World Tamil Siragam has already provided separate payment links to support events like, Fundraising, Naerol Vizhaa registrations, sponsorship etc.
              Use the following options, primarily for General donations, supporting activities, special initiatives etc. Please use the memo / special instruction fields in the transfer forms to indicate the reason for your contribution. Once you make a donation, please send an email to tamilsiragam@gmail.com to confirm that World Tamil Siragam received your contribution so that receipt could be generated and sent to you for Tax purposes, if needed.</p>
            
            <h3 className="text-lg font-semibold mt-4">Physical Check</h3>
            <p>Write the Check Payable To: World Tamil Siragam
              Mail to the following address:
              6, Rue Paul Langevin, 95140 Garges les Gonesse, Paris, France
              Add Memo / instructions if donated for specific cause</p>
            <h3 className="text-lg font-semibold mt-4">PayPal</h3>
            <p>World Tamil Siragam A/C linked with PayPal via tamilsiragam@gmail.com
              Add memo/instructions if the money is donated for specific cause
              Please select Friends and family for World Tamil Siragam</p>
            <h3 className="text-lg font-semibold mt-4">Venmo</h3>
            <p>World Tamil Siragam A/C with Venmo: @World Tamil Siragamofficial with Venmo
              Add Memo</p>
            <h3 className="text-lg font-semibold mt-4">Credit/Debit card</h3>
            <p>Pay via stripe link.
              Donation Link: Donate Now | World Tamil Siragam</p>
            <h3 className="text-lg font-semibold mt-4">Company Matching</h3>
            <p>Only preferred if the matching gift is directly going to World Tamil Siragam main account. It is a lengthy process.</p>
            
          </div>
          ) : (
            <>

<div className="mb-6">
  <label className="block text-gray-900 mt-4 font-bold mb-4">Select Amount</label>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
    {[50, 250, 500, 1000, 0].map((amt) => (
      <button
        type="button"
        key={amt}
        onClick={() => setAmount(amt.toString())}
        className={`py-2 px-4 rounded border text-xs sm:text-xs lg:text-base md:text-xs md:px-2 ${amount === amt.toString() ? 'bg-blue-500 rounded-full mt-2 font-bold text-white border-blue-500' : 'mt-2 rounded-full font-bold text-gray-700 border-gray-900'}`}
      >
        {amt === 0 ? 'Custom Amount' : `$${amt}.00`}
      </button>
    ))}
    <div className='flex col-span-2 sm:col-span-1 md:col-span-2'>
      <div className='relative mt-2 w-full'>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2 md:pb-2 lg:pt-2 text-gray-700">$</span>
        <input
          type="number"
          placeholder="0"
          value={amount}
          onChange={handleAmountChange}
          className="border border-gray-900 rounded w-full md:w-40 md:w-24 py-2 pl-6 pr-2"
        />
      </div>
    </div>
  </div>
</div>
              <label className="block text-gray-900 mt-4 font-bold mb-4">Personal Info</label>

              <div className="mb-6 flex flex-wrap">

                <div className="w-full md:w-1/2 md:pr-2 mb-6 md:mb-0">
                  <label className="block text-gray-700 font-base mb-2">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={`border border-gray-900 rounded w-full py-2 px-4 ${errors.firstName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div className="w-full md:w-1/2 md:pl-2">
                  <label className="block text-gray-700 font-base mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={`border border-gray-900 rounded w-full py-2 px-4 ${errors.lastName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-base mb-2">Email ID *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`border border-gray-900 rounded w-full py-2 px-4 ${errors.email ? 'border-red-500' : ''}`}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <p className="text-gray-900">Total: ${amount}</p>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded">Donate Now</button>
            </>
          )}
        </form>
      </div>
    </div>
    </>
  );
};

export default DonateNow;
