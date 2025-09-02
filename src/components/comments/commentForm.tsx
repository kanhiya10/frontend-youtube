import React from 'react';
import { useTheme } from '../../context/themeContext';
import { useStyles } from '../../utils/styleImports';

interface CommentFormProps {
  value: string;
  setValue: (val: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ value, setValue, onSubmit, placeholder }) => {
  const { theme } = useTheme();
  const { cardStyle, inputStyle } = useStyles();
  

  const buttonStyle: React.CSSProperties = {
    backgroundColor: theme.btn,
    color: theme.background === 'black' ? theme.text : '#FFFFFF'
  };



  return (
    <div 
      className="p-4 rounded-lg border"
      style={cardStyle}
    >
      <style>{`
        .comment-textarea::placeholder {
          color: ${theme.placeholder} !important;
        }
        .comment-button:hover {
          background-color: ${theme.hover} !important;
        }
      `}</style>
      
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder || "Write a comment..."}
        className="comment-textarea w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
        rows={3}
        style={inputStyle}
      />
      
      <button
        onClick={onSubmit}
        className="comment-button mt-3 px-6 py-2 rounded-lg font-medium transition-all duration-200"
        style={buttonStyle}
      >
        Submit
      </button>
    </div>
  );
};

export default CommentForm;