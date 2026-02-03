// ============================================================================
// Card Component
// Reusable card with multiple variants
// ============================================================================

import React from 'react';
import { colors, spacing, radius, shadows } from '../../styles/designTokens';

const variants = {
  default: {
    backgroundColor: colors.white,
    boxShadow: shadows.sm,
  },
  accent: {
    backgroundColor: colors.white,
    boxShadow: shadows.sm,
    borderTop: `4px solid ${colors.teal}`,
  },
  dark: {
    backgroundColor: colors.deepNavy,
    boxShadow: 'none',
  },
  highlight: {
    backgroundColor: colors.lightTeal,
    boxShadow: 'none',
    borderLeft: `6px solid ${colors.teal}`,
  },
  outline: {
    backgroundColor: colors.white,
    border: `1px solid ${colors.border}`,
    boxShadow: 'none',
  },
};

/**
 * Card Component
 *
 * @param {string} variant - 'default' | 'accent' | 'dark' | 'highlight' | 'outline'
 * @param {string} padding - Override padding (e.g., '32px', 'none')
 * @param {React.ReactNode} children - Card content
 * @param {object} style - Additional inline styles
 * @param {function} onClick - Click handler (makes card clickable)
 */
const Card = ({
  variant = 'default',
  padding = spacing.space6,
  children,
  style = {},
  onClick,
  className = '',
  ...props
}) => {
  const variantStyles = variants[variant] || variants.default;

  const cardStyle = {
    ...variantStyles,
    borderRadius: radius['2xl'],
    padding: padding === 'none' ? 0 : padding,
    cursor: onClick ? 'pointer' : 'default',
    transition: onClick ? 'box-shadow 0.2s ease, transform 0.2s ease' : undefined,
    ...style,
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

// Convenience components
export const CardAccent = (props) => <Card variant="accent" {...props} />;
export const CardDark = (props) => <Card variant="dark" {...props} />;
export const CardHighlight = (props) => <Card variant="highlight" {...props} />;

export default Card;
