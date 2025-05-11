// theme/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { themes, ThemeType } from '../theme/index';

type ThemeContextType = {
  theme: ThemeType;
  mode: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  const value = {
    theme: themes[mode],
    mode,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
