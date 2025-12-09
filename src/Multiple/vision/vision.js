import React from 'react';
import bannerImage from './images/visionbanner.png';
import Contact from '../../contact/contactform';
import Donate from '../../Donate/donate';
import Purpose from '../../purpose/purpose';
import Header from '../../header/header';
import { useTranslation } from 'react-i18next';


const Vision = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
    <div className="relative h-[530px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bannerImage}) `}}>
      <Header/>
      <div className="absolute inset-0 bg-black opacity-0"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{t('purpose.wts')}</h1>
          <h1 className="sm:mt-4 mt-0 text-4xl md:text-6xl font-bold">{t('purpose.title')}</h1>
        </div>
      </div>
    </div>
    <Purpose/>
    <Donate/>
    <Contact/>
    </>
  );
};

export default Vision;

