import React from 'react';
import valluvarImage from './images/valluvar.webp';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const VisionMission = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    function handleAbout (){
        navigate('/about');
    }
    function handleContact(){
        navigate('/contactus');
    }
  return (
    // <div className="flex flex-col md:flex-row items-center justify-center min-h-screen px-6 py-12 bg-white">
      
    //   {/* Left Image Section */}
    //   <div className="w-full md:w-1/2 flex justify-center">
    //     <img
    //       src={valluvarImage}
    //       alt="Tamil Wall"
    //       className="max-w-full h-auto rounded-lg"
    //     />
    //   </div>

    //   {/* Right Text Section */}
    //   <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-12 text-center md:text-left">
    //     <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
    //       உலகத் தமிழ் சிறகம் <br />
    //       <span className="text-blue-700">உங்களை வரவேற்கிறது!</span>
    //     </h1>
    //     <p className="mt-6 text-gray-700 text-base md:text-lg leading-relaxed">
    //       பன்னாட்டு தமிழர்களை ஒன்றிணைத்து உலகத் தமிழ் சிறகம் அமைப்பானது பிரான்ஸ் நாட்டின் பாரீஸ் நகரை தலைமையிடமாககொண்டு 2023 ஆம் ஆண்டு செப்டம்பர் மாதம் 23ஆம் தேதி தொடங்கப்பட்டது.
    //     </p>

    //     {/* Buttons */}
    //     <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
    //       <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition duration-300">
    //         எங்களைப் பற்றி →
    //       </button>
    //       <button className="border border-gray-400 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition duration-300">
    //         Contact Us →
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 md:px-12 py-12">
    
    <h1 className='text-center text-blue-950 text-5xl'>Vision & Mission</h1>

      {/* Grid Section */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Image */}
        <div className="w-full mt-16"> 
          <img
            src={valluvarImage}
            alt="Valluvar"
            className="object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full p-6 md:p-8 mt-24">
          

         
           <h1 className="text-2xl md:text-3xl  text-gray-800  leading-snug">
        {t('visionmission.title1')} <br />
          <span className="text-[#014A8A] ">{t('visionmission.title2')}</span>
         </h1>
         <p className="mt-8 text-gray-700 text-base md:text-lg leading-relaxed">
          {t('visionmission.description')}
         </p>

         {/* Buttons */}
         <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
           <button className="bg-[#FC8103] hover:bg-orange-600 text-[#FFFFFF] px-6 py-3 rounded-full font-semibold transition duration-300"
           onClick={handleAbout}>
            {t('visionmission.about')} →
           </button>
           <button className="border border-gray-400 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition duration-300"
           onClick={handleContact}>
             {t('visionmission.contact')} →
           </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
