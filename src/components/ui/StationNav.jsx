// ============================================================================
// StationNav Component
// Tab navigation for stations with section progress
// ============================================================================

import React from 'react';
import { colors, typography, spacing, radius, transitions } from '../../styles/designTokens';
import Icon from '../icons';

/**
 * StationNav Component
 *
 * @param {Array} sections - Array of { id, label, icon } objects
 * @param {string} activeSection - Currently active section ID
 * @param {function} onSectionChange - Handler when section changes
 * @param {string} variant - 'default' | 'numbered' | 'activeBg'
 * @param {string} maxWidth - Max width of nav container
 */
const StationNav = ({
  sections = [],
  activeSection,
  onSectionChange,
  variant = 'numbered',
  maxWidth = '1200px',
  style = {},
  className = '',
}) => {
  const navStyle = {
    backgroundColor: colors.white,
    borderBottom: `1px solid ${colors.border}`,
    padding: `0 ${spacing.space6}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    ...style,
  };

  const containerStyle = {
    maxWidth,
    margin: '0 auto',
    display: 'flex',
    gap: variant === 'numbered' ? '2px' : '4px',
  };

  const getTabStyle = (isActive) => {
    if (variant === 'activeBg') {
      return {
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
      };
    }

    return {
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
    };
  };

  const getNumberStyle = (isActive) => ({
    width: '20px',
    height: '20px',
    borderRadius: radius.full,
    backgroundColor: isActive ? colors.teal : colors.offWhite,
    color: isActive ? colors.white : colors.steelGray,
    fontSize: typography.fontSizeXs,
    fontWeight: typography.fontWeightBold,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <nav style={navStyle} className={className}>
      <div style={containerStyle}>
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const iconColor = variant === 'activeBg'
            ? (isActive ? colors.white : colors.charcoal)
            : (isActive ? colors.teal : colors.steelGray);

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              style={getTabStyle(isActive)}
            >
              {variant === 'numbered' && (
                <span style={getNumberStyle(isActive)}>
                  {index + 1}
                </span>
              )}
              {section.icon && (
                <Icon
                  name={section.icon}
                  color={iconColor}
                  size={16}
                />
              )}
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default StationNav;
