import React from 'react';
import launchimage from './images/launch-poster.jpeg';

const Comingsoon = () => {
  return (
    <div 
      className="h-screen flex items-center justify-center px-4" 
      style={{ background: 'linear-gradient(135deg, #f06, #b3cdd1)', overflow: 'hidden' }}
    >
      <img 
        src={launchimage} 
        alt="Centered Image" 
        className="max-h-[90%] w-auto rounded shadow-lg"
      />
    </div>
  );
};

export default Comingsoon;



