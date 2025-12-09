import React from "react";
import Home from './home/home';
import Donate from './Donate/donate';
import News from './news/news';
import EventPage from "./Event/eventpage";
import Contact from "./contact/contactform";
import Structurevision from "./Multiple/structure/structurevision";
import ObjectiveSection from "./ObjectiveSection/ObjectiveSection";
import VisionMission from "./visionmission/visionmission";



const Main = () => {
    return(
        <>
        
        <Home/>
        <ObjectiveSection/>
        <VisionMission/>
       {/* <Structurevision/> */}
        <News/>
        <EventPage/>
        <Donate/>
        <Contact/>
        
    </>
    );
}
export default Main;