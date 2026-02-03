// ============================================================================
// AIRetirementPlanner Component
// Chat-based AI retirement planning with pension gap calculation
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';

// Chat questions sequence
const CHAT_QUESTIONS = [
  { field: 'age', next: "Great! What's your approximate gross annual income in EUR?" },
  { field: 'income', next: 'And your current retirement savings? (roughly in EUR)' },
  { field: 'savings', next: null },
];

// Calculate pension gap
const calculatePensionGap = (age, income, savings) => {
  const pension = Math.round(income * 0.48 / 12);
  const required = Math.round(income * 0.75 / 12);
  const gap = required - pension;
  return { pension, required, gap };
};

/**
 * AIRetirementPlanner Component
 *
 * @param {function} onComplete - Called with userData when analysis completes
 * @param {function} onContinue - Called when user wants to proceed to simulation
 * @param {number} prefillIncome - Monthly income from Station 2 (optional)
 */
const AIRetirementPlanner = ({ onComplete, onContinue, prefillIncome }) => {
  // Calculate annual income if monthly prefill is available
  const annualIncomeHint = prefillIncome ? Math.round(prefillIncome * 12) : null;

  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: "Welcome to the Protection Point! I'll help calculate your pension gap. What's your current age?" },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatStep, setChatStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [showPrefillHint, setShowPrefillHint] = useState(false);

  const chatEndRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSend = () => {
    if (!chatInput.trim() || chatStep > 2) return;

    const value = chatInput.trim();
    setChatMessages((prev) => [...prev, { type: 'user', text: value }]);
    setUserData((prev) => ({ ...prev, [CHAT_QUESTIONS[chatStep].field]: value }));
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (CHAT_QUESTIONS[chatStep].next) {
        setChatMessages((prev) => [...prev, { type: 'ai', text: CHAT_QUESTIONS[chatStep].next }]);
        setChatStep((prev) => prev + 1);
      } else {
        const age = parseInt(userData.age) || 45;
        const income = parseInt(userData.income) || 55000;
        const savings = parseInt(value) || 50000;
        const { pension, required, gap } = calculatePensionGap(age, income, savings);

        const finalUserData = {
          ...userData,
          pension,
          required,
          gap,
          savings: parseInt(value),
          calculatedAge: age,
          calculatedIncome: income,
        };
        setUserData(finalUserData);

        setChatMessages((prev) => [
          ...prev,
          {
            type: 'ai',
            text: `Analysis complete!\n\n📊 Expected monthly pension: €${pension.toLocaleString()}\n💰 Required monthly income: €${required.toLocaleString()}\n⚠️ Your pension gap: €${gap.toLocaleString()}/month\n\nProceed to Monte Carlo simulation to see your probability of success.`,
          },
        ]);
        setChatStep(3);

        if (onComplete) {
          onComplete(finalUserData);
        }
      }
    }, 800);
  };

  const steps = ['Age', 'Income', 'Savings', 'Result'];

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
        AI Retirement Planner
      </div>
      <h2 style={{
        fontSize: typography.fontSize2xl,
        fontWeight: typography.fontWeightBold,
        color: colors.deepNavy,
        margin: `0 0 ${spacing.space8} 0`,
      }}>
        Calculate Your Pension Gap
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 280px',
        gap: spacing.space6,
      }}>
        {/* Chat Interface */}
        <Card variant="accent" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '500px',
          padding: 0,
        }}>
          <div style={{
            padding: spacing.space5,
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.space3,
          }}>
            <Icon name="calculator" color={colors.teal} size={20} />
            <span style={{ fontWeight: typography.fontWeightSemibold, color: colors.deepNavy }}>
              AI Retirement Advisor
            </span>
          </div>

          <div style={{
            flex: 1,
            padding: spacing.space5,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: spacing.space4,
          }}>
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: `${spacing.space3} ${spacing.space4}`,
                    borderRadius: radius['2xl'],
                    borderBottomLeftRadius: msg.type === 'ai' ? radius.sm : radius['2xl'],
                    borderBottomRightRadius: msg.type === 'user' ? radius.sm : radius['2xl'],
                    background: msg.type === 'ai' ? colors.teal : colors.lightTeal,
                    color: msg.type === 'ai' ? colors.white : colors.charcoal,
                    fontSize: typography.fontSizeBase,
                    lineHeight: 1.5,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={{ display: 'flex', gap: '6px', padding: spacing.space3 }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: radius.full,
                      background: colors.teal,
                      animation: `pulse 1s infinite ${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {chatStep < 3 ? (
            <div style={{
              padding: spacing.space4,
              borderTop: `1px solid ${colors.border}`,
              display: 'flex',
              gap: spacing.space3,
            }}>
              <div style={{ flex: 1, position: 'relative' }}>
                {chatStep === 1 && annualIncomeHint && (
                  <div style={{
                    position: 'absolute',
                    top: '-24px',
                    left: 0,
                    right: 0,
                    fontSize: typography.fontSizeXs,
                    color: colors.teal,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <Icon name="lightbulb" color={colors.teal} size={14} />
                    From your budget: €{annualIncomeHint.toLocaleString()}/year
                    <button
                      onClick={() => setChatInput(annualIncomeHint.toString())}
                      style={{
                        background: colors.lightTeal,
                        border: 'none',
                        borderRadius: radius.sm,
                        padding: '2px 8px',
                        fontSize: typography.fontSizeXs,
                        color: colors.teal,
                        cursor: 'pointer',
                        marginLeft: '4px',
                      }}
                    >
                      Use this
                    </button>
                  </div>
                )}
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder={
                    chatStep === 0 ? 'e.g., 45' : chatStep === 1 ? `e.g., ${annualIncomeHint || 55000}` : 'e.g., 50000'
                  }
                  style={{
                    width: '100%',
                    padding: `${spacing.space3} ${spacing.space4}`,
                    border: `2px solid ${colors.border}`,
                    borderRadius: radius.md,
                    fontSize: typography.fontSizeLg,
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <button
                onClick={handleChatSend}
                style={{
                  background: colors.teal,
                  color: colors.white,
                  border: 'none',
                  borderRadius: radius.md,
                  padding: `${spacing.space3} ${spacing.space4}`,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                <Icon name="send" color={colors.white} size={18} />
              </button>
            </div>
          ) : (
            <div style={{
              padding: spacing.space4,
              borderTop: `1px solid ${colors.border}`,
              textAlign: 'center',
            }}>
              <Button onClick={onContinue} size="lg">
                Run Monte Carlo Simulation
                <Icon name="arrowRight" color={colors.white} size={18} />
              </Button>
            </div>
          )}
        </Card>

        {/* Progress Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space3 }}>
          {steps.map((label, i) => {
            const isCurrent = i === chatStep;
            const isComplete = i < chatStep;

            return (
              <div
                key={i}
                style={{
                  background: isCurrent ? colors.deepNavy : isComplete ? colors.lightTeal : colors.white,
                  borderRadius: radius['2xl'],
                  padding: spacing.space4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.space3,
                  boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: radius.full,
                    background: isCurrent ? colors.teal : isComplete ? colors.green : colors.steelGray,
                    color: colors.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typography.fontSizeSm,
                    fontWeight: typography.fontWeightBold,
                  }}
                >
                  {isComplete ? '✓' : i + 1}
                </div>
                <span
                  style={{
                    fontSize: typography.fontSizeBase,
                    fontWeight: typography.fontWeightSemibold,
                    color: isCurrent ? colors.white : isComplete ? colors.teal : colors.steelGray,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>
        {`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}
      </style>
    </div>
  );
};

export default AIRetirementPlanner;
export { calculatePensionGap, CHAT_QUESTIONS };
