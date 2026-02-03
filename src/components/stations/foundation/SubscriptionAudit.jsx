// ============================================================================
// SubscriptionAudit Component
// Toggle-based subscription management with savings calculation
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import { highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Card from '../../ui/Card';

// Default subscription list
const DEFAULT_SUBSCRIPTIONS = [
  { id: 1, name: 'Netflix', amount: 12.99, needed: true },
  { id: 2, name: 'Spotify', amount: 9.99, needed: true },
  { id: 3, name: 'Disney+', amount: 8.99, needed: false },
  { id: 4, name: 'Gym', amount: 29.99, needed: true },
  { id: 5, name: 'Fitness App', amount: 14.99, needed: false },
  { id: 6, name: 'Cloud Storage', amount: 9.99, needed: true },
  { id: 7, name: 'Magazine', amount: 7.99, needed: false },
  { id: 8, name: 'Meditation', amount: 12.99, needed: false },
];

/**
 * SubscriptionAudit Component
 *
 * @param {Array} initialSubscriptions - Starting subscription list
 * @param {function} onChange - Called when subscriptions change
 * @param {function} onSavingsCalculated - Called with potential monthly savings
 */
const SubscriptionAudit = ({
  initialSubscriptions = DEFAULT_SUBSCRIPTIONS,
  onChange,
  onSavingsCalculated,
}) => {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const totalSubscriptions = subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const potentialSavings = subscriptions
    .filter((s) => !s.needed)
    .reduce((sum, s) => sum + s.amount, 0);

  const toggleSubscription = (id) => {
    const updated = subscriptions.map((s) =>
      s.id === id ? { ...s, needed: !s.needed } : s
    );
    setSubscriptions(updated);

    if (onChange) onChange(updated);

    const newSavings = updated
      .filter((s) => !s.needed)
      .reduce((sum, s) => sum + s.amount, 0);
    if (onSavingsCalculated) onSavingsCalculated(newSavings);
  };

  return (
    <div>
      <Card>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.space4,
        }}>
          <h4 style={{
            margin: 0,
            fontSize: typography.fontSizeLg,
            fontWeight: typography.fontWeightBold,
            color: colors.deepNavy,
          }}>
            Subscription Audit
          </h4>
          <span style={{
            fontSize: typography.fontSizeSm,
            color: colors.steelGray,
          }}>
            €{totalSubscriptions.toFixed(2)}/mo
          </span>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.space2,
          maxHeight: '320px',
          overflowY: 'auto',
        }}>
          {subscriptions.map((sub) => (
            <button
              key={sub.id}
              onClick={() => toggleSubscription(sub.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: spacing.space3,
                border: sub.needed
                  ? `2px solid ${colors.teal}`
                  : `1px solid ${colors.border}`,
                borderRadius: radius.lg,
                backgroundColor: sub.needed ? colors.lightTeal : colors.white,
                cursor: 'pointer',
                textAlign: 'left',
                opacity: sub.needed ? 1 : 0.6,
                fontFamily: 'inherit',
                transition: transitions.fast,
              }}
            >
              <div>
                <div style={{
                  fontSize: typography.fontSizeSm,
                  fontWeight: typography.fontWeightSemibold,
                  color: colors.deepNavy,
                }}>
                  {sub.name}
                </div>
                <div style={{
                  fontSize: typography.fontSizeXs,
                  color: colors.steelGray,
                }}>
                  €{sub.amount.toFixed(2)}/mo
                </div>
              </div>
              {sub.needed && <Icon name="check" color={colors.teal} size={18} />}
            </button>
          ))}
        </div>
      </Card>

      {potentialSavings > 0 && (
        <div style={{ ...highlightBoxStyle, marginTop: spacing.space5 }}>
          <div style={{
            fontSize: typography.fontSizeXs,
            fontWeight: typography.fontWeightBold,
            color: colors.teal,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: spacing.space2,
          }}>
            Potential Savings
          </div>
          <div style={{
            fontSize: typography.fontSize2xl,
            fontWeight: typography.fontWeightBold,
            color: colors.teal,
          }}>
            €{potentialSavings.toFixed(2)}
          </div>
          <div style={{
            fontSize: typography.fontSizeSm,
            color: colors.charcoal,
          }}>
            per month by canceling unused subscriptions
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionAudit;
export { DEFAULT_SUBSCRIPTIONS };
