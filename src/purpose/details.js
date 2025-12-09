import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/header';
import bannerImage from '../Multiple/vision/images/visionbanner.png';
import { useTranslation } from 'react-i18next';

const Details = () => {
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const data = location.state?.data; // Get the passed news item

    useEffect(() => {
        // Log the data object to check its structure
        console.log('Received data:', data);
    }, [data]);
    
    

    return (
        <>
            <div className="relative h-[530px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bannerImage})` }}>
                <Header />
                <div className="absolute inset-0"></div>
                <div className="relative flex items-center justify-center h-full">
                    <div className="text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold"> {t('purpose.wts')} </h1>
                        <h1 className="sm:mt-4  text-4xl md:text-6xl font-bold"> {t('purpose.title')} </h1>
                    </div>
                </div>
            </div>
            {data ? (
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="bg-white shadow-lg rounded-xl p-8 w-full md:w-2/3 lg:w-1/2 text-center mt-10">
                        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">
                            
                            {i18n.language === 'TA' ? data.title_ta : data.title_en}
                            
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed text-justify">
                            {i18n.language === 'TA' ? data.description_ta : data.description_en}
                        </p>
                    </div>
                    {/* <div className="mt-8 py-4 bg-gray-100 rounded-xl shadow-inner w-full md:w-2/3 lg:w-1/2">
                        <div className="text-center text-blue-950 font-medium text-xl">
                            <Link to="#" className="hover:underline">இலக்கியங்கள்</Link> |
                            <Link to="#" className="ml-2 hover:underline">வரலாறுகள்</Link> |
                            <Link to="#" className="ml-2 hover:underline">கதைகள்</Link> 
                            <Link to="#" className="ml-2 hover:underline">கவிதைகள்</Link> |
                            <Link to="#" className="ml-2 hover:underline">பாடல்கள்</Link> |
                            <Link to="#" className="ml-2 hover:underline">நூல்கள்</Link>
                            
                        </div>
                    </div> */}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-lg text-gray-600 leading-relaxed text-justify">
                        No vision item selected.
                    </p>
                </div>
            )
            }
        </>
    );
};

export default Details;















