// ============================================================================
// StationHeader Component
// Consistent header across all stations
// ============================================================================

import React from 'react';
import { colors, typography, spacing, radius } from '../../styles/designTokens';
import Icon from '../icons';

/**
 * StationHeader Component
 *
 * @param {number} stationNumber - Station number (1-4)
 * @param {string} title - Station title
 * @param {string} subtitle - Station subtitle/description
 * @param {string} iconName - Icon name to display
 * @param {React.ReactNode} rightContent - Optional content for right side
 */
const StationHeader = ({
  stationNumber,
  title,
  subtitle,
  iconName = 'wallet',
  rightContent,
  style = {},
  className = '',
}) => {
  const headerStyle = {
    backgroundColor: colors.deepNavy,
    padding: `${spacing.space4} ${spacing.space6}`,
    borderBottom: `4px solid ${colors.teal}`,
    ...style,
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space5,
  };

  const iconBoxStyle = {
    width: '48px',
    height: '48px',
    backgroundColor: colors.teal,
    borderRadius: radius.lg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const stationLabelStyle = {
    fontSize: typography.fontSizeXs,
    fontWeight: typography.fontWeightBold,
    color: colors.teal,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '2px',
  };

  const titleStyle = {
    fontSize: typography.fontSize2xl,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    margin: 0,
  };

  const rightStyle = {
    textAlign: 'right',
  };

  const subtitleStyle = {
    fontSize: '11px',
    color: colors.steelGray,
    marginBottom: spacing.space1,
  };

  const brandStyle = {
    fontSize: typography.fontSizeSm,
    fontWeight: typography.fontWeightBold,
    color: colors.teal,
    letterSpacing: '1.5px',
  };

  return (
    <header style={headerStyle} className={className}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <div style={iconBoxStyle}>
            <Icon name={iconName} color={colors.white} size={24} />
          </div>
          <div>
            <div style={stationLabelStyle}>
              Station {stationNumber}
            </div>
            <h1 style={titleStyle}>
              {title}
            </h1>
          </div>
        </div>

        <div style={rightStyle}>
          {rightContent || (
            <>
              {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
              <div style={brandStyle}>
                HOUSE OF FINANCE & TECH
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default StationHeader;
