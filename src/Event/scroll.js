import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { get } from '../service/apiservice';
import { Allapi } from '../constant/constantApi';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';

const Scroll = () => {
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async (lang) => {
      try {
        const response = await get(`${Allapi.FESTIVAL_getapi}?lang=${lang}`);
        const data = response.data.data;

        const formattedImages = data.map((item) => {
          if (item.image && item.image.filePath) {
            return {
              src: item.image.filePath.startsWith('http')
                ? item.image.filePath
                : `${process.env.REACT_APP_API_URL}/${item.image.filePath}`,
              title_ta: item.title_ta || 'No Tamil Title',
              title_en: item.title_en || 'No English Title',
              description_ta: item.description_ta || 'No Tamil Description',
              description_en: item.description_en || 'No English Description'
            };
          }
          return null;
        }).filter(item => item !== null);

        setImages(formattedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages(i18n.language);
  }, [i18n.language]);

  const handleGallery = (event) => {
    navigate('/galleryhome', { state: { eventsData: event } });
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[70vh] lg:h-[80vh] w-full">
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        // loop={true} // Enable looping here
        mousewheel={true}
        pagination={false}
        speed={1000}
        modules={[Mousewheel, Pagination]}
        scrollbar={{ draggable: true }}
        className="w-full h-full swiper-bottom-to-top"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative flex items-center justify-center swiper-slide-bottom-to-top">
            <img
              src={image.src}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full brightness-50 rounded-3xl"
            />
            <div className="absolute inset-0 flex flex-col justify-end pr-6">
              <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-4 lg:gap-8 lg:mb-10">
                <div className="flex flex-col flex-grow text-center lg:text-left pl-4 sm:pl-6 md:pl-10">
                  <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white">
                    {i18n.language === 'TA' ? image.title_ta : image.title_en}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white">
                    {i18n.language === 'TA'
                      ? `${image.description_ta?.substring(0, 100) ?? ''}...`
                      : `${image.description_en?.substring(0, 100) ?? ''}...`}
                  </p>
                </div>
                <div className="flex items-center justify-center lg:justify-start mt-4 mb-4 lg:mt-10">
                  <button 
                    onClick={() => navigate('/events')} 
                    className="flex items-center bg-indigo-900 text-white px-3 py-2 sm:px-4 md:px-6 rounded-full text-xs sm:text-sm md:text-base whitespace-nowrap"
                  >
                    {t('festival.readMore')}
                    <i className="fa fa-arrow-right text-white pl-3" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Scroll;