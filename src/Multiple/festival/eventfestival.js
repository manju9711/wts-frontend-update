import React from 'react';
import { useTranslation } from 'react-i18next';

const EventFestival = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-8">
      {/* Festival Tag */}
      <div className="bg-gray-300 lg:ml-10 lg:text-left text-black-900 py-1 px-2 rounded-md event-text:text-3xl inline-block text-xs iphonexr:ml-0">
      {t('event.Purpose')}
            </div>
            

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Left Column */}
        <div className="flex items-center lg:pl-10">
          <h1 className="text-2xl lg:text-5xl md:text-4xl font-semibold text-black-600 mb-4 2xl:leading-normal  event-text:text-6xl">
          {t('event.title1')}
            <br/> {t('event.title2')}
          </h1>
        </div>

        {/* Right Column */}
<div className="flex items-center justify-center px-4 md:px-8 lg:px-16 py-4 md:py-8 lg:py-8">
  <p className="text-base md:text-lg lg:text-2xl text-black-800 lg:pl-20  event-text:text-4xl">
  {t('event.description')}
  </p>
</div>

      </div>
    </div>
  );
};

export default EventFestival;
