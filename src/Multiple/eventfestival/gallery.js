// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLocation } from 'react-router-dom';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; 

// const Gallery = () => {
//    if (!eventsData) return null;
//   const { t } = useTranslation();
//   const [showMore, setShowMore] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const location = useLocation();

//   const eventsData = Array.isArray(location.state?.eventsData?.gallery_images)
//     ? location.state.eventsData.gallery_images
//     : [];

//   const initialItemsCount = 8;

//   const displayedItems = showMore
//     ? eventsData
//     : eventsData.slice(0, initialItemsCount);

//   const openModal = (index) => {
//     setCurrentImageIndex(index);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const goToNextImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % displayedItems.length);
//   };

//   const goToPrevImage = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + displayedItems.length) % displayedItems.length);
//   };

//   return (
//     <div className="mt-10 p-4">
//       <h2 className="text-center text-3xl font-semibold text-black-800 mb-8">
//         {t('gallery.photos')}
//       </h2>
//       {displayedItems.length > 0 ? (
//         <>
//           {/* Desktop Grid - Hidden on mobile */}
//           <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {displayedItems.map((image, index) => (
//               <div key={index} className="p-4 rounded-lg">
//                 <div
//                   className="w-full h-0 pb-[71.42%] relative overflow-hidden rounded-lg cursor-pointer"
//                   onClick={() => openModal(index)}
//                 >
                 
//                   <img
//   src={image.startsWith('blob') 
//     ? image 
//     : `${process.env.REACT_APP_API_URL}/public/${image}`}
//   alt={`Gallery Item ${index + 1}`}
//   className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
// />

//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Mobile Carousel - Hidden on larger screens */}
//           <div className="sm:hidden">
//             <Carousel
//               showArrows={true}
//               showThumbs={false}
//               showIndicators={false}  
//               selectedItem={currentImageIndex}
//               onChange={(index) => setCurrentImageIndex(index)}
//               className="carousel-wrapper"
//             >
//               {eventsData.map((image, index) => (
//                 <div key={index} onClick={() => openModal(index)} className='w-full h-0 pb-[71.42%] relative overflow-hidden rounded-2xl'>
//                   <img
//   src={image.startsWith('blob') 
//     ? image 
//     : `${process.env.REACT_APP_API_URL}/public/${image}`}
//   alt={`Gallery Item ${index + 1}`}
//   className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
// />

//                 </div>
//               ))}
//             </Carousel>
//           </div>
//         </>
//       ) : (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//           <p className="text-lg text-black-600 leading-relaxed text-justify">
//             {t('gallery.noImagesAvailable')}
//           </p>
//         </div>
//       )}

//       {/* Read More Button - Hidden on mobile */}
//       <div className="text-center mt-8 hidden sm:block">
//         {!showMore && eventsData.length > initialItemsCount && (
//           <button
//             onClick={() => setShowMore(true)}
//             className="border border-gray-400 text-[#281E5D] font-semibold py-2 px-4 rounded-xl transition"
//           >
//             {t('gallery.readmore')}
//           </button>
//         )}
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
//           <div className="relative w-full h-full flex items-center justify-center">
//             <div className="relative">
//               {/* <img
               
//                 src={
//                   typeof displayedItems[currentImageIndex].filePath === 'string' &&
// displayedItems[currentImageIndex].filePath.startsWith('blob')
//   ? displayedItems[currentImageIndex].filePath
//   : `${process.env.REACT_APP_API_URL}/${displayedItems[currentImageIndex].filePath}`

//                 }

//                 className="lg:h-[600px] lg:w-full rounded-lg object-cover"
//               /> */}
//               <img
//   src={
//     displayedItems[currentImageIndex]?.startsWith('blob')
//       ? displayedItems[currentImageIndex]
//       : `${process.env.REACT_APP_API_URL}/public/${displayedItems[currentImageIndex]}`
//   }
//   alt={`Gallery Item ${currentImageIndex + 1}`}
//   className="lg:h-[600px] lg:w-full rounded-lg object-cover"
// />

//             </div>
//             <div>
//               <div className="absolute top-4 left-4 text-white text-2xl sm:left-[200px]">
//                 {currentImageIndex + 1}/{displayedItems.length}
//               </div>
//               <button
//                 className="absolute top-4 right-4 p-2 text-white text-2xl sm:right-[200px]"
//                 onClick={closeModal}
//               >
//                 &#10005; {/* Close icon */}
//               </button>
//               <button
//                 className="absolute top-1/2 transform -translate-y-1/2 left-4 p-2 bg-gray-800 rounded-full bg-transparent text-white text-4xl sm:left-[200px]"
//                 onClick={goToPrevImage}
//               >
//                 <i className="fa fa-arrow-circle-left" aria-hidden="true"></i> {/* Left arrow */}
//               </button>
//               <button
//                 className="absolute top-1/2 transform -translate-y-1/2 right-4 p-2 bg-gray-800 rounded-full bg-transparent text-white text-4xl sm:right-[200px]"
//                 onClick={goToNextImage}
//               >
//                 <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> {/* Right arrow */}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Gallery;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Gallery = () => {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  const eventsData = Array.isArray(location.state?.eventsData?.gallery_images)
    ? location.state.eventsData.gallery_images
    : [];

  const initialItemsCount = 8;

  const displayedItems = showMore
    ? eventsData
    : eventsData.slice(0, initialItemsCount);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % displayedItems.length
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + displayedItems.length) % displayedItems.length
    );
  };

  // ✅ Safe return check AFTER hooks
  if (!eventsData || eventsData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          {t("gallery.noImagesAvailable")}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 p-4">
      <h2 className="text-center text-3xl font-semibold text-black-800 mb-8">
        {t("gallery.photos")}
      </h2>

      {displayedItems.length > 0 && (
        <>
          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedItems.map((image, index) => (
              <div key={index} className="p-4 rounded-lg">
                <div
                  className="w-full h-0 pb-[71.42%] relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openModal(index)}
                >
                  <img
                    src={
                      image.startsWith("blob")
                        ? image
                        : `${process.env.REACT_APP_API_URL}/public/${image}`
                    }
                    alt={`Gallery Item ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="sm:hidden">
            <Carousel
              showArrows={true}
              showThumbs={false}
              showIndicators={false}
              selectedItem={currentImageIndex}
              onChange={(index) => setCurrentImageIndex(index)}
              className="carousel-wrapper"
            >
              {eventsData.map((image, index) => (
                <div
                  key={index}
                  onClick={() => openModal(index)}
                  className="w-full h-0 pb-[71.42%] relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={
                      image.startsWith("blob")
                        ? image
                        : `${process.env.REACT_APP_API_URL}/public/${image}`
                    }
                    alt={`Gallery Item ${index + 1}`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </>
      )}

      {/* Read More Button */}
      <div className="text-center mt-8 hidden sm:block">
        {!showMore && eventsData.length > initialItemsCount && (
          <button
            onClick={() => setShowMore(true)}
            className="border border-gray-400 text-[#281E5D] font-semibold py-2 px-4 rounded-xl transition"
          >
            {t("gallery.readmore")}
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative">
              <img
                src={
                  displayedItems[currentImageIndex]?.startsWith("blob")
                    ? displayedItems[currentImageIndex]
                    : `${process.env.REACT_APP_API_URL}/public/${displayedItems[currentImageIndex]}`
                }
                alt={`Gallery Item ${currentImageIndex + 1}`}
                className="lg:h-[600px] lg:w-full rounded-lg object-cover"
              />
            </div>

            {/* Controls */}
            <div>
              <div className="absolute top-4 left-4 text-white text-2xl sm:left-[200px]">
                {currentImageIndex + 1}/{displayedItems.length}
              </div>
              <button
                className="absolute top-4 right-4 p-2 text-white text-2xl sm:right-[200px]"
                onClick={closeModal}
              >
                &#10005;
              </button>
              <button
                className="absolute top-1/2 transform -translate-y-1/2 left-4 p-2 bg-transparent text-white text-4xl sm:left-[200px]"
                onClick={goToPrevImage}
              >
                <i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
              </button>
              <button
                className="absolute top-1/2 transform -translate-y-1/2 right-4 p-2 bg-transparent text-white text-4xl sm:right-[200px]"
                onClick={goToNextImage}
              >
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
