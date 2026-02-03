// ============================================================================
// RiskProfiling Component
// AI-powered risk assessment questionnaire with profile calculation
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import RadioOption from '../../ui/RadioOption';
import Slider from '../../ui/Slider';

// Calculate risk score from answers
const calculateRiskScore = (answers) => {
  const { horizon, reaction, tolerance, income, experience } = answers;
  const score = Math.round(
    (horizon * 1.5 + reaction * 2 + tolerance * 0.8 + income * 1.2 + experience * 1.5) / 2.5
  );
  return Math.min(10, Math.max(1, score));
};

// Get risk profile name from score
const getRiskProfile = (score) => {
  if (score <= 3) return 'Conservative';
  if (score <= 5) return 'Moderate';
  if (score <= 7) return 'Balanced Growth';
  return 'Aggressive Growth';
};

// Calculate projection with compound growth
const calculateProjection = (monthly, years, rate) => {
  let total = 0;
  for (let i = 0; i < years * 12; i++) {
    total = (total + monthly) * (1 + rate / 100 / 12);
  }
  return Math.round(total);
};

/**
 * RiskProfiling Component
 *
 * @param {function} onComplete - Called with profile data when assessment completes
 * @param {function} onContinue - Called when user wants to proceed
 * @param {number} cfpbScore - CFPB score from Station 1 (optional)
 * @param {number} riskAdjustment - Risk adjustment based on CFPB score (optional)
 */
const RiskProfiling = ({ onComplete, onContinue, cfpbScore, riskAdjustment = 0 }) => {
  const [answers, setAnswers] = useState({
    horizon: 2,
    reaction: 1,
    tolerance: 5,
    income: 1,
    experience: 1,
  });
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    setShowResult(true);
    if (onComplete) {
      const score = calculateRiskScore(answers);
      onComplete({
        score,
        profile: getRiskProfile(score),
        answers,
      });
    }
  };

  const riskScore = calculateRiskScore(answers);
  const stockAllocation = 40 + riskScore * 5;
  const bondAllocation = 50 - riskScore * 4;
  const altAllocation = Math.round(10 - riskScore * 0.5);

  return (
    <div>
      <div style={{ marginBottom: spacing.space6 }}>
        <h2 style={{
          fontSize: typography.fontSizeXl,
          fontWeight: typography.fontWeightBold,
          color: colors.deepNavy,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          AI-Powered Risk Profiling
        </h2>
        <p style={{
          fontSize: typography.fontSizeBase,
          color: colors.steelGray,
          margin: 0,
          lineHeight: 1.6,
        }}>
          Answer 5 questions to discover your investor profile and receive a personalized allocation.
        </p>
      </div>

      {/* CFPB Score Impact Banner */}
      {cfpbScore && riskAdjustment !== 0 && (
        <div style={{
          backgroundColor: riskAdjustment < 0 ? '#FEF3CD' : colors.lightTeal,
          borderRadius: radius.lg,
          padding: spacing.space4,
          marginBottom: spacing.space6,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.space3,
          border: `1px solid ${riskAdjustment < 0 ? '#D97706' : colors.teal}`,
        }}>
          <Icon name="alertCircle" color={riskAdjustment < 0 ? '#D97706' : colors.teal} size={20} />
          <div>
            <div style={{
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              color: colors.deepNavy,
            }}>
              CFPB Score Impact ({cfpbScore}/100)
            </div>
            <div style={{
              fontSize: typography.fontSizeXs,
              color: colors.steelGray,
            }}>
              {riskAdjustment < 0
                ? `Your financial wellbeing score suggests a more conservative approach. Risk score will be adjusted by ${riskAdjustment}.`
                : `Your solid financial foundation supports higher risk tolerance.`}
            </div>
          </div>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: spacing.space6,
      }}>
        {/* Questions */}
        <Card>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.space3,
            marginBottom: spacing.space6,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: colors.lightTeal,
              borderRadius: radius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="scale" color={colors.teal} size={20} />
            </div>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightBold,
              color: colors.deepNavy,
              margin: 0,
            }}>
              Risk Assessment
            </h3>
          </div>

          {/* Q1: Time Horizon */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.space3,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
            }}>
              1. What is your investment time horizon?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing.space2 }}>
              {['< 3 yrs', '3–10 yrs', '10–20 yrs', '> 20 yrs'].map((opt, i) => (
                <RadioOption
                  key={i}
                  selected={answers.horizon === i}
                  onClick={() => setAnswers({ ...answers, horizon: i })}
                  label={opt}
                />
              ))}
            </div>
          </div>

          {/* Q2: Reaction to Drop */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.space3,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
            }}>
              2. If your portfolio drops 25%, you would...
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space3 }}>
              {['Sell immediately', 'Hold and wait', 'Buy more'].map((opt, i) => (
                <RadioOption
                  key={i}
                  selected={answers.reaction === i}
                  onClick={() => setAnswers({ ...answers, reaction: i })}
                  label={opt}
                />
              ))}
            </div>
          </div>

          {/* Q3: Volatility Tolerance */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.space3,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
            }}>
              3. Rate your comfort with volatility
            </label>
            <Slider
              value={answers.tolerance}
              min={1}
              max={10}
              onChange={(val) => setAnswers({ ...answers, tolerance: val })}
              label=""
              formatValue={(v) => `${v}/10`}
              showMinMax
              minLabel="Stability"
              maxLabel="Growth"
            />
          </div>

          {/* Q4: Income Stability */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.space3,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
            }}>
              4. How stable is your income?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing.space2 }}>
              {['Variable', 'Moderate', 'Very Stable'].map((opt, i) => (
                <RadioOption
                  key={i}
                  selected={answers.income === i}
                  onClick={() => setAnswers({ ...answers, income: i })}
                  label={opt}
                />
              ))}
            </div>
          </div>

          {/* Q5: Experience */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              marginBottom: spacing.space3,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
            }}>
              5. Your investment experience?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing.space2 }}>
              {['Beginner', 'Intermediate', 'Advanced'].map((opt, i) => (
                <RadioOption
                  key={i}
                  selected={answers.experience === i}
                  onClick={() => setAnswers({ ...answers, experience: i })}
                  label={opt}
                />
              ))}
            </div>
          </div>

          <Button fullWidth onClick={handleAnalyze}>
            <Icon name="target" color={colors.white} size={18} />
            Analyze My Profile
          </Button>
        </Card>

        {/* Results */}
        <Card style={{
          opacity: showResult ? 1 : 0.5,
          transition: transitions.normal,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.space3,
            marginBottom: spacing.space6,
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: showResult ? colors.teal : colors.steelGray,
              borderRadius: radius.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name={showResult ? 'checkCircle' : 'target'} color={colors.white} size={20} />
            </div>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightBold,
              color: colors.deepNavy,
              margin: 0,
            }}>
              {showResult ? 'Your Profile' : 'Complete assessment'}
            </h3>
          </div>

          {showResult ? (
            <>
              <div style={{
                ...highlightBoxStyle,
                marginBottom: spacing.space5,
                textAlign: 'center',
                padding: spacing.space5,
              }}>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightBold,
                  color: colors.teal,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: spacing.space1,
                }}>
                  Investor Type
                </div>
                <div style={{
                  fontSize: typography.fontSize2xl,
                  color: colors.deepNavy,
                  fontWeight: typography.fontWeightBold,
                  marginTop: spacing.space1,
                }}>
                  {getRiskProfile(riskScore)}
                </div>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  color: colors.steelGray,
                  marginTop: spacing.space1,
                }}>
                  Risk Score: <strong>{riskScore}</strong>/10
                </div>
              </div>

              {/* Allocation Bar */}
              <div style={{ marginBottom: spacing.space5 }}>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightSemibold,
                  color: colors.steelGray,
                  marginBottom: spacing.space3,
                }}>
                  Recommended Allocation
                </div>
                <div style={{
                  display: 'flex',
                  borderRadius: radius.md,
                  overflow: 'hidden',
                  height: '32px',
                }}>
                  <div style={{
                    width: `${stockAllocation}%`,
                    backgroundColor: colors.teal,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontSize: typography.fontSizeXs,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    {stockAllocation}%
                  </div>
                  <div style={{
                    width: `${bondAllocation}%`,
                    backgroundColor: colors.deepNavy,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontSize: typography.fontSizeXs,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    {bondAllocation}%
                  </div>
                  <div style={{
                    width: `${altAllocation}%`,
                    backgroundColor: colors.steelGray,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontSize: typography.fontSizeXs,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    {altAllocation}%
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: spacing.space3,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space1 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: colors.teal }} />
                    <span style={{ fontSize: typography.fontSizeXs, fontWeight: typography.fontWeightSemibold, color: colors.steelGray }}>Equities</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space1 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: colors.deepNavy }} />
                    <span style={{ fontSize: typography.fontSizeXs, fontWeight: typography.fontWeightSemibold, color: colors.steelGray }}>Bonds</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing.space1 }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: colors.steelGray }} />
                    <span style={{ fontSize: typography.fontSizeXs, fontWeight: typography.fontWeightSemibold, color: colors.steelGray }}>Alt</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: spacing.space3,
                marginBottom: spacing.space5,
              }}>
                <div style={{
                  backgroundColor: colors.offWhite,
                  padding: spacing.space4,
                  borderRadius: radius.lg,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: typography.fontSizeXs, fontWeight: typography.fontWeightSemibold, color: colors.steelGray }}>
                    Expected Return
                  </div>
                  <div style={{
                    fontSize: typography.fontSizeXl,
                    color: colors.teal,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    {(3.5 + riskScore * 0.5).toFixed(1)}%
                  </div>
                </div>
                <div style={{
                  backgroundColor: colors.offWhite,
                  padding: spacing.space4,
                  borderRadius: radius.lg,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: typography.fontSizeXs, fontWeight: typography.fontWeightSemibold, color: colors.steelGray }}>
                    Max Drawdown
                  </div>
                  <div style={{
                    fontSize: typography.fontSizeXl,
                    color: colors.deepNavy,
                    fontWeight: typography.fontWeightBold,
                  }}>
                    -{8 + riskScore * 3}%
                  </div>
                </div>
              </div>

              {/* Projection */}
              <Card variant="dark" style={{ textAlign: 'center', padding: spacing.space5 }}>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  fontWeight: typography.fontWeightBold,
                  color: colors.teal,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}>
                  30-Year Projection (€500/mo)
                </div>
                <div style={{
                  fontSize: '28px',
                  color: colors.white,
                  fontWeight: typography.fontWeightBold,
                }}>
                  €{calculateProjection(500, 30, 3.5 + riskScore * 0.5).toLocaleString('de-DE')}
                </div>
              </Card>
            </>
          ) : (
            <div style={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: spacing.space4,
            }}>
              <Icon name="target" color={colors.steelGray} size={48} />
              <span style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                Answer all questions
              </span>
            </div>
          )}
        </Card>
      </div>

      {showResult && onContinue && (
        <div style={{ marginTop: spacing.space8, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onContinue}>
            Next: Portfolio Builder
            <Icon name="arrowRight" color={colors.white} size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RiskProfiling;
export { calculateRiskScore, getRiskProfile, calculateProjection };
