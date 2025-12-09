import React from 'react';
import bannerImage from '../vision/images/visionbanner.png';
import Contact from '../../contact/contactform';
import News from '../../news/news';
import Header from '../../header/header';



const Newssection = () => {
  return (
    <>
    <div className="relative h-[530px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bannerImage}) `}}>
      <Header/>
      <div className="absolute inset-0 bg-black opacity-0"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">உலகத் தமிழ்ச் சிறகம்</h1>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold">செய்திகள்</h1>
        </div>
      </div>
    </div>
    
    <News/>
    
    <Contact/>
    </>
  );
};

export default Newssection;

