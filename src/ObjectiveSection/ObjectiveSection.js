// import React from 'react';
// import { FaUsers, FaBookOpen, FaUniversity, FaUserMd, FaGlobeAsia, FaLanguage } from 'react-icons/fa';
// import frame1 from './images/Frame1.png';
// import frame2 from './images/Frame2.png';
// import frame3 from './images/Frame3.png';
// import frame4 from './images/Frame4.png';
// import frame5 from './images/Frame5.png';
// import frame6 from './images/Frame6.png';

// const items = [
//   { image:frame1, text: 'தமிழர்களை ஒன்றிணைத்தல்' },
//   { image:frame2, text: 'தமிழ் நூல்களை பதிப்பித்தல்' },
//   {image:frame3, text: 'கல்லி உயர்வுக்கு உதவுதல்' },
//   { image:frame4, text: 'தமிழ் சான்றோர்கள்/முன்னோர்களின் சிந்தனைகள் நிறைவது' },
//   { image:frame5, text: 'தமிழ் பண்பாடு, தமிழ் வாழ்வியலை பறைசாற்றுதல்' },
//   { image:frame6, text: 'தமிழ் மொழியை பயிற்றுவிக்க வழிவகுப்பது' }
// ];

// const ObjectiveSection = () => {
//   return (
//     <section className="py-12 bg-[#f8fafc]">
//       <div className="text-center mb-10">
//         <h2 className="text-xl md:text-2xl font-medium text-gray-800">உலகத் தமிழ்ச் சிறகம்!</h2>
//         <h3 className="text-2xl md:text-3xl font-bold text-[#014A8A] mt-2">
//           அமைக்கப்பட்டதன் நோக்கம்?
//         </h3>
//       </div>
      
//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
//         {items.map((item, index) => (
//           <div key={index} className="flex items-start gap-4 p-5 border border-gray-300 rounded-md bg-white shadow-sm">
//             <div>
//                  <img src={item.image} alt="icon" className="w-8 h-8 object-contain" />
//             </div>
//             <p className="text-gray-700 font-medium">{item.text}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ObjectiveSection;
// import React from 'react';
// import frame1 from './images/Frame1.png';
// import frame2 from './images/Frame2.png';
// import frame3 from './images/Frame3.png';
// import frame4 from './images/Frame4.png';
// import frame5 from './images/Frame5.png';
// import frame6 from './images/Frame6.png';

// const items = [
//   { image: frame1, text: 'தமிழர்களை ஒன்றிணைத்தல்' },
//   { image: frame2, text: 'தமிழ் நூல்களை பதிப்பித்தல்' },
//   { image: frame3, text: 'கல்வி உயர்வுக்கு உதவுதல்' },
//   { image: frame4, text: 'தமிழ்ச் சான்றோர்கள்/முன்னோர்களின் சிலைகளை நிறுவுவது' },
//   { image: frame5, text: 'தமிழர்ப் பண்பாடு,தமிழர் வாழ்வியலைபுதுப்பித்தல்' },
//   { image: frame6, text: 'தமிழ் மொழியைப் பயிற்றுவிக்க வழிவகுப்பது' }
// ];

// const ObjectiveSection = () => {
//   return (
//     <section className="py-12 bg-[#f8fafc]">
//       <div className="text-center mb-10">
//         <h2 className="text-xl md:text-2xl font-medium text-gray-800">உலகத் தமிழ்ச் சிறகம்!</h2>
//         <h3 className="text-2xl md:text-3xl font-bold text-[#014A8A] mt-2">
//           அமைக்கப்பட்டதன் நோக்கம்?
//         </h3>
//       </div>

//       <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-start gap-4 p-10 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]"
//           >
//             <div>
//               <img src={item.image} alt="icon" className="w-12 h-12 object-contain" />
//             </div>
//             <p className="text-gray-700 font-medium leading-relaxed text-lg">
//               {item.text}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ObjectiveSection;

import React from 'react';
import frame1 from './images/Frame1.png';
import frame2 from './images/Frame2.png';
import frame3 from './images/Frame3.png';
import frame4 from './images/Frame4.png';
import frame5 from './images/Frame5.png';
import frame6 from './images/Frame6.png';
import { useTranslation } from 'react-i18next';

const ObjectiveSection = () => {
   const { t } = useTranslation();
  return (
    <>
    <section className="py-12 bg-[#f8fafc]">
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-medium text-gray-800">{t('objective.title1')}</h2>
        <h3 className="text-2xl md:text-3xl font-bold text-[#014A8A] mt-2">
          {t('objective.title2')}
        </h3>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <div className="flex items-start gap-4 p-10 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]">
          <img src={frame1} alt="icon" className="w-12 h-12 object-contain" />
          <p className="text-gray-700 font-medium sm:text-lg text-base leading-relaxed">
            {t('objective.data1')}
          </p>
        </div>

        <div className="flex items-start gap-4 p-10 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]">
          <img src={frame2} alt="icon" className="w-12 h-12 object-contain" />
          <p className="text-gray-700 font-medium sm:text-lg text-base leading-relaxed">
             {t('objective.data2')}
          </p>
        </div>

        <div className="flex items-start gap-4 p-10 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]">
          <img src={frame3} alt="icon" className="w-12 h-12 object-contain" />
          <p className="text-gray-700 font-medium sm:text-lg text-base leading-relaxed">
             {t('objective.data3')}
          </p>
        </div>

        <div className="flex items-start gap-4 sm:p-7 p-5 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]">
          <img src={frame4} alt="icon" className="w-12 h-12 object-contain" />
          <p className="text-gray-700 font-medium sm:text-lg text-base leading-relaxed">
             {t('objective.data4')}
          </p>
        </div>

        <div className="flex items-start gap-4 p-7 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]">
          <img src={frame5} alt="icon" className="w-12 h-12 object-contain" />
          <p className="text-gray-700 font-medium sm:text-lg text-base leading-relaxed">
            {t('objective.data5')}
          </p>
        </div>

        <div className="flex items-start gap-4 p-7 border border-gray-300 rounded-md bg-white shadow-sm h-[130px]">
          <img src={frame6} alt="icon" className="w-12 h-12 object-contain" />
          <p className="text-gray-700 font-medium sm:text-lg text-base leading-relaxed">
             {t('objective.data6')}
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default ObjectiveSection;

