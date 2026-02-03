// ============================================================================
// Station 4: Investment Corner
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
  MagicTriangle,
  RiskProfiling,
  PortfolioBuilder,
  ESGAnalysis,
  LifePlanningCalculator,
} from '../components/stations/investment';
import { useInvestment, useRecommendations, useProtection, useGoals } from '../context/UserContext';

// Navigation sections
const SECTIONS = [
  { id: 'welcome', label: 'Start', icon: 'play' },
  { id: 'triangle', label: 'Magic Triangle', icon: 'triangle' },
  { id: 'risk', label: 'Risk Profile', icon: 'scale' },
  { id: 'portfolio', label: 'Portfolio Builder', icon: 'barChart' },
  { id: 'esg', label: 'ESG Analysis', icon: 'leaf' },
  { id: 'timeline', label: 'Life Planning', icon: 'clock' },
];

/**
 * Investment Station Component
 * Station 4 - Investment Corner
 */
const Investment = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [riskProfile, setRiskProfileLocal] = useState(null);
  const [portfolioAllocation, setPortfolioAllocationLocal] = useState({
    stocks: 60,
    bonds: 30,
    alternatives: 10,
  });

  // UserContext hooks
  const {
    setRiskProfile: setRiskProfileContext,
    setPortfolioAllocation: setPortfolioAllocationContext,
    investorProfile: savedProfile,
    riskScore: savedRiskScore,
    portfolioAllocation: savedAllocation,
  } = useInvestment();
  const { riskAdjustment, cfpbScore } = useRecommendations();
  const { age, pensionGap } = useProtection();
  const { goals } = useGoals();

  // Initialize from saved data
  useEffect(() => {
    if (savedProfile && !riskProfile) {
      setRiskProfileLocal({ profile: savedProfile, score: savedRiskScore });
    }
    if (savedAllocation && Object.keys(savedAllocation).length > 0) {
      setPortfolioAllocationLocal(savedAllocation);
    }
  }, [savedProfile, savedRiskScore, savedAllocation]);

  const handleRiskProfileComplete = (profile) => {
    // Apply CFPB-based risk adjustment
    const adjustedScore = Math.max(1, Math.min(10, profile.score + riskAdjustment));
    const adjustedProfile = { ...profile, score: adjustedScore };
    setRiskProfileLocal(adjustedProfile);
    // Persist to UserContext
    setRiskProfileContext(profile.profile, adjustedScore, profile.answers);
  };

  const handleAllocationChange = (allocation) => {
    setPortfolioAllocationLocal(allocation);
    // Persist to UserContext
    setPortfolioAllocationContext(allocation);
  };

  return (
    <PageContainer>
      <StationHeader
        stationNumber={4}
        title="Investment Corner"
        subtitle="WealthTech · Wealth Building · Investment Planning"
        icon="wallet"
      />

      <StationNav
        sections={SECTIONS}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <MainContent>
        {/* WELCOME SECTION */}
        {activeSection === 'welcome' && (
          <div>
            {/* Hero */}
            <div style={{ textAlign: 'center', padding: `${spacing.space8} 0 ${spacing.space10}` }}>
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.deepNavy} 100%)`,
                  borderRadius: '50%',
                  margin: `0 auto ${spacing.space6}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon name="trendingUp" color={colors.white} size={44} />
              </div>
              <h2
                style={{
                  fontSize: typography.fontSize3xl,
                  fontWeight: '300',
                  color: colors.deepNavy,
                  marginBottom: spacing.space3,
                  letterSpacing: '-0.5px',
                }}
              >
                How Does My Money Grow?
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  color: colors.steelGray,
                  maxWidth: '560px',
                  margin: '0 auto',
                  lineHeight: 1.6,
                }}
              >
                Discover how modern WealthTech solutions make professional investing
                accessible to everyone. From AI-powered risk profiling to ESG analysis.
              </p>
            </div>

            {/* Feature Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: spacing.space5,
                marginBottom: spacing.space10,
              }}
            >
              {[
                {
                  icon: 'target',
                  title: 'AI Risk Profiling',
                  desc: 'Intelligent assessment determines your personal risk tolerance through behavioral scenario analysis.',
                },
                {
                  icon: 'cpu',
                  title: 'Robo-Advisory',
                  desc: 'Algorithm-based portfolio management with automated rebalancing and tax-loss harvesting.',
                },
                {
                  icon: 'globe',
                  title: 'ESG Investing',
                  desc: 'Returns with responsibility. AI-powered analysis of environmental, social, and governance factors.',
                },
              ].map((item, i) => (
                <Card key={i} variant="accent">
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: colors.lightTeal,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: spacing.space5,
                    }}
                  >
                    <Icon name={item.icon} color={colors.teal} size={24} />
                  </div>
                  <h3
                    style={{
                      fontSize: typography.fontSizeLg,
                      fontWeight: typography.fontWeightBold,
                      color: colors.deepNavy,
                      marginBottom: spacing.space3,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: typography.fontSizeBase, color: colors.charcoal, lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>

            {/* Cost Comparison */}
            <Card style={{ marginBottom: spacing.space10 }}>
              <h3
                style={{
                  fontSize: typography.fontSizeLg,
                  fontWeight: typography.fontWeightBold,
                  color: colors.deepNavy,
                  marginBottom: spacing.space6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.space2,
                }}
              >
                <Icon name="calculator" color={colors.teal} size={18} />
                Cost Comparison: Robo-Advisory vs. Traditional
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.space6 }}>
                <div
                  style={{
                    backgroundColor: colors.lightTeal,
                    padding: spacing.space6,
                    borderRadius: '10px',
                    borderLeft: `6px solid ${colors.teal}`,
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: typography.fontWeightBold, color: colors.teal, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: spacing.space2 }}>
                    ROBO-ADVISORY
                  </div>
                  <div style={{ fontSize: '36px', color: colors.deepNavy, fontWeight: typography.fontWeightBold }}>0.3–0.7%</div>
                  <div style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>per year (TER)</div>
                </div>
                <div
                  style={{
                    backgroundColor: colors.offWhite,
                    padding: spacing.space6,
                    borderRadius: '10px',
                    borderLeft: `6px solid ${colors.steelGray}`,
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: typography.fontWeightBold, color: colors.steelGray, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: spacing.space2 }}>
                    ACTIVE FUNDS
                  </div>
                  <div style={{ fontSize: '36px', color: colors.deepNavy, fontWeight: typography.fontWeightBold }}>1.5–2.5%</div>
                  <div style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>per year (TER)</div>
                </div>
              </div>
              <div
                style={{
                  marginTop: spacing.space5,
                  padding: spacing.space4,
                  backgroundColor: colors.offWhite,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.space3,
                }}
              >
                <Icon name="info" color={colors.teal} size={18} />
                <span style={{ fontSize: typography.fontSizeSm, color: colors.charcoal }}>
                  <strong>30-Year Impact:</strong> A 1.5% fee difference reduces final wealth by up to 35%.
                </span>
              </div>
            </Card>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => setActiveSection('triangle')}>
                Start Interactive Tour
                <Icon name="arrowRight" color={colors.white} size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* MAGIC TRIANGLE SECTION */}
        {activeSection === 'triangle' && (
          <MagicTriangle onContinue={() => setActiveSection('risk')} />
        )}

        {/* RISK PROFILING SECTION */}
        {activeSection === 'risk' && (
          <RiskProfiling
            onComplete={handleRiskProfileComplete}
            onContinue={() => setActiveSection('portfolio')}
            cfpbScore={cfpbScore}
            riskAdjustment={riskAdjustment}
          />
        )}

        {/* PORTFOLIO BUILDER SECTION */}
        {activeSection === 'portfolio' && (
          <PortfolioBuilder
            initialAllocation={portfolioAllocation}
            onAllocationChange={handleAllocationChange}
            onContinue={() => setActiveSection('esg')}
          />
        )}

        {/* ESG ANALYSIS SECTION */}
        {activeSection === 'esg' && (
          <ESGAnalysis onContinue={() => setActiveSection('timeline')} />
        )}

        {/* LIFE PLANNING SECTION */}
        {activeSection === 'timeline' && (
          <LifePlanningCalculator
            prefillAge={age}
            prefillPensionGap={pensionGap}
            prefillGoals={goals}
          />
        )}
      </MainContent>

      <StationFooter
        stationNumber={4}
        stationName="Investment Corner"
        subtitle="WealthTech · Wealth Building · Investment Planning"
      />
    </PageContainer>
  );
};

export default Investment;
