// ============================================================================
// DebtFreedomSimulator Component
// Debt repayment simulator with avalanche/snowball strategies
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Card from '../../ui/Card';
import Slider from '../../ui/Slider';

// Default debt list
const DEFAULT_DEBTS = [
  { id: 1, name: 'Overdraft', amount: 2500, rate: 12, minPayment: 50 },
  { id: 2, name: 'Electronics Loan', amount: 3000, rate: 10, minPayment: 80 },
  { id: 3, name: 'Furniture Loan', amount: 3000, rate: 8, minPayment: 70 },
];

// Repayment strategies
const REPAYMENT_STRATEGIES = [
  { id: 'avalanche', icon: 'zap', name: 'Avalanche', desc: 'Highest interest first' },
  { id: 'snowball', icon: 'target', name: 'Snowball', desc: 'Smallest debt first' },
];

/**
 * DebtFreedomSimulator Component
 *
 * @param {Array} initialDebts - Starting debt list
 * @param {number} initialExtraPayment - Starting extra payment amount
 * @param {string} initialMethod - Starting repayment method
 * @param {function} onStrategyChange - Called when strategy or payments change
 */
const DebtFreedomSimulator = ({
  initialDebts = DEFAULT_DEBTS,
  initialExtraPayment = 150,
  initialMethod = 'avalanche',
  onStrategyChange,
}) => {
  const [debts] = useState(initialDebts);
  const [extraPayment, setExtraPayment] = useState(initialExtraPayment);
  const [method, setMethod] = useState(initialMethod);

  // Calculations
  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
  const totalInterest = debts.reduce((sum, d) => sum + (d.amount * d.rate / 100), 0);
  const totalMinPayments = debts.reduce((sum, d) => sum + d.minPayment, 0);

  // Sort debts by strategy
  const sortedDebts = [...debts].sort((a, b) =>
    method === 'avalanche' ? b.rate - a.rate : a.amount - b.amount
  );

  // Estimate debt-free timeline (simplified calculation)
  const monthlyPayment = totalMinPayments + extraPayment;
  const debtFreeMonths = monthlyPayment > 0 ? Math.ceil(totalDebt / monthlyPayment) : 0;
  const interestSaved = Math.round(totalInterest * 0.3 * (extraPayment / 100));

  const handleExtraPaymentChange = (value) => {
    setExtraPayment(value);
    if (onStrategyChange) {
      onStrategyChange({ method, extraPayment: value });
    }
  };

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    if (onStrategyChange) {
      onStrategyChange({ method: newMethod, extraPayment });
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
            Debt Repayment Simulator
          </div>
          <h2 style={{
            fontSize: typography.fontSize2xl,
            color: colors.deepNavy,
            fontWeight: typography.fontWeightBold,
            margin: 0,
          }}>
            Choose Your Strategy
          </h2>
        </div>

        <Card variant="accent">
          {/* Debt Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing.space4,
            marginBottom: spacing.space6,
          }}>
            <div style={{
              backgroundColor: colors.offWhite,
              borderRadius: radius.xl,
              padding: spacing.space5,
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: typography.fontSize2xl,
                fontWeight: typography.fontWeightBold,
                color: colors.deepNavy,
              }}>
                €{totalDebt.toLocaleString()}
              </div>
              <div style={{
                fontSize: typography.fontSizeSm,
                color: colors.steelGray,
                marginTop: spacing.space1,
              }}>
                Total Debt
              </div>
            </div>
            <div style={{
              backgroundColor: colors.lightTeal,
              borderRadius: radius.xl,
              padding: spacing.space5,
              textAlign: 'center',
              borderLeft: `4px solid ${colors.red}`,
            }}>
              <div style={{
                fontSize: typography.fontSize2xl,
                fontWeight: typography.fontWeightBold,
                color: colors.red,
              }}>
                €{Math.round(totalInterest).toLocaleString()}
              </div>
              <div style={{
                fontSize: typography.fontSizeSm,
                color: colors.steelGray,
                marginTop: spacing.space1,
              }}>
                Annual Interest
              </div>
            </div>
          </div>

          {/* Extra Payment Slider */}
          <div style={{ marginBottom: spacing.space6 }}>
            <Slider
              value={extraPayment}
              min={0}
              max={500}
              step={25}
              onChange={handleExtraPaymentChange}
              label="Extra Monthly Payment"
              formatValue={(v) => `€${v}`}
              showMinMax
            />
          </div>

          {/* Strategy Selection */}
          <div style={{ marginBottom: spacing.space6 }}>
            <label style={{
              display: 'block',
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
              marginBottom: spacing.space3,
            }}>
              Repayment Strategy
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: spacing.space3,
            }}>
              {REPAYMENT_STRATEGIES.map((strategy) => {
                const isSelected = method === strategy.id;
                return (
                  <button
                    key={strategy.id}
                    onClick={() => handleMethodChange(strategy.id)}
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
                      name={strategy.icon}
                      color={isSelected ? colors.white : colors.teal}
                      size={22}
                    />
                    <div>
                      <div style={{
                        fontWeight: typography.fontWeightSemibold,
                        fontSize: typography.fontSizeBase,
                      }}>
                        {strategy.name}
                      </div>
                      <div style={{
                        fontSize: typography.fontSizeXs,
                        opacity: 0.8,
                      }}>
                        {strategy.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Order */}
          <div>
            <label style={{
              display: 'block',
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightSemibold,
              color: colors.charcoal,
              marginBottom: spacing.space3,
            }}>
              Payment Priority Order
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space3 }}>
              {sortedDebts.map((debt, i) => {
                const isFirst = i === 0;
                return (
                  <div
                    key={debt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: spacing.space4,
                      backgroundColor: isFirst ? colors.lightTeal : colors.offWhite,
                      borderRadius: radius.xl,
                      border: isFirst ? `2px solid ${colors.teal}` : 'none',
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: radius.full,
                      backgroundColor: isFirst ? colors.teal : colors.steelGray,
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: typography.fontSizeBase,
                      fontWeight: typography.fontWeightBold,
                      marginRight: spacing.space4,
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: typography.fontWeightSemibold,
                        fontSize: typography.fontSizeBase,
                        color: colors.deepNavy,
                      }}>
                        {debt.name}
                      </div>
                      <div style={{
                        fontSize: typography.fontSizeSm,
                        color: colors.steelGray,
                      }}>
                        {debt.rate}% interest • €{debt.minPayment}/mo minimum
                      </div>
                    </div>
                    <div style={{
                      fontWeight: typography.fontWeightBold,
                      fontSize: typography.fontSizeLg,
                      color: colors.deepNavy,
                    }}>
                      €{debt.amount.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Sidebar */}
      <div>
        <Card variant="dark">
          <div style={{
            fontSize: typography.fontSizeXs,
            fontWeight: typography.fontWeightBold,
            color: colors.lightTeal,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: spacing.space4,
          }}>
            Projection
          </div>
          <div style={{ marginBottom: spacing.space5 }}>
            <div style={{
              fontSize: typography.fontSizeSm,
              color: colors.lightTeal,
              marginBottom: spacing.space1,
            }}>
              Debt-free in approximately
            </div>
            <div style={{
              fontSize: typography.fontSize3xl,
              fontWeight: typography.fontWeightBold,
              color: colors.white,
            }}>
              {debtFreeMonths} months
            </div>
          </div>
          <div style={{
            padding: spacing.space4,
            backgroundColor: 'rgba(13, 148, 136, 0.15)',
            borderRadius: radius.lg,
            border: '1px solid rgba(13, 148, 136, 0.3)',
          }}>
            <div style={{
              fontSize: typography.fontSizeSm,
              color: colors.lightTeal,
              marginBottom: spacing.space1,
            }}>
              Interest saved vs. minimum
            </div>
            <div style={{
              fontSize: typography.fontSize2xl,
              fontWeight: typography.fontWeightBold,
              color: colors.green,
            }}>
              €{interestSaved.toLocaleString()}
            </div>
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
                Avalanche vs. Snowball
              </div>
              <div style={{
                fontSize: typography.fontSizeSm,
                color: colors.charcoal,
                lineHeight: 1.5,
              }}>
                Avalanche saves more money mathematically. Snowball provides quick psychological wins. Choose what keeps you motivated!
              </div>
            </div>
          </div>
        </div>

        <Card style={{ marginTop: spacing.space5 }}>
          <div style={{
            fontSize: typography.fontSizeXs,
            fontWeight: typography.fontWeightBold,
            color: colors.teal,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: spacing.space3,
          }}>
            Overdraft Warning
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.space3,
            padding: spacing.space4,
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
            borderRadius: radius.lg,
            borderLeft: `4px solid ${colors.red}`,
          }}>
            <div style={{
              fontSize: typography.fontSize2xl,
              fontWeight: typography.fontWeightBold,
              color: colors.red,
            }}>
              12-15%
            </div>
            <div style={{
              fontSize: typography.fontSizeSm,
              color: colors.charcoal,
            }}>
              Typical overdraft interest p.a. — the most expensive credit!
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DebtFreedomSimulator;
export { DEFAULT_DEBTS, REPAYMENT_STRATEGIES };
