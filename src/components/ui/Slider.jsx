// ============================================================================
// Slider Component
// Range slider with optional value display and labels
// ============================================================================

import React from 'react';
import { colors, typography, spacing, radius } from '../../styles/designTokens';

/**
 * Slider Component
 *
 * @param {number} value - Current value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @param {number} step - Step increment
 * @param {function} onChange - Change handler (receives number value)
 * @param {string} label - Label text
 * @param {function} formatValue - Function to format displayed value
 * @param {boolean} showMinMax - Show min/max labels below slider
 * @param {string} accentColor - Color for the slider accent
 */
const Slider = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  label,
  formatValue,
  showMinMax = true,
  showValue = true,
  accentColor = colors.teal,
  style = {},
  className = '',
  disabled = false,
}) => {
  const displayValue = formatValue ? formatValue(value) : value;
  const progress = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    const newValue = step < 1
      ? parseFloat(e.target.value)
      : parseInt(e.target.value, 10);
    onChange(newValue);
  };

  const containerStyle = {
    width: '100%',
    ...style,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: spacing.space3,
  };

  const labelStyle = {
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightSemibold,
    color: colors.charcoal,
  };

  const valueStyle = {
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightBold,
    color: accentColor,
  };

  const inputStyle = {
    width: '100%',
    height: '8px',
    borderRadius: radius.sm,
    appearance: 'none',
    background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${progress}%, ${colors.offWhite} ${progress}%, ${colors.offWhite} 100%)`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
  };

  const minMaxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing.space2,
    fontSize: typography.fontSizeXs,
    color: colors.steelGray,
  };

  return (
    <div style={containerStyle} className={className}>
      {(label || showValue) && (
        <div style={headerStyle}>
          {label && <span style={labelStyle}>{label}</span>}
          {showValue && <span style={valueStyle}>{displayValue}</span>}
        </div>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        style={inputStyle}
      />

      {showMinMax && (
        <div style={minMaxStyle}>
          <span>{formatValue ? formatValue(min) : min}</span>
          <span>{formatValue ? formatValue(max) : max}</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
