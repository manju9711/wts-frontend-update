// import React from 'react';
// import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
// import donate from './images/donate.png';
// import { Link } from 'react-router-dom';

// const Topbar = () => {
//   return (
//     <div className="w-full bg-[#f8f9fa] border-b border-gray-300 py-2 px-4 lg:px-20 text-sm">
//       <div className="flex flex-col md:flex-row justify-between items-center w-full">
//         {/* Column 1: Phone and Email */}
//         <div className="flex items-center gap-3 text-gray-700 mb-2 md:mb-0 w-full md:w-1/3 justify-start">
//           <div className="flex items-center gap-1">
//             <FaPhoneAlt className="text-black" />
//             <span>+1 (586) 801-2246</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <FaEnvelope className="text-black" />
//             <span>tamilsiragam@gmail.com</span>
//           </div>
//         </div>

//         {/* Column 2: Center Text and Buttons */}
//         <div className="flex items-center gap-5 justify-center text-gray-800 text-xs w-full md:w-1/3 text-center mb-2 md:mb-0">
//           <span className="hidden sm:block">Welcome to World Tamil Siragam</span>
//           <Link to="/membershiplogin" className="bg-[#FC8103] text-[#FFFFFF] px-4 py-2 rounded-full hover:bg-orange-600 text-xs">
//             Log In
//           </Link>
//           <Link to="/membership" className="bg-[#3B8363] text-white px-4 py-2 rounded-full hover:bg-green-800 text-xs">
//             New Member? Join Now
//           </Link>
//         </div>

//         {/* Column 3: Donate Button */}
//         <div className="flex justify-end w-full md:w-1/3">
//           <Link
//             to="/donate"
//             className="bg-[#520404] text-white px-4 py-2 rounded-full hover:bg-red-900 text-xs flex items-center gap-1"
//           >
//             {/* <FaDonate /> */}
//             <img src={donate} alt="donate" />
//             Donate Now
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Topbar;

//responsive
import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import donate from './images/donate.png';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className="w-full bg-[#f8f9fa] border-b border-gray-300 py-2 px-4 lg:px-20 text-sm">
      <div className="flex flex-wrap justify-between items-center w-full gap-2 md:gap-0">
        
        {/* Column 1: Phone and Email */}
        <div className="flex flex-wrap items-center gap-3 text-gray-700 w-full md:w-1/3 justify-center md:justify-start">
          <div className="flex items-center gap-1">
            <FaPhoneAlt className="text-black text-xs" />
            <span className="text-xs">+1 (586) 801-2246</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEnvelope className="text-black text-xs" />
            <span className="text-xs">tamilsiragam@gmail.com</span>
          </div>
        </div>

        {/* Column 2: Welcome Text and Login/Join Buttons */}
        <div className="flex flex-wrap items-center justify-center w-full md:w-1/3 gap-2 text-center">
          <span className="hidden sm:block text-xs text-gray-800">Welcome to World Tamil Siragam</span>
          <Link
            to="/membershiplogin"
            className="bg-[#FC8103] text-white px-3 py-1.5 rounded-full hover:bg-orange-600 text-xs"
          >
            Log In
          </Link>
          <Link
            to="/membership"
            className="bg-[#3B8363] text-white px-3 py-1.5 rounded-full hover:bg-green-800 text-xs"
          >
            New Member? Join Now
          </Link>
        </div>

        {/* Column 3: Donate Button */}
        <div className="flex justify-center md:justify-end w-full md:w-1/3">
          <Link
            to="/donate"
            className="bg-[#520404] text-white px-3 py-1.5 rounded-full hover:bg-red-900 text-xs flex items-center gap-1"
          >
            <img src={donate} alt="donate" className="h-4 w-4" />
            Donate Now
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Topbar;
