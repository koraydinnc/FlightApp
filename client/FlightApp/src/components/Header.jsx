import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Logo from '../assets/Logo.png'; 
import { Button, message } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/reducers/authSlice';
import UserProfile from './UserProfile';

const Header = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, -40]), {
    stiffness: 200,
    damping: 30,
    restDelta: 0.1,
  });

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showProfile, setShowProfile] = useState(false);

  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigateLogin = () => {
    navigate('/Login');
  };

  const navigateHome = () => {
    navigate('/');
  };




  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
      <motion.nav
        style={isDesktop ? { y } : {}}
        className="bg-white shadow fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ease-in-out"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700">
            <img onClick={navigateHome} src={Logo} className="h-16 sm:h-24 w-auto cursor-pointer" alt="Project Logo" />
          </div>
          <div className="flex items-center relative">
            {isAuthenticated ? (
              <>
           
                  <UserProfile/>
          
              </>
            ) : (
              <Button className="ml-4 text-blue-700" type="default" onClick={navigateLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Header;
