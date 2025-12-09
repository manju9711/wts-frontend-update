// import React from 'react';
// import { Link } from 'react-router-dom';
// import logo from './image/logo.jpeg';
// import logo1 from './image/Mail 1.png';
// import logo2 from './image/Locat 1.png';
// import logo3 from './image/Call 1.png';
// import { useTranslation } from 'react-i18next';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faYoutube } from '@fortawesome/free-brands-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';

// const Footer = () => {
//     const { t, i18n } = useTranslation();
//     return (
//         <footer className="relative z-1 bg-[#000B14] text-white py-8 md:w-full">
//             <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 border-b-2 border-gray-500 pb-12 mt-4 sm:grid-cols-2 md:grid-cols-4 gap-8">
//                     <div className='text-lg form-text:text-3xl xl:ml-8'>
//                         <h3 className="text-form-text font-semibold  form-text:text-4xl mb-4 form-text:mb-14">Quick Link</h3>
//                         <ul className="space-y-2 form-text:space-y-4">
                          
//                             <li><Link to="/about" className="hover:underline">About us</Link></li>
//                             <li><Link to="/about" className="hover:underline">Vision</Link></li>
//                             <li><Link to="/about" className="hover:underline">Mission</Link></li>
//                             <li><Link to="/committe" className="hover:underline">Members</Link></li>
//                         </ul>
//                     </div>
//                     <div className='text-lg form-text:text-3xl xl:ml-8'>
//                         <h3 className="text-form-text font-semibold form-text:text-4xl mb-4 form-text:mb-14">Explore</h3>
//                         <ul className="space-y-2  form-text:space-y-4">
//                             <li><Link to="/invitation" className="hover:underline">Invitations</Link></li>
//                             <li><Link to="/events" className="hover:underline">Events</Link></li>
//                             <li><Link to="/channels" className="hover:underline">Tracks</Link></li>
//                             <li><Link to="/publish" className="hover:underline">publications</Link></li>
//                         </ul>
//                     </div>
//                     <div className='text-lg form-text:text-3xl'>
//                         <h3 className="text-form-text font-semibold form-text:text-4xl mb-4 form-text:mb-14">Useful Link</h3>
//                         <ul className="space-y-2  form-text:space-y-4">
//                             <li><Link to="#" className="hover:underline">FAQs</Link></li>
//                             <li><Link to="#" className="hover:underline">By Laws</Link></li>
//                             <li><Link to="#" className="hover:underline">Financial Statements</Link></li>
//                         </ul>
//                     </div>
//                     <div className='text-lg form-text:text-3xl'>
//                         <h3 className="text-form-text font-semibold form-text:text-4xl mb-4 form-text:mb-14">Contacts</h3>
//                         <ul className="space-y-2 form-text:space-y-4">
//                             <li className='flex'><img src={logo1} alt='mes' className='w-5 h-5 mt-2'/><p  className="ml-4 sm:break-all">tamilsiragam@gmail.com</p></li>
//                             <li className='flex'><img src={logo2} alt='loc' className='w-5 h-5 mt-3'/><p className="ml-4"><span className='text-base form-text:text-3xl '>6</span>, Rue Paul Langevin, <span className=' text-base form-text:text-3xl'>95140</span> Garges les Gonesse, Paris, France</p></li>
//                             <li className='flex'><img src={logo3} alt='phone' className='w-5 h-5 mt-1'/><p className="ml-4">
//                             +1 (586) 801-2246
//                             </p></li>
//                             <li className='ml-4'><p className="ml-4">
//                             +33 6 51 57 47 58
//                             </p></li>
//                             <li className='ml-4'><p className="ml-4">
//                             +47 968 29 285
//                             </p></li>
//                             <li className='ml-4'><p className="ml-4">
//                             +31 6 17451034
//                             </p></li>
                            
//                         </ul>
//                     </div>
//                 </div>
               
               

// <div className="px-4 sm:px-8 lg:px-12 py-8">
//   <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-lg font-normal">
    
//     {/* First Column: Logo, Title, and Registration Details */}
//     <div className="flex flex-col sm:flex-row items-center sm:w-1/3 justify-center sm:justify-start mb-4 sm:mb-0">
//   <img src={logo} alt="Logo" className="h-20 w-20 rounded-full sm:mr-4" />
//   <div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left">
//     <h2 className="text-2xl font-bold">World Tamil Siragam</h2>
//     <h2 className="text-lg font-bold mt-1">Registered in Paris, France</h2>
//     <h2 className="text-lg font-bold">Registration number W952015257</h2>
//   </div>
// </div>


//     {/* Second Column: Copyright Text */}
//     <div className="sm:w-1/3  text-center  mb-4 sm:mb-0">
//       <p className="mt-2 sm:mt-0">© 2024 World Tamil Siragam. </p>
//       <p>All Rights Reserved</p>
//     </div>

//     {/* Third Column: Social Icons */}
//     <div className="flex items-center sm:w-1/3 justify-center sm:justify-center space-x-4">
//       <a href="https://www.facebook.com/p/%E0%AE%89%E0%AE%B2%E0%AE%95%E0%AE%A4%E0%AF%8D-%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AF%8D%E0%AE%9A%E0%AF%8D-%E0%AE%9A%E0%AE%BF%E0%AE%B1%E0%AE%95%E0%AE%AE%E0%AF%8D-61552433752137/" target="_blank" rel="noopener noreferrer">
//         <FontAwesomeIcon icon={faFacebook} className="h-8 w-8 rounded-full bg-[#1877F2] text-white p-2 hover:bg-blue-800" />
//       </a>
      
//       <a href="https://www.youtube.com/@%E0%AE%89%E0%AE%B2%E0%AE%95%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AE%AE%E0%AF%8D%E0%AE%BF%E0%AE%B4%E0%AF%8D%E0%AE%9A%E0%AF%8D%E0%AE%9A%E0%AE%BF%E0%AE%B1%E0%AE%95%E0%AE%AE%E0%AF%8D" target="_blank" rel="noopener noreferrer">
//         <FontAwesomeIcon icon={faYoutube} className="h-8 w-8 rounded-full bg-red-600 text-white p-2 hover:bg-red-800" />
//       </a>
//     </div>
//   </div>
// </div>




//             </div>
//         </footer>
//     );
// }

// export default Footer;

//update design
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './image/logo.jpeg';
import logotext from './image/logo-text.png'; 
import logo1 from './image/Mail 1.png';
import logo2 from './image/Locat 1.png';
import logo3 from './image/Call 1.png';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const { t, i18n } = useTranslation();
    return (
        <footer className="relative z-1 bg-[#000B14] text-white py-8 md:w-full">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 border-b-2 border-gray-500 pb-12 mt-4 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className='text-lg form-text:text-3xl xl:ml-8'>
                        <h3 className="text-form-text font-semibold  form-text:text-4xl mb-4 form-text:mb-14">Quick Link</h3>
                        <ul className="space-y-2 form-text:space-y-4">
                          
                            <li><Link to="/about" className="hover:underline">About us</Link></li>
                            <li><Link to="/about" className="hover:underline">Vision</Link></li>
                            <li><Link to="/about" className="hover:underline">Mission</Link></li>
                            <li><Link to="/committe" className="hover:underline">Members</Link></li>
                        </ul>
                    </div>
                    <div className='text-lg form-text:text-3xl xl:ml-8'>
                        <h3 className="text-form-text font-semibold form-text:text-4xl mb-4 form-text:mb-14">Explore</h3>
                        <ul className="space-y-2  form-text:space-y-4">
                            <li><Link to="/invitation" className="hover:underline">Invitations</Link></li>
                            <li><Link to="/events" className="hover:underline">Events</Link></li>
                            <li><Link to="/channels" className="hover:underline">Tracks</Link></li>
                            <li><Link to="/publish" className="hover:underline">publications</Link></li>
                        </ul>
                    </div>
                    <div className='text-lg form-text:text-3xl'>
                        <h3 className="text-form-text font-semibold form-text:text-4xl mb-4 form-text:mb-14">Useful Link</h3>
                        <ul className="space-y-2  form-text:space-y-4">
                            <li><Link to="#" className="hover:underline">FAQs</Link></li>
                            <li><Link to="#" className="hover:underline">By Laws</Link></li>
                            <li><Link to="#" className="hover:underline">Financial Statements</Link></li>
                        </ul>
                    </div>
                    <div className='text-lg form-text:text-3xl'>
                        <h3 className="text-form-text font-semibold form-text:text-4xl mb-4 form-text:mb-14">Contacts</h3>
                        <ul className="space-y-2 form-text:space-y-4">
                            <li className='flex'><img src={logo1} alt='mes' className='w-5 h-5 mt-2'/><p  className="ml-4 sm:break-all">tamilsiragam@gmail.com</p></li>
                            <li className='flex'><img src={logo2} alt='loc' className='w-5 h-5 mt-3'/><p className="ml-4"><span className='text-base form-text:text-3xl '>6</span>, Rue Paul Langevin, <span className=' text-base form-text:text-3xl'>95140</span> Garges les Gonesse, Paris, France</p></li>
                            <li className='flex'><img src={logo3} alt='phone' className='w-5 h-5 mt-1'/><p className="ml-4">
                            +1 (586) 801-2246
                            </p></li>
                            <li className='ml-4'><p className="ml-4">
                            +33 6 51 57 47 58
                            </p></li>
                            <li className='ml-4'><p className="ml-4">
                            +47 968 29 285
                            </p></li>
                            <li className='ml-4'><p className="ml-4">
                            +31 6 17451034
                            </p></li>
                            
                        </ul>
                    </div>
                </div>
               
               

            <div className="bg-[#06101A] text-white px-4 sm:px-8 lg:px-12 py-6 text-sm">
  <div className="flex flex-col lg:flex-row justify-between items-center gap-4 relative">

    {/* Left: Logo and Text */}
    <div className="flex items-center gap-3 justify-center lg:justify-start">
      <img src={logo} alt="Logo" className="h-16 w-16 sm:h-20 sm:w-20 rounded-full" />
      <div className="leading-tight text-left">
        <img src={logotext} alt="logo-text" className="max-w-[160px] sm:max-w-[200px]" />
      </div>
    </div>

    {/* Center: Registration Info */}
    <div className="   text-center">
      <div className="bg-[#0B3B7E] text-white px-3 py-1 rounded-md text-xs sm:text-sm mb-1">
        Registration Number - W952015257 | Registered in Paris, France
      </div>
      <p className="text-xs sm:text-sm">© 2025 World Tamil Siragam. All Rights Reserved</p>
    </div>

    {/* Right: Social Icons */}
    <div className="flex space-x-4 justify-center lg:justify-end">
      <a
        href="https://www.facebook.com/p/%E0%AE%89%E0%AE%B2%E0%AE%95%E0%AE%A4%E0%AF%8D-%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AF%8D%E0%AE%9A%E0%AF%8D-%E0%AE%9A%E0%AE%BF%E0%AE%B1%E0%AE%95%E0%AE%AE%E0%AF%8D-61552433752137/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faFacebook}
          className="h-6 w-6 sm:h-8 sm:w-8 text-white hover:text-[#047BD5]"
        />
      </a>
      <a
        href="https://www.youtube.com/@%E0%AE%89%E0%AE%B2%E0%AE%95%E0%AE%A4%E0%AF%8D%E0%AE%A4%E0%AE%AE%E0%AF%8D%E0%AE%BF%E0%AE%B4%E0%AF%8D%E0%AE%9A%E0%AF%8D%E0%AE%9A%E0%AE%BF%E0%AE%B1%E0%AE%95%E0%AE%AE%E0%AF%8D"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faYoutube}
          className="h-6 w-6 sm:h-8 sm:w-8 text-white hover:text-[#FF0000]"
        />
      </a>
    </div>
  </div>
</div>






            </div>
        </footer>
    );
}

export default Footer;