// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { get } from '../../service/apiservice'; 

// const Video = () => {
 
//   const { t, i18n } = useTranslation();
//   const location = useLocation();
//   const [eventsData, setEventsData] = useState({});
//   const [isExpanded, setIsExpanded] = useState(false);

//     if (!eventsData) return null;
  
//   useEffect(() => {
//     const fetchEventsData = async () => {
//       try {
//         const lang = i18n.language;
//         const response = await get(`api/festival/festival?lang=${lang}`);
//         setEventsData(response.data.data.find(event => event._id === location.state?.eventsData?._id) || {});
//       } catch (error) {
//         console.error('Failed to fetch events data:', error);
//       }
//     };

//     fetchEventsData();
//   }, [i18n.language, location.state?.eventsData?._id]); 

//   const toggleReadMore = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <>
//     <div className="py-6 px-4 ">
//        {/* Back to Home Link */}
//        <div className='mt-12'>
//        <Link 
//                             to="/events" 
//                             className="absolute sm:mt-0 mt-4 md:mt-4 left-4 lg:left-0  text-sm sm:text-base lg:text-lg text-black z-0 news-content:text-xl news-content:mt-6"
                           
//                         >
//                             முகப்பு &gt; நிகழ்வுகள்
//                         </Link>
//                         </div>
//       {eventsData && Object.keys(eventsData).length > 0 ? (
//         <div className=" text-white mt-[100px]">
//           <h1 className="text-center text-2xl sm:text-3xl md:text-3xl text-black font-semibold">
//             {i18n.language === 'TA' ? eventsData.title_ta : eventsData.title_en}
//           </h1>
         
           
//             <p className="mt-4 text-lg sm:text-xl md:text-xl text-black font-normal max-w-[80%] text-justify mx-auto">
//   <span
//     dangerouslySetInnerHTML={{
//       __html: isExpanded
//         ? (i18n.language === 'TA' ? eventsData.description_ta : eventsData.description_en)
//         : (i18n.language === 'TA' ? eventsData.description_ta : eventsData.description_en)?.slice(0, 289),
//     }}
//   />
//   {((i18n.language === 'TA' ? eventsData.description_ta : eventsData.description_en)?.length > 289) && (
//     <span
//       onClick={toggleReadMore}
//       className="text-blue-500 cursor-pointer"
//     >
//       {isExpanded ? t('ReadLess') : t('ReadMore')}
//     </span>
//   )}
// </p>


//           <div className="mt-6 flex justify-center">
//             <div className="relative w-[850px] h-[400px]">
//               <video className="absolute top-0 left-0 w-full h-full rounded-2xl" controls>
//                 {/* <source
//                   src={eventsData.video[0]?.filePath?.startsWith('blob') ? eventsData.video[0].filePath : `${process.env.REACT_APP_API_URL}/${eventsData.video[0]?.filePath}`}
//                 /> */}
//                 <source
//   src={
//     eventsData.video[0]?.startsWith('blob')
//       ? eventsData.video[0]
//       : `${process.env.REACT_APP_API_URL}/public/${eventsData.video[0]}`
//   }
// />

//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center justify-center min-h-screen">
//           <p className="text-lg text-black-600 leading-relaxed text-justify">
//             {t('video.noVideoAvailable')}
//           </p>
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Video;


// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { get } from "../../service/apiservice";

// const Video = () => {
//   const { t, i18n } = useTranslation();
//   const location = useLocation();
//   const [eventsData, setEventsData] = useState({});
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     const fetchEventsData = async () => {
//       try {
//         const lang = i18n.language;
//         const response = await get(`api/festival/festival?lang=${lang}`);

//         const foundEvent = response.data.data.find(
//           (event) => event._id === location.state?.eventsData?._id
//         );
//         setEventsData(foundEvent || {});
//       } catch (error) {
//         console.error("Failed to fetch events data:", error);
//       }
//     };

//     fetchEventsData();
//   }, [i18n.language, location.state?.eventsData?._id]);

//   const toggleReadMore = () => setIsExpanded(!isExpanded);

//   if (!eventsData || Object.keys(eventsData).length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <p className="text-lg text-gray-700 leading-relaxed text-justify">
//           {t("video.noVideoAvailable")}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="py-6 px-4">
//       {/* Back to Home Link */}
//       <div className="mt-12">
//         <Link
//           to="/events"
//           className="absolute sm:mt-0 mt-4 md:mt-4 left-4 lg:left-0 text-sm sm:text-base lg:text-lg text-black z-0 news-content:text-xl news-content:mt-6"
//         >
//           முகப்பு &gt; நிகழ்வுகள்
//         </Link>
//       </div>

//       <div className="text-white mt-[100px]">
//         <h1 className="text-center text-2xl sm:text-3xl md:text-3xl text-black font-semibold">
//           {i18n.language === "TA" ? eventsData.title_ta : eventsData.title_en}
//         </h1>

//         <p className="mt-4 text-lg sm:text-xl md:text-xl text-black font-normal max-w-[80%] text-justify mx-auto">
//           <span
//             dangerouslySetInnerHTML={{
//               __html: isExpanded
//                 ? i18n.language === "TA"
//                   ? eventsData.description_ta
//                   : eventsData.description_en
//                 : (i18n.language === "TA"
//                     ? eventsData.description_ta
//                     : eventsData.description_en
//                   )?.slice(0, 289),
//             }}
//           />
//           {(
//             (i18n.language === "TA"
//               ? eventsData.description_ta
//               : eventsData.description_en
//             )?.length > 289
//           ) && (
//             <span
//               onClick={toggleReadMore}
//               className="text-blue-500 cursor-pointer"
//             >
//               {isExpanded ? t("ReadLess") : t("ReadMore")}
//             </span>
//           )}
//         </p>

//         <div className="mt-6 flex justify-center">
//           <div className="relative w-[850px] h-[400px]">
//             <video
//               className="absolute top-0 left-0 w-full h-full rounded-2xl"
//               controls
//             >
//               <source
//                 src={
//                   eventsData.video[0]?.startsWith("blob")
//                     ? eventsData.video[0]
//                     : `${process.env.REACT_APP_API_URL}/public/${eventsData.video[0]}`
//                 }
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Video;
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { get } from "../../service/apiservice";

const Video = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [eventsData, setEventsData] = useState(location.state?.eventsData || {});
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ Only fetch if we don’t already have full event data
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const lang = i18n.language;

        // If we already have data (like from Events page), skip fetch
        if (eventsData && Object.keys(eventsData).length > 0) return;

        const response = await get(`api/festival/festival?lang=${lang}`);
        const foundEvent = response.data.data.find(
          (event) => event._id === location.state?.eventsData?._id
        );

        if (foundEvent) setEventsData(foundEvent);
      } catch (error) {
        console.error("Failed to fetch events data:", error);
      }
    };

    fetchEventsData();
  }, [i18n.language, location.state?.eventsData?._id]);

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // ✅ Safe check if data missing
  if (!eventsData || !eventsData.video || eventsData.video.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          {t("video.noVideoAvailable")}
        </p>
      </div>
    );
  }

  return (
    <div className="py-6 px-4">
      {/* Back to Home Link */}
      <div className="mt-12">
        <Link
          to="/events"
          className="absolute sm:mt-0 mt-4 md:mt-4 left-4 lg:left-0 text-sm sm:text-base lg:text-lg text-black z-0 news-content:text-xl news-content:mt-6"
        >
          முகப்பு &gt; நிகழ்வுகள்
        </Link>
      </div>

      <div className="text-white mt-[100px]">
        <h1 className="text-center text-2xl sm:text-3xl md:text-3xl text-black font-semibold">
          {i18n.language === "TA" ? eventsData.title_ta : eventsData.title_en}
        </h1>

        <p className="mt-4 text-lg sm:text-xl md:text-xl text-black font-normal max-w-[80%] text-justify mx-auto">
          <span
            dangerouslySetInnerHTML={{
              __html: isExpanded
                ? i18n.language === "TA"
                  ? eventsData.description_ta
                  : eventsData.description_en
                : (i18n.language === "TA"
                    ? eventsData.description_ta
                    : eventsData.description_en
                  )?.slice(0, 289),
            }}
          />
          {(
            (i18n.language === "TA"
              ? eventsData.description_ta
              : eventsData.description_en
            )?.length > 289
          ) && (
            <span
              onClick={toggleReadMore}
              className="text-blue-500 cursor-pointer"
            >
              {isExpanded ? t("ReadLess") : t("ReadMore")}
            </span>
          )}
        </p>

        <div className="mt-6 flex justify-center">
          <div className="relative w-[850px] h-[400px]">
            <video
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              controls
            >
              <source
                src={
                  eventsData.video[0]?.startsWith("blob")
                    ? eventsData.video[0]
                    : `${process.env.REACT_APP_API_URL}/public/${eventsData.video[0]}`
                }
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;

