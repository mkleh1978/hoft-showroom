// ============================================================================
// FourPillars Component
// Overview of the four financial stability pillars
// ============================================================================

import React from 'react';
import { colors, typography, spacing, radius } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

// Pillar data
const PILLARS = [
  {
    id: 'overview',
    icon: 'barChart',
    title: 'Financial Overview',
    desc: 'Record all accounts, contracts, liabilities; monthly tracking',
    stat: '27%',
    statLabel: 'lack overview',
    section: 'budget',
  },
  {
    id: 'budget',
    icon: 'wallet',
    title: 'Budget & Cash Flow',
    desc: 'Income-expense management; budgeting methods; spending categories',
    stat: '3x',
    statLabel: 'more savings',
    section: 'budget',
  },
  {
    id: 'emergency',
    icon: 'shield',
    title: 'Emergency Fund',
    desc: '3-6 months expenses; liquid reserves; shock protection',
    stat: '3-12',
    statLabel: 'months target',
    section: 'emergency',
  },
  {
    id: 'debt',
    icon: 'target',
    title: 'Debt Freedom',
    desc: 'Eliminate consumer debt; repayment strategies; refinancing',
    stat: '12%',
    statLabel: 'overdraft cost',
    section: 'debt',
  },
];

/**
 * FourPillars Component
 *
 * @param {function} onNavigate - Called with section ID when user clicks Explore
 */
const FourPillars = ({ onNavigate }) => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: spacing.space8 }}>
        <div style={{
          fontSize: typography.fontSizeXs,
          fontWeight: typography.fontWeightBold,
          color: colors.teal,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: spacing.space2,
        }}>
          The Foundation
        </div>
        <h2 style={{
          fontSize: typography.fontSize2xl,
          color: colors.deepNavy,
          fontWeight: typography.fontWeightBold,
          margin: 0,
        }}>
          Four Pillars of Financial Stability
        </h2>
        <p style={{
          fontSize: typography.fontSizeBase,
          color: colors.steelGray,
          marginTop: spacing.space3,
        }}>
          Before wealth building or retirement planning, the financial foundation must be in place.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: spacing.space5,
        marginBottom: spacing.space8,
      }}>
        {PILLARS.map((pillar) => (
          <Card key={pillar.id} variant="accent">
            <div style={{ display: 'flex', gap: spacing.space4 }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: colors.lightTeal,
                borderRadius: radius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name={pillar.icon} color={colors.teal} size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: typography.fontWeightBold,
                  fontSize: typography.fontSizeLg,
                  color: colors.deepNavy,
                  marginBottom: spacing.space2,
                }}>
                  {pillar.title}
                </div>
                <div style={{
                  fontSize: typography.fontSizeBase,
                  color: colors.steelGray,
                  lineHeight: 1.5,
                  marginBottom: spacing.space4,
                }}>
                  {pillar.desc}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <span style={{
                      fontSize: typography.fontSizeXl,
                      fontWeight: typography.fontWeightBold,
                      color: colors.teal,
                    }}>
                      {pillar.stat}
                    </span>
                    <span style={{
                      fontSize: typography.fontSizeSm,
                      color: colors.steelGray,
                      marginLeft: spacing.space2,
                    }}>
                      {pillar.statLabel}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onNavigate && onNavigate(pillar.section)}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={highlightBoxStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.space4 }}>
          <Icon name="lightbulb" color={colors.teal} size={24} />
          <div>
            <div style={{
              fontWeight: typography.fontWeightBold,
              fontSize: typography.fontSizeLg,
              color: colors.deepNavy,
              marginBottom: spacing.space2,
            }}>
              Core Message
            </div>
            <div style={{
              fontSize: typography.fontSizeBase,
              color: colors.charcoal,
              lineHeight: 1.6,
            }}>
              Budget, emergency fund, debt freedom — these are the three pillars of financial freedom.
              Before anyone thinks about wealth building or retirement planning,{' '}
              <strong>the financial foundation must be in place.</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourPillars;
export { PILLARS };
