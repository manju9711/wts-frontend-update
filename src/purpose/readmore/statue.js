import React from 'react';
import statue1 from './images/statue1.png';
import statue2 from './images/statue2.png';
import centerimage from './images/center-image.png';

const Statue = () => {
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 text-center">சிலை அமைத்தல்</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
            <img
              src={statue1}
              alt="Tamil Scholar"
              className="h-40 sm:h-60 md:h-80 lg:h-[450px] mb-4 md:mb-0"
            />
            <ul className="list-disc list-inside text-left space-y-2 sm:space-y-3 md:space-y-4 mx-4">
              <li>
              உலகத் தமிழ்ச் சிறகம் தமிழின் மேன்மைக்கும், தமிழ் மக்களின் வளர்ச்சிக்கும் தொண்டாற்றிய முக்கியவர்களை கௌரவிக்கும் விதமாக, அவர்களுக்கு சிலைகள் அமைக்கும் பணியில் ஈடுபட்டுள்ளது.
              </li>
              <li>
              இதன் நோக்கம் தமிழின் பெருமை மிக்கவர்களை நினைவுகூர்வதும், இன்றைய தலைமுறையினருக்கு அவர்களின் சாதனைகளை எடுத்துரைப்பதுமாகும்.
              </li>
              <li>
              முக்கியமான தமிழ் புலவர்கள், கலைஞர்கள், மற்றும் சமூக சீர்திருத்தவாதிகளின் சிலைகள் பொது இடங்களில் அமைத்தல்.
              </li>
              <li>
              இவற்றின் மூலம் இளைஞர்களுக்கு அவர்களின் சாதனைகளை அறிமுகப்படுத்துதல்.
              </li>
              <li>
              தமிழ் பள்ளிகள், கல்லூரிகள் மற்றும் பல்கலைக்கழகங்களில் தமிழின் மேம்பாட்டிற்கு உதவியவர்களின் சிலைகள் அமைத்தல்.
              </li>
              <li>
              இதன் மூலம் வெளிநாடுகளில் வசிக்கும் தமிழ் மக்களுக்கு அவர்கள் பற்றும் பெருமையை நினைவுகூரவைக்கும்.
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

export default Statue;
