import React from 'react';
import { useTranslation } from 'react-i18next';
import image from './images/valluvar.webp';
import reward from './images/reward.png';

function Structurevision() {

  const { t } = useTranslation();

  return (
    <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 md:px-12 py-12">
    
    <h1 className='text-center text-blue-950 text-5xl'>Vision & Mission</h1>

      {/* Grid Section */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Image */}
        <div className="w-full mt-16"> 
          <img
            src={image}
            alt="Valluvar"
            className="object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
            {t('structure.structure')}
          </h2>

          {/* Responsive List Items */}
          <ul className="space-y-4">
            {Array.from({ length: 10 }, (_, i) => (
              <li key={i} className="flex items-center text-black">
                <img src={reward} alt="reward" className="w-4 h-4 md:w-4 md:h-4 mr-4" />
                <span className="text-sm md:text-base">{t(`structure.p${i + 1}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}

export default Structurevision;












