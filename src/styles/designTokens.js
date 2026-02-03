// ============================================================================
// HoFT DESIGN SYSTEM - Design Tokens
// Centralized design tokens for the entire application
// ============================================================================

// Color Palette
export const colors = {
  // Primary Colors
  deepNavy: '#0B1F3A',
  charcoal: '#1A1A2E',
  teal: '#0D9488',
  lightTeal: '#CCFBF1',

  // Neutral Colors
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  steelGray: '#6B7280',
  border: '#E5E7EB',

  // Status Colors
  green: '#059669',
  amber: '#D97706',
  red: '#DC2626',
};

// Transparency Variants
export const overlays = {
  teal12: 'rgba(13, 148, 136, 0.12)',
  teal15: 'rgba(13, 148, 136, 0.15)',
  teal20: 'rgba(13, 148, 136, 0.2)',
  teal30: 'rgba(13, 148, 136, 0.3)',
  teal40: 'rgba(13, 148, 136, 0.4)',
  white08: 'rgba(255, 255, 255, 0.08)',
  white10: 'rgba(255, 255, 255, 0.1)',
  white30: 'rgba(255, 255, 255, 0.3)',
  red20: 'rgba(220, 38, 38, 0.2)',
  amber20: 'rgba(217, 119, 6, 0.2)',
  green10: 'rgba(5, 150, 105, 0.1)',
  navyShadow06: 'rgba(11, 31, 58, 0.06)',
  navyShadow08: 'rgba(11, 31, 58, 0.08)',
};

// Typography
export const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',

  // Font Sizes
  fontSizeXs: '10px',
  fontSizeSm: '12px',
  fontSizeBase: '14px',
  fontSizeLg: '16px',
  fontSizeXl: '20px',
  fontSize2xl: '24px',
  fontSize3xl: '32px',
  fontSize4xl: '44px',

  // Font Weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,

  // Line Heights
  lineHeightTight: 1.25,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.6,
  lineHeightLoose: 1.7,
};

// Spacing (4px base unit)
export const spacing = {
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space7: '28px',
  space8: '32px',
  space10: '40px',
  space12: '48px',
};

// Border Radius
export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  '2xl': '12px',
  '3xl': '16px',
  full: '50%',
};

// Shadows
export const shadows = {
  sm: '0 2px 16px rgba(11, 31, 58, 0.06)',
  md: '0 4px 24px rgba(11, 31, 58, 0.08)',
  hover: '0 8px 40px rgba(0, 0, 0, 0.15)',
};

// Transitions
export const transitions = {
  fast: '0.2s ease',
  normal: '0.3s ease',
  slow: '0.5s ease',
};

// Layout
export const layout = {
  maxWidth: '1100px',
  maxWidthLg: '1200px',
  maxWidthXl: '1280px',
  maxWidth2xl: '1320px',
};

// Score Color Logic
export const getScoreColor = (score) => {
  if (score <= 40) return colors.red;
  if (score <= 60) return colors.amber;
  if (score <= 80) return colors.teal;
  return colors.green;
};

// Combined CSS Variables Object (for backward compatibility)
export const cssVars = {
  // Colors - Primary
  colorDeepNavy: colors.deepNavy,
  colorCharcoal: colors.charcoal,
  colorWhite: colors.white,
  colorOffWhite: colors.offWhite,
  // Colors - Accent
  colorTeal: colors.teal,
  colorLightTeal: colors.lightTeal,
  colorSteelGray: colors.steelGray,
  colorBorder: colors.border,
  // Colors - Status
  colorRed: colors.red,
  colorAmber: colors.amber,
  colorGreen: colors.green,
  // Transparency Variants
  tealOverlay12: overlays.teal12,
  tealOverlay15: overlays.teal15,
  tealOverlay20: overlays.teal20,
  tealOverlay30: overlays.teal30,
  tealOverlay40: overlays.teal40,
  whiteOverlay08: overlays.white08,
  whiteOverlay10: overlays.white10,
  whiteOverlay30: overlays.white30,
  redOverlay20: overlays.red20,
  amberOverlay20: overlays.amber20,
  greenOverlay10: overlays.green10,
  navyShadow06: overlays.navyShadow06,
  navyShadow08: overlays.navyShadow08,
  // Typography
  fontFamily: typography.fontFamily,
  fontSizeXs: typography.fontSizeXs,
  fontSizeSm: typography.fontSizeSm,
  fontSizeBase: typography.fontSizeBase,
  fontSizeLg: typography.fontSizeLg,
  fontSizeXl: typography.fontSizeXl,
  fontSize2xl: typography.fontSize2xl,
  fontSize3xl: typography.fontSize3xl,
  fontSize4xl: typography.fontSize4xl,
  // Spacing
  space1: spacing.space1,
  space2: spacing.space2,
  space3: spacing.space3,
  space4: spacing.space4,
  space5: spacing.space5,
  space6: spacing.space6,
  space7: spacing.space7,
  space8: spacing.space8,
  space10: spacing.space10,
  space12: spacing.space12,
  // Radius
  radiusSm: radius.sm,
  radiusMd: radius.md,
  radiusLg: radius.lg,
  radiusXl: radius.xl,
  radius2xl: radius['2xl'],
  radius3xl: radius['3xl'],
  radiusFull: radius.full,
  // Shadows
  shadowSm: shadows.sm,
  shadowMd: shadows.md,
  shadowHover: shadows.hover,
  // Transitions
  transitionFast: transitions.fast,
  transitionNormal: transitions.normal,
  transitionSlow: transitions.slow,
  // Layout
  maxWidth: layout.maxWidth,
  maxWidthLg: layout.maxWidthLg,
  maxWidthXl: layout.maxWidthXl,
  maxWidth2xl: layout.maxWidth2xl,
};

export default cssVars;
