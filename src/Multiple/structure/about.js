import React from "react";
import StructureBanner from "./structurebanner";
import News from "../../news/news";
import Contact from "../../contact/contactform";
import Structurevision from "./structurevision";
const About = () =>{
    return(
        <>
        <StructureBanner/>
       <Structurevision/>
        <News/>
        <Contact/>
        </>
    );
}
export default About;