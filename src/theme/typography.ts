// typography.ts - Typography system for consistent UI

export const typography = {
  // Font Families
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", Consolas, monospace',
  },

  // Font Sizes (using rem for better scalability)
  fontSize: {
    // Text sizes
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px - body text
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    
    // Heading sizes
    '2xl': '1.5rem',   // 24px - h3
    '3xl': '1.875rem', // 30px - h2
    '4xl': '2.25rem',  // 36px - h1
    '5xl': '3rem',     // 48px - hero text
    '6xl': '3.75rem',  // 60px - large hero
  },

  // Font Weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter Spacing
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
  },

  // Typography Variants - Pre-defined combinations
  variants: {
    // Headings
    h1: {
      fontSize: '2.25rem',    // 36px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem',   // 30px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontSize: '1.5rem',     // 24px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: 'normal',
    },
    h4: {
      fontSize: '1.25rem',    // 20px
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h5: {
      fontSize: '1.125rem',   // 18px
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h6: {
      fontSize: '1rem',       // 16px
      fontWeight: 600,
      lineHeight: 1.25,
    },

    // Body text
    bodyLarge: {
      fontSize: '1.125rem',   // 18px
      fontWeight: 400,
      lineHeight: 1.75,
    },
    body: {
      fontSize: '1rem',       // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    bodySmall: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // UI elements
    button: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.25,
      letterSpacing: '0.025em',
    },
    buttonLarge: {
      fontSize: '1rem',       // 16px
      fontWeight: 500,
      lineHeight: 1.25,
      letterSpacing: '0.025em',
    },
    caption: {
      fontSize: '0.75rem',    // 12px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',    // 12px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.05em',
      textTransform: 'uppercase' as const,
    },

    // Form elements
    input: {
      fontSize: '1rem',       // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    label: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.25,
    },
    placeholder: {
      fontSize: '1rem',       // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },

    // Navigation
    navLink: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.25,
    },
    navLinkActive: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 600,
      lineHeight: 1.25,
    },

    // Video/Content specific
    videoTitle: {
      fontSize: '1.125rem',   // 18px
      fontWeight: 600,
      lineHeight: 1.25,
    },
    videoMeta: {
      fontSize: '0.75rem',    // 12px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    commentText: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    commentAuthor: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 600,
      lineHeight: 1.25,
    },

    // Logo/Brand
    logoLarge: {
      fontSize: '1.5rem',     // 24px
      fontWeight: 300,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    logoSmall: {
      fontSize: '1.25rem',    // 20px
      fontWeight: 300,
      lineHeight: 1.25,
    },
  },

  // Responsive breakpoints for typography
  responsive: {
    mobile: {
      h1: { fontSize: '1.875rem' }, // 30px
      h2: { fontSize: '1.5rem' },   // 24px
      h3: { fontSize: '1.25rem' },  // 20px
    },
    tablet: {
      h1: { fontSize: '2.25rem' },  // 36px
      h2: { fontSize: '1.875rem' }, // 30px
      h3: { fontSize: '1.5rem' },   // 24px
    },
    desktop: {
      h1: { fontSize: '2.25rem' },  // 36px
      h2: { fontSize: '1.875rem' }, // 30px
      h3: { fontSize: '1.5rem' },   // 24px
    },
  },
};

// Type definitions
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type TypographyVariant = keyof typeof typography.variants;

// // Utility function to get typography styles
// export const getTypographyStyle = (variant: TypographyVariant): React.CSSProperties => {
//   const style = typography.variants[variant];
//   return {
//     fontSize: style.fontSize,
//     fontWeight: style.fontWeight,
//     lineHeight: style.lineHeight,
//     letterSpacing: style.letterSpacing || 'normal',
//     textTransform: style.textTransform || 'none',
//   };
// };

// // Hook for using typography in components
// import { useMemo } from 'react';

// export const useTypography = () => {
//   const getStyle = useMemo(() => getTypographyStyle, []);
  
//   return {
//     typography,
//     getStyle,
//     // Helper functions
//     heading: (level: 1 | 2 | 3 | 4 | 5 | 6) => getStyle(`h${level}` as TypographyVariant),
//     body: (size: 'large' | 'normal' | 'small' = 'normal') => {
//       const variant = size === 'large' ? 'bodyLarge' : size === 'small' ? 'bodySmall' : 'body';
//       return getStyle(variant);
//     },
//     button: (size: 'normal' | 'large' = 'normal') => {
//       return getStyle(size === 'large' ? 'buttonLarge' : 'button');
//     },
//   };
// };

// // Example usage component
// export const TypographyExample: React.FC = () => {
//   const { getStyle } = useTypography();

//   return (
//     <div>
//       <h1 style={getStyle('h1')}>Main Heading</h1>
//       <h2 style={getStyle('h2')}>Sub Heading</h2>
//       <p style={getStyle('body')}>Body text content goes here.</p>
//       <button style={getStyle('button')}>Button Text</button>
//       <span style={getStyle('caption')}>Caption text</span>
//     </div>
//   );
// };

export default typography;