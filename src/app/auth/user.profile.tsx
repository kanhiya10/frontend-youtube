import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { UserApi } from '../../features/slice/fetchUser.slice';
import { useNavigate } from 'react-router-dom';
import { initNotificationsAfterLogin } from '../../features/slice/notificationFcm.slice';
import { useTheme } from '../../context/themeContext';
import { useStyles } from '../../utils/styleImports';
// import { headingStyle, inputStyle, forgotPasswordStyle, buttonStyle } from '../../utils/styleImports';

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { headingStyle, inputStyle, forgotPasswordStyle, buttonStyle } = useStyles();

  const { info } = useSelector((state: RootState) => state.User);

  const [password, setPassword] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  // useEffect(() => {
  //   if (info && Object.keys(info).length > 0) {
  //     navigate('/');
  //   }
  // }, [info, navigate]);

  const loginData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const option = { password, username, email };
      const result = await dispatch(
        UserApi({ url: `http://localhost:8001/api/v1/users/login`, option })
      );
      if (UserApi.fulfilled.match(result)) {
        dispatch(initNotificationsAfterLogin());
      } else {
        console.warn("Login failed, skipping notification setup");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center" style={headingStyle}>
        Login to Your Account
      </h2>
      
      <form onSubmit={loginData} className="space-y-4 sm:space-y-5">
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
        />
        
        {/* <div className="text-right">
          <button
            type="button"
            className="text-xs sm:text-sm hover:underline focus:outline-none focus:underline transition-colors duration-200"
            style={forgotPasswordStyle}
          >
            Forgot password?
          </button>
        </div> */}
        
        <button
          type="submit"
          className="w-full py-2 sm:py-3 mt-4 sm:mt-6 font-semibold text-sm sm:text-base rounded-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 active:transform active:scale-98"
          style={buttonStyle}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default UserProfile;