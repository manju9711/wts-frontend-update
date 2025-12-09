import React, { useState, useEffect } from 'react';
import { get } from '../../service/apiservice';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../../header/image/logo.jpeg";
import { FaUsers } from 'react-icons/fa';
// aos
import AOS from 'aos';
import 'aos/dist/aos.css';

function EventSection() {
  const [eventsData, setEventsData] = useState([]);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const getEventsData = async (lang) => {
      try {
        const response = await get(`/api/festival/festival?lang=${lang}`);
        const data = response.data.data;

        setEventsData(data);
        console.log("data", data);
      } catch (error) {
        console.error('Failed to fetch events data:', error);
      }
    };

    getEventsData(i18n.language);
    AOS.init({
      duration: 1500, // Animation duration
      //once: true, // Animation happens only once
    });
  }, [i18n.language]);

  const handleGallery = (event) => {
    navigate('/galleryhome', { state: { eventsData: event } });
  };

  return (
    <div className="px-6 py-8 md:px-20 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {eventsData.filter(event => event.isDisabled).map((event, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay={`${index * 500}`}>
            {/* Image Section */}
            <div className="relative">
              {/* <img
                src={event.image?.filePath?.startsWith('blob') ? event.image.filePath : `${process.env.REACT_APP_API_URL}/${event.image?.filePath}`}
                alt="Event"
                className="w-full object-cover"
              /> */}
              <img 
  src={
    event.image?.startsWith('http') 
      ? event.image 
      : `${process.env.REACT_APP_API_URL}/public/${event.image}`
  } 
  alt={event.title_ta || "image"} 
  className="w-full object-cover" 
/>

            </div>
            {/* Content Section */}
            <div className="p-4">
              <div className="flex items-center mb-2">
                <img src={logo} alt="Logo" className="w-6 h-6 rounded-full mr-2" />
                <span className="font-semibold text-sm">{t('festival.heading1')}</span>
              </div>
              <h1 className="text-lg md:text-xl font-semibold text-black">
                {i18n.language === 'TA' ? event.title_ta : event.title_en}
              </h1>
              <p className="text-gray-600 text-sm md:text-base mt-2 mb-4">
                {i18n.language === 'TA'
                  ? event.description_ta?.substring(0, 100) ?? ''
                  : event.description_en?.substring(0, 100) ?? ''}...
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleGallery(event)}
                >
                  {t('Read More')}
                </span>
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                {i18n.language === 'TA'
                  ? new Date(event.date_ta).toLocaleDateString('ta-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  : new Date(event.date_en).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }
                </span>
                <div className="flex items-center">
                  <span><FaUsers className="mr-1" /></span>
                  {/* <span>1k</span> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventSection;



