export const lightTheme = {
    background: '#FFFFFF',
    sideBarIconsActive:"bg-orange-700",
    sideBarIconsInActive:"bg-black/20",
    card:"#FFFFFF",
    block:"#FAF0E6",
    surface: '#F5F5F5',
    btn:'722F37',
    text: '#121212',
    primary: '#8A9A5B',
    secondary: '#C4C3D0',
    accent: '#E0B0FF',
    border: '#E0E0E0',
    inputBackground: '#F9F9F9',
    placeholder: '#A0A0A0',
    search: '#FFFFFF',
  };
  
  export const darkTheme = {
    background: 'black',
    sideBarIconsActive:"bg-blue-700",
    sideBarIconsInActive:"bg-white/20",
     card:"	#2E2E2E",
    block:'#FAF0E6',
    surface: '#1E1E1E',
    btn:'#3E3A61',
    text: '#EAEAEA',
    primary: '#8A9A5B',
    secondary: '#C4C3D0',
    accent: '#E0B0FF',
    border: '#2C2C2C',
    inputBackground: '#2A2A2A',
    placeholder: '#777777',
    search: '#3A3A3A',
  };
  
  // Optional: Export a common object if you want to map both
  export const themes = {
    light: lightTheme,
    dark: darkTheme,
  };
  
  export type ThemeType = typeof lightTheme;
  