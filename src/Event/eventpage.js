import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { get } from '../service/apiservice';
import { Allapi } from '../constant/constantApi';
import { useTranslation } from 'react-i18next';

import leftarrow from './images/LeftArrow.png';
import rightarrow from './images/RightArrow.png';
import arrow from './images/Arrow.png';

const Event = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33);
  const [images, setImages] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  let carouselRef = null;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCenterSlidePercentage(100);
      } else if (window.innerWidth < 1024) {
        setCenterSlidePercentage(50);
      } else {
        setCenterSlidePercentage(33.33);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchImages = async (lang) => {
      try {
        const response = await get(`${Allapi.FESTIVAL_getapi}?lang=${lang}`);
        const data = response.data.data;

        // const formattedImages = data.map((item) => {
        //   if (item.image && item.image.filePath) {
        //     return {
        //       src: item.image.filePath.startsWith('http')
        //         ? item.image.filePath
        //         : `${process.env.REACT_APP_API_URL}/${item.image.filePath}`,
        //       title_ta: item.title_ta || 'No Tamil Title',
        //       title_en: item.title_en || 'No English Title',
        //       description_ta: item.description_ta || '',
        //       description_en: item.description_en || ''
        //     };
        //   }
        //   return null;
        // }).filter(item => item !== null);

        const formattedImages = data.map((item) => {
  let imagePath = "";

  if (typeof item.image === "string") {
    imagePath = item.image.startsWith("http")
      ? item.image
      : `${process.env.REACT_APP_API_URL}/public/${item.image}`;
  } else if (item.image && item.image.filePath) {
    imagePath = item.image.filePath.startsWith("http")
      ? item.image.filePath
      : `${process.env.REACT_APP_API_URL}/${item.image.filePath}`;
  }

  return {
    src: imagePath,
    title_ta: item.title_ta || "No Tamil Title",
    title_en: item.title_en || "No English Title",
    description_ta: item.description_ta || "",
    description_en: item.description_en || "",
  };
}).filter(item => item.src); // Only return items that have a valid image path

        setImages(formattedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    fetchImages(i18n.language);
  }, [i18n.language]);

  const handlePrevClick = () => {
    if (carouselRef) {
      carouselRef.decrement();
    }
  };

  const handleNextClick = () => {
    if (carouselRef) {
      carouselRef.increment();
    }
  };

  return (
    <div id="events" className="bg-white py-12">
      {/* Title Section */}
      <div className="flex relative z-10 px-6 md:px-12 items-center justify-center">
        <div className="z-10 text-left mr-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-black">{t('festival.heading')}</h2>
          <Link to="/membership">
            <button className="mt-6 bg-[#FC8103] text-white font-bold text-sm py-2 px-6 rounded-full flex items-center gap-2 hover:bg-orange-600 transition-all">
              {t('festival.membershipRegistration')} <img src={arrow} alt='arrow' />
            </button>
          </Link>
        </div>

        {/* Desktop Arrows */}
        <div className="hidden lg:flex z-10 space-x-4 ml-auto">
          <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center cursor-pointer" onClick={handlePrevClick}>
            <img src={leftarrow} alt='left' />
          </div>
          <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center cursor-pointer" onClick={handleNextClick}>
            <img src={rightarrow} alt='right' />
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-10 px-4 sm:px-10">
        <Carousel
          ref={(el) => (carouselRef = el)}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          showArrows={false}
          centerMode
          centerSlidePercentage={centerSlidePercentage}
          swipeScrollTolerance={5}
        >
          {images.map((image, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex flex-col px-2 transition-all duration-500 ease-in-out`}
              >
                <div
                  className={`cursor-pointer relative rounded-xl overflow-hidden shadow-md flex h-[350px] transition-all duration-500 ease-in-out ${
                    isHovered ? 'flex-row' : 'flex-col justify-center items-center'
                  }`}
                >
                  {isHovered ? (
                    <>
                      {/* Left Text Content */}
                      <div className="w-1/2 bg-[#1C3A80] text-white p-4 flex flex-col justify-center">
                        <h3 className="text-xl font-bold mb-2">{i18n.language === 'TA' ? image.title_ta : image.title_en}</h3>
                        <p className="text-sm mb-4 line-clamp-5">{i18n.language === 'TA' ? image.description_ta : image.description_en}</p>
                        <Link to="/events"><button className="bg-white text-[#1D358F] font-semibold text-sm py-2 px-4 rounded-full w-fit">
                          மேலும் படிக்க
                        </button></Link> 
                      </div>

                      {/* Right Image */}
                      <div className="w-1/2 h-full">
                        <img
                          src={image.src}
                          alt={`Event ${index}`}
                          className="w-full h-full object-cover"
                          onClick={() => navigate('/events', { state: { eventsData: image } })}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <img
                        src={image.src}
                        alt={`Event ${index}`}
                        className="w-full h-full object-cover"
                        onClick={() => navigate('/events', { state: { eventsData: image } })}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#00000099] to-transparent p-4 flex flex-col justify-start">
                        <h3 className="text-white font-semibold text-lg transform  whitespace-nowrap">
                          {i18n.language === 'TA' ? image.title_ta : image.title_en}
                        </h3>
                      </div> */}
                       <div className="relative w-full h-full">
    <img
      src={image.src}
      alt={`Event ${index}`}
      className="w-full h-full object-cover"
      onClick={() => navigate('/events', { state: { eventsData: image } })}
    />
    {/* <div className="absolute bottom-0 w-full bg-black bg-opacity-60 p-3 text-white text-sm sm:text-base font-semibold text-center"> */}
       <div className="absolute inset-0 text-white  text-sm sm:text-base font-semibold   bg-gradient-to-b from-black/60 via-[#00000099] to-transparent p-4 flex flex-col justify-start">
      {i18n.language === 'TA' ? image.title_ta : image.title_en}
    </div>
  </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>

      {/* Mobile Arrows */}
      <div className="flex lg:hidden justify-center mt-6 space-x-4">
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer" onClick={handlePrevClick}>
          <img src={leftarrow} alt='left' />
        </div>
        <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer" onClick={handleNextClick}>
          <img src={rightarrow} alt='right' />
        </div>
      </div>
    </div>
  );
};

export default Event;







