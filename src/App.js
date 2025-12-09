// import { useState, useEffect } from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './i18n';
// import "@fontsource/mukta-malar/500.css";
// import './index.css';
// import Main from './Main';
// import Header from './header/header';
// import Footer from './footer/footer';
// import DonateNow from './Donateform/donatenow';
// import Page from './cms/cms';
// import Donate from './Donate/donate';
// import Home from './home/home';
// import Contact from './contact/contactform';
// import Details from './purpose/details.js';
// import Vision from './Multiple/vision/vision.js';
// import Newssection from './Multiple/newssection/newssection.js';
// import Readmorenews from './news/readmorenews.js';
// import TeamSection from './Multiple/structure/members.js';
// import AllNews from './news/allnews.js';
// import Blog from './Multiple/newssection/blog.js';
// import Invitation from './Multiple/invitation/invitation.js';
// import Contactus from './contact/contactus.js';
// import Membership from './Membership/membership.js';
// import MembershipLogin from './adminlogin/membershiplogin.js';
// import GalleryHome from './Multiple/eventfestival/galleryhome.js';
// import AdminLoginForm from './adminlogin/adminlogin.js';
// import AdminRegister from './adminlogin/adminregister.js';
// import ScrollToTop from './constant/scrooltotop.js';
// import Publish from './Multiple/publish/publish.js';
// import Channels from './Multiple/channels/channels.js';
// import Committe from './Multiple/committe/committe.js';
// import About from './Multiple/structure/about.js';
// import ProtectedRoute from './ProtectedRoute';  
// import ProtectedMemberRoute from './ProtectedMemberRoute';
// import WtsAdminLogin from './adminlogin/wtsadmin.js';
// import MembershipDashboard from './Membership/memberdashboard.js';
// import Events from './Multiple/festival/events.js';
// import ForgotPassword from './adminlogin/forgotpassword.js';
// import ResetPassword from './adminlogin/resetpassword.js';
// import Launch from './launch/launch.js';
// import Comingsoon from './comingsoon/comingsoon.js';
// import Topbar from './Topbar/Topbar.js';



// function App() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   return (
//     <>
//       <Router>
       
//         <ScrollToTop />
//          {/* {!isScrolled && <Topbar />} */}
//          <div className={`transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
//   <Topbar />
// </div>
//       <Header />
//       <div className="">
       
//         <Routes>
       
//           {/* <Route exact path='/' element={<Launch />} /> 
//           <Route path='/Main' element={<Main />} />  */}
          
//            <Route path='/' element={<Main />} /> 
//           <Route path='/home' element={<Home />} />
//           <Route path='/comingsoon' element={<Comingsoon />} />
//           <Route path='/donate' element={<Donate />} />
//           <Route path='/donatenow' element={<DonateNow />} />
//           <Route path='/contactform' element={<Contact />} />
//           <Route path='/vision' element={<Vision />} />
//           <Route path='/details' element={<Details />} />
//           <Route path='/newssection' element={<Newssection />} />
//           <Route path='/readmorenews' element={<Readmorenews />} />
//           <Route path='/members' element={<TeamSection />} />
//           <Route path='/events' element={<Events />} />
//           <Route path='/galleryhome' element={<GalleryHome />} />
//           <Route path='/allnews' element={<AllNews />} />
//           <Route path='/blog' element={<Blog />} />
//           <Route path='/invitation' element={<Invitation />} />
//           <Route path='/contactus' element={<Contactus />} />
//           <Route path='/membership' element={<Membership />} />
//           <Route path='/membershiplogin' element={<MembershipLogin />} />

//           <Route path='/adminlogin' element={<AdminLoginForm />} />
//           <Route path='/adminregister' element={<AdminRegister />} />
//           <Route path='/publish' element={<Publish />} />
//           <Route path='/channels' element={<Channels />} />
//           <Route path='/committe' element={<Committe />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/channels' element={<Channels />} />
//           <Route path='/wtsadmin' element={<WtsAdminLogin />} />
//           <Route path='/forgotpassword' element={<ForgotPassword />} />
//           <Route path='/resetpassword' element={<ResetPassword />} />
//           <Route
//             path='/memberdashboard'
//             element={
//               <ProtectedMemberRoute>
//                 <MembershipDashboard />
//               </ProtectedMemberRoute>
//             }
//           />
//           {/* Protect the CMS route */}
//           <Route
//             path='/cms'
//             element={
//               <ProtectedRoute>
//                 <Page />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         </div>
//         <Footer />
//       </Router>

//     </>
//   );
// }
// export default App;


// import React from "react";
// import Comingsoon from "./comingsoon/comingsoon";
// const App = () =>{
//   return(
//     <>
//     <Comingsoon/>
//     </>
//   )
// };
// export default App;

// App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './Appcontent';
import './i18n';
import "@fontsource/mukta-malar/500.css";
import './index.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
