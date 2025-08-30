import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterProfile: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatarImg, setAvatarImg] = useState<File | null>(null);
  const [coverImg, setCoverImg] = useState<File | null>(null);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("password", password);
    if (avatarImg) formData.append("avatar", avatarImg);
    if (coverImg) formData.append("coverImage", coverImg);

    try {
      const registResp = await axios.post('https://backend-youtube-zba1.onrender.com/api/v1/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("registResp", registResp);
    } catch (error) {
      console.log("registration unsuccessful", error);
    }
  };

  const loginNav = () => {
    navigate("/user.profile");
  };

  return (
     <div className="w-full">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">
        Register Your Account
      </h2>

      <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={2}
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        />
        
        {/* File Upload Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="relative">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Avatar Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setAvatarImg(e.target.files[0]);
              }}
              className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="relative">
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setCoverImg(e.target.files[0]);
              }}
              className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 sm:py-3 mt-4 sm:mt-6 bg-black text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-300 active:transform active:scale-98"
        >
          Register
        </button>
      </form>
    </div>
  );

};

export default RegisterProfile;
