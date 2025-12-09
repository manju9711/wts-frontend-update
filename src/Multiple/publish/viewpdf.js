import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { get } from "../../service/apiservice";
import { Allapi } from "../../constant/constantApi";

const Viewpdf = () => {
  const [publishItems, setPublishItems] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchData = async (lang) => {
      try {
        const response = await get(`${Allapi.PUBLISH_getapi}?lang=${lang}`);
        setPublishItems(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(i18n.language);
  }, [i18n.language]);

  const renderMedia = (item) => {
    const fileUrl = item.file.startsWith('http') ? item.file : `${process.env.REACT_APP_API_URL}/public/${item.file}`;
    const isPdf = item.file.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(item.file);

    if (isPdf) {
      return (
        <Button
          onClick={() => window.open(fileUrl, '_blank', 'noopener,noreferrer')}
          sx={{
            backgroundColor: '#172554', 
            color: 'white',
            borderRadius: '1rem', 
            marginLeft: '0.5%',
            padding: '0.7%',
            '&:hover': {
              backgroundColor: '#172554FF',
            },
          }}
        >
          Click Here
        </Button>
      );
    }

    if (isImage) {
      return (
        <img
          src={fileUrl}
          alt={i18n.language === 'TA' ? item.title_ta : item.title_en}
          className="mx-auto mb-4 rounded-lg w-full md:w-1/2 lg:w-1/3"
        />
      );
    }

    return null;
  };

  return (
    <>
      
      <div className="mt-12">
        {publishItems?.filter(item => item.isDisabled).map(item => (
          <div key={item.id}>
            <h2 className="font-extrabold text-3xl text-center mt-8">
              {i18n.language === 'TA' ? item.title_ta : item.title_en}
            </h2>
            <br />
            <div className="text-center">
              {renderMedia(item)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Viewpdf;