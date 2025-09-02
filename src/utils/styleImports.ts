import { useTheme } from "../context/themeContext";

export const useStyles = () => {
  const { theme } = useTheme();


return{
   cardStyle: {
    backgroundColor: theme.card,
    borderColor: theme.border,
  },
   leftPanelStyle:{
    backgroundColor: theme.block,
    color: theme.text,
  },
   mobileToggleStyle:{
    backgroundColor: theme.surface,
    borderColor: theme.divider,
  },
  toggleButtonStyle :{
    color: theme.primary,
  },

 headingStyle: {
    color: theme.text,
  },
 inputStyle: {
    backgroundColor: theme.inputBackground,
    borderColor: theme.inputBorder,
    color: theme.text,
    '--tw-ring-color': theme.inputFocus,
  },
   labelStyle:{
    color: theme.textSecondary,
  },
   fileInputStyle: {
    borderColor: theme.inputBorder,
  },
 fileButtonStyle :{
    backgroundColor: theme.info,
    color: theme.btn,
  },
 fileButtonHoverStyle :{
    backgroundColor: theme.info,
    opacity: 0.8,
  },
  buttonStyle:{
    backgroundColor: theme.primary,
    color: theme.btn,
    '--tw-ring-color': theme.accent,
    // opacity: isLoading ? 0.7 : 1,
  },

  forgotPasswordStyle:{
    color: theme.primary,
  },

 containerStyle: <React.CSSProperties> {
      backgroundColor: theme.background
    },
  
   videoCardStyle: <React.CSSProperties> {
      backgroundColor: theme.card,
      borderColor: theme.borderLight,
      boxShadow: `0 4px 6px -1px ${theme.shadow}, 0 2px 4px -1px ${theme.shadow}`
    },
  
   videoCardHoverStyle: <React.CSSProperties>  {
      boxShadow: `0 10px 15px -3px ${theme.shadowHover}, 0 4px 6px -2px ${theme.shadowHover}`
    },
  
    videoInfoStyle: <React.CSSProperties> {
      backgroundColor: theme.surface
    },
  
    videoTitleStyle: <React.CSSProperties> {
      color: theme.text
    },


   windowStyle : {
    backgroundColor: theme.surface,
    color: theme.text
  },

   headerStyle : {
    borderColor: theme.border,
    color: theme.text
  },

   messageListStyle :{
    backgroundColor: theme.block,
    borderColor: theme.border
  },

   inputStylev1 : {
    backgroundColor: theme.inputBackground,
    borderColor: theme.inputBorder,
    color: theme.text,
    "::placeholder": {
      color: theme.placeholder
    }
  },



   fileInputStylev1 : {
    backgroundColor: theme.inputBackground,
    borderColor: theme.inputBorder,
    color: theme.text
  },
    containerStylev1: {
    backgroundColor: theme.surface,
    borderColor: theme.border,
    color: theme.text
  },


   listItemSelectedStyle :{
    backgroundColor: theme.active,
    color: theme.primary,
    fontWeight: '600'
  },

   listItemDefaultStyle: {
    backgroundColor: 'transparent',
    color: theme.text
  },
   listItemHoverStyle : {
    backgroundColor: theme.hover
  },



   errorStyle : {
    color: theme.error || '#ef4444',
    backgroundColor: `${theme.error || '#ef4444'}10`,
    borderColor: theme.error || '#ef4444'
  },

   loadingStyle: {
    color: theme.textMuted
  },

   notFoundCardStyle : {
    backgroundColor: theme.card,
    color: theme.text,
  },
     containerStylev2 :{
    backgroundColor: theme.background,
    color: theme.text,
  },



   textSecondaryStyle: {
    color: theme.textSecondary
  },

   navBorderStyle :{
    borderColor: theme.border
  },

   navLinkActiveStyle : {
    color: theme.primary,
    borderBottomColor: theme.primary,
  },

   navLinkInactiveStyle : {
    color: theme.textSecondary,
    ":hover": {
      color: theme.text,
    },
  },

     logoVideoStyle: <React.CSSProperties> {
      color: theme.accent
    },
  
     logoTubeStyle: <React.CSSProperties> {
      color: theme.textSecondary
    },
  
     notificationBadgeStyle: <React.CSSProperties> {
      backgroundColor: theme.error,
      color: '#FFFFFF'
    },

   input: {
    backgroundColor: theme.inputBackground,
    borderColor: theme.inputBorder,
    color: theme.text,
    "&::placeholder": {
      color: theme.placeholder,
    },
    "&:focus": {
      outlineColor: theme.primary, // focus ring equivalent
    },
  },

  fileInput: {
    backgroundColor: theme.block,
    borderColor: theme.inputBorder,
  },

  fileButtonBase: {
    backgroundColor: theme.primary,
    color: theme.btn,
  },

  thumbnailButton: {
    backgroundColor: theme.textMuted,
    color: theme.btn,
  },

  fileSuccess: {
    color: theme.success,
  },

  submitButton: {
    backgroundColor: theme.primary,
    color: theme.btn,
    "&:hover": {
      backgroundColor: theme.secondary,
    },
  },

  helpBox: {
    backgroundColor: theme.info,
    borderColor: theme.accent,
    color: theme.text,
  },

  helpText: {
    color: theme.block,
  },


  select: {
    backgroundColor: theme.inputBackground,
    color: theme.text,
    borderColor: theme.inputBorder,
  },

  noVideosText: {
    color: theme.textMuted,
  },
  videoCard: {
    backgroundColor: theme.card,
    borderColor: theme.borderLight,
    boxShadow: theme.shadow,
    color: theme.text,
  },

  videoInfo: {
    backgroundColor: theme.surface,
  },
   inputStylev2: {
    backgroundColor: theme.inputBackground,
    borderColor: theme.inputBorder,
    color: theme.text,
  },

  button: {
    backgroundColor: theme.success,
    color: theme.text,
  },

  hover: {
    backgroundColor: theme.hover,
  },
   card: {
    backgroundColor: theme.card,
    color: theme.text,
    borderColor: theme.border,
  },

  cardContent: {
    backgroundColor: theme.card,
  },

  hoverShadow: {
    boxShadow: theme.shadowHover,
  },
  cardCss: {
    backgroundColor: theme.card,
    color: theme.text,
    borderColor: theme.border,
    boxShadow: theme.shadow,
  },


  buttonCss: {
    backgroundColor: theme.btn,
    color: theme.text,
  },


  replyButton: {
    color: theme.info,
  },
    repliesSection: {
    borderLeftColor: theme.border,
  },


  loadingSpinner: {
    borderBottomColor: theme.info,
  } as React.CSSProperties,


  buttonStyleCss: {
    backgroundColor: theme.info,
    color: theme.text,
  } as React.CSSProperties,

  errorText: {
    color: theme.error,
  } as React.CSSProperties,
 videoItemStyle: <React.CSSProperties> {
    backgroundColor: theme.surface,
    borderColor: theme.borderLight
  },
    skeletonStyle: {
    borderLeftColor: theme.disabled,
  },
  
}
}