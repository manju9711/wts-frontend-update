import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Membershipbutton from '../common/membership-button';
import { get } from '../service/apiservice';
import { useTranslation } from 'react-i18next';
import { Allapi} from '../constant/constantApi';


// aos
import AOS from 'aos';
import 'aos/dist/aos.css';


const Purpose = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
     const navigate = useNavigate();

     useEffect(() => {
        AOS.init({
            duration: 1500, // Animation duration
            //once: true, // Animation happens only once
        });
    }, []);

    
    

    const fetchData = async (lang) => {
        try {
           
            const response = await get(`${Allapi.VISION_getapi}?lang=${lang}`);
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(i18n.language);
    }, [i18n.language]);



   

    const handleReadMore = (item) => {
        navigate('/details', { state: { data: item } }); // Pass the news item as state
    };




    return (
        <>
            
            <div id='purpose'>
                <div className="relative z-1 font-Mukta Malar mx-auto px-4 sm:px-8 lg:px-16 py-10 lg:py-20 bg-[#F9FAFB]">
                    <div className="flex flex-wrap md:flex-nowrap">
                        {/* Left Text Section */}
                        <div className="w-full md:w-1/3 mb-8 md:mb-0">
                            <div className='sticky top-20'>
                                <div className='pt-8'>
                                    {/* <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded mb-4 purpose-text:px-7 purpose-text:py-2 purpose-text:text-2xl">
                                        {t('purpose.title')}</span> */}
                                        <p className="inline-block text-3xl  mb-4 purpose-text:text-5xl">
                                        {t('purpose.title')}:</p>
                                    <p className="text-black text-xl md:text-2xl mb-6 purpose-text:text-4xl">
                                        {t('purpose.description')}
                                    </p>
                                    <Membershipbutton />
                                    <div>
                                        <Link to="/contactus" className="text-black text-sm font-bold pl-2 purpose-text:text-2xl">
                                            {t('purpose.contactUs')} <i className="fa fa-arrow-right text-[#281E5D] pl-2" aria-hidden="true"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Cards Section */}
                        <div className="w-full md:w-2/3 md:ml-1/3 md:pl-12">
                            
                                
                            
                            <div className="container">
                                <div className="lg:grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                                    {data?.filter(event => event.isDisabled).map((item, index) => (
                                        <div key={item.id} className={`p-4 border border-gray-200 rounded-lg shadow-md card-hover-effect ${item.image && index === 1 ? 'p-0' : ''}`}
                                        data-aos="fade-up" 
                                        data-aos-delay={`${index * 500}`} // Delay for each card
                                        >
                                            {index === 1 && item.image ? (
                                                <>
                                                    <div className="relative pt-4 px-6 bg-[#281E5D] rounded-lg">
                                                        <img
                                                            src={item.image.startsWith('http') ? item.image : `${process.env.REACT_APP_API_URL}/public/${item.image}`}
                                                            alt={item.imageTitle}
                                                            className="w-full h-auto rounded-t-lg mb-4 z-20"
                                                            style={{ filter: 'brightness(50%)' }}
                                                        />
                                                        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-6 ml-2">
                                                            <button className="inline-block bg-gray-200 text-gray-800 text-sm rounded mb-0 sm:mt-6 mt-0 py-1 px-2 purpose-img:mt-0 purpose-text:px-7 purpose-text:py-3 purpose-text:text-xl">
                                                                {t('purpose.invitation')}</button>
                                                            <h2 className="text-white sm:text-2xl text-sm mb-0 purpose-img:text-sm purpose-text:text-4xl">
                                                                {i18n.language === `TA` ? item.imageTitle_ta : item.imageTitle_en}</h2>
                                                        </div>
                                                        <div className="absolute sm:bottom-8 bottom-2 left-6 purpose-img:bottom-0 ">
                                                            <Link to="/invitation" ><button className="bg-[#89CFF0] text-[#281E5D] font-bold text-xs px-6 sm:py-3 py-2 rounded-full purpose-img:px-3 purpose-img:py-2 purpose-read-button:text-xl ">
                                                                {t('purpose.readMore')}
                                                                <i className="fa fa-arrow-right text-[#281E5D] pl-2" aria-hidden="true"></i>
                                                            </button></Link>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 mt-4 "> 
                                                        <h3 className="text-xl purpose-text:text-4xl font-bold mb-2">{i18n.language === `TA` ? item.title_ta : item.title_en}</h3>
                                                        <hr />
                                                        <p className="text-sm purpose-text:text-3xl purpose-text:leading-[3rem] leading-7 mt-4">
                                                            {i18n.language === `TA`
                                                                ? `${item.description_ta?.substring(0, 114) ?? ''}...`
                                                                : `${item.description_en?.substring(0, 114) ?? ''}...`}
                                                        </p><br />
                                                        <hr />
                                                        
                                                        <button
                                                            onClick={() => handleReadMore(item)}
                                                            className="mt-4 bg-[#89CFF0] text-[#281E5D] font-bold text-xs px-6 sm:py-3 py-2 rounded-full purpose-text:text-xl"
                                                        >
                                                            {t('purpose.readMore')}
                                                            <i className="fa fa-arrow-right text-[#281E5D] pl-2" aria-hidden="true"></i>
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                <div className="p-4">
                                                    <h3 className="text-xl purpose-text:text-4xl font-bold mb-2">{i18n.language === `TA` ? item.title_ta : item.title_en}</h3>
                                                    <hr />
                                                    {/* <p className="text-sm purpose-text:text-3xl purpose-text:leading-[3rem] leading-7 mt-4">
                                                        {i18n.language === `TA`
                                                            ? `${item.description_ta?.substring(0, 420) ?? ''}...`
                                                            : `${item.description_en?.substring(0, 420) ?? ''}...`}</p> */}
                                                           <p className="text-sm purpose-text:text-3xl purpose-text:leading-[3rem] leading-7 mt-4">
                        {i18n.language === `TA`
                            ? (index === 0
                                ? `${item.description_ta?.substring(0, 420) ?? ''}...`
                                : `${item.description_ta?.substring(0, 200) ?? ''}...`)
                            : (index === 0
                                ? `${item.description_en?.substring(0, 420) ?? ''}...`
                                : `${item.description_en?.substring(0, 200) ?? ''}...`)}
                    </p>
                                                             
                                                    {index === 0 && (
                                                        <>
                                                            <div className='pt-8 text-blue-950 font-medium purpose-text:text-3xl'>
                                                                <Link to="#" className="">{t('purpose.link1')}</Link> |
                                                                <Link to="#" className=" ml-2 ">{t('purpose.link2')}</Link> |
                                                                <Link to="#" className=" ml-2">{t('purpose.link3')}</Link> <br />
                                                                <Link to="#" className=" ml-0 leading-10">{t('purpose.link4')}</Link> |
                                                                <Link to="#" className=" ml-2">{t('purpose.link5')}</Link>
                                                            </div>
                                                            {/* <br /> */}
                                                            <hr />
                                                            <div className="flex">
                                                                {/* <Readmorebutton  /> */}
                                                                <button
                                                                    onClick={() => handleReadMore(item)}
                                                                    className="mt-4 bg-[#89CFF0] text-[#281E5D] font-bold text-xs px-6 sm:py-3 py-2 rounded-full purpose-text:text-xl"
                                                                >
                                                                    {t('purpose.readMore')}
                                                                    <i className="fa fa-arrow-right text-[#281E5D] pl-2" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="flex-1">
                                                                    <p className="mt-6 sm:ml-24 ml-4 md:pl-4  text-sm text-[#281E5D] purpose-text:text-2xl books:ml-12">{t('purpose.link6')}</p>
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                        </>
                                                    )}
                                                    
                                                    <br />
                                                    </div>
                                                

                                                    {(index === 2 || index === 3) && (
                                                        <div>
                                                            <hr/>
                                                        <div className="flex mt-4">
                                                            {/* <Readmorebutton   /> */}
                                                            <button
                                                                onClick={() => handleReadMore(item)}
                                                                className="mt-4 bg-[#89CFF0] text-[#281E5D] font-bold text-xs px-6 sm:py-3 py-2 rounded-full purpose-text:text-xl"
                                                            >
                                                                {t('purpose.readMore')}
                                                                <i className="fa fa-arrow-right text-[#281E5D] pl-2" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Purpose;