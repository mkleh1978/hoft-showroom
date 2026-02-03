// ============================================================================
// CFPB Assessment Component
// CFPB-10 Financial Wellbeing Assessment with score calculation
// ============================================================================

import React, { useState } from 'react';
import { colors, typography, spacing, radius, transitions } from '../../../styles/designTokens';
import { cardAccentStyle, highlightBoxStyle } from '../../../styles/componentStyles';
import Icon from '../../icons';
import Button from '../../ui/Button';
import Card from '../../ui/Card';
import ProgressBar from '../../ui/ProgressBar';

// CFPB-10 Questions
const CFPB_QUESTIONS = [
  { id: 1, text: "I could handle a major unexpected expense", category: "Resilience", reversed: false },
  { id: 2, text: "I am securing my financial future", category: "Planning", reversed: false },
  { id: 3, text: "Because of my money situation, I feel like I will never have the things I want in life", category: "Stress", reversed: true },
  { id: 4, text: "I can enjoy life because of the way I'm managing my money", category: "Freedom", reversed: false },
  { id: 5, text: "I am just getting by financially", category: "Stability", reversed: true },
  { id: 6, text: "I am concerned that the money I have or will save won't last", category: "Security", reversed: true },
  { id: 7, text: "Giving a gift would put a strain on my finances for the month", category: "Flexibility", reversed: true },
  { id: 8, text: "I have money left over at the end of the month", category: "Surplus", reversed: false },
  { id: 9, text: "I am behind with my finances", category: "Control", reversed: true },
  { id: 10, text: "My finances control my life", category: "Autonomy", reversed: true },
];

const SCALE_OPTIONS = [
  { value: 1, label: "Not at all" },
  { value: 2, label: "Very little" },
  { value: 3, label: "Somewhat" },
  { value: 4, label: "Very well" },
  { value: 5, label: "Completely" },
];

// Persona mapping
export const getPersona = (score) => {
  if (score >= 80) return { name: "The Guardian", desc: "Financially secure and forward-thinking", color: colors.green };
  if (score >= 65) return { name: "The Strategist", desc: "Resilient with room for optimization", color: colors.teal };
  if (score >= 50) return { name: "The Builder", desc: "Building foundations, gaining momentum", color: colors.amber };
  if (score >= 35) return { name: "The Seeker", desc: "Navigating challenges, seeking solutions", color: colors.amber };
  return { name: "The Pioneer", desc: "Starting the journey, unlimited potential", color: colors.red };
};

// Calculate CFPB Score
export const calculateCFPBScore = (answers) => {
  let total = 0;
  CFPB_QUESTIONS.forEach((q) => {
    const answer = answers[q.id] || 3;
    total += q.reversed ? (6 - answer) : answer;
  });
  return Math.round(((total - 10) / 40) * 100);
};

/**
 * CFPBAssessment Component
 *
 * @param {function} onComplete - Called with (score, persona, answers) when assessment completes
 * @param {function} onContinue - Called when user clicks continue after seeing results
 */
const CFPBAssessment = ({
  onComplete,
  onContinue,
  initialAnswers = {},
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [showResults, setShowResults] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < CFPB_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const score = calculateCFPBScore(newAnswers);
      setFinalScore(score);
      setTimeout(() => {
        setShowResults(true);
        if (onComplete) {
          onComplete(score, getPersona(score), newAnswers);
        }
      }, 500);
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setFinalScore(null);
    setShowResults(false);
  };

  // Question View
  if (!showResults) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Progress */}
        <div style={{ marginBottom: spacing.space10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing.space3 }}>
            <span style={{
              color: colors.teal,
              fontSize: typography.fontSizeXs,
              fontWeight: typography.fontWeightBold,
              letterSpacing: '2px',
            }}>
              FINANCIAL MIRROR ASSESSMENT
            </span>
            <span style={{ color: colors.steelGray, fontSize: '13px' }}>
              {currentQuestion + 1} of {CFPB_QUESTIONS.length}
            </span>
          </div>
          <ProgressBar
            value={((currentQuestion + 1) / CFPB_QUESTIONS.length) * 100}
            color={colors.teal}
            height="6px"
            trackColor={colors.border}
          />
        </div>

        {/* Question Card */}
        <Card variant="accent" style={{ padding: spacing.space12 }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: colors.lightTeal,
            color: colors.teal,
            padding: '6px 12px',
            borderRadius: radius.md,
            fontSize: '11px',
            fontWeight: typography.fontWeightBold,
            letterSpacing: '1px',
            marginBottom: spacing.space6,
          }}>
            {CFPB_QUESTIONS[currentQuestion].category.toUpperCase()}
          </div>

          <h3 style={{
            color: colors.deepNavy,
            fontSize: '22px',
            fontWeight: typography.fontWeightMedium,
            lineHeight: 1.5,
            margin: `0 0 ${spacing.space8} 0`,
          }}>
            "{CFPB_QUESTIONS[currentQuestion].text}"
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.space3 }}>
            {SCALE_OPTIONS.map((option) => {
              const isSelected = answers[CFPB_QUESTIONS[currentQuestion].id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(CFPB_QUESTIONS[currentQuestion].id, option.value)}
                  style={{
                    background: isSelected ? colors.deepNavy : colors.offWhite,
                    border: `2px solid ${isSelected ? colors.teal : colors.border}`,
                    borderRadius: radius['2xl'],
                    padding: '18px 24px',
                    color: isSelected ? colors.white : colors.charcoal,
                    fontSize: '15px',
                    fontWeight: typography.fontWeightMedium,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: transitions.fast,
                    fontFamily: 'inherit',
                  }}
                >
                  <span>{option.label}</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: radius.full,
                        background: dot <= option.value
                          ? colors.teal
                          : (isSelected ? 'rgba(255,255,255,0.2)' : colors.border),
                      }} />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  // Results View
  const persona = getPersona(finalScore);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card variant="dark" style={{ padding: spacing.space12, textAlign: 'center', marginBottom: spacing.space8 }}>
        <div style={{
          color: colors.teal,
          fontSize: typography.fontSizeXs,
          fontWeight: typography.fontWeightBold,
          letterSpacing: '2px',
          marginBottom: spacing.space6,
        }}>
          YOUR FINANCIAL MIRROR REFLECTION
        </div>

        {/* Score Circle */}
        <div style={{
          width: '180px',
          height: '180px',
          margin: `0 auto ${spacing.space6}`,
          borderRadius: radius.full,
          background: 'rgba(255,255,255,0.05)',
          border: `4px solid ${persona.color}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '56px', fontWeight: typography.fontWeightLight, color: persona.color }}>
            {finalScore}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: typography.fontSizeSm }}>CFPB-10</div>
        </div>

        {/* Persona Badge */}
        <div style={{
          background: `${persona.color}22`,
          border: `1px solid ${persona.color}44`,
          borderRadius: radius['2xl'],
          padding: `${spacing.space5} ${spacing.space8}`,
          display: 'inline-block',
        }}>
          <div style={{ color: persona.color, fontSize: typography.fontSizeXl, fontWeight: typography.fontWeightBold }}>
            {persona.name}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: typography.fontSizeBase, marginTop: spacing.space1 }}>
            {persona.desc}
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div style={{ display: 'flex', gap: spacing.space4, justifyContent: 'center' }}>
        <Button variant="secondary" onClick={resetAssessment}>
          Retake Assessment
        </Button>
        <Button variant="primary" size="lg" onClick={onContinue}>
          Continue to Builder's Table
          <Icon name="arrowRight" color={colors.white} size={18} />
        </Button>
      </div>
    </div>
  );
};

export default CFPBAssessment;
export { CFPB_QUESTIONS, SCALE_OPTIONS };
