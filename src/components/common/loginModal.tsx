import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { useStyles } from "../../utils/styleImports";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const { theme } = useTheme();
  const { textSecondaryStyle } = useStyles();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: theme.background }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm   bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div 
        className="relative rounded-2xl shadow-lg w-[90%] max-w-md p-6 text-center z-10"
        style={{ 
          backgroundColor: theme.card,
          boxShadow: `0 25px 50px -12px ${theme.shadow}` ,
          border: `2px solid ${theme.border}`
        }}
      >
        <h2 
          className="text-xl font-semibold mb-4"
          style={{ color: theme.text }}
        >
          Login Required
        </h2>
        <p 
          className="mb-6"
          style={textSecondaryStyle}
        >
          You need to log in to access this page.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/auth/index"
            className="py-2 px-4 rounded-lg font-medium transition-all duration-200"
            style={{ 
              backgroundColor: theme.primary,
              color: theme.background
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Go to Login
          </Link>
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-lg font-medium transition-all duration-200"
            style={{ 
              backgroundColor: theme.surface,
              color: theme.textSecondary,
              border: `1px solid ${theme.border}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.hover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.surface;
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;