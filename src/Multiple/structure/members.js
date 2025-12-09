import React, { useState, useEffect } from 'react';
import StructureBanner from './structurebanner';
import MyComponent from './structurevision';
import Donate from '../../Donate/donate';
import TeamMembers from './teams';
import News from '../../news/news';
import Contact from '../../contact/contactform';
import { useTranslation } from 'react-i18next';
import 'aos/dist/aos.css';
import { get } from '../../service/apiservice';
import AOS from 'aos';
import { Allapi } from '../../constant/constantApi';
import { TeamTypeEnum } from '../../constant/enum';

const TeamSection = () => {
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
      <StructureBanner />
      <MyComponent />
      <Donate />
      <div className="p-4 bg-white mx-4 md:mx-12 lg:mx-12 big-screen:mx-24 big-screen:py-72 py-20 md:py-44">
      {/* <div id='members' className="p-4 md:p-6 bg-white mx-4 md:mx-12 lg:mx-12 xl:mx-24 xl:py-72 py-16 md:py-44"> */}
        <div className="mb-6 md:mb-8">
          {/* <div className={`bg-gray-300 text-gray-900 py-1 px-2 rounded-md ${isExecutive ? 'xl:w-32 md:w-24 w-20' : 'xl:w-60 md:w-40 w-32'} xl:text-lg md:text-sm text-xs`}> */}
          <div className={`bg-gray-300 text-gray-900 py-1 px-2 rounded-md ${isExecutive ? 'big-screen:w-32 w-24' : 'big-screen:w-60 w-40'} big-screen:text-lg text-xs`}>            {isExecutive ? t('structure.Management1') : t('structure.Management2')}
          </div>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="flex">
            <h2 className="text-2xl md:text-4xl lg:text-5xl big-screen:text-[80px] mt-4 md:mt-14 font-bold">
                {t('structure.heading')}
                <br />
                {isExecutive ? t('structure.Management1') : t('structure.Management2')}
              </h2>
            </div>

            <div className="mx-auto flex items-center big-screen:py-2 py-1 px-2 bg-gray-300 text-gray-900 lg:ml-88 
        rounded-full mt-4 md:mt-0 text-[8px] lg:text-[10px] md:w-56 sm:w-64 md:w-72 lg:w-64 big-screen:w-[430px] big-screen:text-xl big-screen:ml-52">
       <span
           className={`cursor-pointer rounded-full px-2 py-1 mr-6 ${isExecutive ? 'bg-white text-gray-900' : 'bg-transparent text-gray-900'}`}
           onClick={() => setIsExecutive(true)}
         >
           {t('structure.Management1')}
         </span>
         <span
           className={`cursor-pointer rounded-full px-2 py-1 ${!isExecutive ? 'bg-white text-gray-900' : 'bg-transparent text-gray-900'}`}
           onClick={() => setIsExecutive(false)}
         >
           {t('structure.Management2')}
         </span>
       </div>
          </div>
        </div>

        {isExecutive ? (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-12 ml-4 md:ml-12 lg:ml-20">
  {filteredData.map((member, index) => (
    <div
      key={index}
      className={`flex flex-col bg-white p-4 ${
        index === 0
          ? 'ml-auto mr-auto w-[200px] md:w-[250px] lg:w-[280px] xl:w-[380px] col-span-1 lg:col-span-3 xl:col-span-3' 
          : 'col-span-1 w-full'
      }`}
    >
      <h3 className="text-xs md:text-lg font-semibold">
        {i18n.language === 'TA' ? member.title_ta : member.title_en}
      </h3>
      <p className="text-[10px] md:text-sm" dangerouslySetInnerHTML={{ __html: i18n.language === 'TA' ? member.description_ta : member.description_en }}></p>
      <p className="text-[10px] md:text-sm">
        {i18n.language === 'TA' ? member.contactNo_ta : member.contactNo_en}
      </p>
    </div>
  ))}
</div>

        ) : (
          <TeamMembers team_type={isExecutive ? TeamTypeEnum.ADMIN_TEAM : TeamTypeEnum.SUBCOMMITTEE_MEMBERS} />
        )}
      </div>

      <News />
      <Contact />
    </>
  );
};

export default TeamSection;



