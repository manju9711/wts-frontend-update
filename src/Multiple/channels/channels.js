import React, { useState, useEffect } from 'react';
import Channelsbanner from './channelsbanner';
import Modal from './modal';
import { useTranslation } from 'react-i18next';
import { Allapi } from '../../constant/constantApi';
import { get } from '../../service/apiservice';

const Channels = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] = useState(null);
  const [trackItems, setTrackItems] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const getTrackData = async (lang) => {
      try {
        const response = await get(`${Allapi.TRACKS_getapi}?lang=${lang}`);
        setTrackItems(response.data.data);
        console.log('Track data fetched:', response.data.data);  
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    getTrackData(i18n.language);
  }, [i18n.language]);

  const openModal = (mediaItem) => {
    setSelectedMediaItem({
      ...mediaItem,
      type: mediaItem.fileType && mediaItem.fileType.startsWith('image/') ? 'image' : 'video', // media வகையை type என update செய்கிறது
      src: `${process.env.REACT_APP_API_URL}/${mediaItem.filePath.replace(/\\/g, '/')}`
    });
    setIsModalOpen(true);
  };
  
  

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMediaItem(null);
  };

  return (
    <>
      <Channelsbanner />
      {/* {trackItems?.map((item, index) => ( */}
        {trackItems?.filter(event => event.isDisabled).map(item  => (
        <div className="media-container">
          <div className="flex flex-col sm:flex-row justify-between items-start py-6 px-4 sm:px-16"> 
  <div className="text-left mb-4 sm:mb-0"> 
    <h1 className="text-2xl sm:text-3xl font-bold text-black-700 py-2">
      {i18n.language === 'TA' ? item.title_ta : item.title_en}
    </h1>
  </div>
  <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
    <button className="text-white transition-colors duration-300  text-base sm:text-lg px-3 py-2 sm:px-6 rounded-lg shadow-lg w-full max-w-[200px] sm:max-w-none"
     style={{
      background: "linear-gradient(rgb(13, 10, 78), rgb(23, 189, 239))"
    }}>
    {i18n.language === 'TA'
                  ? new Date(item.date_ta).toLocaleDateString('ta-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                  : new Date(item.date_en).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                }
    </button>
  </div>
</div>



          <div className="text-left px-16">
            <p className="text-xl text-gray-700 mb-4 text-justify">
              {i18n.language === 'TA' ? item.description_ta : item.description_en}
            </p>
          </div>

          <div className="site-footer-marquee-item flex items-center justify-between py-4 border-t overflow-hidden">
            <div className="media-image-container flex-shrink-0">
              <div className="media-image flex animate-scroll">
               
                {item.gallery_images && item.gallery_images.length > 0 ? (
  item.gallery_images.map((media, idx) => {
    // media_type மற்றும் file extension அடிப்படையில் media validation
    const isImage = media.fileType && media.fileType.startsWith('image/');
    const isVideo = media.fileType && media.fileType.startsWith('video/');
    const fileExtension = media.filePath ? media.filePath.split('.').pop().toLowerCase() : "";
    const isImageByExtension = /\.(jpg|jpeg|png|gif)$/i.test(fileExtension);
    const isVideoByExtension = /\.(mp4|webm|ogg)$/i.test(fileExtension);

    return isImage || isImageByExtension ? (
      <img
        key={idx}
        src={`${process.env.REACT_APP_API_URL}/${media.filePath.replace(/\\/g, '/')}`}
        alt={`Media ${idx + 1}`}
        className="h-40 w-40 object-cover mx-2 scrollimg"
        onClick={() => openModal(media)}
        onError={(e) => {
          console.error(`Failed to load image at ${e.target.src}`);
          e.target.src = '/path/to/placeholder-image.jpg';
        }}
      />
    ) : isVideo || isVideoByExtension ? (
      <video
        key={idx}
        src={`${process.env.REACT_APP_API_URL}/${media.filePath.replace(/\\/g, '/')}`}
        className="h-40 w-40 object-cover mx-2 scrollimg"
        controls
        loop
        muted
        onClick={() => openModal(media)}
        onError={(e) => {
          console.error(`Failed to load video at ${e.target.src}`);
          e.target.src = '/path/to/placeholder-video.mp4';
        }}
      />
    ) : null;
  })
) : (
  <p>Media not available</p>
)}

                     



              </div>
            </div>
          </div>

          <Modal isOpen={isModalOpen} closeModal={closeModal} mediaItem={selectedMediaItem} />
        </div>
      ))}
    </>
  );
};

export default Channels;






























