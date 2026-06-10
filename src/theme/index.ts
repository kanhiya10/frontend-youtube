export const lightTheme = {
  // Core backgrounds
  background: '#FFFFFF',
  card: "#FFFFFF",
  surface: '#F5F5F5',
  block: "#FAF0E6",
  
  // Interactive elements
  btn: "#8A9A5B",
  primary: '#111110ff',
  secondary: '#000000',
  accent: '#E0B0FF',
  
  // Form elements
  inputBackground: '#F8FAFC',
  inputBorder: '#E0E0E0',
  inputFocus: '#3B82F6',
  
  // Text hierarchy
  text: '#121212',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  placeholder: '#A0A0A0',
  
  // UI elements
  border: '#E0E0E0',
  borderLight: '#F3F4F6',
  divider: '#E5E7EB',
  
  // Sidebar
  sideBarIconsActive: "bg-orange-700",
  sideBarIconsInActive: "bg-black/20",
  
  // Search
  search: '#FFFFFF',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Interactive states
  hover: '#F9FAFB',
  active: '#F3F4F6',
  disabled: '#F3F4F6',
  disabledText: '#D1D5DB',
  
  // Shadows (for programmatic use)
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowHover: 'rgba(0, 0, 0, 0.15)',
};

export const darkTheme = {
  // Core backgrounds
  background: 'black',
  card: "#1F1F23",
  surface: '#1E1E1E',
  block: '#2A2A2A',
  
  // Interactive elements
  btn: '#3E3A61',
  primary: '#3B82F6',
  secondary: '#9CA3AF',
  accent: '#8B5CF6',
  
  // Form elements
  inputBackground: '#374151',
  inputBorder: '#4B5563',
  inputFocus: '#3B82F6',
  
  // Text hierarchy
  text: '#EAEAEA',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  placeholder: '#777777',
  
  // UI elements
  border: '#2C2C2C',
  borderLight: '#374151',
  divider: '#4B5563',
  
  // Sidebar
  sideBarIconsActive: "bg-blue-700",
  sideBarIconsInActive: "bg-white/20",
  
  // Search
  search: '#3A3A3A',
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#60A5FA',
  
  // Interactive states
  hover: '#2D2D30',
  active: '#3A3A3E',
  disabled: '#1A1A1A',
  disabledText: '#4B5563',
  
  // Shadows (for programmatic use)
  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowHover: 'rgba(0, 0, 0, 0.4)',
};

// Export combined themes
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeType = typeof lightTheme;