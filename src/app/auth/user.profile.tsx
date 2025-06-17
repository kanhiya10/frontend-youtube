import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { UserApi } from '../../features/slice/fetchUser.slice';
import { useNavigate } from 'react-router-dom';


const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { info } = useSelector((state: RootState) => state.User);

  const [password, setPassword] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');


 
  

  useEffect(() => {
    if (info && Object.keys(info).length > 0) {
      navigate('/');
    }
  }, [info, navigate]);

  const loginData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const option = { password, username, email };
      dispatch(UserApi({ url: `https://backend-youtube-zba1.onrender.com/api/v1/users/login`, option }));
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
<div className="w-full">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h2>
        <form onSubmit={loginData} className="space-y-5">
          <input
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="text-right">
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Login
          </button>
        </form>
       
      </div>

  );
};

export default UserProfile;
