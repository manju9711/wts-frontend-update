import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import launchimage from './images/launchimage.png';
import logoimage from './images/logo-removebg-preview.png';

const Launch = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLaunch = () => {
    setShowConfetti(true); // Trigger the confetti
    setTimeout(() => {
      setShowConfetti(false); // Stop the confetti after some time
      navigate('/Main'); // Navigate to the next page
    }, 4000); // Adjust timing as needed
  };

  // UseEffect to hide scroll on mount
  useEffect(() => {
    document.body.style.overflowY = 'hidden'; // Hide vertical scrollbar

    // Cleanup to reset overflow-y when the component unmounts
    return () => {
      document.body.style.overflowY = 'auto'; // Reset scrollbar visibility
    };
  }, []);

  return (
    <div
      className="flex items-center justify-center min-h-screen "
      style={{ background: 'linear-gradient(135deg, #f06, #b3cdd1)' }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto p-4">
        {/* Left side image */}
        <div className="flex-1 mb-6 md:mb-0 md:mr-8 flex justify-center">
          <img
            src={launchimage}
            alt="Launch Image"
            className="w-3/4 sm:w-3/4 md:w-full lg:w-3/4 h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right side content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4">
          {/* Logo */}
          <img
            src={logoimage}
            alt="Logo"
            className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto mb-4"
          />
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            உலக தமிழ் சிறகம் உங்களை அன்புடன் வரவேற்கிறது
          </h1>
          <button
            onClick={handleLaunch}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-lg sm:text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Launch
          </button>
          {showConfetti && <Confetti />}
        </div>
      </div>
    </div>
  );
};

export default Launch;










