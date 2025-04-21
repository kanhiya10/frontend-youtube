import React, { useState } from 'react';
import UserProfile from './user.profile';
import RegisterProfile from './register';
import VideoTubeLogo from '../../assets/images/websiteLogo.png';
import { AnimatePresence, motion } from 'framer-motion';

const AuthIndex: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

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
