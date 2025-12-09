// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import globe from './images/Group.png';
// import { get } from '../service/apiservice';
// import { useTranslation } from 'react-i18next';
// import { Allapi } from '../constant/constantApi';

// const News = () => {
//     const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33);
//     const [newsItems, setNewsItems] = useState([]);
//     const navigate = useNavigate();
//     const { t, i18n } = useTranslation();
//     let carouselRef = null;

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth < 640) {
//                 setCenterSlidePercentage(100); // Mobile view
//             } else if (window.innerWidth < 1024) {
//                 setCenterSlidePercentage(50); // Tablet view
//             } else {
//                 setCenterSlidePercentage(33.33); // Desktop view
//             }
//         };

//         window.addEventListener('resize', handleResize);
//         handleResize();

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     useEffect(() => {
//         const getNewsData = async (lang) => {
//             try {
//                 const response = await get(`${Allapi.NEWS_getapi}?lang=${lang}`);
//                 setNewsItems(response.data.data);
//             } catch (error) {
//                 console.error('Failed to fetch news data:', error);
//             }
//         };

//         getNewsData(i18n.language);
//     }, [i18n.language]);

//     const handleReadMore = (itemIndex) => {
//         navigate('/readmorenews', { state: { newsItems, initialIndex: itemIndex } });
//     };

//     const handlePrevClick = () => {
//         if (carouselRef) {
//             carouselRef.decrement();
//         }
//     };

//     const handleNextClick = () => {
//         if (carouselRef) {
//             carouselRef.increment();
//         }
//     };

//     const truncateText = (text, length) => {
//         return text && text.length > length ? `${text.substring(0, length)}...` : text;
//     };

//     return (
//         <div id='newssection'>
//             <div className="relative z-1 text-center p-8 bg-indigo-900 text-white">
//                 <div className="flex items-center justify-center relative mt-8">
//                     <img src={globe} alt="globe" className="mx-auto my-auto" />
//                     <div className="absolute text-center">
//                         <h2 className="text-2xl sm:text-4xl text-white news-content:text-6xl">{t('news.title1')}</h2>
//                         <h2 className="text-2xl sm:text-4xl sm:mt-4 mt-2 text-white news-content:text-6xl">{t('news.title2')}</h2>
//                     </div>
//                 </div>
//                 <div className='mt-8'>
//                     <Carousel
//                         ref={(el) => (carouselRef = el)}
//                         showThumbs={false}
//                         showIndicators={false}
//                         useKeyboardArrows
//                         autoPlay
//                         interval={5000}
//                         showStatus={false}
//                         centerMode
//                         centerSlidePercentage={centerSlidePercentage}
//                         swipeScrollTolerance={5}
//                         showArrows={false}
//                     >
//                         {newsItems?.filter(event => event.isDisabled).map((item, index) => (
//                             <div className="flex flex-col px-2" key={item._id}>
//                                 <div onClick={() => handleReadMore(index)} className="cursor-pointer">
//                                     <img 
//                                         src={item.image.startsWith('http') ? item.image : `${process.env.REACT_APP_API_URL}/public/${item.image}`} 
//                                         alt={item.title} 
//                                         className="rounded-xl sm:w-[300px] sm:h-[575px] w-[450px] h-[380px] news-content:w-[500px] news-content:h-[950px] object-cover z-20" 
//                                     />
//                                 </div>
//                                 <h4 
//                                     className="sm:text-2xl text-xl mt-8 text-start news-content:text-5xl cursor-pointer truncate-title" 
//                                     onClick={() => handleReadMore(index)}
//                                     style={{ 
//                                         whiteSpace: 'nowrap', 
//                                         overflow: 'hidden', 
//                                         textOverflow: 'ellipsis' 
//                                     }}
//                                 >
//                                     {i18n.language === 'TA' 
//                                         ? truncateText(item?.title_ta, 30) 
//                                         : truncateText(item?.title_en, 30)}
//                                 </h4>
//                                 <p className="text-sm mt-4 text-start leading-[1.8rem] news-content:text-3xl">
//                                     {i18n.language === 'TA'
//                                         ? truncateText(item.description_ta, 100)
//                                         : truncateText(item.description_en, 100)}
//                                     <button
//                                         onClick={() => handleReadMore(index)} 
//                                         className="text-blue-500 ml-2"
//                                     >
//                                         {t('purpose.readMore')}
//                                     </button>
//                                 </p>
//                             </div>
//                         ))}
//                     </Carousel>
//                 </div>
//                 <div className="flex space-x-4 items-center justify-center mt-4">
//                     <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer mb-8" onClick={handlePrevClick}>
//                         <i className="fa fa-arrow-left text-black" aria-hidden="true"></i>
//                     </div>
//                     <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer mb-8" onClick={handleNextClick}>
//                         <i className="fa fa-arrow-right text-black" aria-hidden="true"></i>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default News;


//update design
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import globe from './images/white-globe.png';
import { get } from '../service/apiservice';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../constant/constantApi';
import leftarrow from './images/LeftArrow.png';
import rightarrow from './images/RightArrow.png';
import arrow from './images/Arrow.png';
import './news.css';
const News = () => {
    const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.33);
    const [newsItems, setNewsItems] = useState([]);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    let carouselRef = null;

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
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const getNewsData = async (lang) => {
            try {
                const response = await get(`${Allapi.NEWS_getapi}?lang=${lang}`);
                setNewsItems(response.data.data);
            } catch (error) {
                console.error('Failed to fetch news data:', error);
            }
        };

        getNewsData(i18n.language);
    }, [i18n.language]);

    // const handleReadMore = (itemIndex) => {
    //     navigate('/readmorenews', { state: { newsItems, initialIndex: itemIndex } });
    // };
    const handleReadMore = (itemIndex) => {
    const filteredNews = newsItems.filter(item => item.isDisabled);
    navigate('/readmorenews', { state: { newsItems: filteredNews, initialIndex: itemIndex } });
};


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

    const truncateText = (text, length) => {
        return text && text.length > length ? `${text.substring(0, length)}...` : text;
    };

    return (
        <div id='newssection' className="news-section-bg">
            <div className="relative z-1 text-center p-12 text-[#000000]">
                {/* Mobile view start */}
                <div className="news-mobileview lg:hidden flex items-center justify-center relative mt-8">
                    <img src={globe} alt="globe" className="globe" />
                    <div className="absolute text-center">
                        <h2 className="text-2xl sm:text-4xl text-[#000000] news-content:text-6xl">உலகத் தமிழ்ச் சிறகம்</h2>
                        <h2 className="text-2xl sm:text-4xl text-[#000000] news-content:text-6xl">செய்திகள்</h2>
                    </div>
                </div>
                {/* Mobile view end */}
           <div className="news-desktopview hidden lg:flex relative z-1 mt-8 px-4 sm:px-12 flex items-center justify-center">
  {/* Globe in Center Background */}
  <div className="absolute left-1/2 top-5 -translate-x-1/2 -translate-y-1/2  pointer-events-none z-0">
    <img src={globe} alt="globe" className="globe" />
  </div>

  {/* Left Text - overlapping the globe slightly */}
  <div className="z-10 text-left sm:mr-auto">
    <h2 className="text-2xl sm:text-4xl text-black font-semibold -mb-2">{t('news.title')}</h2>
    <button className="mt-6 border border-[#000000] text-[#000000] font-[700] text-sm py-2 px-4 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all">
    {t('news.readnews')} <img src={arrow} alt='arrow' />
    </button>
  </div>

  {/* Right Arrows */}
  <div className="z-10 flex space-x-4 sm:ml-auto">
    <div
      className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow cursor-pointer"
      onClick={handlePrevClick}
    >
      <img src={leftarrow} alt='arrow' className='text-[#FC8103]' />
    </div>
    <div
      className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow cursor-pointer"
      onClick={handleNextClick}
    >
      <img src={rightarrow} alt='arrow' className='text-[#FC8103]' />
    </div>
  </div>
</div>


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
                        showArrows={false}
                    >
                        {newsItems?.filter(event => event.isDisabled).map((item, index) => (
                            // <div className="flex flex-col sm:px-4 px-0 " key={item._id}>
                            <div className="flex flex-col sm:px-4 px-0 " key={item.id}>
                                <div onClick={() => handleReadMore(index)} className="cursor-pointer">
                                    {/* <img 
                                        src={item.image.startsWith('http') ? item.image : `${process.env.REACT_APP_API_URL}/public/${item.image}`} 
                                        alt={item.title} 
                                        className="rounded-xl sm:w-[300px] sm:h-[575px] w-[450px] h-[380px] news-content:w-[500px] news-content:h-[950px] object-cover z-20" 
                                    /> */}
                                    <img 
  src={
    item.image?.startsWith('http') 
      ? item.image 
      : `${process.env.REACT_APP_API_URL}/public/${item.image}`
  } 
  alt={item.title_ta || "News image"} 
  className="rounded-xl sm:w-[300px] sm:h-[575px] w-[450px] h-[380px] news-content:w-[500px] news-content:h-[950px] object-cover z-20" 
/>

                                </div>
                                <h4 
                                    className="sm:text-2xl text-xl mt-8 text-start news-content:text-5xl cursor-pointer truncate-title" 
                                    onClick={() => handleReadMore(index)}
                                    style={{ 
                                        whiteSpace: 'nowrap', 
                                        overflow: 'hidden', 
                                        textOverflow: 'ellipsis' 
                                    }}
                                >
                                    {i18n.language === 'TA' 
                                        ? truncateText(item?.title_ta, 30) 
                                        : truncateText(item?.title_en, 30)}
                                </h4>
                                <p className="text-sm mt-4 text-start leading-[1.8rem] news-content:text-3xl">
                                    {i18n.language === 'TA'
                                        ? truncateText(item.description_ta, 100)
                                        : truncateText(item.description_en, 100)}
                                    <button
                                        onClick={() => handleReadMore(index)} 
                                        className="text-blue-500 ml-2"
                                    >
                                        {t('purpose.readMore')}
                                    </button>
                                </p>
                            </div>
                        ))}
                    </Carousel>
                </div>
                {/* Mobile view start */}
                <div className="new-mobieview flex lg:hidden space-x-4 items-center justify-center mt-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer mb-8" onClick={handlePrevClick}>
                       <img src={leftarrow} alt='arrow' className='text-[#FC8103]' />
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer mb-8" onClick={handleNextClick}>
                        <img src={rightarrow} alt='arrow' className='text-[#FC8103]' />
                    </div>
                </div>
                {/* Mobileview end  */}
            </div>
        </div>
    );
};

export default News;











