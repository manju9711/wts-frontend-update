import React from 'react';
import statue1 from './images/statue1.png';
import statue2 from './images/statue2.png';
import centerimage from './images/center-image.png';

const Croud = () => {
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
      <div className="flex flex-col  bg-gray-100 relative">
        
        <div className="w-full h-full bg-white p-6 sm:p-8 md:p-16 shadow-md relative mx-auto">
        {/* <div className="absolute inset-0 center-bg"></div> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold pt-12  text-center">தமிழாய்வுக் கூட்டங்கள் நடத்துதல்</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
            <img
              src={statue1}
              alt="Tamil Scholar"
              className="h-40 sm:h-60 md:h-80 lg:h-[450px] mb-4 md:mb-0"
            />
            <ul className="list-disc list-inside text-left space-y-2 sm:space-y-3 md:space-y-4 mx-4">
              <li>
              உலகத் தமிழ்ச் சிறகத்தின் முக்கியமான செயல்பாடுகளில் ஒன்று தமிழறிஞர்களைக் கொண்டு தமிழாய்வுக் கூட்டங்கள் நடத்துவதாகும். 
              </li>
              <li>
              இது உலகம் முழுவதும் தமிழறிஞர்கள், கல்வியாளர்கள், ஆராய்ச்சியாளர்கள், மாணவர்கள் ஆகியோருக்கிடையே துல்லியமான, ஆழமான மற்றும் புதிய தகவல்களைப் பகிர்வதற்கும், தமிழ்மொழி மற்றும் பண்பாட்டு ஆய்வுகளை முன்னெடுப்பதற்கும் ஒரு மேடையாக விளங்குகின்றது.
              </li>
              <li>
              தமிழறிஞர்களின் பங்களிப்புடன் பல்வேறு ஆய்வுப் படைப்புகள், பத்திரிகைகள் மற்றும் நூல்களை வெளியிடுவது.

              </li>
              <li>
              கருத்தரங்குகள் மற்றும் கருத்துக்களங்களை நடத்துவது.
              </li>
              <li>
              இக்கூட்டங்கள் மூலமாக மாணவர்கள் மற்றும் ஆராய்ச்சியாளர்கள் தங்கள் அறிவியல் மற்றும் கல்வித் திறமைகளை மேம்படுத்தி கொள்வர்.
              </li>
              <li>
              தமிழ் பேசும் சமூகங்களுக்கு இக்கூட்டங்கள் பெரிய உதவியாக இருக்கும்.
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

export default Croud;
