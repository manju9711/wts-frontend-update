import React from 'react';
import { Link } from 'react-router-dom';
import statue1 from './images/statue1.png';
import statue2 from './images/statue2.png';
import centerimage from './images/center-image.png';

const Tamilbook = () => {
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
      <div className="flex flex-col bg-gray-100 relative">
      
        <div className="w-full h-full bg-white p-6 sm:p-8 md:p-16 shadow-md relative mx-auto">
        <div className=" p-20">
    <nav className="mb-12">
        <Link to="/" className="text-blue-500">
          Home
        </Link>
        {' > '}
        <span>Book</span>
      </nav>
      </div>
        {/* <div className="absolute inset-0 center-bg"></div> */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold  sm:mb-5 md:mb-6 text-center">தமிழ் நூல்களை பதிப்பித்தல்</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
            <img
              src={statue1}
              alt="Tamil Scholar"
              className="h-40 sm:h-60 md:h-80 lg:h-[450px] mb-4 md:mb-0"
            />
            <ul className="list-disc list-inside text-left space-y-2 sm:space-y-3 md:space-y-4 mx-4">
              <li>
              தமிழ் தோன்றிய காலந்தொட்டு இன்றுவரை வந்துள்ள, இனி எதிர் காலத்தில் வெளிவர இருக்கும் தமிழ் நூல்கள், வார, திங்கள் இதழ்களையும் ஒலைச்சுவடிப் பொத்தகம் முதற்கொண்டு இன்றைய தாள் புத்தகம், ஒலி, ஒளி இழைகள், நுண்படச்சுருள், எதிர்காலக் கணிப்பொறித் தட்டமைப்பு நூல்கள் மற்றும் இவை போன்ற தொடர்பானவற்றையும் திரட்டிப் பாதுகாத்தல்.
              </li>
              <li>
              தமிழ் நூல்களை மட்டுமின்றி தமிழைப் பற்றி, தமிழரைப் பற்றி, வெளிவந்துள்ள பிறமொழி நூல்களையும் ஒன்று திரட்டுதல்.
              </li>
              <li>
              தமிழர்கள் எழுதிய பிறமொழி நூல்களையும் தொகுத்து வைத்தல்.
              </li>
              <li>
              முழுமையான அளவில் தமிழ் நூல்கள் அனைத்தும் உள்ள ஒரு நூலகத்தை உருவாக்குதல்.
              </li>
              <li>
              தமிழ்மொழி வளர்ச்சி, தமிழ் இலக்கண, இலக்கிய வளர்ச்சி ஆகியவ்ற்றிற்குப் பாடுபடுதல்.
              </li>
              <li>
              நவீன தமிழகம் மற்றும் தமிழ் மொழியார்ந்துள்ள உலகம் முழுவதும் இவற்றின் பயன்பாடு, பகிர்வு மற்றும் பாதுகாப்பு என்பன விரிவாக அமையும்.
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

export default Tamilbook;


