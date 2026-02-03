// ============================================================================
// EmergencyFundCalculator Component
// Calculate emergency fund target based on expenses and situation
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Card from '../../ui/Card';
import InputField from '../../ui/InputField';
import ProgressBar from '../../ui/ProgressBar';

// Emergency fund multipliers based on situation
const EMERGENCY_SITUATIONS = [
  { id: 'single', icon: 'user', label: 'Single, secure job', months: 3 },
  { id: 'family', icon: 'users', label: 'Family, two incomes', months: 4 },
  { id: 'sole', icon: 'user', label: 'Sole earner', months: 6 },
  { id: 'self', icon: 'briefcase', label: 'Self-employed', months: 9 },
];

/**
 * EmergencyFundCalculator Component
 *
 * @param {number} initialExpenses - Starting monthly expenses value
 * @param {string} initialSituation - Starting situation ID
 * @param {number} currentSavings - Current emergency fund amount (for progress)
 * @param {number} monthlySavingsRate - Monthly savings percentage (for time calculation)
 * @param {number} monthlyIncome - Monthly income (for building plan calculation)
 * @param {function} onTargetChange - Called when target amount changes
 */
const EmergencyFundCalculator = ({
  initialExpenses = 2200,
  initialSituation = 'single',
  currentSavings = 0,
  monthlySavingsRate = 20,
  monthlyIncome = 3500,
  onTargetChange,
}) => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [situation, setSituation] = useState(initialSituation);

  const situationData = EMERGENCY_SITUATIONS.find((s) => s.id === situation);
  const emergencyTarget = expenses * situationData.months;
  const monthlySavings = Math.round(monthlyIncome * monthlySavingsRate / 100);
  const monthsToGoal = monthlySavings > 0 ? Math.ceil(emergencyTarget / monthlySavings) : 0;
  const progress = emergencyTarget > 0 ? Math.min(100, (currentSavings / emergencyTarget) * 100) : 0;

  const handleExpensesChange = (value) => {
    const numValue = Number(value) || 0;
    setExpenses(numValue);
    if (onTargetChange) {
      const newTarget = numValue * situationData.months;
      onTargetChange(newTarget);
    }
  };

  const handleSituationChange = (newSituation) => {
    setSituation(newSituation);
    if (onTargetChange) {
      const newData = EMERGENCY_SITUATIONS.find((s) => s.id === newSituation);
      const newTarget = expenses * newData.months;
      onTargetChange(newTarget);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: spacing.space6 }}>
      {/* Main Calculator */}
      <div>
        <div style={{ marginBottom: spacing.space6 }}>
          <div style={{
            fontSize: typography.fontSizeXs,
            fontWeight: typography.fontWeightBold,
            color: colors.teal,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: spacing.space2,
          }}>
            Emergency Fund Calculator
          </div>
          <h2 style={{
            fontSize: typography.fontSize2xl,
            color: colors.deepNavy,
            fontWeight: typography.fontWeightBold,
            margin: 0,
          }}>
            Calculate Your Safety Net
          </h2>
        </div>

        <Card variant="accent">
          {/* Expenses Input */}
          <div style={{ marginBottom: spacing.space5 }}>
            <InputField
              label="Monthly Fixed Expenses"
              type="number"
              value={expenses}
              onChange={handleExpensesChange}
              prefix="€"
              helperText="Include: rent, utilities, groceries, insurance, loan payments"
            />
          </div>

          {/* Situation Selection */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
              marginBottom: spacing.space2,
            }}>
              Your Situation
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: spacing.space3,
            }}>
              {EMERGENCY_SITUATIONS.map((sit) => {
                const isSelected = situation === sit.id;
                return (
                  <button
                    key={sit.id}
                    onClick={() => handleSituationChange(sit.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing.space3,
                      padding: spacing.space4,
                      backgroundColor: isSelected ? colors.teal : colors.offWhite,
                      color: isSelected ? colors.white : colors.charcoal,
                      border: `2px solid ${isSelected ? colors.teal : 'transparent'}`,
                      borderRadius: radius.lg,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: transitions.fast,
                    }}
                  >
                    <Icon
                      name={sit.icon}
                      color={isSelected ? colors.white : colors.teal}
                      size={20}
                    />
                    <div>
                      <div style={{
                        fontWeight: typography.fontWeightSemibold,
                        fontSize: typography.fontSizeSm,
                      }}>
                        {sit.label}
                      </div>
                      <div style={{
                        fontSize: typography.fontSizeXs,
                        opacity: 0.8,
                      }}>
                        {sit.months} months
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div style={{
            backgroundColor: colors.deepNavy,
            borderRadius: radius['2xl'],
            padding: spacing.space8,
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightBold,
              color: colors.lightTeal,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: spacing.space2,
            }}>
              Your Emergency Fund Target
            </div>
            <div style={{
              fontSize: typography.fontSize4xl,
              fontWeight: typography.fontWeightBold,
              color: colors.white,
              margin: `${spacing.space2} 0`,
            }}>
              €{emergencyTarget.toLocaleString()}
            </div>
            <div style={{
              fontSize: typography.fontSizeBase,
              color: colors.lightTeal,
            }}>
              {situationData.months} months × €{expenses.toLocaleString()} expenses
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div>
        <Card>
          <h4 style={{
            margin: `0 0 ${spacing.space4} 0`,
            fontSize: typography.fontSizeLg,
            fontWeight: typography.fontWeightBold,
            color: colors.deepNavy,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.space2,
          }}>
            <Icon name="trendingUp" color={colors.teal} size={20} />
            Building Plan
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space3 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: spacing.space3,
              backgroundColor: colors.offWhite,
              borderRadius: radius.lg,
            }}>
              <span style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>
                Monthly savings ({monthlySavingsRate}%)
              </span>
              <span style={{
                fontSize: typography.fontSizeBase,
                fontWeight: typography.fontWeightBold,
                color: colors.deepNavy,
              }}>
                €{monthlySavings.toLocaleString()}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: spacing.space3,
              backgroundColor: colors.lightTeal,
              borderRadius: radius.lg,
            }}>
              <span style={{ fontSize: typography.fontSizeSm, color: colors.charcoal }}>
                Time to reach goal
              </span>
              <span style={{
                fontSize: typography.fontSizeBase,
                fontWeight: typography.fontWeightBold,
                color: colors.teal,
              }}>
                {monthsToGoal} months
              </span>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginTop: spacing.space5 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: spacing.space2,
            }}>
              <span style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                Progress
              </span>
              <span style={{ fontSize: typography.fontSizeXs, color: colors.steelGray }}>
                €{currentSavings.toLocaleString()} / €{emergencyTarget.toLocaleString()}
              </span>
            </div>
            <ProgressBar value={progress} color={colors.teal} height="8px" />
          </div>
        </Card>

        <div style={{ ...highlightBoxStyle, marginTop: spacing.space5 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing.space3 }}>
            <Icon name="lightbulb" color={colors.teal} size={20} />
            <div>
              <div style={{
                fontWeight: typography.fontWeightBold,
                fontSize: typography.fontSizeSm,
                color: colors.deepNavy,
                marginBottom: spacing.space1,
              }}>
                Important
              </div>
              <div style={{
                fontSize: typography.fontSizeSm,
                color: colors.charcoal,
                lineHeight: 1.5,
              }}>
                Base this on monthly expenses, not monthly salary. Your emergency fund must cover actual costs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFundCalculator;
export { EMERGENCY_SITUATIONS };
