import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ setSelectedView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showToggleButton, setShowToggleButton] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowToggleButton(false);
      } else {
        setShowToggleButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      {showToggleButton && !isSidebarOpen && (
        <button
          className="md:hidden p-2 text-blue fixed top-20 left-4 z-50 transition-transform duration-300 ease-in-out"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 w-64 bg-blue-800 text-white h-full transform ${
          isSidebarOpen ? 'translate-x-0 z-30' : '-translate-x-full z-10'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-0`}
      >
        {isSidebarOpen && (
          <button
            className="md:hidden p-2 text-blue absolute top-4 right-4 z-50 transition-transform duration-300 ease-in-out"
            onClick={toggleSidebar}
          >
            <CloseIcon />
          </button>
        )}

        {/* Scrollable Sidebar Content */}
        <div className="overflow-y-auto h-full">
          <div className="p-5">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <ul>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('vision'); toggleSidebar(); }}>
              Vision
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('structure'); toggleSidebar(); }}>
              Structure
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('festival'); toggleSidebar(); }}>
              Festival
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('news'); toggleSidebar(); }}>
              News
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('invitation'); toggleSidebar(); }}>
              Invitation
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('publish'); toggleSidebar(); }}>
              Publish
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('contactform'); toggleSidebar(); }}>
              Contact Us
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('membership'); toggleSidebar(); }}>
              Membership
            </li>
            <li className="p-4 hover:bg-blue-700" onClick={() => { setSelectedView('tracks'); toggleSidebar(); }}>
              Tracks
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

