// ============================================================================
// GoalBuilder Component
// Financial goal setting with projections
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import Slider from '../../ui/Slider';
import ProgressBar from '../../ui/ProgressBar';

// Default goals
const DEFAULT_GOALS = [
  { id: 'home', name: 'Home', desc: 'Down payment', icon: 'home', color: colors.deepNavy, defaultTarget: 50000 },
  { id: 'education', name: 'Education', desc: 'Skills investment', icon: 'education', color: colors.teal, defaultTarget: 20000 },
  { id: 'travel', name: 'Travel', desc: 'Experience world', icon: 'plane', color: colors.amber, defaultTarget: 5000 },
  { id: 'emergency', name: 'Emergency', desc: '6mo expenses', icon: 'shield', color: colors.red, defaultTarget: 15000 },
  { id: 'retire', name: 'Retirement', desc: 'Long-term security', icon: 'clock', color: colors.teal, defaultTarget: 100000 },
  { id: 'business', name: 'Business', desc: 'Start a venture', icon: 'briefcase', color: colors.deepNavy, defaultTarget: 30000 },
];

// Calculate projection with compound growth
const calculateProjection = (monthlyContribution, years, rate = 0.07) => {
  const months = years * 12;
  const total = monthlyContribution * months;
  const withGrowth = monthlyContribution * ((Math.pow(1 + rate / 12, months) - 1) / (rate / 12));
  return { total: Math.round(total), withGrowth: Math.round(withGrowth) };
};

/**
 * GoalBuilder Component
 *
 * @param {Array} savedGoals - Previously saved goals
 * @param {function} onAddGoal - Called when a goal is added
 * @param {function} onContinue - Called when user continues to next section
 */
const GoalBuilder = ({
  savedGoals = [],
  onAddGoal,
  onContinue,
}) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalTargets, setGoalTargets] = useState(
    DEFAULT_GOALS.reduce((acc, g) => ({ ...acc, [g.id]: g.defaultTarget }), {})
  );
  const [timeline, setTimeline] = useState(5);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [goals, setGoals] = useState(savedGoals);

  const projection = calculateProjection(monthlyContribution, timeline);
  const currentGoalData = selectedGoal
    ? { ...DEFAULT_GOALS.find(g => g.id === selectedGoal), target: goalTargets[selectedGoal] }
    : null;
  const progressToGoal = currentGoalData
    ? Math.min(100, (projection.withGrowth / currentGoalData.target) * 100)
    : 0;

  const addGoalToPlan = () => {
    if (currentGoalData && !goals.find(g => g.id === currentGoalData.id)) {
      const newGoal = { ...currentGoalData, timeline, monthlyContribution, projection };
      setGoals([...goals, newGoal]);
      if (onAddGoal) {
        onAddGoal(newGoal);
      }
    }
  };

  return (
    <div>
      <div style={{ marginBottom: spacing.space8 }}>
        <div style={{
          color: colors.teal,
          fontSize: typography.fontSizeXs,
          fontWeight: typography.fontWeightBold,
          letterSpacing: '2px',
          marginBottom: spacing.space2,
        }}>
          BUILDER'S TABLE
        </div>
        <h2 style={{
          color: colors.deepNavy,
          fontSize: typography.fontSize2xl,
          fontWeight: typography.fontWeightSemibold,
          margin: `0 0 ${spacing.space2} 0`,
        }}>
          Build Your Wealth Profile
        </h2>
        <p style={{ color: colors.steelGray, fontSize: typography.fontSizeBase }}>
          Select goals, customize targets, and see projections
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.space8 }}>
        {/* Left: Goal Selection */}
        <div>
          <Card>
            <h4 style={{
              color: colors.deepNavy,
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightBold,
              margin: `0 0 ${spacing.space4} 0`,
            }}>
              SELECT YOUR LIFE GOAL
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing.space3 }}>
              {DEFAULT_GOALS.map((goal) => {
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    style={{
                      background: isSelected ? `${goal.color}15` : colors.offWhite,
                      border: isSelected ? `2px solid ${goal.color}` : '2px solid transparent',
                      borderRadius: radius['2xl'],
                      padding: spacing.space4,
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontFamily: 'inherit',
                      transition: transitions.fast,
                    }}
                  >
                    <div style={{ marginBottom: spacing.space2 }}>
                      <Icon name={goal.icon} color={goal.color} size={28} />
                    </div>
                    <div style={{
                      color: colors.deepNavy,
                      fontSize: '13px',
                      fontWeight: typography.fontWeightSemibold,
                    }}>
                      {goal.name}
                    </div>
                    <div style={{
                      color: colors.steelGray,
                      fontSize: typography.fontSizeXs,
                      marginTop: spacing.space1,
                    }}>
                      {(goalTargets[goal.id] / 1000).toFixed(0)}k
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Sliders */}
            <div style={{ marginTop: spacing.space6 }}>
              <Slider
                value={timeline}
                min={1}
                max={20}
                onChange={setTimeline}
                label="Timeline"
                formatValue={(v) => `${v} years`}
                style={{ marginBottom: spacing.space5 }}
              />

              <Slider
                value={monthlyContribution}
                min={50}
                max={2000}
                step={50}
                onChange={setMonthlyContribution}
                label="Monthly Contribution"
                formatValue={(v) => `€${v}`}
              />
            </div>
          </Card>
        </div>

        {/* Right: Projection */}
        <div>
          {/* Projection Card */}
          <div style={{
            background: `linear-gradient(135deg, ${colors.deepNavy} 0%, ${colors.teal} 100%)`,
            borderRadius: radius['3xl'],
            padding: spacing.space6,
            color: colors.white,
            marginBottom: spacing.space4,
          }}>
            <h4 style={{
              fontSize: typography.fontSizeBase,
              fontWeight: typography.fontWeightBold,
              margin: `0 0 ${spacing.space5} 0`,
              opacity: 0.8,
            }}>
              YOUR PROJECTION
            </h4>

            {/* Visual bars */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              height: '120px',
              gap: '6px',
              marginBottom: spacing.space6,
            }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: '16px',
                    height: `${20 + (i * 8) * (progressToGoal / 100)}px`,
                    background: i < Math.floor(12 * (progressToGoal / 100))
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.2)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.5s ease',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.space4, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightLight }}>
                  {(projection.total / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>Contributions</div>
              </div>
              <div>
                <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightLight }}>
                  {(projection.withGrowth / 1000).toFixed(1)}k
                </div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>With 7% Growth</div>
              </div>
            </div>
          </div>

          {/* Goal Progress */}
          {selectedGoal && (
            <Card>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: spacing.space2,
              }}>
                <span style={{ color: colors.charcoal, fontSize: '13px' }}>
                  Progress to {DEFAULT_GOALS.find(g => g.id === selectedGoal)?.name}
                </span>
                <span style={{
                  color: colors.teal,
                  fontSize: '13px',
                  fontWeight: typography.fontWeightBold,
                }}>
                  {Math.round(progressToGoal)}%
                </span>
              </div>

              <ProgressBar
                value={progressToGoal}
                color={progressToGoal >= 100 ? colors.green : colors.amber}
                style={{ marginBottom: spacing.space4 }}
              />

              <Button
                fullWidth
                onClick={addGoalToPlan}
                disabled={goals.find(g => g.id === selectedGoal)}
                variant={goals.find(g => g.id === selectedGoal) ? 'secondary' : 'primary'}
              >
                {goals.find(g => g.id === selectedGoal) ? 'Added' : 'Add to My Plan'}
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div style={{ textAlign: 'center', marginTop: spacing.space8 }}>
        <Button variant="dark" size="lg" onClick={onContinue}>
          View Community Comparison
          <Icon name="arrowRight" color={colors.white} size={18} />
        </Button>
      </div>
    </div>
  );
};

export default GoalBuilder;
export { DEFAULT_GOALS, calculateProjection };
