// ============================================================================
// Station 1: Financial Education - Measurement Station
// Refactored to use modular components
// ============================================================================

import React, { useState, useEffect } from 'react';
import { colors, typography, spacing } from '../styles/designTokens';
import Icon from '../components/icons';
import {
  Button,
  Card,
  StationHeader,
  StationNav,
  PageContainer,
  MainContent,
  StationFooter,
  SectionHeader,
} from '../components/ui';
import {
  CFPBAssessment,
  GoalBuilder,
  CommunityWall,
  getPersona,
  CFPB_QUESTIONS,
} from '../components/stations/education';
import { useCFPB, useGoals } from '../context/UserContext';

// Navigation sections
const SECTIONS = [
  { id: 'welcome', label: 'Start', icon: 'play' },
  { id: 'mirror', label: 'Financial Mirror', icon: 'mirror' },
  { id: 'builder', label: "Builder's Table", icon: 'target' },
  { id: 'community', label: 'Community Wall', icon: 'users' },
  { id: 'insights', label: 'Key Insights', icon: 'lightbulb' },
];

/**
 * FinancialEducation Station Component
 * Station 1 - Measurement Station
 */
const FinancialEducation = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [finalScore, setFinalScore] = useState(null);
  const [communityScores, setCommunityScores] = useState([]);
  const [goals, setGoals] = useState([]);

  // UserContext hooks for persistence
  const { score: savedScore, setCFPBResult } = useCFPB();
  const { goals: savedGoals, addGoal } = useGoals();

  // Initialize from saved data and community data
  useEffect(() => {
    // Restore saved score from context
    if (savedScore && !finalScore) {
      setFinalScore(savedScore);
    }
    // Restore saved goals from context
    if (savedGoals && savedGoals.length > 0 && goals.length === 0) {
      setGoals(savedGoals);
    }
    // Initialize community data
    setCommunityScores(
      Array.from({ length: 150 }, () => ({
        score: Math.floor(Math.random() * 50) + 35,
        timestamp: Date.now() - Math.random() * 86400000,
      }))
    );
  }, [savedScore, savedGoals]);

  const handleAssessmentComplete = (result) => {
    setFinalScore(result.score);
    setCommunityScores((prev) => [...prev, { score: result.score, timestamp: Date.now() }]);
    // Persist to UserContext
    setCFPBResult(result.score, result.persona, result.answers);
  };

  const handleGoalAdd = (goal) => {
    if (!goals.find((g) => g.id === goal.id)) {
      setGoals([...goals, goal]);
      // Persist to UserContext
      addGoal(goal);
    }
  };

  return (
    <PageContainer>
      <StationHeader
        stationNumber={1}
        title="Measurement Station"
        subtitle="Financial Education"
        icon="mirror"
      />

      <StationNav
        sections={SECTIONS}
        activeSection={activeSection}
        onSectionChange={(id) => {
          setActiveSection(id);
        }}
      />

      <MainContent>
        {/* WELCOME SECTION */}
        {activeSection === 'welcome' && (
          <div>
            <SectionHeader
              label="FINANCIAL EDUCATION"
              title="Discover Your Financial Wellbeing"
              description="Take a 3-minute science-backed assessment using the CFPB-10 methodology, set personalized goals, and see how you compare to the community."
            />

            {/* Journey Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: spacing.space6,
                marginBottom: spacing.space10,
              }}
            >
              {[
                {
                  icon: 'mirror',
                  title: 'Financial Mirror',
                  desc: 'Answer 10 questions to calculate your CFPB score and discover your financial persona.',
                  color: colors.teal,
                },
                {
                  icon: 'target',
                  title: "Builder's Table",
                  desc: 'Set life goals, customize targets, and see projections with compound growth.',
                  color: colors.amber,
                },
                {
                  icon: 'users',
                  title: 'Community Wall',
                  desc: 'Compare your score anonymously with other visitors and find your percentile.',
                  color: colors.green,
                },
              ].map((card, i) => (
                <Card key={i} variant="accent" style={{ borderTopColor: card.color }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      background: `${card.color}15`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.space5,
                    }}
                  >
                    <Icon name={card.icon} color={card.color} size={28} />
                  </div>
                  <h3
                    style={{
                      color: colors.deepNavy,
                      fontSize: typography.fontSizeLg,
                      fontWeight: typography.fontWeightBold,
                      margin: `0 0 ${spacing.space3} 0`,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: colors.steelGray,
                      fontSize: typography.fontSizeBase,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {card.desc}
                  </p>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.deepNavy} 100%)`,
                borderRadius: '16px',
                padding: spacing.space12,
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  color: colors.white,
                  fontSize: typography.fontSize2xl,
                  fontWeight: typography.fontWeightSemibold,
                  margin: `0 0 ${spacing.space4} 0`,
                }}
              >
                Ready to begin?
              </h3>
              <p
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '15px',
                  marginBottom: spacing.space6,
                }}
              >
                ~3 minutes | Private & Secure | CFPB-10 Validated Methodology
              </p>
              <Button variant="light" onClick={() => setActiveSection('mirror')}>
                Start Assessment
                <Icon name="arrowRight" color={colors.deepNavy} size={20} />
              </Button>
            </div>
          </div>
        )}

        {/* MIRROR SECTION - Assessment */}
        {activeSection === 'mirror' && (
          <CFPBAssessment
            onComplete={handleAssessmentComplete}
            onContinue={() => setActiveSection('builder')}
          />
        )}

        {/* BUILDER SECTION */}
        {activeSection === 'builder' && (
          <GoalBuilder
            goals={goals}
            onGoalAdd={handleGoalAdd}
            onContinue={() => setActiveSection('community')}
          />
        )}

        {/* COMMUNITY SECTION */}
        {activeSection === 'community' && (
          <CommunityWall
            communityScores={communityScores}
            userScore={finalScore}
            onContinue={() => setActiveSection('insights')}
          />
        )}

        {/* INSIGHTS SECTION */}
        {activeSection === 'insights' && (
          <div>
            <SectionHeader
              label="KEY INSIGHTS"
              title="Your Financial Wellbeing Summary"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: spacing.space6,
              }}
            >
              {[
                {
                  title: 'What you measure, you can manage',
                  desc: 'The CFPB-10 score provides an objective baseline for tracking your financial progress over time.',
                },
                {
                  title: 'Financial wellbeing is multidimensional',
                  desc: 'Your score reflects security, freedom, control, and future planning - not just income or savings.',
                },
                {
                  title: 'Small changes compound dramatically',
                  desc: 'Even modest monthly contributions can grow significantly through the power of compound interest.',
                },
                {
                  title: "You're not alone",
                  desc: 'Comparing with peers helps normalize the financial journey and identify common challenges.',
                },
              ].map((insight, i) => (
                <Card key={i} variant="accent">
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      background: colors.lightTeal,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.space4,
                    }}
                  >
                    <Icon name="lightbulb" color={colors.teal} size={20} />
                  </div>
                  <h3
                    style={{
                      color: colors.deepNavy,
                      fontSize: typography.fontSizeLg,
                      fontWeight: typography.fontWeightBold,
                      margin: `0 0 ${spacing.space3} 0`,
                    }}
                  >
                    {insight.title}
                  </h3>
                  <p
                    style={{
                      color: colors.steelGray,
                      fontSize: typography.fontSizeBase,
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {insight.desc}
                  </p>
                </Card>
              ))}
            </div>

            {/* Summary Card */}
            {finalScore && (
              <div
                style={{
                  marginTop: spacing.space8,
                  background: `linear-gradient(135deg, ${colors.deepNavy} 0%, ${colors.teal} 100%)`,
                  borderRadius: '16px',
                  padding: spacing.space12,
                  textAlign: 'center',
                  color: colors.white,
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: typography.fontWeightBold,
                    letterSpacing: '2px',
                    marginBottom: spacing.space4,
                    opacity: 0.8,
                  }}
                >
                  YOUR JOURNEY SNAPSHOT
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: spacing.space12 }}>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '200' }}>{finalScore}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7 }}>CFPB Score</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '200' }}>
                      {getPersona(finalScore).name.split(' ')[1]}
                    </div>
                    <div style={{ fontSize: '13px', opacity: 0.7 }}>Persona</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '200' }}>{goals.length}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7 }}>Goals Set</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </MainContent>

      <StationFooter
        stationNumber={1}
        stationName="Measurement Station"
        subtitle="Financial Education"
      />
    </PageContainer>
  );
};

export default FinancialEducation;
