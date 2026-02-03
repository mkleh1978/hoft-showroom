// ============================================================================
// InputField Component
// Styled input field with optional label, prefix, and suffix
// ============================================================================

import React from 'react';
import { colors, typography, spacing, radius, transitions } from '../../styles/designTokens';

/**
 * InputField Component
 *
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {string} type - Input type (text, number, email, etc.)
 * @param {string} label - Label text
 * @param {string} placeholder - Placeholder text
 * @param {string} prefix - Prefix text (e.g., '€')
 * @param {string} suffix - Suffix text (e.g., '%')
 * @param {string} helperText - Helper text below input
 * @param {string} error - Error message
 * @param {boolean} disabled - Disabled state
 */
const InputField = ({
  value,
  onChange,
  type = 'text',
  label,
  placeholder,
  prefix,
  suffix,
  helperText,
  error,
  disabled = false,
  style = {},
  className = '',
  ...props
}) => {
  const handleChange = (e) => {
    const newValue = type === 'number'
      ? (e.target.value === '' ? '' : Number(e.target.value))
      : e.target.value;
    onChange(newValue);
  };

  const containerStyle = {
    width: '100%',
    ...style,
  };

  const labelStyle = {
    display: 'block',
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightSemibold,
    color: colors.charcoal,
    marginBottom: spacing.space2,
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    paddingLeft: prefix ? '32px' : '16px',
    paddingRight: suffix ? '48px' : '16px',
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightSemibold,
    border: `2px solid ${error ? colors.red : colors.lightTeal}`,
    borderRadius: radius.md,
    outline: 'none',
    boxSizing: 'border-box',
    color: colors.deepNavy,
    fontFamily: 'inherit',
    transition: transitions.fast,
    backgroundColor: disabled ? colors.offWhite : colors.white,
    opacity: disabled ? 0.7 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const prefixStyle = {
    position: 'absolute',
    left: '14px',
    color: colors.steelGray,
    fontSize: typography.fontSizeLg,
    fontWeight: typography.fontWeightMedium,
    pointerEvents: 'none',
  };

  const suffixStyle = {
    position: 'absolute',
    right: '14px',
    color: colors.steelGray,
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightMedium,
    pointerEvents: 'none',
  };

  const helperStyle = {
    fontSize: typography.fontSizeXs,
    color: error ? colors.red : colors.steelGray,
    marginTop: spacing.space2,
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <label style={labelStyle}>{label}</label>}

      <div style={inputWrapperStyle}>
        {prefix && <span style={prefixStyle}>{prefix}</span>}

        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />

        {suffix && <span style={suffixStyle}>{suffix}</span>}
      </div>

      {(helperText || error) && (
        <div style={helperStyle}>{error || helperText}</div>
      )}
    </div>
  );
};

export default InputField;
