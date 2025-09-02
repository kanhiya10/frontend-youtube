import React from "react";
import { useTheme } from "../../context/themeContext";
import { useStyles } from "../../utils/styleImports";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) => {
  const { theme } = useTheme();
  const { headingStyle } = useStyles();

  // Define dynamic styles using the theme object
  const buttonStyle = {
    backgroundColor: theme.surface,
    color: theme.textSecondary,
    border: `1px solid ${theme.border}`,
  };

 
  const disabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded text-sm font-medium"
        style={currentPage === 1 ? { ...buttonStyle, ...disabledStyle } : buttonStyle}
      >
        Previous
      </button>
      <span className="text-sm font-medium" style={headingStyle}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded text-sm font-medium"
        style={currentPage === totalPages ? { ...buttonStyle, ...disabledStyle } : buttonStyle}
      >
        Next
      </button>
    </div>
  );
};