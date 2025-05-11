export const lightTheme = {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#121212',
    primary: '#8A9A5B',
    secondary: '#C4C3D0',
    accent: '#E0B0FF',
    border: '#E0E0E0',
    inputBackground: '#F9F9F9',
    placeholder: '#A0A0A0',
  };
  
  export const darkTheme = {
    background: 'black',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    primary: '#8A9A5B',
    secondary: '#C4C3D0',
    accent: '#E0B0FF',
    border: '#2C2C2C',
    inputBackground: '#2A2A2A',
    placeholder: '#777777',
  };
  
  // Optional: Export a common object if you want to map both
  export const themes = {
    light: lightTheme,
    dark: darkTheme,
  };
  
  export type ThemeType = typeof lightTheme;
  