// ============================================================================
// ProgressBar Component
// Animated progress bar with optional label
// ============================================================================

import React from 'react';
import { colors, radius, transitions } from '../../styles/designTokens';
import { getScoreColor } from '../../styles/designTokens';

/**
 * ProgressBar Component
 *
 * @param {number} value - Current value (0-100)
 * @param {string} color - Override color (otherwise uses score-based color)
 * @param {string} height - Height of the bar (default: '8px')
 * @param {boolean} showLabel - Show percentage label
 * @param {string} label - Custom label text
 * @param {boolean} animated - Whether to animate the fill
 */
const ProgressBar = ({
  value = 0,
  color,
  height = '8px',
  showLabel = false,
  label,
  animated = true,
  style = {},
  trackColor = colors.lightTeal,
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  const fillColor = color || getScoreColor(clampedValue);

  const trackStyle = {
    height,
    backgroundColor: trackColor,
    borderRadius: radius.sm,
    overflow: 'hidden',
    ...style,
  };

  const fillStyle = {
    height: '100%',
    width: `${clampedValue}%`,
    backgroundColor: fillColor,
    borderRadius: radius.sm,
    transition: animated ? `width ${transitions.normal}` : 'none',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '13px',
        }}>
          <span style={{ color: colors.charcoal }}>{label || 'Progress'}</span>
          <span style={{ fontWeight: 700, color: fillColor }}>{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div style={trackStyle}>
        <div style={fillStyle} />
      </div>
    </div>
  );
};

export default ProgressBar;
