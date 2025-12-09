import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from '../header/image/logo.jpeg';
import Logo2 from '../header/image/WTS-Full-Logo-WT.png';

const CmsHeader = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // Check sessionStorage for the user name and update the state
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('user_name');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);  // Run this effect only once, when the component mounts

  const handleLogout = () => {
    // Clear sessionStorage on logout
    sessionStorage.clear();
    setUserName(null);  // Clear the username from state
    navigate('/wtsadmin', { replace: true }); // Redirect to login page after logout
  };

  return (
    <>
      <div className="navbar text-white mb-8 z-30 fixed w-full transition-all duration-300 bg-blue-950">
        <div className="flex justify-between items-center mb-2 mx-4 head-home:my-2 medium-screen:mx-32 head-home:mx-20 lg:mx-12 big-screen:mx-24">
          
          {/* Logo Column */}
          <div className="flex items-center">
            <Link to="/" >
              <img src={Logo} alt="logo" className="mt-2 mx-0 mr-2 lg:mr-2 big-screen:w-[75px] 
                big-screen:h-[75px] sm:w-[55px] rounded-full sm:[55px] w-[55px] h-[55px]" />
            </Link>
            <Link to="/" >
              <img src={Logo2} alt="logo" className="mt-2 mx-0 mr-2 lg:mr-2 big-screen:w-[185px] 
                big-screen:h-[75px] rounded-full sm:[55px] w-[170px] h-[55px]" />
            </Link>
          </div>

          {/* Admin Text Column */}
          <div className="flex items-center justify-end w-1/2">
            {userName ? (
              <>
                {/* Show username with hover effect for logout */}
                <div className="relative group flex items-center space-x-2">
                  <i className="fa fa-user"></i>
                  <span>{userName}</span>

                  {/* Logout button appears on hover */}
                  <div className="absolute left-0 mt-14 hidden group-hover:block rounded">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // Show login link when user is not logged in
              <Link to="/wtsadmin">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CmsHeader;
