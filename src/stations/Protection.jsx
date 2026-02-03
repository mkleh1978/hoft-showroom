// ============================================================================
// Station 3: Protection Point
// Refactored to use modular components
// ============================================================================

import React, { useState } from 'react';
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
  ThreePillars,
  AIRetirementPlanner,
  MonteCarloSimulation,
  LifeEventsSimulator,
  EuropeanComparison,
} from '../components/stations/protection';
import { useProtection, useBudget } from '../context/UserContext';

// Navigation sections
const SECTIONS = [
  { id: 'welcome', label: 'Start', icon: 'play' },
  { id: 'pillars', label: 'Three Pillars', icon: 'layers' },
  { id: 'planner', label: 'AI Planner', icon: 'calculator' },
  { id: 'simulation', label: 'Monte Carlo', icon: 'trendingUp' },
  { id: 'events', label: 'Life Events', icon: 'refresh' },
  { id: 'europe', label: 'EU Compare', icon: 'globe' },
  { id: 'aha', label: 'Key Insights', icon: 'lightbulb' },
];

// Aha moments data
const AHA_DATA = [
  { num: 1, title: 'The 20-Year Gap', stat: '3×', desc: 'Starting at 45 vs 55 triples your retirement assets. €500/month at 6%: €250k vs €85k.' },
  { num: 2, title: 'Disability Reality', stat: '1 in 4', desc: 'One in four becomes disabled before retirement. Statutory coverage only 30-40%.' },
  { num: 3, title: 'Longevity Risk', stat: '€360k', desc: "25% of 65-year-olds reach 95. That's 10 extra years at €3,000/month to fund." },
  { num: 4, title: 'Part-Time Wins', stat: 'Better', desc: 'Gradual retirement from 55 often beats hard stop at 60 financially.' },
];

/**
 * Protection Station Component
 * Station 3 - Protection Point
 */
const Protection = () => {
  const [activeSection, setActiveSection] = useState('welcome');
  const [userData, setUserData] = useState({});
  const [simulationResult, setSimulationResultLocal] = useState(null);

  // UserContext hooks
  const { setProtectionData, setSimulationResult: setSimulationResultContext } = useProtection();
  const { monthlyIncome } = useBudget();

  const handlePlannerComplete = (data) => {
    setUserData(data);
    // Persist to UserContext
    setProtectionData({
      age: data.calculatedAge || data.age,
      grossIncome: data.calculatedIncome || data.income,
      pensionGap: data.gap,
      expectedPension: data.pension,
      requiredMonthly: data.required,
    });
  };

  const handleSimulationComplete = (result) => {
    setSimulationResultLocal(result);
    // Persist to UserContext
    setSimulationResultContext(result);
  };

  return (
    <PageContainer>
      <StationHeader
        stationNumber={3}
        title="Protection Point"
        subtitle="InsurTech · Retirement Planning · Pension Analysis"
        icon="shield"
        stats={[
          { icon: 'target', value: '48%', label: 'DE Rate' },
          { icon: 'users', value: '1 in 4', label: 'Disability' },
        ]}
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
            <div style={{ textAlign: 'center', marginBottom: spacing.space12 }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: colors.lightTeal,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: `0 auto ${spacing.space6}`,
                }}
              >
                <Icon name="shield" color={colors.teal} size={40} />
              </div>
              <h2 style={{ fontSize: typography.fontSize3xl, color: colors.deepNavy, fontWeight: '300', margin: 0 }}>
                Welcome to <span style={{ color: colors.teal, fontWeight: '600' }}>Protection Point</span>
              </h2>
              <p style={{ fontSize: typography.fontSizeLg, color: colors.steelGray, marginTop: spacing.space4, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Retirement planning, risk protection, and pension analysis — powered by AI and Monte Carlo simulation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing.space5, marginBottom: spacing.space12 }}>
              {[
                { icon: 'layers', label: 'Three Pillars', desc: 'German pension system' },
                { icon: 'calculator', label: 'AI Planner', desc: 'Calculate your gap' },
                { icon: 'trendingUp', label: 'Monte Carlo', desc: '500 scenarios' },
                { icon: 'globe', label: 'EU Compare', desc: '5 countries' },
              ].map((item, i) => (
                <Card key={i}>
                  <Icon name={item.icon} color={colors.teal} size={32} />
                  <h4 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightSemibold, color: colors.deepNavy, margin: `${spacing.space4} 0 ${spacing.space2}` }}>
                    {item.label}
                  </h4>
                  <p style={{ fontSize: typography.fontSizeSm, color: colors.steelGray, margin: 0 }}>{item.desc}</p>
                </Card>
              ))}
            </div>

            <Card variant="highlight">
              <h3 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: `0 0 ${spacing.space3}`, display: 'flex', alignItems: 'center', gap: spacing.space3 }}>
                <Icon name="alertCircle" color={colors.teal} size={24} />
                The Pension Gap
              </h3>
              <p style={{ fontSize: typography.fontSizeBase, color: colors.charcoal, margin: 0, lineHeight: 1.7 }}>
                The difference between your last net salary and expected pension. For €50,000 gross income, the typical gap is <strong>€800-1,200 monthly</strong>.
              </p>
            </Card>

            <div style={{ textAlign: 'center', marginTop: spacing.space12 }}>
              <Button onClick={() => setActiveSection('pillars')}>
                Start the Journey <Icon name="arrowRight" color={colors.white} size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* THREE PILLARS SECTION */}
        {activeSection === 'pillars' && (
          <ThreePillars onContinue={() => setActiveSection('planner')} />
        )}

        {/* AI PLANNER SECTION */}
        {activeSection === 'planner' && (
          <AIRetirementPlanner
            onComplete={handlePlannerComplete}
            onContinue={() => setActiveSection('simulation')}
            prefillIncome={monthlyIncome}
          />
        )}

        {/* MONTE CARLO SECTION */}
        {activeSection === 'simulation' && (
          <MonteCarloSimulation
            userData={userData}
            onComplete={handleSimulationComplete}
            onContinue={() => setActiveSection('events')}
          />
        )}

        {/* LIFE EVENTS SECTION */}
        {activeSection === 'events' && (
          <LifeEventsSimulator onContinue={() => setActiveSection('europe')} />
        )}

        {/* EUROPEAN COMPARISON SECTION */}
        {activeSection === 'europe' && (
          <EuropeanComparison onContinue={() => setActiveSection('aha')} />
        )}

        {/* AHA MOMENTS SECTION */}
        {activeSection === 'aha' && (
          <div>
            <SectionHeader label="KEY INSIGHTS" title="Aha Moments" />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: spacing.space5 }}>
              {AHA_DATA.map((aha, i) => (
                <Card key={i} variant="accent" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
                    <Icon name="lightbulb" color={colors.deepNavy} size={120} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ fontSize: '11px', fontWeight: typography.fontWeightBold, color: colors.teal, letterSpacing: '2px' }}>
                      AHA MOMENT #{aha.num}
                    </span>
                    <h3 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: `${spacing.space3} 0 ${spacing.space4}` }}>
                      {aha.title}
                    </h3>
                    <div style={{ fontSize: typography.fontSize4xl, fontWeight: typography.fontWeightBold, color: colors.teal, marginBottom: spacing.space3 }}>
                      {aha.stat}
                    </div>
                    <p style={{ fontSize: typography.fontSizeBase, color: colors.steelGray, lineHeight: 1.6, margin: 0 }}>{aha.desc}</p>
                  </div>
                </Card>
              ))}
            </div>

            {userData.gap && (
              <Card variant="highlight" style={{ marginTop: spacing.space8 }}>
                <h3 style={{ fontSize: typography.fontSizeLg, fontWeight: typography.fontWeightBold, color: colors.deepNavy, margin: `0 0 ${spacing.space4}`, display: 'flex', alignItems: 'center', gap: spacing.space3 }}>
                  <Icon name="checkCircle" color={colors.teal} size={24} />
                  Your Personal Summary
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>Monthly Gap</div>
                    <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightBold, color: colors.deepNavy }}>
                      €{userData.gap?.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>Expected Pension</div>
                    <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightBold, color: colors.deepNavy }}>
                      €{userData.pension?.toLocaleString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>Required Monthly</div>
                    <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightBold, color: colors.deepNavy }}>
                      €{userData.required?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <Card variant="accent" style={{ marginTop: spacing.space6, textAlign: 'center' }}>
              <Icon name="shield" color={colors.teal} size={40} />
              <h3 style={{ fontSize: typography.fontSizeXl, color: colors.deepNavy, margin: `${spacing.space4} 0 ${spacing.space3}`, fontWeight: typography.fontWeightBold }}>
                The Core Message
              </h3>
              <p style={{ fontSize: '15px', color: colors.charcoal, margin: 0, lineHeight: 1.7, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                Retirement planning is not a luxury — it's a necessity. AI makes the complexity manageable.
                <strong> Those who know their pension gap can close it. Those who ignore it will be surprised by it.</strong>
              </p>
            </Card>
          </div>
        )}
      </MainContent>

      <StationFooter
        stationNumber={3}
        stationName="Protection Point"
        subtitle="InsurTech · Retirement Planning · Pension Analysis"
      />
    </PageContainer>
  );
};

export default Protection;
