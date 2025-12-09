import React, { useState, useEffect } from 'react';
import { get } from '../../service/apiservice';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../../constant/constantApi';
import Header from '../../header/header';
import { Button } from '@mui/material';

const Invitation = () => {
  const { t, i18n } = useTranslation();
  const [invitationItems, setInvitationItems] = useState([]);

  useEffect(() => {
    const getNewsData = async (lang) => {
      try {
        const response = await get(`${Allapi.INVITATION_getapi}?lang=${lang}`);
        setInvitationItems(response.data.data);
      } catch (error) {
        console.error('Failed to fetch news data:', error);
      }
    };

    getNewsData(i18n.language);
  }, [i18n.language]);

 
  // Helper function to check file type
  const isImage = (filename) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  };

  return (
    <>
      <Header />
      {invitationItems?.filter(event => event.isDisabled).map(items => (
        <div id="invitation" className="relative z-1 invitation-page bg-gray-100 flex flex-col items-center text-center p-5 pt-20 text-black" key={items.id}>

          {/* Centered Title */}
          <div className="w-full mt-8">
            <h1 className="font-semibold mb-8 text-2xl 2xl:text-4xl sm:text-3xl font-mono uppercase text-center invitation-text:text-5xl">
              {i18n.language === 'TA' ? items.title_ta : items.title_en}
              <span className="block w-7 h-2 bg-gray-500 mx-auto mt-2" />
              <span className="block w-24 h-px bg-gray-400 mt-0 mx-auto" />
            </h1>
          </div>

          {/* Two-Column Layout with Increased Width and Reduced Side Gaps */}
          <div className="invitationcontent flex flex-col md:flex-row items-stretch md:justify-between px-3 py-5 w-full h-full">

            {/* Left Column - Details */}
            <div className="text-left w-full md:w-1/2 md:pl-10 md:pr-4 mb-5 md:mb-0 flex flex-col justify-center h-full flex-grow ">
              <p className="text-lg sm:text-base 2xl:text-2xl my-2 invitation-text:text-4xl ">
                {i18n.language === 'TA' ? items.description_ta : items.description_en}
              </p>
              <p className="text-lg sm:text-base 2xl:text-2xl my-2 invitation-text:text-4xl">
              {i18n.language === 'TA'
                  ? new Date(items.date_ta).toLocaleDateString('ta-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  : new Date(items.date_en).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }
              </p>
              <p className="text-lg sm:text-base 2xl:text-2xl my-2 invitation-text:text-4xl">
                {i18n.language === 'TA' ? items.location_ta : items.location_en}
              </p>
              <p className="text-lg sm:text-base 2xl:text-2xl my-2 invitation-text:text-4xl">
                {i18n.language === 'TA' ? items.sub_description_ta : items.sub_description_en}
              </p>

              {/* PDF Content and Button on the Same Line */}
              {items.file && !isImage(items.file) && (
                <div className="flex items-center space-x-3 mt-5">
                  <span className="text-black font-semibold text-lg invitation-text:text-4xl">{t('invitation.pdfcontent')}</span>
                  <Button
                    onClick={() => {
                      // window.open(
                      //   items.file.startsWith('http') ? items.file : `${process.env.REACT_APP_API_URL}/public/${items.file}`,
                      //   '_blank',
                      //   'noopener,noreferrer'
                      // );
                      const fileUrl = items.file?.startsWith('http')
  ? items.file
  : `${process.env.REACT_APP_API_URL}/public/${items.file.replace(/^uploads\//, 'public/')}`;

window.open(fileUrl, '_blank', 'noopener,noreferrer');

                    }}
                    sx={{
                      backgroundColor: '#172554',
                      color: 'white',
                      borderRadius: '1rem',
                      padding: '0.5rem 1rem',
                      '&:hover': {
                        backgroundColor: '#172554FF',
                      },
                    }}
                  >
                    {t('invitation.invitation')}
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column - Image */}
            <div className="w-full md:w-1/2 flex justify-center items-center h-full flex-grow">
              {items.image && isImage(items.image) && (
                <img
                  src={items.image.startsWith('http') ? items.image : `${process.env.REACT_APP_API_URL}/public/${items.image}`}
                  alt="Invitation"
                  className="w-[95%] sm:w-[85%] md:w-[90%] lg:w-[85%] xl:w-[80%] h-full shadow-lg rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Invitation;







