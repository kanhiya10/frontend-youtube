import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/themeContext';
import { registerUser } from '../../services/users'; // Import the API service
import { useStyles } from '../../utils/styleImports';
// import { headingStyle, inputStyle, labelStyle, fileInputStyle, fileButtonStyle, fileButtonHoverStyle, buttonStyle } from '../../utils/styleImports';

const RegisterProfile: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { headingStyle, inputStyle, labelStyle, fileInputStyle, fileButtonStyle, fileButtonHoverStyle, buttonStyle } = useStyles();

  const [fullName, setFullName] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatarImg, setAvatarImg] = useState<File | null>(null);
  const [coverImg, setCoverImg] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("description", description);
    formData.append("email", email);
    formData.append("password", password);
    if (avatarImg) formData.append("avatar", avatarImg);
    if (coverImg) formData.append("coverImage", coverImg);

    try {
      const response = await registerUser(formData);
      // Navigate to success page or login page
      navigate("/");
    } catch (error) {
      console.error("Registration unsuccessful:", error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  // Define dynamic styles using the theme object


  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6" style={headingStyle}>
        Register Your Account
      </h2>

      <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={2}
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
          style={inputStyle}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
          style={inputStyle}
          required
        />
        
        {/* File Upload Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="relative">
            <label className="block text-xs sm:text-sm font-medium mb-1" style={labelStyle}>
              Avatar Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setAvatarImg(e.target.files[0]);
              }}
              className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{
                ...fileInputStyle,
                '::file-selector-button': fileButtonStyle,
                ':hover::file-selector-button': fileButtonHoverStyle
              } as React.CSSProperties}
            />
          </div>
          <div className="relative">
            <label className="block text-xs sm:text-sm font-medium mb-1" style={labelStyle}>
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) setCoverImg(e.target.files[0]);
              }}
              className="w-full px-2 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{
                ...fileInputStyle,
                '::file-selector-button': fileButtonStyle,
                ':hover::file-selector-button': fileButtonHoverStyle
              } as React.CSSProperties}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 sm:py-3 mt-4 sm:mt-6 font-semibold text-sm sm:text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 active:transform active:scale-98 disabled:cursor-not-allowed"
          style={{
    ...buttonStyle,
    ...(isLoading ? { opacity: 0.6 } : {})
  }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterProfile;