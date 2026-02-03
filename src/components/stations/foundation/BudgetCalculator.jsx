// ============================================================================
// BudgetCalculator Component
// Budget method selection with income allocation visualization
// ============================================================================

import React, { useState, useEffect } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import Icon from '../../icons';
import Card from '../../ui/Card';
import InputField from '../../ui/InputField';
import RadioOption from '../../ui/RadioOption';

// Budget method definitions
const BUDGET_METHODS = {
  '50-30-20': {
    name: '50-30-20 Rule',
    desc: 'Simple & flexible, for beginners',
    needs: 50,
    wants: 30,
    savings: 20,
  },
  'zero-based': {
    name: 'Zero-Based',
    desc: 'Maximum control, higher effort',
    needs: 55,
    wants: 25,
    savings: 20,
  },
  'pay-yourself': {
    name: 'Pay Yourself First',
    desc: 'Automation beats willpower',
    needs: 50,
    wants: 20,
    savings: 30,
  },
};

// Budget categories with descriptions
const BUDGET_CATEGORIES = [
  { key: 'needs', label: 'Needs', desc: 'Rent, utilities, groceries, insurance', color: colors.deepNavy },
  { key: 'wants', label: 'Wants', desc: 'Entertainment, dining out, hobbies', color: colors.teal },
  { key: 'savings', label: 'Savings', desc: 'Emergency fund, investments, goals', color: colors.green },
];

/**
 * BudgetCalculator Component
 *
 * @param {number} income - Current income value (controlled)
 * @param {string} method - Current budget method (controlled)
 * @param {function} onIncomeChange - Called when income changes
 * @param {function} onMethodChange - Called when method changes
 * @param {number} cfpbScore - CFPB score from Station 1 (optional)
 * @param {string} recommendedMethod - Recommended method based on CFPB (optional)
 */
const BudgetCalculator = ({
  income: controlledIncome,
  method: controlledMethod,
  onIncomeChange,
  onMethodChange,
  cfpbScore,
  recommendedMethod,
}) => {
  // Use controlled values if provided, otherwise use defaults
  const [income, setIncome] = useState(controlledIncome || 3500);
  const [method, setMethod] = useState(controlledMethod || '50-30-20');

  // Sync with controlled props when they change
  useEffect(() => {
    if (controlledIncome !== undefined) setIncome(controlledIncome);
  }, [controlledIncome]);

  useEffect(() => {
    if (controlledMethod !== undefined) setMethod(controlledMethod);
  }, [controlledMethod]);

  const currentBudget = BUDGET_METHODS[method];

  const handleIncomeChange = (value) => {
    const numValue = Number(value) || 0;
    setIncome(numValue);
    if (onIncomeChange) onIncomeChange(numValue);
  };

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    if (onMethodChange) onMethodChange(newMethod);
  };

  return (
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
          Budget Calculator
        </div>
        <h2 style={{
          fontSize: typography.fontSize2xl,
          color: colors.deepNavy,
          fontWeight: typography.fontWeightBold,
          margin: 0,
        }}>
          Choose Your Budgeting Method
        </h2>
      </div>

      <Card variant="accent">
        {/* Income Input */}
        <InputField
          label="Monthly Net Income"
          type="number"
          value={income}
          onChange={handleIncomeChange}
          prefix="€"
          style={{ marginBottom: spacing.space5 }}
        />

        {/* CFPB Recommendation Banner */}
        {cfpbScore && (
          <div style={{
            backgroundColor: colors.lightTeal,
            borderRadius: radius.lg,
            padding: spacing.space4,
            marginBottom: spacing.space5,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.space3,
            border: `1px solid ${colors.teal}`,
          }}>
            <Icon name="lightbulb" color={colors.teal} size={20} />
            <div>
              <div style={{
                fontSize: typography.fontSizeSm,
                fontWeight: typography.fontWeightSemibold,
                color: colors.deepNavy,
              }}>
                Based on your CFPB Score ({cfpbScore})
              </div>
              <div style={{
                fontSize: typography.fontSizeXs,
                color: colors.steelGray,
              }}>
                We recommend the <strong>{BUDGET_METHODS[recommendedMethod]?.name || '50-30-20 Rule'}</strong> method
              </div>
            </div>
          </div>
        )}

        {/* Method Selection */}
        <div style={{ marginBottom: spacing.space5 }}>
          <label style={{
            display: 'block',
            fontSize: typography.fontSizeSm,
            fontWeight: typography.fontWeightSemibold,
            color: colors.charcoal,
            marginBottom: spacing.space2,
          }}>
            Budgeting Method
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space2 }}>
            {Object.entries(BUDGET_METHODS).map(([id, m]) => (
              <RadioOption
                key={id}
                selected={method === id}
                onClick={() => handleMethodChange(id)}
                label={`${m.name}${id === recommendedMethod ? ' ✓ Recommended' : ''}`}
                description={m.desc}
              />
            ))}
          </div>
        </div>

        {/* Budget Bar Visualization */}
        <div style={{ marginBottom: spacing.space5 }}>
          <div style={{
            display: 'flex',
            borderRadius: radius.lg,
            overflow: 'hidden',
            height: '48px',
          }}>
            <div style={{
              width: `${currentBudget.needs}%`,
              backgroundColor: colors.deepNavy,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              transition: transitions.normal,
            }}>
              {currentBudget.needs}%
            </div>
            <div style={{
              width: `${currentBudget.wants}%`,
              backgroundColor: colors.teal,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              transition: transitions.normal,
            }}>
              {currentBudget.wants}%
            </div>
            <div style={{
              width: `${currentBudget.savings}%`,
              backgroundColor: colors.green,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              transition: transitions.normal,
            }}>
              {currentBudget.savings}%
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space3 }}>
          {BUDGET_CATEGORIES.map((category) => {
            const percentage = currentBudget[category.key];
            const amount = Math.round(income * percentage / 100);

            return (
              <div
                key={category.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: spacing.space4,
                  backgroundColor: colors.offWhite,
                  borderRadius: radius.lg,
                  borderLeft: `4px solid ${category.color}`,
                }}
              >
                <div>
                  <div style={{
                    fontWeight: typography.fontWeightSemibold,
                    fontSize: typography.fontSizeBase,
                    color: colors.deepNavy,
                  }}>
                    {category.label}
                  </div>
                  <div style={{
                    fontSize: typography.fontSizeSm,
                    color: colors.steelGray,
                  }}>
                    {category.desc}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontWeight: typography.fontWeightBold,
                    fontSize: typography.fontSizeXl,
                    color: colors.deepNavy,
                  }}>
                    €{amount.toLocaleString()}
                  </div>
                  <div style={{
                    fontSize: typography.fontSizeXs,
                    color: colors.steelGray,
                  }}>
                    per month
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default BudgetCalculator;
export { BUDGET_METHODS, BUDGET_CATEGORIES };
