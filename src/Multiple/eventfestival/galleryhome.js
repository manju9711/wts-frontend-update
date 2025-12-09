import React from "react";
import Video from "./video";
// import EventDetails from "./EventDetails"
import Donate from "../../Donate/donate";
import Contact from "../../contact/contactform";
import Gallery from "./gallery";
import Header from "../../header/header";
import { useLocation } from "react-router-dom";


const GalleryHome = () => {
     const location = useLocation();
  const { eventsData } = location.state || {}; // ✅ get event data from navigation
    return(
        <>
        <Header/>
        <Video eventsData={eventsData}/>
        {/* <EventDetails/> */}
        <Gallery eventsData={eventsData}/>
        <Donate/>
       <Contact/>
</>
    );
}
export default GalleryHome;