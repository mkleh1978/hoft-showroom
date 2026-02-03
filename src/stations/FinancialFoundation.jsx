// ============================================================================
// Station 2: Financial Foundation
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
  FourPillars,
  BudgetCalculator,
  SubscriptionAudit,
  EmergencyFundCalculator,
  DebtFreedomSimulator,
} from '../components/stations/foundation';
import { useBudget, useRecommendations } from '../context/UserContext';

// Navigation sections
const SECTIONS = [
  { id: 'welcome', label: 'Start', icon: 'play' },
  { id: 'pillars', label: 'Four Pillars', icon: 'grid' },
  { id: 'budget', label: 'Budget', icon: 'wallet' },
  { id: 'emergency', label: 'Emergency Fund', icon: 'shield' },
  { id: 'debt', label: 'Debt Freedom', icon: 'target' },
  { id: 'aha', label: 'Key Insights', icon: 'lightbulb' },
];

/**
 * FinancialFoundation Station Component
 * Station 2 - Financial Foundation
 */
const FinancialFoundation = () => {
  const [activeSection, setActiveSection] = useState('welcome');

  // UserContext hooks
  const { monthlyIncome: savedIncome, budgetMethod: savedMethod, setBudgetData } = useBudget();
  const { recommendedBudgetMethod, cfpbScore } = useRecommendations();

  // Initialize with saved data or recommendations
  const [budgetIncome, setBudgetIncome] = useState(savedIncome || 3500);
  const [budgetMethod, setBudgetMethod] = useState(
    savedMethod || recommendedBudgetMethod || '50-30-20'
  );

  // Sync income changes to context
  const handleIncomeChange = (income) => {
    setBudgetIncome(income);
    setBudgetData({ monthlyIncome: income, budgetMethod });
  };

  // Sync method changes to context
  const handleMethodChange = (method) => {
    setBudgetMethod(method);
    setBudgetData({ monthlyIncome: budgetIncome, budgetMethod: method });
  };

  return (
    <PageContainer>
      <StationHeader
        stationNumber={2}
        title="Financial Foundation"
        subtitle="Budget · Emergency Fund · Debt Freedom"
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
            <div style={{ textAlign: 'center', marginBottom: spacing.space10 }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: colors.lightTeal,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: `0 auto ${spacing.space6}`,
                }}
              >
                <Icon name="wallet" color={colors.teal} size={40} />
              </div>
              <h2
                style={{
                  fontSize: typography.fontSize3xl,
                  color: colors.deepNavy,
                  fontWeight: '300',
                  margin: 0,
                }}
              >
                Welcome to <span style={{ color: colors.teal, fontWeight: '600' }}>Financial Foundation</span>
              </h2>
              <p
                style={{
                  fontSize: typography.fontSizeLg,
                  color: colors.steelGray,
                  marginTop: spacing.space4,
                  maxWidth: '600px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Budget, emergency fund, and debt management — the essential building blocks before wealth creation.
              </p>
            </div>

            {/* Key Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: spacing.space5,
                marginBottom: spacing.space10,
              }}
            >
              {[
                { icon: 'globe', value: '27%', label: 'No Overview', desc: 'of Germans lack financial overview' },
                { icon: 'barChart', value: '52%', label: 'Money Worries', desc: 'have weekly financial stress' },
                { icon: 'trendingUp', value: '3x', label: 'Auto-Save Boost', desc: 'more saved with automation' },
              ].map((stat, i) => (
                <Card key={i} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: colors.lightTeal,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: `0 auto ${spacing.space4}`,
                    }}
                  >
                    <Icon name={stat.icon} color={colors.teal} size={24} />
                  </div>
                  <div style={{ fontSize: typography.fontSize2xl, fontWeight: typography.fontWeightBold, color: colors.deepNavy }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: typography.fontSizeBase, fontWeight: typography.fontWeightSemibold, color: colors.teal, marginBottom: spacing.space1 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: typography.fontSizeSm, color: colors.steelGray }}>{stat.desc}</div>
                </Card>
              ))}
            </div>

            {/* Start Button */}
            <div style={{ textAlign: 'center' }}>
              <Button onClick={() => setActiveSection('pillars')}>
                Explore the Four Pillars
                <Icon name="arrowRight" color={colors.white} size={18} />
              </Button>
            </div>
          </div>
        )}

        {/* FOUR PILLARS SECTION */}
        {activeSection === 'pillars' && (
          <FourPillars onNavigate={setActiveSection} />
        )}

        {/* BUDGET SECTION */}
        {activeSection === 'budget' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: spacing.space6 }}>
            <BudgetCalculator
              income={budgetIncome}
              onIncomeChange={handleIncomeChange}
              method={budgetMethod}
              onMethodChange={handleMethodChange}
              onContinue={() => setActiveSection('emergency')}
              cfpbScore={cfpbScore}
              recommendedMethod={recommendedBudgetMethod}
            />
            <SubscriptionAudit />
          </div>
        )}

        {/* EMERGENCY FUND SECTION */}
        {activeSection === 'emergency' && (
          <EmergencyFundCalculator
            budgetMethod={budgetMethod}
            budgetIncome={budgetIncome}
            onContinue={() => setActiveSection('debt')}
          />
        )}

        {/* DEBT FREEDOM SECTION */}
        {activeSection === 'debt' && (
          <DebtFreedomSimulator onContinue={() => setActiveSection('aha')} />
        )}

        {/* AHA MOMENTS SECTION */}
        {activeSection === 'aha' && (
          <div>
            <SectionHeader label="KEY INSIGHTS" title="Aha Moments" centered />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: spacing.space5,
                marginBottom: spacing.space8,
              }}
            >
              {[
                { title: 'The Overview Myth', text: '52% of Germans have weekly money worries — often not due to low income, but lacking overview.' },
                { title: 'Automation Wins', text: 'People with automatic savings transfers save 3x more than those relying on willpower.' },
                { title: 'The Coffee Myth', text: '€4/day coffee = €1,460/year — nice, but the real money drains are fixed costs like rent and subscriptions.' },
                { title: 'Overdraft Trap', text: 'Overdraft credit costs 12-15% p.a. — the most expensive way to borrow. Pay it off first!' },
              ].map((aha, i) => (
                <Card key={i} variant="highlight">
                  <div style={{ fontWeight: typography.fontWeightBold, fontSize: typography.fontSizeLg, color: colors.deepNavy, marginBottom: spacing.space3 }}>
                    {aha.title}
                  </div>
                  <div style={{ fontSize: typography.fontSizeBase, color: colors.charcoal, lineHeight: 1.6 }}>{aha.text}</div>
                </Card>
              ))}
            </div>

            <Card variant="dark" style={{ textAlign: 'center' }}>
              <Icon name="lightbulb" color={colors.teal} size={40} />
              <h3 style={{ color: colors.white, fontSize: typography.fontSizeXl, fontWeight: '300', margin: `${spacing.space4} 0` }}>
                The Core Truth
              </h3>
              <p style={{ color: colors.lightTeal, fontSize: typography.fontSizeLg, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
                Budget, emergency fund, debt freedom — these are the three pillars of financial freedom.
                <strong style={{ color: colors.white }}> Those who know their financial foundation can build wealth. Those who ignore it will struggle.</strong>
              </p>
            </Card>
          </div>
        )}
      </MainContent>

      <StationFooter
        stationNumber={2}
        stationName="Financial Foundation"
        subtitle="Budget · Emergency Fund · Debt Freedom"
      />
    </PageContainer>
  );
};

export default FinancialFoundation;
