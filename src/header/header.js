// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { TbWorld } from 'react-icons/tb';
// import Logo from '../header/image/logo.jpeg';
// import Logo2 from '../header/image/WTS-Full-Logo-WT.png';
// import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
// import { useTranslation } from 'react-i18next';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // For user dropdown
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isHomePage, setIsHomePage] = useState(true);
//   const { t, i18n } = useTranslation();
//   const [fullName, setFullName] = useState(null); // To store the user name

//   useEffect(() => {
//     setIsHomePage(location.pathname === "/");

//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Retrieve the user's name from sessionStorage
//     const storedFullName = sessionStorage.getItem('fullName');
//     if (storedFullName && storedFullName !== 'undefined') {
//       setFullName(storedFullName); // Set the user name
//     }

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1));
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [location.hash]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const switchLanguage = () => {
//     const newLanguage = i18n.language === 'en' ? 'TA' : 'en';
//     i18n.changeLanguage(newLanguage);
//   };

//   const handleLogout = () => {
//     sessionStorage.clear(); // Clear session storage on logout
//     setFullName(null); // Reset the fullName to null
//     navigate('/membershiplogin'); // Redirect to login page
//   };

//   const navLinks = [
//     { to: "/", text: t('header.home'), id: "" },
//     { to: "/about", text: t('header.aboutus'), id: "" },
//     { to: "/committe", text: t('header.members'), id: "" },
//     { to: "/invitation", text: t('header.invitation'), id: "" },
//     { to: "/events", text: t('header.festival'), id: "" },
//     { to: "/publish", text: t('header.publish'), id: "" },
//     { to: "/channels", text: t('header.channel'), id: "" },
//   ];

//   const actionLinks = [
//     // { to: "/membership", text: "join", className: "text-white lg:ml-5 mt-3", id: "login" },
//     { to: "/membershiplogin", text: "Login", className: "px-7 py-2 w-24 mt-3 rounded-full text-yellow-300 border border-white lg:ml-6" }
//   ];

//   const getNavbarBackground = () => {
//     const pagesWithBackgroundImage = ["/", "/vision", "/about", "/events", "/committe", "/publish", "/channels"];
//     if (isScrolled) {
//       return 'bg-blue-950';
//     } else if (pagesWithBackgroundImage.includes(location.pathname)) {
//       return 'bg-transparent';
//     } else {
//       return 'bg-blue-950';
//     }
//   };

//   return (
//     <>
//       <div className={`navbar text-white big-screen:py-0 mb-8 z-30 fixed w-full transition-all duration-300 ${getNavbarBackground()}`}>
//         <div className="flex justify-between items-center mb-2 mx-4 head-home:my-2 medium-screen:mx-32 head-home:mx-20 lg:mx-12 big-screen:mx-24">
//           <div className="flex items-center">
//             <Link to="/" ><img src={Logo} alt="logo" className="mt-2 mx-0 mr-2 lg:mr-2 big-screen:w-[75px] 
//             big-screen:h-[75px] sm:w-[55px] rounded-full sm:[55px] w-[55px] h-[55px]" /></Link>
//             <Link to="/" ><img src={Logo2} alt="logo" className="mt-2 mx-0 mr-2 lg:mr-2 big-screen:w-[185px] 
//             big-screen:h-[75px]  rounded-full sm:[55px] w-[170px] h-[55px]" /></Link>
//           </div>

//           <ul className="hidden xl:flex lg:mt-3 big-screen:gap-20 lg:gap-5 lg:pl-12 list-none">
//             {navLinks.map((link, index) => (
//               <li key={index} className="relative">
//                 <Link
//                   to={link.to}
//                   className="text-white big-screen:text-xl no-underline flex items-center text-sm"
//                   onClick={() => setIsMenuOpen(false)} // Close menu on link click
//                 >
//                   {link.text}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="hidden xl:flex items-center big-screen:text-big-screen text-base ml-0">
//             <Link className="mt-3 "><i onClick={switchLanguage}><TbWorld /></i></Link>
                  
//             {/* Show user name with logout option on hover if logged in */}
//             {fullName ? (
//               <div className="relative">
//                 <button
//                   className="text-white lg:ml-5 mt-3"
//                   onMouseEnter={() => setIsUserDropdownOpen(true)}
//                   onMouseLeave={() => setIsUserDropdownOpen(false)}
//                 >
//                   <i className="fa fa-user mr-1"></i>
//                   {fullName}
//                 </button>
//                 {isUserDropdownOpen && (
//                   <div
//                     className="absolute py-2 w-24 rounded-md"
//                     onMouseEnter={() => setIsUserDropdownOpen(true)}
//                     onMouseLeave={() => setIsUserDropdownOpen(false)}
//                   >
//                     <button
//                       className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded ml-4"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               actionLinks.map((link, index) => (
//                 <Link key={index} to={link.to} className={link.className}>
//                   {link.text}
//                 </Link>
//               ))
//             )}
//           </div>

//           <div className="xl:hidden">
//             <button onClick={toggleMenu} className="text-white pt-3 text-2xl focus:outline-none">
//               <FaBars className="text-big-screen" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="xl:hidden fixed inset-0 z-40">
//             <ul className={`fixed top-0 right-8 left-0 h-full w-[86%] bg-black bg-opacity-90 text-white py-4 px-2 overflow-y-auto`}>
//               <div className="flex justify-between pb-4 items-center px-2">
//                 <Link to="/" className="flex items-center">
//                   <img src={Logo} alt="logo" className="w-[65px] sm:h-[45px] md:w-[45px] md:h-[45px] rounded-full mt-2" />
//                 </Link>
//                 <Link to="/" ><img src={Logo2} alt="logo" className="mt-2 mx-0 mr-32 md:mr-96 big-screen:w-[55px] 
//                   big-screen:h-[55px]  rounded-full w-[150px] h-[45px]" /></Link>

//                 <button onClick={toggleMenu} className="text-white text-2xl">
//                   <FaTimes />
//                 </button>
//               </div>
//               {navLinks.map((link, index) => (
//                 <li key={index} className="relative pl-4">
//                   <Link
//                     to={link.to}
//                     className="text-white no-underline flex items-center text-lg py-2 border-b border-gray-600"
//                     onClick={() => setIsMenuOpen(false)} // Close menu on link click
//                   >
//                     {link.text}
//                   </Link>
//                 </li>
//               ))}

//               <Link>
//                 <i className="mt-2 ml-4 flex items-center text-lg py-2 border-b border-gray-600" onClick={switchLanguage}><TbWorld /></i>
//               </Link>

//               {actionLinks.map((link, index) => (
//                 <li key={index} className="pl-4">
//                   <Link to={link.to} className={`${link.className} flex items-center text-lg py-2 border-b border-gray-600`}>
//                     {link.text}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;

//update design 
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { TbWorld } from 'react-icons/tb';
// import Logo from '../header/image/logo.jpeg';
// import Logo2 from '../header/image/wts-logo.png';
// import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
// import { useTranslation } from 'react-i18next';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // For user dropdown
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isHomePage, setIsHomePage] = useState(true);
//   const { t, i18n } = useTranslation();
//   // const [fullName, setFullName] = useState(null); // To store the user name

//   useEffect(() => {
//     setIsHomePage(location.pathname === "/");

//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Retrieve the user's name from sessionStorage
//     // const storedFullName = sessionStorage.getItem('fullName');
//     // if (storedFullName && storedFullName !== 'undefined') {
//     //   setFullName(storedFullName); // Set the user name
//     // }

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   useEffect(() => {
//     if (location.hash) {
//       const element = document.getElementById(location.hash.substring(1));
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [location.hash]);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const switchLanguage = () => {
//     const newLanguage = i18n.language === 'en' ? 'TA' : 'en';
//     i18n.changeLanguage(newLanguage);
//   };

//   // const handleLogout = () => {
//   //   sessionStorage.clear(); // Clear session storage on logout
//   //   setFullName(null); // Reset the fullName to null
//   //   navigate('/membershiplogin'); // Redirect to login page
//   // };

//   const navLinks = [
//     { to: "/", text: t('header.home'), id: "" },
//     { to: "/about", text: t('header.aboutus'), id: "" },
//     { to: "/committe", text: t('header.members'), id: "" },
//     { to: "/invitation", text: t('header.invitation'), id: "" },
//     { to: "/events", text: t('header.festival'), id: "" },
//     { to: "/publish", text: t('header.publish'), id: "" },
//     { to: "/channels", text: t('header.channel'), id: "" },
//   ];

//   // const actionLinks = [
//   //   // { to: "/membership", text: "join", className: "text-white lg:ml-5 mt-3", id: "login" },
//   //   { to: "/membershiplogin", text: "Login", className: "px-7 py-2 w-24 mt-3 rounded-full text-yellow-300 border border-white lg:ml-6" }
//   // ];

//   const getNavbarBackground = () => {
//     const pagesWithBackgroundImage = ["/", "/vision", "/about", "/events", "/committe", "/publish", "/channels"];
//     if (isScrolled) {
//       return 'bg-blue-950';
//     } else if (pagesWithBackgroundImage.includes(location.pathname)) {
//       return 'bg-transparent';
//     } else {
//       return 'bg-blue-950';
//     }
//   };

//   return (
//     <>
//       <div className={`navbar bg-white text-black big-screen:py-0 mb-8 z-30 fixed w-full transition-all duration-300 ${getNavbarBackground()}`}>
//         <div className="flex justify-between items-center mb-2 mx-4 head-home:my-2 medium-screen:mx-32 head-home:mx-20 lg:mx-12 big-screen:mx-24">
//           <div className="flex items-center">
//             <Link to="/" ><img src={Logo} alt="logo" className="mt-2 mx-0 mr-2 lg:mr-2 big-screen:w-[75px] 
//             big-screen:h-[75px] sm:w-[55px] rounded-full sm:[55px] w-[55px] h-[55px]" /></Link>
//             <Link to="/" ><img src={Logo2} alt="logo" className="mt-2 mx-0 ml-2 mr-2 lg:mr-2 big-screen:w-[185px] 
//             big-screen:h-[75px]  sm:[55px] w-[170px] h-[55px]" /></Link>
//           </div>

//           <ul className="hidden xl:flex lg:mt-3 big-screen:gap-20 lg:gap-5 lg:pl-12 list-none">
//             {navLinks.map((link, index) => (
//               <li key={index} className="relative">
//                 <Link
//                   to={link.to}
//                   className="text-black big-screen:text-xl no-underline flex items-center text-sm"
//                   onClick={() => setIsMenuOpen(false)} // Close menu on link click
//                 >
//                   {link.text}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <div className="hidden xl:flex items-center big-screen:text-big-screen text-base ml-0">
//             <Link className="mt-3 "><i onClick={switchLanguage}><TbWorld /></i></Link>
                  
//             {/* Show user name with logout option on hover if logged in */}
//             {/* {fullName ? (
//               <div className="relative">
//                 <button
//                   className="text-white lg:ml-5 mt-3"
//                   onMouseEnter={() => setIsUserDropdownOpen(true)}
//                   onMouseLeave={() => setIsUserDropdownOpen(false)}
//                 >
//                   <i className="fa fa-user mr-1"></i>
//                   {fullName}
//                 </button>
//                 {isUserDropdownOpen && (
//                   <div
//                     className="absolute py-2 w-24 rounded-md"
//                     onMouseEnter={() => setIsUserDropdownOpen(true)}
//                     onMouseLeave={() => setIsUserDropdownOpen(false)}
//                   >
//                     <button
//                       className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded ml-4"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               actionLinks.map((link, index) => (
//                 <Link key={index} to={link.to} className={link.className}>
//                   {link.text}
//                 </Link>
//               ))
//             )} */}
//           </div>

//           <div className="xl:hidden">
//             <button onClick={toggleMenu} className="text-white pt-3 text-2xl focus:outline-none">
//               <FaBars className="text-big-screen" />
//             </button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="xl:hidden fixed inset-0 z-40">
//             <ul className={`fixed top-0 right-8 left-0 h-full w-[86%] bg-black bg-opacity-90 text-white py-4 px-2 overflow-y-auto`}>
//               <div className="flex justify-between pb-4 items-center px-2">
//                 <Link to="/" className="flex items-center">
//                   <img src={Logo} alt="logo" className="w-[65px] sm:h-[45px] md:w-[45px] md:h-[45px] rounded-full mt-2" />
//                 </Link>
//                 <Link to="/" ><img src={Logo2} alt="logo" className="mt-2 mx-0 mr-32 md:mr-96 big-screen:w-[55px] 
//                   big-screen:h-[55px]  rounded-full w-[150px] h-[45px]" /></Link>

//                 <button onClick={toggleMenu} className="text-white text-2xl">
//                   <FaTimes />
//                 </button>
//               </div>
//               {navLinks.map((link, index) => (
//                 <li key={index} className="relative pl-4">
//                   <Link
//                     to={link.to}
//                     className="text-white no-underline flex items-center text-lg py-2 border-b border-gray-600"
//                     onClick={() => setIsMenuOpen(false)} // Close menu on link click
//                   >
//                     {link.text}
//                   </Link>
//                 </li>
//               ))}

//               <Link>
//                 <i className="mt-2 ml-4 flex items-center text-lg py-2 border-b border-gray-600" onClick={switchLanguage}><TbWorld /></i>
//               </Link>

//               {/* {actionLinks.map((link, index) => (
//                 <li key={index} className="pl-4">
//                   <Link to={link.to} className={`${link.className} flex items-center text-lg py-2 border-b border-gray-600`}>
//                     {link.text}
//                   </Link>
//                 </li>
//               ))} */}
//             </ul>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TbWorld } from 'react-icons/tb';
import Logo from '../header/image/logo.jpeg';
import Logo2 from '../header/image/wts-logo.png';
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import Topbar from '../Topbar/Topbar';
import '../header/header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setIsHomePage(location.pathname === "/");

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const switchLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'TA' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const navLinks = [
    { to: "/", text: t('header.home') },
    { to: "/about", text: t('header.aboutus') },
    { to: "/committe", text: t('header.members') },
    { to: "/invitation", text: t('header.invitation') },
    { to: "/events", text: t('header.festival') },
    { to: "/publish", text: t('header.publish') },
    { to: "/channels", text: t('header.channel') },
  ];

  const getNavbarBackground = () => {
    const pagesWithBackgroundImage = ["/", "/vision", "/about", "/events", "/committe", "/publish", "/channels"];
    if (isScrolled) {
      return 'bg-blue-950';
    } else if (pagesWithBackgroundImage.includes(location.pathname)) {
      return 'bg-transparent';
    } else {
      return 'bg-blue-950';
    }
  };

  return (
    <>
    {/* <Topbar/> */}
      <div className={`navbar bg-white shadow-md text-black z-50 fixed w-full transition-all duration-300 ${getNavbarBackground()}`}>
        <div className="flex justify-between items-center py-2 px-4 lg:px-20">
          {/* Logo section */}
          <div className="flex items-center gap-2">
            <Link to="/"><img src={Logo} alt="logo" className="w-[55px] h-[55px] rounded-full" /></Link>
            <Link to="/"><img src={Logo2} alt="logo" className="w-[170px] h-[55px]" /></Link>
          </div>

          {/* Menu section - Desktop */}
          <ul className="hidden xl:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.to}
                  className="text-black text-sm font-medium hover:text-[#FC8103] transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              <button onClick={switchLanguage} className="text-black text-xl hover:text-[#FC8103] mt-2">
                <TbWorld />
              </button>
            </li>
          </ul>

          {/* Menu toggle - Mobile */}
          <div className="xl:hidden">
            <button onClick={toggleMenu} className="text-black text-2xl focus:outline-none">
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="xl:hidden fixed inset-0 z-40 bg-black bg-opacity-90 text-white">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-2">
                <Link to="/"><img src={Logo} alt="logo" className="w-[45px] h-[45px] rounded-full" /></Link>
                <Link to="/"><img src={Logo2} alt="logo" className="w-[150px] h-[45px]" /></Link>
              </div>
              <button onClick={toggleMenu} className="text-white text-2xl">
                <FaTimes />
              </button>
            </div>

            <ul className="flex flex-col px-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="block py-3 border-b border-gray-600 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={switchLanguage}
                  className="text-white text-xl py-3 flex items-center"
                >
                  <TbWorld />
                  {/* <span className="ml-2 text-base">{i18n.language === 'en' ? 'தமிழ்' : 'English'}</span> */}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;





