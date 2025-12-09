import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { get } from '../../service/apiservice';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

const EventDetails = () => {
  const [openSection, setOpenSection] = useState(null);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [eventsData, setEventsData] = useState({});

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const lang = i18n.language;
        const response = await get(`api/festival/festival?lang=${lang}`);
        setEventsData(response.data.data.find(event => event._id === location.state?.eventsData?._id) || {});
      } catch (error) {
        console.error('Failed to fetch events data:', error);
      }
    };

    fetchEventsData();
  }, [i18n.language, location.state?.eventsData?._id]);

  // Determine which language to use
  const isTamil = i18n.language === 'TA';

  return (
    <div className='mt-20'>
    <div className="px-[6%] p-4 bg-[#F9FAFB]">
      {eventsData && Object.keys(eventsData).length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <h1 className="text-2xl md:text-4xl lg:text-5xl xl:font-medium 2xl:leading-normal font-bold mb-6 sm:mb-6 md:mb-8 mb-2">
                {isTamil ? eventsData.title_ta : eventsData.title_en}
              </h1>
              <p className="text-gray-600">
                {isTamil ? eventsData.date_ta : eventsData.date_en}
              </p>
              
            </div>
          </div>

          {/* Right Column */}
          <div>
            <Accordion
              title={isTamil ? eventsData.heading_ta : eventsData.heading_en}
              isOpen={openSection === 'intro'}
              onToggle={() => toggleSection('intro')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 text-black-300">
                <div>
                  <p className="text-black mb-2">{isTamil ? eventsData.subHeading_ta : eventsData.subHeading_en}</p>
                  <p className="text-black mb-2">{isTamil ? eventsData.specialChairman_ta : eventsData.specialChairman_en}</p>
                  <p className="text-black mb-2" dangerouslySetInnerHTML={{ __html: isTamil ? eventsData.specialChairmanName_ta : eventsData.specialChairmanName_en }}></p>
                  <p className="text-black mb-2">{isTamil ? eventsData.minister_ta : eventsData.minister_en}</p>
                  <p className="text-black mb-2">{isTamil ? eventsData.chairman_ta : eventsData.chairman_en}</p>
                  <p className="text-black mb-2" dangerouslySetInnerHTML={{ __html: isTamil ? eventsData.chairmanName_ta : eventsData.chairmanName_en }}></p>
                  <p className="text-black mb-2">{isTamil ? eventsData.generalSecretary_ta : eventsData.generalSecretary_en}</p>
                  <p className="text-black mb-2" dangerouslySetInnerHTML={{ __html: isTamil ? eventsData.generalSecretaryName_ta : eventsData.generalSecretaryName_en }}></p>
                </div>
              </div>
            </Accordion>
            <Accordion
              title={t('gallery.h2')}
              isOpen={openSection === 'foreword'}
              onToggle={() => toggleSection('foreword')}
            >
              <p className="text-black">
                {t('gallery.description1')}
              </p>
            </Accordion>

            <Accordion
              title={t('gallery.h3')}
              isOpen={openSection === 'program'}
              onToggle={() => toggleSection('program')}
            >
              <p className="text-black">
                {t('gallery.description2')}
              </p>
            </Accordion>

            <Accordion
              title={t('gallery.h4')}
              isOpen={openSection === 'honor'}
              onToggle={() => toggleSection('honor')}
            >
              <p className="text-black">
                {t('gallery.description3')}
              </p>
            </Accordion>

            <Accordion
              title={t('gallery.h5')}
              isOpen={openSection === 'conclusion'}
              onToggle={() => toggleSection('conclusion')}
            >
              <p className="text-black">
                {t('gallery.description4')}
              </p>
            </Accordion>
          </div>
        </div>
      ) : (
        <p>{t('event.noDetails')}</p>
      )}
    </div>
    </div>
  );
};

const Accordion = ({ title, children, isOpen, onToggle }) => (
  <div className="border-b border-black-600 mb-4">
    <button
      className="w-full text-left p-4 focus:outline-none"
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xl md:text-2xl lg:text-xl">{title}</span>
        <span >
          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>
    </button>
    {isOpen && <div className="p-4 text-black-700">{children}</div>}
  </div>
);

export default EventDetails;
