import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Donate = () => {
  const { t, i18n } = useTranslation();
  

  const navigate=useNavigate();
  const handleDonate =()=>{
    navigate('/publish');
  }

  return (
    <div id="donate" >
    <div className="relative z-1 flex items-center justify-center bg-blue-900 py-10 ">
      <div className="text-center text-white ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl event-title-5xl:text-5xl font-bold">
          {t('donate.heading1')}
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg event-description-3xl:text-3xl">
        {t('donate.heading2')}
        </p>
        <button  onClick={handleDonate} className="mt-6 bg-[#FC8103] hover:bg-yellow-600 rounded-full  text-white text-sm font-semibold py-2 px-4">
          {t('donate.membershipRegistration')}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Donate;