import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import globe from './images/Group.png';
import { get } from '../../service/apiservice';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../../constant/constantApi';

const GalleryCarousel = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33);
  const [newsItems, setNewsItems] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCenterSlidePercentage(100); // Mobile view
      } else if (window.innerWidth < 1024) {
        setCenterSlidePercentage(50); // Tablet view
      } else {
        setCenterSlidePercentage(33.33); // Desktop view
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call it initially to set the correct value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getNewsData = async (lang) => {
      try {
        const response = await get(`${Allapi.FESTIVAL_getapi}?lang=${lang}`);
        setNewsItems(response.data.data);
        console.log("data", response.data.data)
      } catch (error) {
        console.error('Failed to fetch news data:', error);
      }
    };

    getNewsData(i18n.language);
  }, [i18n.language]);

  let carouselRef = null;

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
    <div id='newssection'>
      <div className="relative z-1 p-8 bg-[#F9FAFB]">
        <h2 className="text-2xl tracking-tight  text-black-300 sm:text-5xl lg:text-5xl mb-6">
          {t('gallery.morefestivals')}
        </h2>
        <div className='mt-8'>
          <Carousel
            ref={(el) => (carouselRef = el)}
            showThumbs={false}
            showIndicators={false}
            useKeyboardArrows
            // autoPlay
            interval={5000}
            showStatus={false}
            centerMode
            centerSlidePercentage={centerSlidePercentage}
            swipeScrollTolerance={5}
            showArrows={false} // Disable default arrows
          >
            {/* {newsItems.map(item => ( */}
            {newsItems.filter(event => event.isDisabled).map(item => (
              <div className="flex flex-col px-2" key={item._id}>
                <img
                  className="lg:h-56 object-cover rounded-2xl"
                  src={item.image.filePath?.startsWith('blob') ? item.image.filePath : `${process.env.REACT_APP_API_URL}/${item.image.filePath}`}
                  alt={item.title_ta}
                />
                <div className="p-4">
                  <h4 className="text-start text-2xl text-black-800">
                    {i18n.language === 'TA' ? item.title_ta : item.title_en}
                  </h4>
                  <p className="text-sm mt-4 text-start leading-[1.8rem] news-content:text-2xl">
                    {i18n.language === 'TA' ? item.description_ta : item.description_en}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex space-x-4 items-center justify-center mt-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow-lg cursor-pointer mb-8" onClick={handlePrevClick}>
            <i className="fa fa-arrow-left text-gray-600" aria-hidden="true"></i>
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shadow-lg cursor-pointer mb-8" onClick={handleNextClick}>
            <i className="fa fa-arrow-right text-gray-600" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCarousel;
