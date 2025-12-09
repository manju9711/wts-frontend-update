import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../header/header';

const ReadMoreNews = () => {
    const location = useLocation();
    const { newsItems, initialIndex } = location.state || {};
    const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);
    const { t, i18n } = useTranslation();

    const nextNews = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    };

    const prevNews = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
    };

    const currentNews = newsItems[currentIndex];

    return (
        <>
            <Header />
            {/* Added padding to avoid overlap with the header */}
            <div className="min-h-screen pt-8 flex flex-col items-center">
                <div className="flex items-center justify-center space-x-4 mt-8 w-full px-4 sm:px-8">
                    <button 
                        onClick={prevNews} 
                        className="text-4xl text-black">&#8592;</button>

                    {/* Main Content Container with Fixed Height */}
                    <div className="flex flex-col lg:flex-row items-center justify-center w-full h-full ">
                        {/* Content Section with Scroll */}
                        <div className="relative sm:w-full lg:w-1/2 px-4 sm:px-8 text-center lg:text-left mt-4 lg:mt-16 overflow-y-auto">
                            {/* Link Element */}
                            <Link 
                                to="/" 
                                className="text-lg text-black mb-4 inline-block"
                            >
                                முகப்பு &gt; செய்திகள்
                            </Link>

                            {/* Title */}
                            <h1 className="lg:text-3xl sm:text-2xl text-xl font-bold text-gray-800 mb-4 mt-8 sm:mt-12 news-content:text-5xl">
                                {i18n.language === 'TA' ? currentNews.title_ta : currentNews.title_en}
                            </h1>

                            {/* Description */}
                            <p 
                                className="text-lg text-black leading-relaxed text-justify mt-4 news-content:text-3xl"
                                dangerouslySetInnerHTML={{ __html: i18n.language === 'TA' ? currentNews.description_ta : currentNews.description_en }}
                            />
                        </div>

                        {/* Image Section */}
                        <div className="sm:w-full lg:w-1/2 px-4 sm:px-8 py-8 order-last sm:order-last lg:order-last mt-4 lg:mt-0">
                            {/* <img 
                                src={currentNews.image.startsWith('http') ? currentNews.image : `${process.env.REACT_APP_API_URL}/public/${currentNews.image}`} 
                                alt={currentNews.title} 
                                className="border-4 shadow-md transition-transform transform hover:scale-105 sm:mt-12 mt-0 rounded-xl sm:w-[450px] sm:h-[520px] w-[450px] h-[380px] news-content:w-[600px] news-content:h-[700px]"
                            /> */}
                            {currentNews?.image && (
    <img 
        src={currentNews.image.startsWith('http') 
            ? currentNews.image 
            : `${process.env.REACT_APP_API_URL}/public/${currentNews.image}`} 
        alt={currentNews.title} 
        className="border-4 shadow-md transition-transform transform hover:scale-105 sm:mt-12 mt-0 rounded-xl sm:w-[450px] sm:h-[520px] w-[450px] h-[380px] news-content:w-[600px] news-content:h-[700px]"
    />
)}

                        </div>
                    </div>

                    <button onClick={nextNews} className="text-4xl color-black">&#8594;</button>
                </div>
            </div>
        </>
    );
};

export default ReadMoreNews;



















