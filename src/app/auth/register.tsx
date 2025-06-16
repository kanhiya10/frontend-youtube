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
      const registResp = await axios.post('${import.meta.env.VITE_API_URL}/api/v1/users/register', formData, {
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Your Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={fullName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) setAvatarImg(e.target.files[0]);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) setCoverImg(e.target.files[0]);
            }}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button> */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* <button
          onClick={loginNav}
          className="w-full py-3 mt-4 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Go to Login
        </button> */}
      </div>
  );
};

export default RegisterProfile;
