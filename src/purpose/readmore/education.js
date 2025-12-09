import React from 'react';
import statue1 from './images/statue1.png';
import statue2 from './images/statue2.png';
import centerimage from './images/center-image.png';

const Education = () => {
  return (
    <>
      <style jsx="true">
        {`
          .center-bg {
            background-image: url(${centerimage});
            background-position: center;
            opacity: 0.1;
            z-index: 0;
          }
        `}
      </style>
      <div className="flex flex-col py-10 bg-gray-100 relative">
        
        <div className="w-full h-full bg-white p-6 sm:p-8 md:p-16 shadow-md relative mx-auto">
        {/* <div className="absolute inset-0 center-bg"></div> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">கல்வி உயர்வுக்கு உதவுதல்</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
            <img
              src={statue1}
              alt="Tamil Scholar"
              className="h-40 sm:h-60 md:h-80 lg:h-[450px] mb-4 md:mb-0"
            />
            <ul className="list-disc list-inside text-left space-y-2 sm:space-y-3 md:space-y-4 mx-4">
              <li>
              உலகத் தமிழ்ச் சிறகம் தமிழ் மொழியின் வளர்ச்சிக்கும், கல்வி உயர்வுக்கும் முக்கிய பங்காற்றும் அமைப்பாகும்.
              </li>
              <li>
              இது உலகம் முழுவதும் தமிழ் பேசும் மக்களுக்குப் பயன்படும் கல்வி மற்றும் கலை வளர்ச்சிக்கான பணிகளை மேற்கொள்கிறது.
              </li>
              <li>
              தொன்மையான, மத்தியகால, மற்றும் நவீன தமிழ் இலக்கியங்களை உலக அளவில் பரப்புதல்.
              </li>
              <li>
              தமிழ் புத்தகக் கண்காட்சிகள், இலக்கிய விழாக்கள், மற்றும் பன்னாட்டு தமிழ் மாநாடுகள் நடத்துதல்.
              </li>
              <li>
              தமிழ் மாணவர்களுக்கு சர்வதேச தரத்தில் கல்வி வழங்குதல்.
              </li>
              <li>
              தகுதியுள்ள ஏழை மாணவர்களுக்குக் கல்வி உதவித் தொகை வழங்குதல்.
              </li>
            </ul>
            <img
              src={statue2}
              alt="Statue of Liberty"
              className="h-40 sm:h-60 md:h-80 lg:h-[450px] mt-4 md:mt-0"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Education;
