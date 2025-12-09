// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaArrowRight, FaArrowLeft, FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 
// import logo from '../home/images/banners.png';
// import bannerImage1 from '../home/images/mamallapuram.jpeg';
// import bannerImage2 from '../home/images/tiruvalluvar-crop.jpeg';
// import bannerImage3 from '../home/images/rajendracholan.jpg';
// import bannerImage4 from '../home/images/thanjai.jpg';
// import bannerImage5 from '../home/images/banimg1.jpeg';
// import Header from '../header/header.js';
// import { useTranslation } from 'react-i18next';

// // aos
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Home = () => {
//   const { t } = useTranslation();
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const headings = [
//     { 
//       text: t('banner.title1'), 
//       className: 'md:text-4xl lg:text-5xl xl:text-6xl text-3xl leading-tight font-bold' 
//     },
//     { 
//       text: t('banner.title2'), 
//       className: 'md:text-4xl lg:text-5xl xl:text-6xl text-3xl leading-tight font-bold border-b-2 border-white pb-4 lg:pb-8' 
//     }
//   ];

//   const buttonLinks = [
//     { text: t('banner.membershipRegistration'), className: 'rounded-full bg-[#281E5D] big-screen:text-2xl big-screen:px-8 big-screen:py-6 px-6 py-4', to: '/membership', aos: 'fade-left', aosDelay: '500' },
//     // { text: t('header.donate'), className: 'flex items-center font-base 2xl:text-lg big-screen:text-3xl text-white-900', to: '/donatenow', aos: 'fade-right', aosDelay: '700' }
//   ];

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   return (
//     <>
//       <div id='home' className="relative w-[100%] h-[100vh] bg-fixed bg-cover item-center place-items-center text-white">
//         {/* <Header /> */}

//         {/* Carousel Section */}
//         <div className="relative">
//           <Carousel
//             // autoPlay
//             infiniteLoop
//             interval={3000}
//             showThumbs={false}
//             showStatus={false}
//             selectedItem={currentSlide}
//             onChange={(index) => setCurrentSlide(index)} // Track the current slide
//             className="relative w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]"  
//             renderArrowPrev={(clickHandler, hasPrev, label) =>
//               hasPrev && (
//                 <button
//                   type="button"
//                   onClick={clickHandler}
//                   className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20"
//                 >
//                   <FaArrowAltCircleLeft size={35} color="#D3D3D3" />
//                 </button>
//               )
//             }
//             renderArrowNext={(clickHandler, hasNext, label) =>
//               hasNext && (
//                 <button
//                   type="button"
//                   onClick={clickHandler}
//                   className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20"
//                 >
//                   <FaArrowAltCircleRight size={35} color="#D3D3D3" />
//                 </button>
//               )
//             }
//           >
//             <div>
//               <img src={logo} alt="Banner" className="object-cover w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]" />
//             </div>
//             <div>
//               <img src={bannerImage1} alt="Banner 1" className="object-cover w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]" />
//             </div>
//             <div className="relative">
//               <img src={bannerImage2} alt="Banner 2" className="object-cover w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]" />
//               <div className="absolute inset-0 bg-black opacity-30"></div>
//             </div>
//             <div className="relative">
//               <img src={bannerImage3} alt="Banner 3" className="object-cover w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]" />
//               <div className="absolute inset-0 bg-black opacity-50"></div>
//             </div>
//             <div>
//               <img src={bannerImage4} alt="Banner 4" className="object-cover w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]" />
//             </div>
//             <div>
//               <img src={bannerImage5} alt="Banner 5" className="object-cover w-[100%] h-[95vh] md:h-[85vh] lg:h-[100vh]" />
//             </div>
//           </Carousel>

//           {/* Text and Buttons */}
//           <div className="absolute top-[10%] left-0 w-full h-full flex flex-col justify-center items-center z-10">
//             <div>
//               <div className="flex flex-col text-center text-[#F9FAFB] iphonexr:gap-3">
//                 {headings.map((heading, index) => (
//                   <span key={index} className={heading.className}>
//                     {heading.text}
//                   </span>
//                 ))}
//                 {currentSlide === 2 && (
//                   <div className="mt-2 text-center text-xl md:text-2xl lg:text-3xl font-semibold text-[#D3D3D3]">
//                     {t('banner.thiruvalluvar')}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Animated Buttons */}
//             <div className='mt-8 md:mt-14 flex flex-col big-screen:text-xl md:flex-row gap-4 md:gap-10 items-center'>
//               {buttonLinks.map((link, index) => (
//                 <Link
//                   key={index}
//                   to={link.to}
//                   className={`${link.className}`}
//                 >
//                   {link.text}
//                   {/* {link.to === '/donatenow' && (
//                     <i className='ml-2 font-light'>
//                       <FaArrowRight />
//                     </i>
//                   )} */}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;

//update design
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

import bannerImage from '../home/images/banners.png'; 

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      className="relative w-full h-[100vh] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Text + Buttons */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold sm:mb-4 mb-2 leading-snug">
          {t('banner.title1')}
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-snug">
          {t('banner.title2')}
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            to="/membership"
            className="bg-[#FC8103] hover:bg-orange-600 text-[#FFFFFF] text-base px-6 py-3 rounded-full font-medium transition duration-300"
          >
            {t('banner.membershipRegistration')}
          </Link>

          <Link
            to="/contactus"
            className="text-[#FFFFFF] text-base px-6 py-3 transition duration-300"
          >
            {t('banner.contactUs')} →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;












































