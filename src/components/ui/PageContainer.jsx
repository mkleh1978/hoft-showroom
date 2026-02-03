// ============================================================================
// PageContainer Component
// Main page wrapper with consistent styling
// ============================================================================

import React from 'react';
import { colors, typography, spacing } from '../../styles/designTokens';

/**
 * PageContainer Component
 *
 * @param {React.ReactNode} children - Page content
 * @param {string} maxWidth - Max width of content area
 * @param {boolean} withFooter - Include footer spacing
 */
const PageContainer = ({
  children,
  maxWidth = '1100px',
  withFooter = true,
  style = {},
  className = '',
}) => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: colors.offWhite,
    fontFamily: typography.fontFamily,
    paddingBottom: withFooter ? '80px' : 0,
    ...style,
  };

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
};

/**
 * MainContent Component
 * Content area with max-width and padding
 */
export const MainContent = ({
  children,
  maxWidth = '1100px',
  padding = spacing.space6,
  style = {},
  className = '',
}) => {
  const contentStyle = {
    maxWidth,
    margin: '0 auto',
    padding,
    ...style,
  };

  return (
    <main style={contentStyle} className={className}>
      {children}
    </main>
  );
};

/**
 * StationFooter Component
 * Consistent footer for all stations
 */
export const StationFooter = ({
  stationNumber,
  stationName,
  tags = [],
  style = {},
  className = '',
}) => {
  const footerStyle = {
    backgroundColor: colors.deepNavy,
    padding: `${spacing.space8} ${spacing.space6}`,
    marginTop: spacing.space12,
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
    textAlign: 'left',
  };

  const brandStyle = {
    color: colors.teal,
    fontSize: '13px',
    fontWeight: typography.fontWeightBold,
    letterSpacing: '1.5px',
    marginBottom: spacing.space1,
  };

  const taglineStyle = {
    color: colors.steelGray,
    fontSize: typography.fontSizeSm,
  };

  const rightStyle = {
    textAlign: 'right',
  };

  const stationStyle = {
    color: colors.steelGray,
    fontSize: typography.fontSizeSm,
    marginBottom: spacing.space1,
  };

  const tagsStyle = {
    color: colors.steelGray,
    fontSize: '11px',
  };

  return (
    <footer style={footerStyle} className={className}>
      <div style={containerStyle}>
        <div style={leftStyle}>
          <div style={brandStyle}>
            HOUSE OF FINANCE & TECH BERLIN
          </div>
          <div style={taglineStyle}>
            Europe's Leading Financial Wellbeing Ecosystem
          </div>
        </div>
        <div style={rightStyle}>
          <div style={stationStyle}>
            Station {stationNumber}: {stationName}
          </div>
          {tags.length > 0 && (
            <div style={tagsStyle}>
              {tags.join(' · ')}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

/**
 * SectionHeader Component
 * Consistent section title styling
 */
export const SectionHeader = ({
  label,
  title,
  subtitle,
  centered = false,
  style = {},
  className = '',
}) => {
  const containerStyle = {
    marginBottom: spacing.space6,
    textAlign: centered ? 'center' : 'left',
    ...style,
  };

  const labelStyle = {
    fontSize: typography.fontSizeXs,
    fontWeight: typography.fontWeightBold,
    color: colors.teal,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: spacing.space2,
  };

  const titleStyle = {
    fontSize: typography.fontSizeXl,
    fontWeight: typography.fontWeightBold,
    color: colors.deepNavy,
    margin: `0 0 ${spacing.space2} 0`,
  };

  const subtitleStyle = {
    fontSize: typography.fontSizeBase,
    color: colors.steelGray,
    margin: 0,
    lineHeight: typography.lineHeightRelaxed,
  };

  return (
    <div style={containerStyle} className={className}>
      {label && <div style={labelStyle}>{label}</div>}
      {title && <h2 style={titleStyle}>{title}</h2>}
      {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
    </div>
  );
};

export default PageContainer;
