import React, { useState, useEffect } from 'react';
import Donate from '../../Donate/donate';
import TeamMembers from './teams';
import Contact from '../../contact/contactform';
import { useTranslation } from 'react-i18next';
import 'aos/dist/aos.css';
import { get } from '../../service/apiservice';
import AOS from 'aos';
import { Allapi } from '../../constant/constantApi';
import { TeamTypeEnum } from '../../constant/enum';
import MembersBanner from './membersbanner';
import memberimage from './images/a2.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Committe = () => {
  const [data, setData] = useState([]);
  const [isExecutive, setIsExecutive] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchStructuresData = async (lang) => {
      try {
        const response = await get(`${Allapi.STRUCTURE_getapi}?lang=${lang}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Failed to fetch news data:', error);
      }
    };
    fetchStructuresData(i18n.language);
  }, [i18n.language]);

  const currentTeamType = isExecutive ? TeamTypeEnum.ADMIN_TEAM : TeamTypeEnum.SUBCOMMITTEE_MEMBERS;

  const filteredData = data.filter(member => member.team_type === currentTeamType && member.isDisabled);

  return (
    <>
      <MembersBanner />

      <div className="px-4 md:px-12 big-screen:px-32 bg-white py-20 md:py-30">
        <div className="mb-6 md:px-8 md:mb-8">
          <div className={`bg-gray-300 text-gray-900 py-1 px-2 rounded-md ${isExecutive ? 'big-screen:w-32 w-24' : 'big-screen:w-60 w-40'} big-screen:text-lg text-xs`}>
            {isExecutive ? t('structure.Management1') : t('structure.Management2')}
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="flex">
              <h2 className="text-2xl md:text-4xl lg:text-5xl big-screen:text-[80px] mt-4 md:mt-14 font-bold">
                {t('structure.heading')}
                <br />
                {isExecutive ? t('structure.Management1') : t('structure.Management2')}
              </h2>
            </div>

            <div className="mx-auto flex items-center big-screen:py-3 py-2 px-3 bg-gray-300 text-gray-900 lg:ml-88 
            rounded-full mt-4 md:mt-0 text-[8px] lg:text-[12px] md:w-56 w-64 md:w-72 lg:w-[340px] big-screen:w-[480px] big-screen:text-xl big-screen:ml-52">
              <span
                className={`cursor-pointer rounded-full px-4 py-3 mr-6 ${isExecutive ? 'bg-blue-950  text-white' : 'bg-transparent text-gray-900'}`}
                onClick={() => setIsExecutive(true)}
              >
                {t('structure.Management1')}
              </span>
              <span
                className={`cursor-pointer rounded-full px-4 py-3 ${!isExecutive ? 'bg-blue-950  text-white' : 'bg-transparent text-gray-900'}`}
                onClick={() => setIsExecutive(false)}
              >
                {t('structure.Management2')}
              </span>
            </div>
          </div>
        </div>

        {isExecutive ? (
          <div className="flex flex-col space-y-6">
            {/* First row with one card */}
            <div className="flex justify-center"> 
              {filteredData.slice(0, 1).map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white rounded-lg text-center justify-start shadow-2xl hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="w-1/3 p-4">
                      
                      {/* <img
    src={member.image && member.image.startsWith('http') ? member.image : `${process.env.REACT_APP_API_URL}/public/${member.image || 'default-image.jpg'}`}
    alt={member.title_en || 'Member Image'}
    className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover"
/> */}
<img
  src={
    member.image && member.image.startsWith('http')
      ? member.image
      : `${process.env.REACT_APP_API_URL}/public/${member.image || 'default-image.jpg'}`
  }
  alt={member.title_en || 'Member Image'}
  className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover"
/>


                    </div>
                    <div className="w-2/3 text-left">
                      <p
                        className="text-[15px] md:text-lg leading-normal"
                        dangerouslySetInnerHTML={{ __html: i18n.language === 'TA' ? member.description_ta : member.description_en }}
                      ></p>
                      {member.contactNo_ta || member.contactNo_en ? (
                        <p className="text-[15px] md:text-lg flex items-center mt-2">
                          <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-green-600" />
                          {i18n.language === 'TA' ? member.contactNo_ta : member.contactNo_en}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full mt-auto">
                    <h3 className="w-full text-lg md:text-lg py-2 h-24 flex items-center justify-center bg-blue-950 text-white rounded-b-lg hover:bg-blue-800 transition-colors duration-300">
                      {i18n.language === 'TA' ? member.title_ta : member.title_en}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Next rows with three cards per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-8">
              {filteredData.slice(1).map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white rounded-lg text-center justify-start shadow-2xl hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="w-1/3 p-4">
                     
                      <img
    src={member.image && member.image.startsWith('http') ? member.image : `${process.env.REACT_APP_API_URL}/public/${member.image || 'default-image.jpg'}`}
    alt={member.title_en || 'Member Image'}
    className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full object-cover"
/>

                    </div>
                    <div className="w-2/3 text-left">
                      <p
                        className="text-[15px] md:text-lg leading-normal"
                        dangerouslySetInnerHTML={{ __html: i18n.language === 'TA' ? member.description_ta : member.description_en }}
                      ></p>
                      {member.contactNo_ta || member.contactNo_en ? (
                        <p className="text-[15px] md:text-lg flex items-center mt-2">
                          <FontAwesomeIcon icon={faWhatsapp} className="mr-2 text-green-600" />
                          {i18n.language === 'TA' ? member.contactNo_ta : member.contactNo_en}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="w-full mt-auto">
                    <h3 className="w-full text-lg md:text-lg py-2 h-24 flex items-center justify-center bg-blue-950 text-white rounded-b-lg hover:bg-blue-800 transition-colors duration-300">
                      {i18n.language === 'TA' ? member.title_ta : member.title_en}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <TeamMembers team_type={isExecutive ? TeamTypeEnum.ADMIN_TEAM : TeamTypeEnum.SUBCOMMITTEE_MEMBERS} />
        )}
      </div>

      <Donate />
      <Contact />
    </>
  );
};

export default Committe;






