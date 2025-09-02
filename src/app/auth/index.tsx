import React, { useState } from 'react';
import UserProfile from './user.profile';
import RegisterProfile from './register';
import VideoTubeLogo from '../../assets/images/websiteLogo.png';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider, useGoogleOneTapLogin, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '../../context/themeContext';
import { googleLogin } from '../../services/users'; // Import the API service
import { useStyles } from '../../utils/styleImports';
// import { mainContainerStyle, cardStyle, leftPanelStyle, mobileToggleStyle, toggleButtonStyle } from '../../utils/styleImports';


const AuthIndex: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { theme } = useTheme();
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
  const { containerStyle, cardStyle, leftPanelStyle, mobileToggleStyle, toggleButtonStyle } = useStyles();

  type UserProfileType = {
    name?: string;
    email?: string;
    picture?: string;
  };
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);

  const handleGoogleLogin = async (credential: string | undefined) => {
    if (!credential) return;

    setIsGoogleLoginLoading(true);
    try {
      const response = await googleLogin(credential);
      console.log('Google Login Response:', response);
      const data = response.data;
      console.log('Google Login Response:', data);

      const user = response.data?.data?.user;

      if (!user) {
        throw new Error('Invalid response from backend');
      }

      console.log('Backend Google Login Response:', user);

      // Handle successful login (e.g., redirect, update state, etc.)
      // You might want to navigate to a different page or update global auth state here

    } catch (error) {
      console.error('Google login error:', error);
      // Handle error (show error message to user)
    } finally {
      setIsGoogleLoginLoading(false);
    }
  };

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      handleGoogleLogin(credentialResponse.credential);
    },
    onError: () => {
      console.log('One Tap Login failed');
    },
    use_fedcm_for_prompt: true,
  });


  return (
    <div
      className="flex items-center justify-center min-h-screen p-2 sm:p-4 lg:p-6"
      style={containerStyle}
    >
      <div
        className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl shadow-2xl rounded-lg sm:rounded-xl overflow-hidden flex flex-col lg:flex-row border lg:border-2"
        style={cardStyle}
      >
        {/* Left Logo Panel */}
        <div
          className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 min-h-[200px] sm:min-h-[250px] lg:min-h-full"
          style={leftPanelStyle}
        >
          <img
            src={VideoTubeLogo}
            alt="VideoTube Logo"
            className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 h-auto"
          />
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center leading-tight">
            Welcome to VideoTube
          </h2>
          <p className="text-center text-xs sm:text-sm md:text-base px-2" style={{ color: theme.textMuted }}>
            Stream. Share. Create.
          </p>

          {/* Toggle button - hidden on mobile, visible on larger screens */}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="hidden sm:block mt-2 md:mt-4 text-xs sm:text-sm underline transition-colors duration-200"
            style={toggleButtonStyle}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>

          {/* Google Login */}
          <div className={isGoogleLoginLoading ? "opacity-50 pointer-events-none" : ""}>
            <GoogleLogin
              onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse.credential)}
              onError={() => console.log('Google Login Failed')}
            />
          </div>



          {/* Loading indicator for Google login */}
          {isGoogleLoginLoading && (
            <p className="text-xs mt-2" style={{ color: theme.textMuted }}>
              Signing in with Google...
            </p>
          )}
        </div>

        {/* Right Auth Panel */}
        <div className="w-full lg:w-1/2 relative">
          {/* Mobile toggle button */}
          <div className="sm:hidden p-4 border-b" style={mobileToggleStyle}>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-sm font-medium transition-colors duration-200"
              style={toggleButtonStyle}
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>

          <div className="h-auto lg:h-[600px] max-h-[70vh] lg:max-h-full overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-8 lg:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {isLogin ? <UserProfile /> : <RegisterProfile />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIndex;