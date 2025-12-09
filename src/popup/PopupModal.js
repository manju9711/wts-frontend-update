import React, { useState, useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS CSS
import AOS from 'aos'; // Import AOS
import logo from './image/wtslogo.jpeg';

const PopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal when the page loads
    setIsOpen(true);
    // Initialize AOS
    AOS.init();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        {/* Modal container with border and shadow */}
        <div
          className="bg-white border border-gray-300 shadow-lg shadow-gray-600 p-6 rounded-lg w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto min-h-[50%] md:min-h-[60%] lg:min-h-[40%] relative z-60"
          data-aos="zoom-in" // AOS zoom-in animation
          data-aos-duration="1200" // Duration of the animation
        >
          <div className="absolute top-2 right-2 cursor-pointer p-2 z-70" onClick={handleClose}>
            {/* Close Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            {/* Centered Logo */}
            <img src={logo} alt="Logo" className="mb-4 w-24 h-auto" />
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 px-4">
              தேமதுரத் தமிழோசை உலகமெல்லாம் பரவும் வகை செய்யல் வேண்டும்!
            </h2>
            {/* <p className="mb-4 text-center px-4">Stay tuned for the latest updates and events.</p> */}
          </div>
        </div>
      </div>
    )
  );
};

export default PopupModal;
