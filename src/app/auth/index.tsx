import React, { useState } from 'react';
import UserProfile from './user.profile';
import RegisterProfile from './register';
import VideoTubeLogo from '../../assets/images/websiteLogo.png';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider,useGoogleOneTapLogin,GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const AuthIndex: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

     type UserProfileType = {
       name?: string;
       email?: string;
       picture?: string;
     };
     const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);


  
  //   const handleGoogleLogin = (credential: string | undefined) => {
  //   if (!credential) return;
  
  //   const decoded = jwtDecode<{
  //     name?: string;
  //     email?: string;
  //     picture?: string;
  //     sub?: string;
  //   }>(credential);
  
  //   console.log('Decoded Google Token:', decoded);
  
  //   setUserProfile({
  //     name: decoded.name,
  //     email: decoded.email,
  //     picture: decoded.picture,
  //   });
  // };
  const handleGoogleLogin = async (credential: string | undefined) => {
  if (!credential) return;

  try {
    // Send credential to your backend
    const res = await axios.post(
      'https://backend-youtube-zba1.onrender.com/api/v1/users/google-login',
      { idToken: credential }, // <-- just the object, no need for body or stringify
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    console.log('Google Login Response:', res);
    const data = res.data;
    console.log('Google Login Response:', data);

const user = res.data?.data?.user;

if (!user) {
  throw new Error('Invalid response from backend');
}

console.log('Backend Google Login Response:', user);

    // Optional: save tokens if returned (or rely on httpOnly cookies)
    // const { user, accessToken, requireProfileSetup } = data;

    // if (requireProfileSetup) {
    //   // Redirect to profile setup page
    //   window.location.href = '/setup-profile';
    // } else {
    //   // Redirect to home or dashboard
    //   window.location.href = '/';
    // }

  } catch (error) {
    console.error('Google login error:', error);
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

  
    // useGoogleOneTapLogin({
    //   onSuccess: (credentialResponse) => {
    //     console.log("Login successful:", credentialResponse);
   
    //   // Decode the user's JWT token to extract profile information
    //   if (credentialResponse.credential) {
    //     type GoogleJwtPayload = {
    //       name?: string;
    //       email?: string;
    //       picture?: string;
    //       [key: string]: any;
    //     };
    //     const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
    //     console.log("Decoded Token:", decoded);
   
    //     // Update the user profile state
    //     setUserProfile({
    //       name: decoded.name,
    //       email: decoded.email,
    //       picture: decoded.picture,
    //     });
    //   } else {
    //     console.error("No credential received from Google One Tap login.");
    //   }
    //   },
    //   onError: () => {
    //     console.log("Login failed");
    //   },
    //   use_fedcm_for_prompt: true, // Enable the browser to mediate the sign-in flow
    // });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Logo Panel */}
        <div className="md:w-1/2 bg-black text-white p-10 flex flex-col items-center justify-center gap-4">
          <img src={VideoTubeLogo} alt="VideoTube Logo" className="w-28 md:w-56" />
          <h2 className="text-3xl font-bold">Welcome to VideoTube</h2>
          <p className="text-gray-400 text-center text-sm">Stream. Share. Create.</p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-sm underline text-blue-400 hover:text-blue-300 transition"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
            <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse.credential)}
        onError={() => console.log('Google Login Failed')}
      />
    </div>
        
          {/* {userProfile ? (
          // Display user profile information after login
          <div style={{ marginTop: "20px" }}>
            <img
              src={userProfile.picture}
              alt="Profile"
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            />
            <h2>Welcome, {userProfile.name}!</h2>
            <p>Email: {userProfile.email}</p>
          </div>
        ) : (
          <p>The browser mediates the sign-in flow seamlessly using FedCM.</p>
        )} */}
        </div>

        {/* Right Auth Panel */}
        <div className="md:w-1/2 h-[600px] overflow-y-auto scrollbar-hide p-6 md:p-10 relative">
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
  );
};

export default AuthIndex;
