// ============================================================================
// LifePlanningCalculator Component
// Wealth projection by life phase with compound interest calculator
// ============================================================================

import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, radius } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Card from '../../ui/Card';
import Slider from '../../ui/Slider';

// Life phases
const LIFE_PHASES = [
  { age: '25–34', title: 'Young Professional', equity: '80–90%', focus: 'Growth' },
  { age: '35–44', title: 'Peak Earning', equity: '60–75%', focus: 'Diversify' },
  { age: '45–60', title: 'Consolidation', equity: '45–60%', focus: 'Optimize' },
  { age: '60+', title: 'Retirement', equity: '25–40%', focus: 'Preserve' },
];

// Calculate compound growth projection
const calculateProjection = (monthly, years, rate) => {
  let total = 0;
  for (let i = 0; i < years * 12; i++) {
    total = (total + monthly) * (1 + rate / 100 / 12);
  }
  return Math.round(total);
};

/**
 * LifePlanningCalculator Component
 *
 * @param {number} initialAge - Starting age
 * @param {number} initialSavingsRate - Monthly savings amount
 * @param {number} initialExpectedReturn - Expected annual return percentage
 * @param {function} onValuesChange - Called when values change
 * @param {number} prefillAge - Age from Station 3 (optional)
 * @param {number} prefillPensionGap - Pension gap from Station 3 (optional)
 * @param {Array} prefillGoals - Goals from Station 1 (optional)
 */
const LifePlanningCalculator = ({
  initialAge = 30,
  initialSavingsRate = 500,
  initialExpectedReturn = 6,
  onValuesChange,
  prefillAge,
  prefillPensionGap,
  prefillGoals = [],
}) => {
  // Use prefilled values from other stations if available
  const [age, setAge] = useState(prefillAge || initialAge);
  const [savingsRate, setSavingsRate] = useState(
    prefillPensionGap ? Math.max(100, Math.min(2000, Math.round(prefillPensionGap))) : initialSavingsRate
  );
  const [expectedReturn, setExpectedReturn] = useState(initialExpectedReturn);
  const hasStationData = prefillAge || prefillPensionGap || prefillGoals.length > 0;

  // Sync with prefill props when they change
  useEffect(() => {
    if (prefillAge !== undefined && prefillAge !== null) setAge(prefillAge);
  }, [prefillAge]);

  useEffect(() => {
    if (prefillPensionGap !== undefined && prefillPensionGap !== null) {
      setSavingsRate(Math.max(100, Math.min(2000, Math.round(prefillPensionGap))));
    }
  }, [prefillPensionGap]);

  const yearsToRetirement = 65 - age;
  const wealthAtRetirement = calculateProjection(savingsRate, yearsToRetirement, expectedReturn);
  const totalContributions = savingsRate * 12 * yearsToRetirement;
  const compoundGrowth = wealthAtRetirement - totalContributions;

  const handleChange = (key, value) => {
    if (key === 'age') setAge(value);
    if (key === 'savingsRate') setSavingsRate(value);
    if (key === 'expectedReturn') setExpectedReturn(value);

    if (onValuesChange) {
      onValuesChange({
        age: key === 'age' ? value : age,
        savingsRate: key === 'savingsRate' ? value : savingsRate,
        expectedReturn: key === 'expectedReturn' ? value : expectedReturn,
      });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: spacing.space6 }}>
        <h2 style={{
          fontSize: typography.fontSizeXl,
          fontWeight: typography.fontWeightBold,
          color: colors.deepNavy,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          Wealth Planning by Life Phase
        </h2>
        <p style={{
          fontSize: typography.fontSizeBase,
          color: colors.steelGray,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Your investment strategy should evolve with your life.
        </p>
      </div>

      {/* Cross-Station Data Banner */}
      {hasStationData && (
        <Card variant="highlight" style={{ marginBottom: spacing.space6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space3 }}>
            <Icon name="checkCircle" color={colors.teal} size={24} />
            <div>
              <div style={{
                fontSize: typography.fontSizeSm,
                fontWeight: typography.fontWeightSemibold,
                color: colors.deepNavy,
              }}>
                Pre-filled with Your Data
              </div>
              <div style={{
                fontSize: typography.fontSizeXs,
                color: colors.steelGray,
              }}>
                {prefillAge && `Age: ${prefillAge} (from Protection Station) `}
                {prefillPensionGap && `• Monthly gap: €${prefillPensionGap.toLocaleString()} `}
                {prefillGoals.length > 0 && `• ${prefillGoals.length} goal(s) set`}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Timeline */}
      <Card style={{ marginBottom: spacing.space6 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '70px',
            right: '70px',
            height: '4px',
            background: `linear-gradient(90deg, ${colors.teal} 0%, ${colors.deepNavy} 100%)`,
            borderRadius: '2px',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: spacing.space4,
          }}>
            {LIFE_PHASES.map((phase, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: colors.teal,
                  borderRadius: radius.full,
                  border: `4px solid ${colors.white}`,
                  boxShadow: '0 2px 16px rgba(11, 31, 58, 0.06)',
                  margin: `0 auto ${spacing.space5}`,
                }} />

                <div style={{
                  backgroundColor: colors.offWhite,
                  padding: spacing.space5,
                  borderRadius: radius.xl,
                }}>
                  <div style={{
                    fontSize: typography.fontSizeXs,
                    fontWeight: typography.fontWeightBold,
                    color: colors.teal,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: spacing.space1,
                  }}>
                    {phase.age}
                  </div>
                  <h4 style={{
                    fontSize: typography.fontSizeBase,
                    color: colors.deepNavy,
                    margin: `0 0 ${spacing.space3}`,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    {phase.title}
                  </h4>
                  <div style={{
                    backgroundColor: colors.white,
                    padding: spacing.space3,
                    borderRadius: radius.md,
                    marginBottom: spacing.space3,
                  }}>
                    <div style={{
                      fontSize: typography.fontSizeXs,
                      fontWeight: typography.fontWeightSemibold,
                      color: colors.steelGray,
                    }}>
                      Equity
                    </div>
                    <div style={{
                      fontSize: typography.fontSizeLg,
                      color: colors.deepNavy,
                      fontWeight: typography.fontWeightBold,
                    }}>
                      {phase.equity}
                    </div>
                  </div>
                  <span style={{
                    display: 'inline-block',
                    backgroundColor: colors.lightTeal,
                    color: colors.teal,
                    padding: `${spacing.space1} ${spacing.space3}`,
                    borderRadius: radius.sm,
                    fontSize: typography.fontSizeXs,
                    fontWeight: typography.fontWeightBold,
                    textTransform: 'uppercase',
                  }}>
                    {phase.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Calculator */}
      <Card variant="accent" style={{
        borderTop: `4px solid ${colors.deepNavy}`,
        overflow: 'hidden',
        padding: 0,
      }}>
        <div style={{
          backgroundColor: colors.deepNavy,
          padding: `${spacing.space5} ${spacing.space6}`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.space4,
        }}>
          <Icon name="piggyBank" color={colors.teal} size={24} />
          <div>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              color: colors.white,
              margin: 0,
              fontWeight: typography.fontWeightBold,
            }}>
              Wealth Projection Calculator
            </h3>
            <p style={{
              fontSize: typography.fontSizeSm,
              color: colors.steelGray,
              margin: `${spacing.space1} 0 0`,
            }}>
              See how your savings compound over time
            </p>
          </div>
        </div>

        <div style={{ padding: spacing.space6 }}>
          {/* Sliders */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: spacing.space6,
            marginBottom: spacing.space6,
          }}>
            <div>
              <Slider
                value={age}
                min={20}
                max={55}
                onChange={(val) => handleChange('age', val)}
                label="Starting Age"
                formatValue={(v) => `${v} years`}
                showMinMax
              />
            </div>
            <div>
              <Slider
                value={savingsRate}
                min={100}
                max={2000}
                step={50}
                onChange={(val) => handleChange('savingsRate', val)}
                label="Monthly Investment"
                formatValue={(v) => `€${v}`}
                showMinMax
              />
            </div>
            <div>
              <Slider
                value={expectedReturn}
                min={3}
                max={10}
                step={0.5}
                onChange={(val) => handleChange('expectedReturn', val)}
                label="Expected Return"
                formatValue={(v) => `${v}% p.a.`}
                showMinMax
              />
            </div>
          </div>

          {/* Results */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing.space6,
          }}>
            <div style={highlightBoxStyle}>
              <div style={{
                fontSize: typography.fontSizeXs,
                fontWeight: typography.fontWeightBold,
                color: colors.teal,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: spacing.space2,
              }}>
                Wealth at Age 65
              </div>
              <div style={{
                fontSize: typography.fontSize3xl,
                color: colors.deepNavy,
                fontWeight: typography.fontWeightBold,
              }}>
                €{wealthAtRetirement.toLocaleString('de-DE')}
              </div>
              <div style={{
                fontSize: typography.fontSizeXs,
                color: colors.steelGray,
                marginTop: spacing.space2,
              }}>
                {yearsToRetirement} years of investing
              </div>
            </div>

            <div style={{
              backgroundColor: colors.offWhite,
              padding: spacing.space6,
              borderRadius: radius['2xl'],
              borderLeft: `6px solid ${colors.steelGray}`,
            }}>
              <div style={{
                fontSize: typography.fontSizeXs,
                fontWeight: typography.fontWeightBold,
                color: colors.steelGray,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: spacing.space2,
              }}>
                Your Contributions
              </div>
              <div style={{
                fontSize: typography.fontSize3xl,
                color: colors.deepNavy,
                fontWeight: typography.fontWeightBold,
              }}>
                €{totalContributions.toLocaleString('de-DE')}
              </div>
              <div style={{
                fontSize: typography.fontSizeBase,
                color: colors.green,
                marginTop: spacing.space2,
                fontWeight: typography.fontWeightSemibold,
              }}>
                + €{compoundGrowth.toLocaleString('de-DE')} compound growth
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Insight */}
      <Card variant="dark" style={{
        marginTop: spacing.space6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing.space6,
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          backgroundColor: colors.teal,
          borderRadius: radius.xl,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon name="zap" color={colors.white} size={28} />
        </div>
        <div>
          <h4 style={{
            fontSize: typography.fontSizeLg,
            color: colors.white,
            margin: `0 0 ${spacing.space3} 0`,
            fontWeight: typography.fontWeightBold,
          }}>
            The Power of Compound Interest
          </h4>
          <p style={{
            fontSize: '15px',
            color: colors.steelGray,
            margin: 0,
            lineHeight: 1.7,
          }}>
            Starting at 25 with €300/month ={' '}
            <span style={{ color: colors.teal, fontWeight: typography.fontWeightSemibold }}>
              €600,000+
            </span>{' '}
            by 65. Starting at 35? Only{' '}
            <span style={{ color: colors.white, fontWeight: typography.fontWeightSemibold }}>
              €300,000
            </span>
            .{' '}
            <strong style={{ color: colors.teal }}>A 10-year delay halves your result.</strong>
          </p>
        </div>
      </Card>

      {/* Core Message */}
      <div style={{
        ...highlightBoxStyle,
        marginTop: spacing.space6,
        textAlign: 'center',
      }}>
        <Icon name="checkCircle" color={colors.teal} size={36} />
        <h3 style={{
          fontSize: typography.fontSizeXl,
          color: colors.deepNavy,
          margin: `${spacing.space4} 0 ${spacing.space3}`,
          fontWeight: typography.fontWeightBold,
        }}>
          The Core Message
        </h3>
        <p style={{
          fontSize: '15px',
          color: colors.charcoal,
          margin: 0,
          lineHeight: 1.7,
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          WealthTech democratizes professional investing. Robo-Advisory doesn't replace advisors—it makes them more effective.
          <strong> The combination of human empathy and machine precision is unbeatable.</strong>
        </p>
      </div>
    </div>
  );
};

export default LifePlanningCalculator;
export { LIFE_PHASES, calculateProjection };
