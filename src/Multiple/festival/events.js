import React from "react";
import EventBanner from "./eventbanner";
import EventSection from "./eventsection";
import Donate from "../../Donate/donate";
import Contact from "../../contact/contactform";


const Events = () => {
    return(
        <>
        <EventBanner/>
        <EventSection/>
        <Donate/>
        <Contact/>
</>
    );
}
export default Events;