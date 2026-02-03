// ============================================================================
// EuropeanComparison Component
// Pension replacement rates across European countries
// ============================================================================

import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

// European countries pension data
const COUNTRIES = [
  {
    code: 'DE',
    flag: '🇩🇪',
    name: 'Germany',
    rate: 48,
    system: '3-Pillar System',
    detail: 'Declining public pension with voluntary occupational and private pillars.',
    color: colors.teal,
  },
  {
    code: 'CH',
    flag: '🇨🇭',
    name: 'Switzerland',
    rate: 59,
    system: 'Mandatory 3 Pillars',
    detail: 'Strong mandatory occupational pension with individual accounts.',
    color: colors.green,
  },
  {
    code: 'NL',
    flag: '🇳🇱',
    name: 'Netherlands',
    rate: 70,
    system: 'Quasi-Mandatory',
    detail: 'Excellent occupational coverage through industry-wide pension funds.',
    color: '#6366F1',
  },
  {
    code: 'AT',
    flag: '🇦🇹',
    name: 'Austria',
    rate: 78,
    system: 'Pay-as-you-go',
    detail: 'High replacement from generous public pension system.',
    color: colors.deepNavy,
  },
  {
    code: 'SE',
    flag: '🇸🇪',
    name: 'Sweden',
    rate: 55,
    system: 'NDC + Premium',
    detail: 'Notional defined contribution with mandatory premium pension.',
    color: colors.amber,
  },
];

/**
 * EuropeanComparison Component
 *
 * @param {function} onContinue - Called when user wants to proceed
 */
const EuropeanComparison = ({ onContinue }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  // Animate bars on mount
  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div style={{
        fontSize: typography.fontSizeXs,
        fontWeight: typography.fontWeightBold,
        color: colors.teal,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: spacing.space2,
      }}>
        European Comparison
      </div>
      <h2 style={{
        fontSize: typography.fontSize2xl,
        fontWeight: typography.fontWeightBold,
        color: colors.deepNavy,
        margin: `0 0 ${spacing.space2} 0`,
      }}>
        Pension Replacement Rates
      </h2>
      <p style={{
        color: colors.steelGray,
        marginBottom: spacing.space8,
      }}>
        Pension as percentage of last net salary. Click a country for details.
      </p>

      <Card variant="accent" style={{ padding: spacing.space8 }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '320px',
          paddingTop: spacing.space6,
        }}>
          {COUNTRIES.map((country) => {
            const isSelected = selectedCountry?.code === country.code;
            return (
              <div
                key={country.code}
                onClick={() => setSelectedCountry(isSelected ? null : country)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  width: '120px',
                }}
              >
                <div style={{
                  width: '80px',
                  height: '240px',
                  background: colors.offWhite,
                  borderRadius: radius.lg,
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden',
                  border: isSelected ? `3px solid ${country.color}` : '3px solid transparent',
                  transition: transitions.fast,
                }}>
                  <div style={{
                    width: '100%',
                    height: barsAnimated ? `${country.rate}%` : '0%',
                    background: country.color,
                    borderRadius: `${radius.md} ${radius.md} 0 0`,
                    transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: spacing.space3,
                  }}>
                    <span style={{
                      color: colors.white,
                      fontSize: typography.fontSizeLg,
                      fontWeight: typography.fontWeightBold,
                    }}>
                      {country.rate}%
                    </span>
                  </div>
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: radius.full,
                  background: colors.offWhite,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize2xl,
                  marginTop: spacing.space4,
                }}>
                  {country.flag}
                </div>
                <span style={{
                  fontSize: typography.fontSizeBase,
                  fontWeight: typography.fontWeightSemibold,
                  color: colors.deepNavy,
                  marginTop: spacing.space2,
                }}>
                  {country.name}
                </span>
                <span style={{
                  fontSize: typography.fontSizeXs,
                  color: colors.steelGray,
                }}>
                  {country.system}
                </span>
              </div>
            );
          })}
        </div>

        {selectedCountry && (
          <div style={{
            marginTop: spacing.space6,
            paddingTop: spacing.space6,
            borderTop: `1px solid ${colors.border}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space4 }}>
              <span style={{ fontSize: typography.fontSize3xl }}>{selectedCountry.flag}</span>
              <div>
                <h4 style={{
                  fontSize: typography.fontSizeLg,
                  fontWeight: typography.fontWeightBold,
                  color: colors.deepNavy,
                  margin: 0,
                }}>
                  {selectedCountry.name} — {selectedCountry.rate}% Replacement Rate
                </h4>
                <p style={{
                  fontSize: typography.fontSizeBase,
                  color: colors.charcoal,
                  margin: `${spacing.space2} 0 0`,
                  lineHeight: 1.6,
                }}>
                  {selectedCountry.detail}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {onContinue && (
        <div style={{ textAlign: 'center', marginTop: spacing.space10 }}>
          <Button onClick={onContinue} size="lg">
            Continue to Key Insights
            <Icon name="arrowRight" color={colors.white} size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default EuropeanComparison;
export { COUNTRIES };
