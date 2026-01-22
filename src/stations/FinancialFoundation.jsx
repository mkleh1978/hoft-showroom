import React, { useState, useEffect } from 'react';

// ============================================
// DESIGN SYSTEM - CSS Variables
// ============================================
const cssVars = {
  // Colors
  colorDeepNavy: '#0B1F3A',
  colorCharcoal: '#1A1A2E',
  colorWhite: '#FFFFFF',
  colorOffWhite: '#F8F9FA',
  colorTeal: '#0D9488',
  colorLightTeal: '#CCFBF1',
  colorSteelGray: '#6B7280',
  colorRed: '#DC2626',
  colorAmber: '#D97706',
  colorGreen: '#059669',
  colorBorder: '#E5E7EB',

  // Typography
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSizeXs: '10px',
  fontSizeSm: '12px',
  fontSizeBase: '14px',
  fontSizeLg: '16px',
  fontSizeXl: '20px',
  fontSize2xl: '24px',
  fontSize3xl: '32px',
  fontSize4xl: '44px',

  // Spacing
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space8: '32px',
  space10: '40px',
  space12: '48px',

  // Radius
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  radiusXl: '10px',
  radius2xl: '12px',

  // Shadows
  shadowSm: '0 2px 16px rgba(11, 31, 58, 0.06)',
  shadowMd: '0 4px 24px rgba(11, 31, 58, 0.08)',

  // Layout
  maxWidth: '1200px',
};

// ============================================
// ICON COMPONENTS (Stroke-based, 2px)
// ============================================
const Icons = {
  play: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  grid: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  ),
  wallet: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
      <path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/>
    </svg>
  ),
  shield: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  target: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  lightbulb: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18"/>
      <line x1="10" y1="22" x2="14" y2="22"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  barChart: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  trendingUp: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  check: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  arrowRight: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  user: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  users: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  briefcase: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  zap: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  clock: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  dollarSign: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  globe: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

// ============================================
// REUSABLE STYLES
// ============================================
const cardStyle = {
  backgroundColor: cssVars.colorWhite,
  borderRadius: cssVars.radius2xl,
  boxShadow: cssVars.shadowSm,
  padding: cssVars.space6,
};

const cardAccentStyle = {
  ...cardStyle,
  borderTop: `4px solid ${cssVars.colorTeal}`,
};

const highlightBoxStyle = {
  backgroundColor: cssVars.colorLightTeal,
  borderRadius: cssVars.radius2xl,
  padding: cssVars.space6,
  borderLeft: `6px solid ${cssVars.colorTeal}`,
};

const buttonPrimaryStyle = {
  backgroundColor: cssVars.colorTeal,
  color: cssVars.colorWhite,
  border: 'none',
  borderRadius: cssVars.radiusMd,
  padding: `${cssVars.space3} ${cssVars.space5}`,
  fontSize: cssVars.fontSizeBase,
  fontWeight: '600',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: cssVars.space2,
  fontFamily: 'inherit',
};

const sectionLabelStyle = {
  fontSize: cssVars.fontSizeXs,
  fontWeight: '700',
  color: cssVars.colorTeal,
  letterSpacing: '2px',
  textTransform: 'uppercase',
  marginBottom: cssVars.space2,
};

// ============================================
// MAIN COMPONENT
// ============================================
const FinancialFoundation = () => {
  // Navigation state
  const [activeSection, setActiveSection] = useState('welcome');

  // Budget state
  const [budgetIncome, setBudgetIncome] = useState(3500);
  const [budgetMethod, setBudgetMethod] = useState('50-30-20');

  // Emergency state
  const [monthlyExpenses, setMonthlyExpenses] = useState(2200);
  const [emergencySituation, setEmergencySituation] = useState('single');

  // Debt state
  const [debtMethod, setDebtMethod] = useState('avalanche');
  const [extraPayment, setExtraPayment] = useState(150);

  // Subscription state
  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Netflix', amount: 12.99, needed: true },
    { id: 2, name: 'Spotify', amount: 9.99, needed: true },
    { id: 3, name: 'Disney+', amount: 8.99, needed: false },
    { id: 4, name: 'Gym', amount: 29.99, needed: true },
    { id: 5, name: 'Fitness App', amount: 14.99, needed: false },
    { id: 6, name: 'Cloud Storage', amount: 9.99, needed: true },
    { id: 7, name: 'Magazine', amount: 7.99, needed: false },
    { id: 8, name: 'Meditation', amount: 12.99, needed: false },
  ]);

  // Navigation sections
  const sections = [
    { id: 'welcome', label: 'Start', icon: Icons.play },
    { id: 'pillars', label: 'Four Pillars', icon: Icons.grid },
    { id: 'budget', label: 'Budget', icon: Icons.wallet },
    { id: 'emergency', label: 'Emergency Fund', icon: Icons.shield },
    { id: 'debt', label: 'Debt Freedom', icon: Icons.target },
    { id: 'aha', label: 'Key Insights', icon: Icons.lightbulb },
  ];

  // Data
  const debts = [
    { id: 1, name: 'Overdraft', amount: 2500, rate: 12, minPayment: 50 },
    { id: 2, name: 'Electronics Loan', amount: 3000, rate: 10, minPayment: 80 },
    { id: 3, name: 'Furniture Loan', amount: 3000, rate: 8, minPayment: 70 },
  ];

  const budgetMethods = {
    '50-30-20': { needs: 50, wants: 30, savings: 20 },
    'zero-based': { needs: 55, wants: 25, savings: 20 },
    'pay-yourself': { needs: 50, wants: 20, savings: 30 },
  };

  const emergencyMultipliers = {
    single: { months: 3, label: 'Single, secure job' },
    family: { months: 4, label: 'Family, two incomes' },
    sole: { months: 6, label: 'Sole earner' },
    self: { months: 9, label: 'Self-employed' },
  };

  // Calculations
  const currentBudget = budgetMethods[budgetMethod];
  const emergencyTarget = monthlyExpenses * emergencyMultipliers[emergencySituation].months;
  const sortedDebts = [...debts].sort((a, b) => debtMethod === 'avalanche' ? b.rate - a.rate : a.amount - b.amount);
  const totalDebt = debts.reduce((sum, d) => sum + d.amount, 0);
  const totalInterest = debts.reduce((sum, d) => sum + (d.amount * d.rate / 100), 0);
  const totalSubscriptions = subscriptions.reduce((sum, s) => sum + s.amount, 0);
  const potentialSavings = subscriptions.filter(s => !s.needed).reduce((sum, s) => sum + s.amount, 0);
  const monthlySavings = Math.round(budgetIncome * currentBudget.savings / 100);
  const monthsToGoal = Math.ceil(emergencyTarget / monthlySavings);
  const debtFreeMonths = Math.ceil(totalDebt / (200 + extraPayment));
  const interestSaved = Math.round(totalInterest * 0.3 * (extraPayment / 100));

  const toggleSubscription = (id) => {
    setSubscriptions(subscriptions.map(s => s.id === id ? { ...s, needed: !s.needed } : s));
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div style={{ fontFamily: cssVars.fontFamily, minHeight: '100vh', backgroundColor: cssVars.colorOffWhite, paddingBottom: '80px' }}>

      {/* ===================== HEADER ===================== */}
      <header style={{
        backgroundColor: cssVars.colorDeepNavy,
        padding: `${cssVars.space4} ${cssVars.space6}`,
        borderBottom: `4px solid ${cssVars.colorTeal}`,
      }}>
        <div style={{ maxWidth: cssVars.maxWidth, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space4 }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: cssVars.radiusLg,
              backgroundColor: cssVars.colorTeal,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cssVars.colorWhite,
              fontWeight: '700',
              fontSize: cssVars.fontSizeSm,
            }}>HoFT</div>
            <div>
              <div style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorLightTeal, letterSpacing: '1px', fontWeight: '600' }}>STATION 2</div>
              <div style={{ fontSize: cssVars.fontSizeLg, fontWeight: '600', color: cssVars.colorWhite }}>Financial Foundation</div>
            </div>
          </div>
          <div style={{
            backgroundColor: cssVars.colorLightTeal,
            color: cssVars.colorTeal,
            padding: `${cssVars.space1} ${cssVars.space3}`,
            borderRadius: cssVars.radiusSm,
            fontSize: cssVars.fontSizeXs,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>Station 2 of 6</div>
        </div>
      </header>

      {/* ===================== NAV TABS ===================== */}
      <nav style={{
        backgroundColor: cssVars.colorWhite,
        borderBottom: `1px solid ${cssVars.colorBorder}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: cssVars.maxWidth, margin: '0 auto', display: 'flex', padding: `0 ${cssVars.space6}` }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: cssVars.space2,
                padding: `${cssVars.space4} ${cssVars.space5}`,
                border: 'none',
                background: 'transparent',
                borderBottom: activeSection === section.id ? `3px solid ${cssVars.colorTeal}` : '3px solid transparent',
                color: activeSection === section.id ? cssVars.colorTeal : cssVars.colorCharcoal,
                fontSize: cssVars.fontSizeSm,
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s ease',
              }}
            >
              <section.icon color={activeSection === section.id ? cssVars.colorTeal : cssVars.colorSteelGray} size={18} />
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ===================== MAIN CONTENT ===================== */}
      <main style={{ maxWidth: cssVars.maxWidth, margin: '0 auto', padding: `${cssVars.space8} ${cssVars.space6}` }}>

        {/* ==================== WELCOME ==================== */}
        {activeSection === 'welcome' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: cssVars.space10 }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: cssVars.colorLightTeal,
                borderRadius: cssVars.radius2xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginBottom: cssVars.space6,
              }}>
                <Icons.wallet color={cssVars.colorTeal} size={40} />
              </div>
              <h2 style={{ fontSize: cssVars.fontSize3xl, color: cssVars.colorDeepNavy, fontWeight: '300', margin: 0 }}>
                Welcome to <span style={{ color: cssVars.colorTeal, fontWeight: '600' }}>Financial Foundation</span>
              </h2>
              <p style={{ fontSize: cssVars.fontSizeLg, color: cssVars.colorSteelGray, marginTop: cssVars.space4, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Budget, emergency fund, and debt management — the essential building blocks before wealth creation.
              </p>
            </div>

            {/* Key Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: cssVars.space5, marginBottom: cssVars.space10 }}>
              {[
                { icon: Icons.globe, value: '27%', label: 'No Overview', desc: 'of Germans lack financial overview' },
                { icon: Icons.barChart, value: '52%', label: 'Money Worries', desc: 'have weekly financial stress' },
                { icon: Icons.trendingUp, value: '3x', label: 'Auto-Save Boost', desc: 'more saved with automation' },
              ].map((stat, i) => (
                <div key={i} style={{ ...cardStyle, textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: cssVars.colorLightTeal,
                    borderRadius: cssVars.radiusXl,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    marginBottom: cssVars.space4,
                  }}>
                    <stat.icon color={cssVars.colorTeal} size={24} />
                  </div>
                  <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: '700', color: cssVars.colorDeepNavy }}>{stat.value}</div>
                  <div style={{ fontSize: cssVars.fontSizeBase, fontWeight: '600', color: cssVars.colorTeal, marginBottom: cssVars.space1 }}>{stat.label}</div>
                  <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray }}>{stat.desc}</div>
                </div>
              ))}
            </div>

            {/* Start Button */}
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => setActiveSection('pillars')} style={buttonPrimaryStyle}>
                Explore the Four Pillars
                <Icons.arrowRight color={cssVars.colorWhite} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== FOUR PILLARS ==================== */}
        {activeSection === 'pillars' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: cssVars.space8 }}>
              <div style={sectionLabelStyle}>The Foundation</div>
              <h2 style={{ fontSize: cssVars.fontSize2xl, color: cssVars.colorDeepNavy, fontWeight: '700', margin: 0 }}>
                Four Pillars of Financial Stability
              </h2>
              <p style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, marginTop: cssVars.space3 }}>
                Before wealth building or retirement planning, the financial foundation must be in place.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: cssVars.space5, marginBottom: cssVars.space8 }}>
              {[
                { icon: Icons.barChart, title: 'Financial Overview', desc: 'Record all accounts, contracts, liabilities; monthly tracking', stat: '27%', statLabel: 'lack overview', section: 'budget' },
                { icon: Icons.wallet, title: 'Budget & Cash Flow', desc: 'Income-expense management; budgeting methods; spending categories', stat: '3x', statLabel: 'more savings', section: 'budget' },
                { icon: Icons.shield, title: 'Emergency Fund', desc: '3-6 months expenses; liquid reserves; shock protection', stat: '3-12', statLabel: 'months target', section: 'emergency' },
                { icon: Icons.target, title: 'Debt Freedom', desc: 'Eliminate consumer debt; repayment strategies; refinancing', stat: '12%', statLabel: 'overdraft cost', section: 'debt' },
              ].map((pillar, i) => (
                <div key={i} style={cardAccentStyle}>
                  <div style={{ display: 'flex', gap: cssVars.space4 }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      backgroundColor: cssVars.colorLightTeal,
                      borderRadius: cssVars.radiusXl,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <pillar.icon color={cssVars.colorTeal} size={28} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeLg, color: cssVars.colorDeepNavy, marginBottom: cssVars.space2 }}>{pillar.title}</div>
                      <div style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, lineHeight: 1.5, marginBottom: cssVars.space4 }}>{pillar.desc}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontSize: cssVars.fontSizeXl, fontWeight: '700', color: cssVars.colorTeal }}>{pillar.stat}</span>
                          <span style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray, marginLeft: cssVars.space2 }}>{pillar.statLabel}</span>
                        </div>
                        <button onClick={() => setActiveSection(pillar.section)} style={{ ...buttonPrimaryStyle, padding: `${cssVars.space2} ${cssVars.space4}`, fontSize: cssVars.fontSizeSm }}>
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={highlightBoxStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: cssVars.space4 }}>
                <Icons.lightbulb color={cssVars.colorTeal} size={24} />
                <div>
                  <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeLg, color: cssVars.colorDeepNavy, marginBottom: cssVars.space2 }}>Core Message</div>
                  <div style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorCharcoal, lineHeight: 1.6 }}>
                    Budget, emergency fund, debt freedom — these are the three pillars of financial freedom.
                    Before anyone thinks about wealth building or retirement planning, <strong>the financial foundation must be in place.</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== BUDGET ==================== */}
        {activeSection === 'budget' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: cssVars.space6 }}>
            <div>
              <div style={{ marginBottom: cssVars.space6 }}>
                <div style={sectionLabelStyle}>Budget Calculator</div>
                <h2 style={{ fontSize: cssVars.fontSize2xl, color: cssVars.colorDeepNavy, fontWeight: '700', margin: 0 }}>
                  Choose Your Budgeting Method
                </h2>
              </div>

              <div style={cardAccentStyle}>
                <div style={{ marginBottom: cssVars.space5 }}>
                  <label style={{ display: 'block', fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal, marginBottom: cssVars.space2 }}>
                    Monthly Net Income
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeLg, fontWeight: '500' }}>€</span>
                    <input
                      type="number"
                      value={budgetIncome}
                      onChange={(e) => setBudgetIncome(Number(e.target.value))}
                      style={{ width: '100%', padding: '12px 14px 12px 32px', fontSize: cssVars.fontSizeLg, fontWeight: '600', border: `2px solid ${cssVars.colorLightTeal}`, borderRadius: cssVars.radiusMd, outline: 'none', boxSizing: 'border-box', color: cssVars.colorDeepNavy, fontFamily: 'inherit' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: cssVars.space5 }}>
                  <label style={{ display: 'block', fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal, marginBottom: cssVars.space2 }}>
                    Budgeting Method
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space2 }}>
                    {[
                      { id: '50-30-20', name: '50-30-20 Rule', desc: 'Simple & flexible, for beginners' },
                      { id: 'zero-based', name: 'Zero-Based', desc: 'Maximum control, higher effort' },
                      { id: 'pay-yourself', name: 'Pay Yourself First', desc: 'Automation beats willpower' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setBudgetMethod(m.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: cssVars.space3, padding: cssVars.space4,
                          backgroundColor: budgetMethod === m.id ? cssVars.colorTeal : cssVars.colorOffWhite,
                          color: budgetMethod === m.id ? cssVars.colorWhite : cssVars.colorCharcoal,
                          border: `2px solid ${budgetMethod === m.id ? cssVars.colorTeal : 'transparent'}`,
                          borderRadius: cssVars.radiusLg, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                        }}
                      >
                        <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${budgetMethod === m.id ? cssVars.colorWhite : cssVars.colorSteelGray}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {budgetMethod === m.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cssVars.colorWhite }} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: cssVars.fontSizeBase }}>{m.name}</div>
                          <div style={{ fontSize: cssVars.fontSizeSm, opacity: 0.8 }}>{m.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Bar */}
                <div style={{ marginBottom: cssVars.space5 }}>
                  <div style={{ display: 'flex', borderRadius: cssVars.radiusLg, overflow: 'hidden', height: '48px' }}>
                    <div style={{ width: `${currentBudget.needs}%`, backgroundColor: cssVars.colorDeepNavy, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: cssVars.fontSizeSm, fontWeight: '600' }}>{currentBudget.needs}%</div>
                    <div style={{ width: `${currentBudget.wants}%`, backgroundColor: cssVars.colorTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: cssVars.fontSizeSm, fontWeight: '600' }}>{currentBudget.wants}%</div>
                    <div style={{ width: `${currentBudget.savings}%`, backgroundColor: cssVars.colorGreen, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: cssVars.fontSizeSm, fontWeight: '600' }}>{currentBudget.savings}%</div>
                  </div>
                </div>

                {/* Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space3 }}>
                  {[
                    { label: 'Needs', desc: 'Rent, utilities, groceries, insurance', pct: currentBudget.needs, color: cssVars.colorDeepNavy },
                    { label: 'Wants', desc: 'Entertainment, dining out, hobbies', pct: currentBudget.wants, color: cssVars.colorTeal },
                    { label: 'Savings', desc: 'Emergency fund, investments, goals', pct: currentBudget.savings, color: cssVars.colorGreen },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: cssVars.space4, backgroundColor: cssVars.colorOffWhite, borderRadius: cssVars.radiusLg, borderLeft: `4px solid ${item.color}` }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: cssVars.fontSizeBase, color: cssVars.colorDeepNavy }}>{item.label}</div>
                        <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray }}>{item.desc}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeXl, color: cssVars.colorDeepNavy }}>€{Math.round(budgetIncome * item.pct / 100).toLocaleString()}</div>
                        <div style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray }}>per month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar: Subscription Audit */}
            <div>
              <div style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: cssVars.space4 }}>
                  <h4 style={{ margin: 0, fontSize: cssVars.fontSizeLg, fontWeight: '700', color: cssVars.colorDeepNavy }}>Subscription Audit</h4>
                  <span style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray }}>€{totalSubscriptions.toFixed(2)}/mo</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space2, maxHeight: '320px', overflowY: 'auto' }}>
                  {subscriptions.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => toggleSubscription(sub.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: cssVars.space3,
                        border: sub.needed ? `2px solid ${cssVars.colorTeal}` : `1px solid ${cssVars.colorBorder}`,
                        borderRadius: cssVars.radiusLg, backgroundColor: sub.needed ? cssVars.colorLightTeal : cssVars.colorWhite,
                        cursor: 'pointer', textAlign: 'left', opacity: sub.needed ? 1 : 0.6, fontFamily: 'inherit',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorDeepNavy }}>{sub.name}</div>
                        <div style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray }}>€{sub.amount.toFixed(2)}/mo</div>
                      </div>
                      {sub.needed && <Icons.check color={cssVars.colorTeal} size={18} />}
                    </button>
                  ))}
                </div>
              </div>

              {potentialSavings > 0 && (
                <div style={{ ...highlightBoxStyle, marginTop: cssVars.space5 }}>
                  <div style={sectionLabelStyle}>Potential Savings</div>
                  <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: '700', color: cssVars.colorTeal }}>€{potentialSavings.toFixed(2)}</div>
                  <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorCharcoal }}>per month by canceling unused subscriptions</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== EMERGENCY FUND ==================== */}
        {activeSection === 'emergency' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: cssVars.space6 }}>
            <div>
              <div style={{ marginBottom: cssVars.space6 }}>
                <div style={sectionLabelStyle}>Emergency Fund Calculator</div>
                <h2 style={{ fontSize: cssVars.fontSize2xl, color: cssVars.colorDeepNavy, fontWeight: '700', margin: 0 }}>
                  Calculate Your Safety Net
                </h2>
              </div>

              <div style={cardAccentStyle}>
                <div style={{ marginBottom: cssVars.space5 }}>
                  <label style={{ display: 'block', fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal, marginBottom: cssVars.space2 }}>
                    Monthly Fixed Expenses
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeLg, fontWeight: '500' }}>€</span>
                    <input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                      style={{ width: '100%', padding: '12px 14px 12px 32px', fontSize: cssVars.fontSizeLg, fontWeight: '600', border: `2px solid ${cssVars.colorLightTeal}`, borderRadius: cssVars.radiusMd, outline: 'none', boxSizing: 'border-box', color: cssVars.colorDeepNavy, fontFamily: 'inherit' }}
                    />
                  </div>
                  <div style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray, marginTop: cssVars.space2 }}>
                    Include: rent, utilities, groceries, insurance, loan payments
                  </div>
                </div>

                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal, marginBottom: cssVars.space2 }}>
                    Your Situation
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space3 }}>
                    {[
                      { id: 'single', icon: Icons.user, label: 'Single, secure job', months: 3 },
                      { id: 'family', icon: Icons.users, label: 'Family, two incomes', months: 4 },
                      { id: 'sole', icon: Icons.user, label: 'Sole earner', months: 6 },
                      { id: 'self', icon: Icons.briefcase, label: 'Self-employed', months: 9 },
                    ].map((sit) => (
                      <button
                        key={sit.id}
                        onClick={() => setEmergencySituation(sit.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: cssVars.space3, padding: cssVars.space4,
                          backgroundColor: emergencySituation === sit.id ? cssVars.colorTeal : cssVars.colorOffWhite,
                          color: emergencySituation === sit.id ? cssVars.colorWhite : cssVars.colorCharcoal,
                          border: `2px solid ${emergencySituation === sit.id ? cssVars.colorTeal : 'transparent'}`,
                          borderRadius: cssVars.radiusLg, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                        }}
                      >
                        <sit.icon color={emergencySituation === sit.id ? cssVars.colorWhite : cssVars.colorTeal} size={20} />
                        <div>
                          <div style={{ fontWeight: '600', fontSize: cssVars.fontSizeSm }}>{sit.label}</div>
                          <div style={{ fontSize: cssVars.fontSizeXs, opacity: 0.8 }}>{sit.months} months</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div style={{ backgroundColor: cssVars.colorDeepNavy, borderRadius: cssVars.radius2xl, padding: cssVars.space8, textAlign: 'center' }}>
                  <div style={{ ...sectionLabelStyle, color: cssVars.colorLightTeal }}>Your Emergency Fund Target</div>
                  <div style={{ fontSize: cssVars.fontSize4xl, fontWeight: '700', color: cssVars.colorWhite, margin: `${cssVars.space2} 0` }}>€{emergencyTarget.toLocaleString()}</div>
                  <div style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorLightTeal }}>
                    {emergencyMultipliers[emergencySituation].months} months × €{monthlyExpenses.toLocaleString()} expenses
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={cardStyle}>
                <h4 style={{ margin: `0 0 ${cssVars.space4} 0`, fontSize: cssVars.fontSizeLg, fontWeight: '700', color: cssVars.colorDeepNavy, display: 'flex', alignItems: 'center', gap: cssVars.space2 }}>
                  <Icons.trendingUp color={cssVars.colorTeal} size={20} />
                  Building Plan
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space3 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: cssVars.space3, backgroundColor: cssVars.colorOffWhite, borderRadius: cssVars.radiusLg }}>
                    <span style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray }}>Monthly savings ({currentBudget.savings}%)</span>
                    <span style={{ fontSize: cssVars.fontSizeBase, fontWeight: '700', color: cssVars.colorDeepNavy }}>€{monthlySavings.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: cssVars.space3, backgroundColor: cssVars.colorLightTeal, borderRadius: cssVars.radiusLg }}>
                    <span style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorCharcoal }}>Time to reach goal</span>
                    <span style={{ fontSize: cssVars.fontSizeBase, fontWeight: '700', color: cssVars.colorTeal }}>{monthsToGoal} months</span>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginTop: cssVars.space5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: cssVars.space2 }}>
                    <span style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray }}>Progress</span>
                    <span style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray }}>€0 / €{emergencyTarget.toLocaleString()}</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: cssVars.colorOffWhite, borderRadius: cssVars.radiusSm, overflow: 'hidden' }}>
                    <div style={{ width: '0%', height: '100%', backgroundColor: cssVars.colorTeal, borderRadius: cssVars.radiusSm, transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              </div>

              <div style={{ ...highlightBoxStyle, marginTop: cssVars.space5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: cssVars.space3 }}>
                  <Icons.lightbulb color={cssVars.colorTeal} size={20} />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeSm, color: cssVars.colorDeepNavy, marginBottom: cssVars.space1 }}>Important</div>
                    <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorCharcoal, lineHeight: 1.5 }}>
                      Base this on monthly expenses, not monthly salary. Your emergency fund must cover actual costs.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== DEBT FREEDOM ==================== */}
        {activeSection === 'debt' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: cssVars.space6 }}>
            <div>
              <div style={{ marginBottom: cssVars.space6 }}>
                <div style={sectionLabelStyle}>Debt Repayment Simulator</div>
                <h2 style={{ fontSize: cssVars.fontSize2xl, color: cssVars.colorDeepNavy, fontWeight: '700', margin: 0 }}>
                  Choose Your Strategy
                </h2>
              </div>

              <div style={cardAccentStyle}>
                {/* Debt Summary */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space4, marginBottom: cssVars.space6 }}>
                  <div style={{ backgroundColor: cssVars.colorOffWhite, borderRadius: cssVars.radiusXl, padding: cssVars.space5, textAlign: 'center' }}>
                    <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: '700', color: cssVars.colorDeepNavy }}>€{totalDebt.toLocaleString()}</div>
                    <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray, marginTop: cssVars.space1 }}>Total Debt</div>
                  </div>
                  <div style={{ backgroundColor: cssVars.colorLightTeal, borderRadius: cssVars.radiusXl, padding: cssVars.space5, textAlign: 'center', borderLeft: `4px solid ${cssVars.colorRed}` }}>
                    <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: '700', color: cssVars.colorRed }}>€{Math.round(totalInterest).toLocaleString()}</div>
                    <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray, marginTop: cssVars.space1 }}>Annual Interest</div>
                  </div>
                </div>

                {/* Extra Payment Slider */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: cssVars.space3 }}>
                    <label style={{ fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal }}>Extra Monthly Payment</label>
                    <span style={{ fontSize: cssVars.fontSizeLg, fontWeight: '700', color: cssVars.colorTeal }}>€{extraPayment}</span>
                  </div>
                  <input
                    type="range" min="0" max="500" step="25" value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                    style={{ width: '100%', height: '8px', borderRadius: cssVars.radiusSm, appearance: 'none', background: `linear-gradient(to right, ${cssVars.colorTeal} 0%, ${cssVars.colorTeal} ${extraPayment/5}%, ${cssVars.colorOffWhite} ${extraPayment/5}%, ${cssVars.colorOffWhite} 100%)`, cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: cssVars.space2 }}>
                    <span style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray }}>€0</span>
                    <span style={{ fontSize: cssVars.fontSizeXs, color: cssVars.colorSteelGray }}>€500</span>
                  </div>
                </div>

                {/* Strategy Selection */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal, marginBottom: cssVars.space3 }}>
                    Repayment Strategy
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space3 }}>
                    {[
                      { id: 'avalanche', icon: Icons.zap, name: 'Avalanche', desc: 'Highest interest first' },
                      { id: 'snowball', icon: Icons.target, name: 'Snowball', desc: 'Smallest debt first' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setDebtMethod(method.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: cssVars.space3, padding: cssVars.space4,
                          backgroundColor: debtMethod === method.id ? cssVars.colorTeal : cssVars.colorOffWhite,
                          color: debtMethod === method.id ? cssVars.colorWhite : cssVars.colorCharcoal,
                          border: `2px solid ${debtMethod === method.id ? cssVars.colorTeal : 'transparent'}`,
                          borderRadius: cssVars.radiusLg, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                        }}
                      >
                        <method.icon color={debtMethod === method.id ? cssVars.colorWhite : cssVars.colorTeal} size={22} />
                        <div>
                          <div style={{ fontWeight: '600', fontSize: cssVars.fontSizeBase }}>{method.name}</div>
                          <div style={{ fontSize: cssVars.fontSizeXs, opacity: 0.8 }}>{method.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priority Order */}
                <div>
                  <label style={{ display: 'block', fontSize: cssVars.fontSizeSm, fontWeight: '600', color: cssVars.colorCharcoal, marginBottom: cssVars.space3 }}>
                    Payment Priority Order
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space3 }}>
                    {sortedDebts.map((debt, i) => (
                      <div key={debt.id} style={{ display: 'flex', alignItems: 'center', padding: cssVars.space4, backgroundColor: i === 0 ? cssVars.colorLightTeal : cssVars.colorOffWhite, borderRadius: cssVars.radiusXl, border: i === 0 ? `2px solid ${cssVars.colorTeal}` : 'none' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: i === 0 ? cssVars.colorTeal : cssVars.colorSteelGray, color: cssVars.colorWhite, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: cssVars.fontSizeBase, fontWeight: '700', marginRight: cssVars.space4, flexShrink: 0 }}>{i + 1}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', fontSize: cssVars.fontSizeBase, color: cssVars.colorDeepNavy }}>{debt.name}</div>
                          <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorSteelGray }}>{debt.rate}% interest • €{debt.minPayment}/mo minimum</div>
                        </div>
                        <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeLg, color: cssVars.colorDeepNavy }}>€{debt.amount.toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{ ...cardStyle, backgroundColor: cssVars.colorDeepNavy }}>
                <div style={{ ...sectionLabelStyle, color: cssVars.colorLightTeal }}>Projection</div>
                <div style={{ marginBottom: cssVars.space5 }}>
                  <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorLightTeal, marginBottom: cssVars.space1 }}>Debt-free in approximately</div>
                  <div style={{ fontSize: cssVars.fontSize3xl, fontWeight: '700', color: cssVars.colorWhite }}>{debtFreeMonths} months</div>
                </div>
                <div style={{ padding: cssVars.space4, backgroundColor: 'rgba(13, 148, 136, 0.15)', borderRadius: cssVars.radiusLg, border: '1px solid rgba(13, 148, 136, 0.3)' }}>
                  <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorLightTeal, marginBottom: cssVars.space1 }}>Interest saved vs. minimum</div>
                  <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: '700', color: cssVars.colorGreen }}>€{interestSaved.toLocaleString()}</div>
                </div>
              </div>

              <div style={{ ...highlightBoxStyle, marginTop: cssVars.space5 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: cssVars.space3 }}>
                  <Icons.lightbulb color={cssVars.colorTeal} size={20} />
                  <div>
                    <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeSm, color: cssVars.colorDeepNavy, marginBottom: cssVars.space1 }}>Avalanche vs. Snowball</div>
                    <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorCharcoal, lineHeight: 1.5 }}>
                      Avalanche saves more money mathematically. Snowball provides quick psychological wins. Choose what keeps you motivated!
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ ...cardStyle, marginTop: cssVars.space5 }}>
                <div style={sectionLabelStyle}>Overdraft Warning</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space3, padding: cssVars.space4, backgroundColor: 'rgba(220, 38, 38, 0.1)', borderRadius: cssVars.radiusLg, borderLeft: `4px solid ${cssVars.colorRed}` }}>
                  <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: '700', color: cssVars.colorRed }}>12-15%</div>
                  <div style={{ fontSize: cssVars.fontSizeSm, color: cssVars.colorCharcoal }}>Typical overdraft interest p.a. — the most expensive credit!</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== KEY INSIGHTS ==================== */}
        {activeSection === 'aha' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: cssVars.space8 }}>
              <div style={sectionLabelStyle}>Key Insights</div>
              <h2 style={{ fontSize: cssVars.fontSize2xl, color: cssVars.colorDeepNavy, fontWeight: '700', margin: 0 }}>
                Aha Moments
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: cssVars.space5, marginBottom: cssVars.space8 }}>
              {[
                { title: 'The Overview Myth', text: '52% of Germans have weekly money worries — often not due to low income, but lacking overview.' },
                { title: 'Automation Wins', text: 'People with automatic savings transfers save 3x more than those relying on willpower.' },
                { title: 'The Coffee Myth', text: '€4/day coffee = €1,460/year — nice, but the real money drains are fixed costs like rent and subscriptions.' },
                { title: 'Overdraft Trap', text: 'Overdraft credit costs 12-15% p.a. — the most expensive way to borrow. Pay it off first!' },
              ].map((aha, i) => (
                <div key={i} style={highlightBoxStyle}>
                  <div style={{ fontWeight: '700', fontSize: cssVars.fontSizeLg, color: cssVars.colorDeepNavy, marginBottom: cssVars.space3 }}>{aha.title}</div>
                  <div style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorCharcoal, lineHeight: 1.6 }}>{aha.text}</div>
                </div>
              ))}
            </div>

            <div style={{ ...cardStyle, backgroundColor: cssVars.colorDeepNavy, textAlign: 'center' }}>
              <Icons.lightbulb color={cssVars.colorTeal} size={40} />
              <h3 style={{ color: cssVars.colorWhite, fontSize: cssVars.fontSizeXl, fontWeight: '300', margin: `${cssVars.space4} 0` }}>
                The Core Truth
              </h3>
              <p style={{ color: cssVars.colorLightTeal, fontSize: cssVars.fontSizeLg, lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
                Budget, emergency fund, debt freedom — these are the three pillars of financial freedom.
                <strong style={{ color: cssVars.colorWhite }}> Those who know their financial foundation can build wealth. Those who ignore it will struggle.</strong>
              </p>
            </div>
          </div>
        )}

      </main>

      {/* ===================== FOOTER ===================== */}
      <footer style={{
        backgroundColor: cssVars.colorDeepNavy,
        padding: `${cssVars.space8} ${cssVars.space6}`,
        marginTop: cssVars.space12,
      }}>
        <div style={{ maxWidth: cssVars.maxWidth, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: cssVars.colorTeal, fontSize: cssVars.fontSizeSm, fontWeight: '700', letterSpacing: '1.5px', marginBottom: cssVars.space1 }}>
              HOUSE OF FINANCE & TECH BERLIN
            </div>
            <div style={{ color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeSm }}>
              Europe's Leading Financial Wellbeing Ecosystem
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeSm, marginBottom: cssVars.space1 }}>
              Station 2: Financial Foundation
            </div>
            <div style={{ color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeXs }}>
              Budget · Emergency Fund · Debt Freedom
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinancialFoundation;
