import React, { useState, useEffect } from 'react';
import 'aos/dist/aos.css';
import { get } from '../../service/apiservice';
import AOS from 'aos';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../../constant/constantApi';

const TeamMembers = ({team_type}) => {
  const [data, setData] = useState([]);
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

  return (
    <div className=" flex flex-col">
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.filter(teams => teams.team_type === team_type && teams.isDisabled).map((teams, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full">
            <div className="ml-4">
              <h2 className="text-lg font-bold">{i18n.language === 'TA' ? teams.title_ta:teams.title_en}</h2>
              <p className="mt-2" dangerouslySetInnerHTML={{ __html:i18n.language === 'TA'?  teams.description_ta:teams.description_en }}></p>
              <p className="text-xs sm:text-base">{i18n.language === 'TA' ? teams.contactNo_ta:teams.contactNo_en}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
