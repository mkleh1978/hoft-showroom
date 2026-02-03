// ============================================================================
// HoFT DESIGN SYSTEM - Component Styles
// Reusable style objects for common UI patterns
// ============================================================================

import { colors, typography, spacing, radius, shadows, transitions } from './designTokens';

// ============================================================================
// CARD STYLES
// ============================================================================

// Standard Card
export const cardStyle = {
  backgroundColor: colors.white,
  borderRadius: radius['2xl'],
  padding: spacing.space6,
  boxShadow: shadows.sm,
};

// Card with Top Accent
export const cardAccentStyle = {
  backgroundColor: colors.white,
  borderRadius: radius['2xl'],
  padding: spacing.space6,
  borderTop: `4px solid ${colors.teal}`,
  boxShadow: shadows.sm,
};

// Dark Card
export const cardDarkStyle = {
  backgroundColor: colors.deepNavy,
  borderRadius: radius['2xl'],
  padding: spacing.space6,
};

// Highlight Box
export const highlightBoxStyle = {
  backgroundColor: colors.lightTeal,
  borderRadius: radius['2xl'],
  padding: spacing.space6,
  borderLeft: `6px solid ${colors.teal}`,
};

// ============================================================================
// BUTTON STYLES
// ============================================================================

// Primary Button
export const btnPrimaryStyle = {
  backgroundColor: colors.teal,
  color: colors.white,
  padding: '12px 20px',
  border: 'none',
  borderRadius: radius.md,
  fontSize: typography.fontSizeBase,
  fontWeight: typography.fontWeightSemibold,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: 'inherit',
  transition: transitions.fast,
};

// Secondary Button
export const btnSecondaryStyle = {
  backgroundColor: 'transparent',
  color: colors.charcoal,
  padding: '14px 28px',
  border: `2px solid ${colors.border}`,
  borderRadius: radius.lg,
  fontSize: typography.fontSizeBase,
  fontWeight: typography.fontWeightSemibold,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: 'inherit',
  transition: transitions.fast,
};

// Dark Button
export const btnDarkStyle = {
  backgroundColor: colors.deepNavy,
  color: colors.white,
  padding: '14px 28px',
  border: 'none',
  borderRadius: radius.lg,
  fontSize: typography.fontSizeBase,
  fontWeight: typography.fontWeightSemibold,
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'inherit',
  transition: transitions.fast,
};

// ============================================================================
// TEXT STYLES
// ============================================================================

// Section Label (uppercase)
export const sectionLabelStyle = {
  fontSize: typography.fontSizeXs,
  fontWeight: typography.fontWeightBold,
  color: colors.teal,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: spacing.space2,
};

// Card Heading
export const cardHeadingStyle = {
  fontSize: typography.fontSizeLg,
  fontWeight: typography.fontWeightBold,
  color: colors.deepNavy,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: spacing.space2,
};

// Body Text
export const bodyTextStyle = {
  fontSize: typography.fontSizeBase,
  fontWeight: typography.fontWeightRegular,
  color: colors.charcoal,
  lineHeight: typography.lineHeightRelaxed,
  margin: 0,
};

// Caption
export const captionStyle = {
  fontSize: '11px',
  color: colors.steelGray,
};

// Micro Text
export const microTextStyle = {
  fontSize: typography.fontSizeXs,
  fontWeight: typography.fontWeightSemibold,
  color: colors.steelGray,
};

// Page Title
export const pageTitleStyle = {
  fontSize: typography.fontSize3xl,
  fontWeight: typography.fontWeightLight,
  color: colors.deepNavy,
  margin: 0,
  letterSpacing: '-0.5px',
};

// Section Title
export const sectionTitleStyle = {
  fontSize: typography.fontSize2xl,
  fontWeight: typography.fontWeightBold,
  color: colors.deepNavy,
  margin: 0,
};

// ============================================================================
// TAG STYLES
// ============================================================================

export const tagStyle = {
  display: 'inline-block',
  backgroundColor: colors.lightTeal,
  color: colors.teal,
  padding: '4px 10px',
  borderRadius: radius.sm,
  fontSize: '11px',
  fontWeight: typography.fontWeightBold,
  textTransform: 'uppercase',
};

export const tagDarkStyle = {
  display: 'inline-block',
  backgroundColor: colors.deepNavy,
  color: colors.white,
  padding: '4px 10px',
  borderRadius: radius.sm,
  fontSize: '11px',
  fontWeight: typography.fontWeightBold,
  textTransform: 'uppercase',
};

// ============================================================================
// INPUT STYLES
// ============================================================================

export const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  fontSize: typography.fontSizeLg,
  fontWeight: typography.fontWeightSemibold,
  border: `2px solid ${colors.lightTeal}`,
  borderRadius: radius.md,
  outline: 'none',
  boxSizing: 'border-box',
  color: colors.deepNavy,
  fontFamily: 'inherit',
  transition: transitions.fast,
};

export const inputWithIconStyle = {
  ...inputStyle,
  paddingLeft: '32px',
};

// ============================================================================
// RADIO/OPTION STYLES
// ============================================================================

export const radioOptionStyle = (selected) => ({
  padding: '14px 18px',
  backgroundColor: selected ? colors.teal : colors.offWhite,
  color: selected ? colors.white : colors.charcoal,
  border: `2px solid ${selected ? colors.teal : 'transparent'}`,
  borderRadius: radius.lg,
  fontSize: typography.fontSizeBase,
  fontWeight: typography.fontWeightMedium,
  textAlign: 'left',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: 'inherit',
  transition: transitions.fast,
});

// ============================================================================
// PROGRESS STYLES
// ============================================================================

export const progressTrackStyle = {
  height: '8px',
  backgroundColor: colors.lightTeal,
  borderRadius: radius.sm,
  overflow: 'hidden',
};

export const progressBarStyle = (width, color = colors.teal) => ({
  height: '100%',
  width: `${width}%`,
  backgroundColor: color,
  borderRadius: radius.sm,
  transition: `width ${transitions.normal}`,
});

// ============================================================================
// TAB/NAV STYLES
// ============================================================================

export const tabStyle = (isActive) => ({
  padding: '14px 20px',
  border: 'none',
  borderBottom: `3px solid ${isActive ? colors.teal : 'transparent'}`,
  backgroundColor: 'transparent',
  color: isActive ? colors.teal : colors.charcoal,
  fontSize: '13px',
  fontWeight: typography.fontWeightSemibold,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: spacing.space2,
  fontFamily: 'inherit',
  transition: transitions.fast,
});

export const tabActiveBgStyle = (isActive) => ({
  padding: '16px 24px',
  border: 'none',
  background: isActive ? colors.deepNavy : 'transparent',
  color: isActive ? colors.white : colors.charcoal,
  fontSize: '13px',
  fontWeight: typography.fontWeightSemibold,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  borderBottom: isActive ? `3px solid ${colors.teal}` : '3px solid transparent',
  fontFamily: 'inherit',
  transition: transitions.fast,
});

// ============================================================================
// LAYOUT STYLES
// ============================================================================

export const pageContainerStyle = {
  minHeight: '100vh',
  backgroundColor: colors.offWhite,
  fontFamily: typography.fontFamily,
  paddingBottom: '80px',
};

export const mainContentStyle = (maxWidth = '1100px') => ({
  maxWidth,
  margin: '0 auto',
  padding: spacing.space6,
});

export const gridTwoColStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: spacing.space6,
};

export const gridThreeColStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: spacing.space5,
};

export const gridFourColStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: spacing.space5,
};

export const gridWithSidebarStyle = (sidebarWidth = '320px') => ({
  display: 'grid',
  gridTemplateColumns: `1fr ${sidebarWidth}`,
  gap: spacing.space6,
});

// ============================================================================
// ICON BOX STYLES
// ============================================================================

export const iconBoxStyle = (size = '56px', bgColor = colors.lightTeal) => ({
  width: size,
  height: size,
  backgroundColor: bgColor,
  borderRadius: radius.xl,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const iconBoxCircleStyle = (size = '56px', bgColor = colors.lightTeal) => ({
  ...iconBoxStyle(size, bgColor),
  borderRadius: radius.full,
});

// ============================================================================
// HERO STYLES
// ============================================================================

export const heroGradientStyle = {
  background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.deepNavy} 100%)`,
  borderRadius: radius['3xl'],
  padding: spacing.space12,
  textAlign: 'center',
};

export const heroIconStyle = {
  width: '100px',
  height: '100px',
  background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.deepNavy} 100%)`,
  borderRadius: radius.full,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `0 auto ${spacing.space6}`,
};

// ============================================================================
// ALLOCATION BAR STYLES
// ============================================================================

export const allocationBarContainerStyle = {
  display: 'flex',
  borderRadius: radius.lg,
  overflow: 'hidden',
  height: '48px',
};

export const allocationSegmentStyle = (width, color) => ({
  width: `${width}%`,
  backgroundColor: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.white,
  fontSize: '13px',
  fontWeight: typography.fontWeightBold,
  transition: transitions.normal,
});

export default {
  // Cards
  cardStyle,
  cardAccentStyle,
  cardDarkStyle,
  highlightBoxStyle,
  // Buttons
  btnPrimaryStyle,
  btnSecondaryStyle,
  btnDarkStyle,
  // Text
  sectionLabelStyle,
  cardHeadingStyle,
  bodyTextStyle,
  captionStyle,
  microTextStyle,
  pageTitleStyle,
  sectionTitleStyle,
  // Tags
  tagStyle,
  tagDarkStyle,
  // Inputs
  inputStyle,
  inputWithIconStyle,
  // Radio/Option
  radioOptionStyle,
  // Progress
  progressTrackStyle,
  progressBarStyle,
  // Tabs
  tabStyle,
  tabActiveBgStyle,
  // Layout
  pageContainerStyle,
  mainContentStyle,
  gridTwoColStyle,
  gridThreeColStyle,
  gridFourColStyle,
  gridWithSidebarStyle,
  // Icons
  iconBoxStyle,
  iconBoxCircleStyle,
  // Hero
  heroGradientStyle,
  heroIconStyle,
  // Allocation
  allocationBarContainerStyle,
  allocationSegmentStyle,
};
