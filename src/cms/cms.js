import React, { useState, useEffect } from 'react';
import Vision from './vision';
import Structure from './structure';
import Festival from './festival';
import News from './news';
import Sidebar from './sidebar';
import ContactForm from './contactform';
import Invitation from './invitation';
import Publish from './publish';
import CmsHeader from '../header/Cmsheader';
import Membership from './membership';
import Tracks from './tracks';


const Page = () => {
  const [selectedView, setSelectedView] = useState('vision');

  const renderContent = () => {
    switch (selectedView) {
      case 'vision':
        return <Vision />;
      case 'structure':
        return <Structure />;
      case 'festival':
        return <Festival />;
      case 'news':
        return <News />;
      case 'invitation':
        return <Invitation />;
      case 'publish':
        return <Publish />;
      case 'contactform':
        return <ContactForm />;
      case 'membership':
        return <Membership/>;
      case 'tracks':
        return <Tracks/>;
      default:
        return <Vision />;
    }
  };

  return (
    <>
    <CmsHeader/>
    <div className="flex pt-[5%]">
      <Sidebar setSelectedView={setSelectedView} />
      <div className="flex-1 p-4 w-[80%]">
        {renderContent()}
      </div>
    </div>
    </>
  );
};

export default Page;

