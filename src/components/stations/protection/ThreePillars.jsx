// ============================================================================
// ThreePillars Component
// German pension system three-pillar model overview
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

// Three pillars data
const PILLARS = [
  {
    num: 1,
    title: 'Public Pension',
    desc: 'Pay-as-you-go financed state pension. Declining from 48% to 43% by 2040.',
    value: '48%',
    label: 'replacement rate',
    detail: 'The German public pension (Gesetzliche Rentenversicherung) is funded by current workers paying for retirees. Demographic shifts make this increasingly challenging.',
  },
  {
    num: 2,
    title: 'Occupational Pension',
    desc: 'Employer (co-)financed pension schemes. Coverage varies by industry.',
    value: '~50%',
    label: 'penetration',
    detail: 'Betriebliche Altersvorsorge (bAV) offers tax advantages and often employer matching. Highly recommended but not universally available.',
  },
  {
    num: 3,
    title: 'Private Provision',
    desc: 'Riester, Rürup, life insurance, ETF savings plans.',
    value: '€800-1,200',
    label: 'monthly gap',
    detail: 'Personal responsibility is crucial. ETF savings plans often outperform traditional insurance due to lower costs.',
  },
];

/**
 * ThreePillars Component
 *
 * @param {function} onContinue - Called when user clicks continue
 */
const ThreePillars = ({ onContinue }) => {
  const [activePillar, setActivePillar] = useState(null);

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
        Foundation Knowledge
      </div>
      <h2 style={{
        fontSize: typography.fontSize2xl,
        fontWeight: typography.fontWeightBold,
        color: colors.deepNavy,
        margin: `0 0 ${spacing.space8} 0`,
      }}>
        The Three-Pillar Model
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space4 }}>
        {PILLARS.map((pillar, i) => {
          const isActive = activePillar === i;
          return (
            <div
              key={i}
              onClick={() => setActivePillar(isActive ? null : i)}
              style={{
                background: colors.white,
                borderRadius: radius['2xl'],
                padding: spacing.space6,
                boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                cursor: 'pointer',
                border: isActive ? `2px solid ${colors.teal}` : '2px solid transparent',
                transition: transitions.fast,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space5 }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: colors.teal,
                  borderRadius: radius.full,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: typography.fontSize2xl,
                  fontWeight: typography.fontWeightBold,
                  color: colors.white,
                  flexShrink: 0,
                }}>
                  {pillar.num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: typography.fontSizeLg,
                    fontWeight: typography.fontWeightBold,
                    color: colors.deepNavy,
                    margin: 0,
                  }}>
                    {pillar.title}
                  </h3>
                  <p style={{
                    fontSize: typography.fontSizeBase,
                    color: colors.steelGray,
                    margin: `${spacing.space2} 0 0`,
                  }}>
                    {pillar.desc}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: typography.fontSize2xl,
                    fontWeight: typography.fontWeightBold,
                    color: colors.teal,
                  }}>
                    {pillar.value}
                  </div>
                  <div style={{
                    fontSize: typography.fontSizeSm,
                    color: colors.steelGray,
                  }}>
                    {pillar.label}
                  </div>
                </div>
              </div>

              {isActive && (
                <div style={{
                  marginTop: spacing.space5,
                  paddingTop: spacing.space5,
                  borderTop: `1px solid ${colors.border}`,
                }}>
                  <p style={{
                    fontSize: typography.fontSizeBase,
                    color: colors.charcoal,
                    margin: 0,
                    lineHeight: 1.7,
                  }}>
                    {pillar.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {onContinue && (
        <div style={{ textAlign: 'center', marginTop: spacing.space10 }}>
          <Button onClick={onContinue} size="lg">
            Continue to AI Planner
            <Icon name="arrowRight" color={colors.white} size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ThreePillars;
export { PILLARS };
