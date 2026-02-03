// ============================================================================
// RadioOption Component
// Styled radio button option for single/multiple choice selections
// ============================================================================

import React from 'react';
import { colors, typography, radius, transitions } from '../../styles/designTokens';

/**
 * RadioOption Component
 *
 * @param {boolean} selected - Whether this option is selected
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Option content
 * @param {string} variant - 'default' | 'compact'
 * @param {boolean} disabled - Disabled state
 */
const RadioOption = ({
  selected = false,
  onClick,
  children,
  variant = 'default',
  disabled = false,
  style = {},
  className = '',
  ...props
}) => {
  const isCompact = variant === 'compact';

  const optionStyle = {
    padding: isCompact ? '10px 14px' : '14px 18px',
    backgroundColor: selected ? colors.teal : colors.offWhite,
    color: selected ? colors.white : colors.charcoal,
    border: `2px solid ${selected ? colors.teal : 'transparent'}`,
    borderRadius: radius.lg,
    fontSize: typography.fontSizeBase,
    fontWeight: typography.fontWeightMedium,
    textAlign: 'left',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'inherit',
    transition: transitions.fast,
    opacity: disabled ? 0.6 : 1,
    width: '100%',
    ...style,
  };

  return (
    <button
      style={optionStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={className}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * RadioGroup Component
 * Container for multiple RadioOptions
 */
export const RadioGroup = ({
  children,
  direction = 'column',
  gap = '12px',
  style = {},
  className = '',
}) => {
  const groupStyle = {
    display: 'flex',
    flexDirection: direction,
    gap,
    ...style,
  };

  return (
    <div style={groupStyle} className={className}>
      {children}
    </div>
  );
};

export default RadioOption;
