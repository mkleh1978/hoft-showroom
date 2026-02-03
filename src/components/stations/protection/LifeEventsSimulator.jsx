// ============================================================================
// LifeEventsSimulator Component
// Financial impact analysis for major life events
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

// Life events data
const LIFE_EVENTS = [
  {
    id: 'birth',
    icon: 'baby',
    name: 'Birth',
    impact: '~€250k/child',
    color: colors.teal,
    detail: 'Having a child costs approximately €250,000 until age 18, including childcare, education, and daily expenses.',
    urgency: 'Start education savings early.',
  },
  {
    id: 'marriage',
    icon: 'users',
    name: 'Marriage',
    impact: 'Tax benefits',
    color: colors.green,
    detail: 'Tax advantages through Ehegattensplitting but also risk concentration. Shared costs save 20-30%.',
    urgency: 'Review beneficiaries.',
  },
  {
    id: 'jobloss',
    icon: 'briefcase',
    name: 'Job Loss',
    impact: '60-67% income',
    color: colors.amber,
    detail: 'Unemployment benefit covers 60% of net salary (67% with children) for 12-24 months.',
    urgency: 'Build 6-month emergency fund.',
  },
  {
    id: 'illness',
    icon: 'activity',
    name: 'Illness',
    impact: '70% for 78 weeks',
    color: colors.amber,
    detail: "Sick pay: 6 weeks at 100%, then 70% for 78 weeks. Disability pension only 30-40%.",
    urgency: 'Consider disability insurance.',
  },
  {
    id: 'divorce',
    icon: 'userX',
    name: 'Divorce',
    impact: '50/50 split',
    color: colors.red,
    detail: 'Assets split 50/50 (Zugewinnausgleich). Pension rights divided. Expenses increase 30-40%.',
    urgency: 'Protect individual retirement.',
  },
  {
    id: 'disability',
    icon: 'shield',
    name: 'Disability',
    impact: '30-40% coverage',
    color: colors.red,
    detail: '1 in 4 workers becomes disabled. Statutory pension only covers 30-40% of income.',
    urgency: 'HIGH PRIORITY: Get BU insurance.',
  },
];

/**
 * LifeEventsSimulator Component
 *
 * @param {function} onContinue - Called when user wants to proceed
 */
const LifeEventsSimulator = ({ onContinue }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

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
        Life Event Simulator
      </div>
      <h2 style={{
        fontSize: typography.fontSize2xl,
        fontWeight: typography.fontWeightBold,
        color: colors.deepNavy,
        margin: `0 0 ${spacing.space2} 0`,
      }}>
        Financial Impact Analysis
      </h2>
      <p style={{
        color: colors.steelGray,
        marginBottom: spacing.space8,
      }}>
        Click an event to see its financial impact
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: spacing.space4,
      }}>
        {LIFE_EVENTS.map((event) => {
          const isSelected = selectedEvent?.id === event.id;
          return (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(isSelected ? null : event)}
              style={{
                background: isSelected ? colors.deepNavy : colors.white,
                borderRadius: radius['2xl'],
                padding: spacing.space6,
                boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                cursor: 'pointer',
                textAlign: 'center',
                border: isSelected ? `2px solid ${event.color}` : '2px solid transparent',
                transition: transitions.fast,
              }}
            >
              <Icon
                name={event.icon}
                color={isSelected ? event.color : colors.deepNavy}
                size={36}
              />
              <h4 style={{
                fontSize: typography.fontSizeLg,
                fontWeight: typography.fontWeightSemibold,
                color: isSelected ? colors.white : colors.deepNavy,
                margin: `${spacing.space4} 0 ${spacing.space2}`,
              }}>
                {event.name}
              </h4>
              <p style={{
                fontSize: typography.fontSizeSm,
                color: isSelected ? 'rgba(255,255,255,0.7)' : colors.steelGray,
                margin: 0,
              }}>
                {event.impact}
              </p>
            </div>
          );
        })}
      </div>

      {selectedEvent && (
        <Card variant="accent" style={{ marginTop: spacing.space6, display: 'flex', gap: spacing.space5 }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: `${selectedEvent.color}20`,
            borderRadius: radius['2xl'],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon name={selectedEvent.icon} color={selectedEvent.color} size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: typography.fontSizeLg,
              fontWeight: typography.fontWeightBold,
              color: colors.deepNavy,
              margin: 0,
            }}>
              {selectedEvent.name} — Financial Impact
            </h3>
            <p style={{
              fontSize: typography.fontSizeBase,
              color: colors.charcoal,
              margin: `${spacing.space3} 0`,
              lineHeight: 1.7,
            }}>
              {selectedEvent.detail}
            </p>
            <div style={{
              display: 'inline-block',
              background: `${selectedEvent.color}20`,
              color: selectedEvent.color,
              padding: `${spacing.space2} ${spacing.space4}`,
              borderRadius: radius.sm,
              fontSize: typography.fontSizeSm,
              fontWeight: typography.fontWeightBold,
            }}>
              {selectedEvent.urgency}
            </div>
          </div>
        </Card>
      )}

      {onContinue && (
        <div style={{ textAlign: 'center', marginTop: spacing.space10 }}>
          <Button onClick={onContinue} size="lg">
            Continue to EU Comparison
            <Icon name="arrowRight" color={colors.white} size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default LifeEventsSimulator;
export { LIFE_EVENTS };
