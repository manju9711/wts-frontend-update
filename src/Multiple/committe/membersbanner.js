import React from 'react';
import bannerImage from '../vision/images/visionbanner.png';
import Header from '../../header/header';
import { useTranslation } from 'react-i18next';


const MembersBanner = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
    <div className="relative h-[400px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bannerImage}) `}}>
      <Header/>
      <div className="absolute inset-0 bg-black opacity-0"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold">{t('structure.title1')}</h1>
          <h1 className="sm:mt-4 mt-0 text-4xl md:text-5xl font-bold">{t('structure.committe')}</h1>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default MembersBanner;