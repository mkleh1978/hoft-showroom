// ============================================================================
// MagicTriangle Component
// The investment trade-off triangle: Return, Risk, Liquidity
// ============================================================================

import React from 'react';
import { colors, typography, spacing, radius } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

// Triangle factors
const TRIANGLE_FACTORS = [
  {
    id: 'return',
    label: 'Return',
    icon: 'trendingUp',
    color: colors.teal,
    desc: 'Higher expected returns require accepting higher risk or lower liquidity.',
    example: 'Stocks: 7-10% historical avg.',
  },
  {
    id: 'risk',
    label: 'Risk',
    icon: 'alertTriangle',
    color: colors.deepNavy,
    desc: 'The probability and magnitude of losses. Measured through volatility.',
    example: 'Stocks can lose 50%+ in crashes',
  },
  {
    id: 'liquidity',
    label: 'Liquidity',
    icon: 'droplet',
    color: colors.steelGray,
    desc: "How quickly assets convert to cash. Illiquid assets often pay premiums.",
    example: 'Real estate: weeks to sell',
  },
];

/**
 * MagicTriangle Component
 *
 * @param {function} onContinue - Called when user wants to proceed
 */
const MagicTriangle = ({ onContinue }) => {
  return (
    <div>
      <div style={{ marginBottom: spacing.space6 }}>
        <h2 style={{
          fontSize: typography.fontSizeXl,
          fontWeight: typography.fontWeightBold,
          color: colors.deepNavy,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          The Magic Triangle of Investing
        </h2>
        <p style={{
          fontSize: typography.fontSizeBase,
          color: colors.steelGray,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Every investment decision involves trade-offs between three fundamental factors.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: spacing.space6,
      }}>
        {/* Triangle SVG */}
        <Card>
          <svg width="100%" height="320" viewBox="0 0 400 320" style={{ display: 'block' }}>
            <defs>
              <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors.teal} stopOpacity="0.08" />
                <stop offset="100%" stopColor={colors.deepNavy} stopOpacity="0.08" />
              </linearGradient>
            </defs>

            <polygon
              points="200,30 40,280 360,280"
              fill="url(#triGrad)"
              stroke={colors.deepNavy}
              strokeWidth="3"
            />
            <polygon
              points="200,90 100,240 300,240"
              fill="none"
              stroke={colors.teal}
              strokeWidth="1.5"
              strokeDasharray="6,6"
              opacity="0.5"
            />

            {/* Return vertex */}
            <circle cx="200" cy="30" r="26" fill={colors.teal} />
            <text x="200" y="36" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="700">
              %
            </text>
            <text x="200" y="5" textAnchor="middle" fill={colors.teal} fontSize="11" fontWeight="700">
              RETURN
            </text>

            {/* Risk vertex */}
            <circle cx="40" cy="280" r="26" fill={colors.deepNavy} />
            <text x="40" y="286" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="700">
              !
            </text>
            <text x="40" y="318" textAnchor="middle" fill={colors.deepNavy} fontSize="11" fontWeight="700">
              RISK
            </text>

            {/* Liquidity vertex */}
            <circle cx="360" cy="280" r="26" fill={colors.steelGray} />
            <text x="360" y="286" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="700">
              $
            </text>
            <text x="360" y="318" textAnchor="middle" fill={colors.steelGray} fontSize="11" fontWeight="700">
              LIQUIDITY
            </text>

            {/* Center text */}
            <text x="200" y="165" textAnchor="middle" fill={colors.deepNavy} fontSize="14" fontWeight="600">
              Choose Two
            </text>
            <text x="200" y="185" textAnchor="middle" fill={colors.steelGray} fontSize="12">
              You cannot maximize
            </text>
            <text x="200" y="200" textAnchor="middle" fill={colors.steelGray} fontSize="12">
              all three
            </text>
          </svg>
        </Card>

        {/* Factor Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space4 }}>
          {TRIANGLE_FACTORS.map((factor) => (
            <Card
              key={factor.id}
              style={{
                borderLeft: `4px solid ${factor.color}`,
                padding: spacing.space5,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.space3,
                marginBottom: spacing.space2,
              }}>
                <Icon name={factor.icon} color={factor.color} size={18} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: typography.fontWeightBold,
                  color: factor.color,
                }}>
                  {factor.label}
                </span>
              </div>
              <p style={{
                fontSize: typography.fontSizeSm,
                color: colors.charcoal,
                lineHeight: 1.6,
                margin: `0 0 ${spacing.space2} 0`,
              }}>
                {factor.desc}
              </p>
              <div style={{
                fontSize: typography.fontSizeXs,
                color: colors.steelGray,
                fontStyle: 'italic',
              }}>
                {factor.example}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Golden Rule */}
      <div style={{
        ...highlightBoxStyle,
        marginTop: spacing.space6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.space5,
      }}>
        <div style={{
          width: '44px',
          height: '44px',
          backgroundColor: colors.teal,
          borderRadius: radius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="shield" color={colors.white} size={22} />
        </div>
        <div>
          <h4 style={{
            fontSize: typography.fontSizeLg,
            fontWeight: typography.fontWeightBold,
            color: colors.deepNavy,
            margin: `0 0 ${spacing.space2} 0`,
          }}>
            The Golden Rule
          </h4>
          <p style={{
            fontSize: typography.fontSizeBase,
            color: colors.charcoal,
            lineHeight: 1.6,
            margin: 0,
          }}>
            No investment maximizes all three factors.{' '}
            <strong>
              Anyone promising high returns with low risk and high liquidity is either misleading you or hiding costs.
            </strong>
          </p>
        </div>
      </div>

      {onContinue && (
        <div style={{ marginTop: spacing.space8, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onContinue}>
            Next: Risk Profiling
            <Icon name="arrowRight" color={colors.white} size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MagicTriangle;
export { TRIANGLE_FACTORS };
