// ============================================================================
// Button Component
// Reusable button with multiple variants
// ============================================================================

import React from 'react';
import { colors, typography, radius, transitions } from '../../styles/designTokens';

const variants = {
  primary: {
    backgroundColor: colors.teal,
    color: colors.white,
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: colors.charcoal,
    border: `2px solid ${colors.border}`,
  },
  dark: {
    backgroundColor: colors.deepNavy,
    color: colors.white,
    border: 'none',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.teal,
    border: 'none',
  },
  danger: {
    backgroundColor: colors.red,
    color: colors.white,
    border: 'none',
  },
};

const sizes = {
  sm: {
    padding: '8px 16px',
    fontSize: typography.fontSizeSm,
  },
  md: {
    padding: '12px 20px',
    fontSize: typography.fontSizeBase,
  },
  lg: {
    padding: '14px 28px',
    fontSize: '15px',
  },
};

/**
 * Button Component
 *
 * @param {string} variant - 'primary' | 'secondary' | 'dark' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {boolean} disabled - Disabled state
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {object} style - Additional inline styles
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  style = {},
  type = 'button',
  className = '',
  ...props
}) => {
  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.md;

  const buttonStyle = {
    ...variantStyles,
    ...sizeStyles,
    borderRadius: radius.md,
    fontWeight: typography.fontWeightSemibold,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'inherit',
    transition: transitions.fast,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return (
    <button
      type={type}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
