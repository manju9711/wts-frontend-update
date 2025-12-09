import React from "react";
import bannerImage from './image/bannerimage.jpeg';
import Header from '../../header/header';
import { useTranslation } from 'react-i18next';

const EventBanner = () => {
  const { t } = useTranslation();
  return (
    <>
    <div className="relative h-[400px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bannerImage}) `}}>
      <Header/>
      <div className="absolute inset-0 bg-black opacity-0"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">{t('event.heading1')}</h1>
          <h1 className="sm:mt-4 mt-0 text-4xl md:text-5xl font-bold">{t('event.heading2')}</h1>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default EventBanner;
