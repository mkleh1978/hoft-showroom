import React, { useState, useEffect } from 'react';

// ============================================================================
// HoFT DESIGN SYSTEM - CSS VARIABLES (from guidelines)
// ============================================================================
const cssVars = {
  // Colors - Primary
  colorDeepNavy: '#0B1F3A',
  colorCharcoal: '#1A1A2E',
  colorWhite: '#FFFFFF',
  colorOffWhite: '#F8F9FA',
  // Colors - Accent
  colorTeal: '#0D9488',
  colorLightTeal: '#CCFBF1',
  colorSteelGray: '#6B7280',
  // Colors - Status
  colorRed: '#DC2626',
  colorAmber: '#D97706',
  colorGreen: '#059669',
  // Transparency Variants
  tealOverlay12: 'rgba(13, 148, 136, 0.12)',
  tealOverlay15: 'rgba(13, 148, 136, 0.15)',
  tealOverlay20: 'rgba(13, 148, 136, 0.2)',
  tealOverlay30: 'rgba(13, 148, 136, 0.3)',
  tealOverlay40: 'rgba(13, 148, 136, 0.4)',
  whiteOverlay08: 'rgba(255, 255, 255, 0.08)',
  whiteOverlay10: 'rgba(255, 255, 255, 0.1)',
  whiteOverlay30: 'rgba(255, 255, 255, 0.3)',
  redOverlay20: 'rgba(220, 38, 38, 0.2)',
  amberOverlay20: 'rgba(217, 119, 6, 0.2)',
  navyShadow06: 'rgba(11, 31, 58, 0.06)',
  navyShadow08: 'rgba(11, 31, 58, 0.08)',
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
  // Spacing (4px base unit)
  space1: '4px',
  space2: '8px',
  space3: '12px',
  space4: '16px',
  space5: '20px',
  space6: '24px',
  space7: '28px',
  space8: '32px',
  space10: '40px',
  space12: '48px',
  // Radius
  radiusSm: '4px',
  radiusMd: '6px',
  radiusLg: '8px',
  radiusXl: '10px',
  radius2xl: '12px',
  radiusFull: '50%',
  // Shadows
  shadowSm: '0 2px 16px rgba(11, 31, 58, 0.06)',
  shadowMd: '0 4px 24px rgba(11, 31, 58, 0.08)',
  // Transitions
  transitionFast: '0.2s ease',
  transitionNormal: '0.3s ease',
  // Layout
  maxWidth: '1100px',
};

// Score color logic (from design system)
const getScoreColor = (score) => {
  if (score <= 40) return cssVars.colorRed;
  if (score <= 60) return cssVars.colorAmber;
  if (score <= 80) return cssVars.colorTeal;
  return cssVars.colorGreen;
};

// ============================================================================
// ICON SYSTEM - Stroke-based SVGs (2px stroke, round linecap/linejoin)
// ============================================================================
const Icon = ({ name, color = 'currentColor', size = 20 }) => {
  const icons = {
    wallet: (
      <>
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
        <circle cx="18" cy="14" r="1"/>
      </>
    ),
    play: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <polygon points="10 8 16 12 10 16 10 8"/>
      </>
    ),
    triangle: (
      <path d="M12 3L3 21h18L12 3z"/>
    ),
    scale: (
      <>
        <path d="M12 3v18"/>
        <path d="M3 7l9-4 9 4"/>
        <circle cx="3" cy="17" r="3"/>
        <circle cx="21" cy="17" r="3"/>
        <path d="M3 7v7"/>
        <path d="M21 7v7"/>
      </>
    ),
    barChart: (
      <>
        <rect x="3" y="12" width="4" height="9" rx="1"/>
        <rect x="10" y="6" width="4" height="15" rx="1"/>
        <rect x="17" y="9" width="4" height="12" rx="1"/>
      </>
    ),
    leaf: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </>
    ),
    cpu: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </>
    ),
    trendingUp: (
      <>
        <path d="M23 6l-9.5 9.5-5-5L1 18"/>
        <path d="M17 6h6v6"/>
      </>
    ),
    shield: (
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    ),
    alertTriangle: (
      <>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
      </>
    ),
    droplet: (
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    ),
    checkCircle: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <path d="M9 12l2 2 4-4"/>
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 16v-4"/>
        <path d="M12 8h.01"/>
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14"/>
        <path d="M12 5l7 7-7 7"/>
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="7" r="4"/>
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
        <circle cx="19" cy="7" r="3"/>
        <path d="M21 21v-2a3 3 0 0 0-2-2.83"/>
      </>
    ),
    building: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M9 22v-4h6v4"/>
        <path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>
      </>
    ),
    piggyBank: (
      <>
        <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z"/>
        <path d="M2 9v1c0 1.1.9 2 2 2h1"/>
        <path d="M16 11h.01"/>
      </>
    ),
    zap: (
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    ),
    pieChart: (
      <>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
        <path d="M22 12A10 10 0 0 0 12 2v10z"/>
      </>
    ),
    refreshCw: (
      <>
        <path d="M23 4v6h-6"/>
        <path d="M1 20v-6h6"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </>
    ),
    lightbulb: (
      <>
        <path d="M9 18h6"/>
        <path d="M10 22h4"/>
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
      </>
    ),
    calculator: (
      <>
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <path d="M8 6h8"/>
        <path d="M8 10h8"/>
        <path d="M8 14h2"/>
        <path d="M8 18h2"/>
        <path d="M14 14h2"/>
        <path d="M14 18h2"/>
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7"/>
        <rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const Investment = () => {
  // State
  const [activeSection, setActiveSection] = useState('welcome');
  const [riskAnswers, setRiskAnswers] = useState({
    horizon: 2, reaction: 1, tolerance: 5, income: 1, experience: 1
  });
  const [showRiskResult, setShowRiskResult] = useState(false);
  const [portfolioAllocation, setPortfolioAllocation] = useState({
    stocks: 60, bonds: 30, alternatives: 10
  });
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationYear, setSimulationYear] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(100000);
  const [esgCompany, setEsgCompany] = useState(0);
  const [timelineAge, setTimelineAge] = useState(30);
  const [savingsRate, setSavingsRate] = useState(500);
  const [expectedReturn, setExpectedReturn] = useState(6);

  // Navigation
  const sections = [
    { id: 'welcome', label: 'Start', icon: 'play' },
    { id: 'triangle', label: 'Magic Triangle', icon: 'triangle' },
    { id: 'risk', label: 'Risk Profile', icon: 'scale' },
    { id: 'portfolio', label: 'Portfolio Builder', icon: 'barChart' },
    { id: 'esg', label: 'ESG Analysis', icon: 'leaf' },
    { id: 'timeline', label: 'Life Planning', icon: 'clock' },
  ];

  // Calculations
  const calculateRiskScore = () => {
    const { horizon, reaction, tolerance, income, experience } = riskAnswers;
    const score = Math.round((horizon * 1.5 + reaction * 2 + tolerance * 0.8 + income * 1.2 + experience * 1.5) / 2.5);
    return Math.min(10, Math.max(1, score));
  };

  const getRiskProfile = (score) => {
    if (score <= 3) return 'Conservative';
    if (score <= 5) return 'Moderate';
    if (score <= 7) return 'Balanced Growth';
    return 'Aggressive Growth';
  };

  const calculateProjection = (monthly, years, rate) => {
    let total = 0;
    for (let i = 0; i < years * 12; i++) {
      total = (total + monthly) * (1 + rate / 100 / 12);
    }
    return Math.round(total);
  };

  // Simulation
  useEffect(() => {
    if (simulationRunning && simulationYear < 10) {
      const timer = setTimeout(() => {
        const baseReturn = (portfolioAllocation.stocks * 0.08 +
                          portfolioAllocation.bonds * 0.04 +
                          portfolioAllocation.alternatives * 0.06) / 100;
        const volatility = portfolioAllocation.stocks * 0.002;
        const yearReturn = baseReturn + (Math.random() - 0.5) * volatility;
        setPortfolioValue(prev => Math.round(prev * (1 + yearReturn)));
        setSimulationYear(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (simulationYear >= 10) {
      setSimulationRunning(false);
    }
  }, [simulationRunning, simulationYear, portfolioAllocation]);

  const runSimulation = () => {
    setSimulationYear(0);
    setPortfolioValue(100000);
    setSimulationRunning(true);
  };

  // ESG Data
  const esgCompanies = [
    { name: 'TechGreen Inc.', sector: 'Technology', e: 88, s: 82, g: 91, carbon: 8, risk: 'Low' },
    { name: 'PetroMax Corp.', sector: 'Energy', e: 35, s: 58, g: 65, carbon: 124, risk: 'Critical' },
    { name: 'EcoFinance AG', sector: 'Finance', e: 76, s: 89, g: 94, carbon: 12, risk: 'Low' },
    { name: 'HeavyMetal GmbH', sector: 'Manufacturing', e: 42, s: 61, g: 72, carbon: 89, risk: 'High' },
  ];

  const changeSection = (id) => {
    setActiveSection(id);
    setShowRiskResult(false);
    if (id !== 'portfolio') {
      setSimulationRunning(false);
      setSimulationYear(0);
      setPortfolioValue(100000);
    }
  };

  // ============================================================================
  // COMPONENT STYLES (exactly matching design system)
  // ============================================================================

  // Standard Card
  const cardStyle = {
    backgroundColor: cssVars.colorWhite,
    borderRadius: cssVars.radius2xl,
    padding: cssVars.space6,
    boxShadow: cssVars.shadowSm,
  };

  // Card with Top Accent
  const cardAccentStyle = {
    backgroundColor: cssVars.colorWhite,
    borderRadius: cssVars.radius2xl,
    padding: cssVars.space6,
    borderTop: `4px solid ${cssVars.colorTeal}`,
    boxShadow: cssVars.shadowSm,
  };

  // Dark Card
  const cardDarkStyle = {
    backgroundColor: cssVars.colorDeepNavy,
    borderRadius: cssVars.radius2xl,
    padding: cssVars.space6,
  };

  // Highlight Box
  const highlightBoxStyle = {
    backgroundColor: cssVars.colorLightTeal,
    borderRadius: cssVars.radius2xl,
    padding: cssVars.space6,
    borderLeft: `6px solid ${cssVars.colorTeal}`,
  };

  // Primary Button
  const btnPrimaryStyle = {
    backgroundColor: cssVars.colorTeal,
    color: cssVars.colorWhite,
    padding: '12px 20px',
    border: 'none',
    borderRadius: cssVars.radiusMd,
    fontSize: cssVars.fontSizeBase,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit',
  };

  // Section Label (uppercase)
  const sectionLabelStyle = {
    fontSize: '10px',
    fontWeight: 700,
    color: cssVars.colorTeal,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: cssVars.space2,
  };

  // Card Heading
  const cardHeadingStyle = {
    fontSize: cssVars.fontSizeLg,
    fontWeight: 700,
    color: cssVars.colorDeepNavy,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: cssVars.space2,
  };

  // Body Text
  const bodyTextStyle = {
    fontSize: cssVars.fontSizeBase,
    fontWeight: 400,
    color: cssVars.colorCharcoal,
    lineHeight: 1.6,
    margin: 0,
  };

  // Caption
  const captionStyle = {
    fontSize: '11px',
    color: cssVars.colorSteelGray,
  };

  // Micro Text
  const microTextStyle = {
    fontSize: '10px',
    fontWeight: 600,
    color: cssVars.colorSteelGray,
  };

  // Tag
  const tagStyle = {
    display: 'inline-block',
    backgroundColor: cssVars.colorLightTeal,
    color: cssVars.colorTeal,
    padding: '4px 10px',
    borderRadius: cssVars.radiusSm,
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'uppercase',
  };

  // Radio Option
  const radioOptionStyle = (selected) => ({
    padding: '14px 18px',
    backgroundColor: selected ? cssVars.colorTeal : cssVars.colorOffWhite,
    color: selected ? cssVars.colorWhite : cssVars.colorCharcoal,
    border: `2px solid ${selected ? cssVars.colorTeal : 'transparent'}`,
    borderRadius: cssVars.radiusLg,
    fontSize: cssVars.fontSizeBase,
    fontWeight: 500,
    textAlign: 'left',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'inherit',
    transition: cssVars.transitionFast,
  });

  // Progress Track
  const progressTrackStyle = {
    height: '8px',
    backgroundColor: cssVars.colorLightTeal,
    borderRadius: '4px',
    overflow: 'hidden',
  };

  // Tab styles
  const tabStyle = (isActive) => ({
    padding: '14px 20px',
    border: 'none',
    borderBottom: `3px solid ${isActive ? cssVars.colorTeal : 'transparent'}`,
    backgroundColor: 'transparent',
    color: isActive ? cssVars.colorTeal : cssVars.colorCharcoal,
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: cssVars.space2,
    fontFamily: 'inherit',
  });

  // ============================================================================
  // RENDER
  // ============================================================================
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: cssVars.colorOffWhite,
      fontFamily: cssVars.fontFamily,
      paddingBottom: '80px',
    }}>

      {/* ===================== HEADER ===================== */}
      <header style={{
        backgroundColor: cssVars.colorDeepNavy,
        padding: `${cssVars.space4} ${cssVars.space6}`,
        borderBottom: `4px solid ${cssVars.colorTeal}`,
      }}>
        <div style={{
          maxWidth: cssVars.maxWidth,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space5 }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: cssVars.colorTeal,
              borderRadius: cssVars.radiusLg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name="wallet" color={cssVars.colorWhite} size={24} />
            </div>
            <div>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                color: cssVars.colorTeal,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}>
                Station 4
              </div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: cssVars.colorWhite,
                margin: 0,
              }}>
                Investment Corner
              </h1>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '11px',
              color: cssVars.colorSteelGray,
              marginBottom: cssVars.space1,
            }}>
              WealthTech · Wealth Building · Investment Planning
            </div>
            <div style={{
              fontSize: cssVars.fontSizeSm,
              fontWeight: 700,
              color: cssVars.colorTeal,
              letterSpacing: '1.5px',
            }}>
              HOUSE OF FINANCE & TECH
            </div>
          </div>
        </div>
      </header>

      {/* ===================== NAVIGATION ===================== */}
      <nav style={{
        backgroundColor: cssVars.colorWhite,
        borderBottom: `1px solid ${cssVars.colorLightTeal}`,
        padding: `0 ${cssVars.space6}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: cssVars.maxWidth, margin: '0 auto', display: 'flex' }}>
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => changeSection(section.id)}
                style={tabStyle(isActive)}
              >
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: cssVars.radiusFull,
                  backgroundColor: isActive ? cssVars.colorTeal : cssVars.colorOffWhite,
                  color: isActive ? cssVars.colorWhite : cssVars.colorSteelGray,
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {index + 1}
                </span>
                <Icon name={section.icon} color={isActive ? cssVars.colorTeal : cssVars.colorCharcoal} size={16} />
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ===================== MAIN CONTENT ===================== */}
      <main style={{ maxWidth: cssVars.maxWidth, margin: '0 auto', padding: cssVars.space6 }}>

        {/* ==================== WELCOME ==================== */}
        {activeSection === 'welcome' && (
          <div>
            {/* Hero */}
            <div style={{ textAlign: 'center', padding: `${cssVars.space8} 0 ${cssVars.space10}` }}>
              <div style={{
                width: '100px',
                height: '100px',
                background: `linear-gradient(135deg, ${cssVars.colorTeal} 0%, ${cssVars.colorDeepNavy} 100%)`,
                borderRadius: cssVars.radiusFull,
                margin: `0 auto ${cssVars.space6}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="trendingUp" color={cssVars.colorWhite} size={44} />
              </div>
              <h2 style={{
                fontSize: cssVars.fontSize3xl,
                fontWeight: 300,
                color: cssVars.colorDeepNavy,
                marginBottom: cssVars.space3,
                letterSpacing: '-0.5px',
              }}>
                How Does My Money Grow?
              </h2>
              <p style={{
                fontSize: '15px',
                color: cssVars.colorSteelGray,
                maxWidth: '560px',
                margin: '0 auto',
                lineHeight: 1.6
              }}>
                Discover how modern WealthTech solutions make professional investing
                accessible to everyone. From AI-powered risk profiling to ESG analysis.
              </p>
            </div>

            {/* Feature Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: cssVars.space5,
              marginBottom: cssVars.space10
            }}>
              {[
                { icon: 'target', title: 'AI Risk Profiling', desc: 'Intelligent assessment determines your personal risk tolerance through behavioral scenario analysis.' },
                { icon: 'cpu', title: 'Robo-Advisory', desc: 'Algorithm-based portfolio management with automated rebalancing and tax-loss harvesting.' },
                { icon: 'globe', title: 'ESG Investing', desc: 'Returns with responsibility. AI-powered analysis of environmental, social, and governance factors.' },
              ].map((item, i) => (
                <div key={i} style={cardAccentStyle}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: cssVars.colorLightTeal,
                    borderRadius: cssVars.radiusXl,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: cssVars.space5,
                  }}>
                    <Icon name={item.icon} color={cssVars.colorTeal} size={24} />
                  </div>
                  <h3 style={{ ...cardHeadingStyle, marginBottom: cssVars.space3 }}>{item.title}</h3>
                  <p style={bodyTextStyle}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Cost Comparison */}
            <div style={{ ...cardStyle, marginBottom: cssVars.space10 }}>
              <h3 style={{ ...cardHeadingStyle, marginBottom: cssVars.space6 }}>
                <Icon name="calculator" color={cssVars.colorTeal} size={18} />
                Cost Comparison: Robo-Advisory vs. Traditional
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space6 }}>
                <div style={{
                  backgroundColor: cssVars.colorLightTeal,
                  padding: cssVars.space6,
                  borderRadius: cssVars.radiusXl,
                  borderLeft: `6px solid ${cssVars.colorTeal}`,
                }}>
                  <div style={sectionLabelStyle}>ROBO-ADVISORY</div>
                  <div style={{ fontSize: '36px', color: cssVars.colorDeepNavy, fontWeight: 700 }}>0.3–0.7%</div>
                  <div style={captionStyle}>per year (TER)</div>
                </div>
                <div style={{
                  backgroundColor: cssVars.colorOffWhite,
                  padding: cssVars.space6,
                  borderRadius: cssVars.radiusXl,
                  borderLeft: `6px solid ${cssVars.colorSteelGray}`,
                }}>
                  <div style={{ ...sectionLabelStyle, color: cssVars.colorSteelGray }}>ACTIVE FUNDS</div>
                  <div style={{ fontSize: '36px', color: cssVars.colorDeepNavy, fontWeight: 700 }}>1.5–2.5%</div>
                  <div style={captionStyle}>per year (TER)</div>
                </div>
              </div>
              <div style={{
                marginTop: cssVars.space5,
                padding: cssVars.space4,
                backgroundColor: cssVars.colorOffWhite,
                borderRadius: cssVars.radiusLg,
                display: 'flex',
                alignItems: 'center',
                gap: cssVars.space3,
              }}>
                <Icon name="info" color={cssVars.colorTeal} size={18} />
                <span style={{ fontSize: '13px', color: cssVars.colorCharcoal }}>
                  <strong>30-Year Impact:</strong> A 1.5% fee difference reduces final wealth by up to 35%.
                </span>
              </div>
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center' }}>
              <button onClick={() => changeSection('triangle')} style={{ ...btnPrimaryStyle, padding: '14px 28px' }}>
                Start Interactive Tour
                <Icon name="arrowRight" color={cssVars.colorWhite} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== MAGIC TRIANGLE ==================== */}
        {activeSection === 'triangle' && (
          <div>
            <div style={{ marginBottom: cssVars.space6 }}>
              <h2 style={{ fontSize: cssVars.fontSizeXl, fontWeight: 700, color: cssVars.colorDeepNavy, margin: `0 0 ${cssVars.space2} 0` }}>
                The Magic Triangle of Investing
              </h2>
              <p style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.6 }}>
                Every investment decision involves trade-offs between three fundamental factors.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: cssVars.space6 }}>
              {/* Triangle SVG */}
              <div style={cardStyle}>
                <svg width="100%" height="320" viewBox="0 0 400 320" style={{ display: 'block' }}>
                  <defs>
                    <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={cssVars.colorTeal} stopOpacity="0.08"/>
                      <stop offset="100%" stopColor={cssVars.colorDeepNavy} stopOpacity="0.08"/>
                    </linearGradient>
                  </defs>

                  <polygon points="200,30 40,280 360,280" fill="url(#triGrad)" stroke={cssVars.colorDeepNavy} strokeWidth="3"/>
                  <polygon points="200,90 100,240 300,240" fill="none" stroke={cssVars.colorTeal} strokeWidth="1.5" strokeDasharray="6,6" opacity="0.5"/>

                  <circle cx="200" cy="30" r="26" fill={cssVars.colorTeal}/>
                  <text x="200" y="36" textAnchor="middle" fill={cssVars.colorWhite} fontSize="14" fontWeight="700">%</text>
                  <text x="200" y="5" textAnchor="middle" fill={cssVars.colorTeal} fontSize="11" fontWeight="700">RETURN</text>

                  <circle cx="40" cy="280" r="26" fill={cssVars.colorDeepNavy}/>
                  <text x="40" y="286" textAnchor="middle" fill={cssVars.colorWhite} fontSize="14" fontWeight="700">!</text>
                  <text x="40" y="318" textAnchor="middle" fill={cssVars.colorDeepNavy} fontSize="11" fontWeight="700">RISK</text>

                  <circle cx="360" cy="280" r="26" fill={cssVars.colorSteelGray}/>
                  <text x="360" y="286" textAnchor="middle" fill={cssVars.colorWhite} fontSize="14" fontWeight="700">$</text>
                  <text x="360" y="318" textAnchor="middle" fill={cssVars.colorSteelGray} fontSize="11" fontWeight="700">LIQUIDITY</text>

                  <text x="200" y="165" textAnchor="middle" fill={cssVars.colorDeepNavy} fontSize="14" fontWeight="600">Choose Two</text>
                  <text x="200" y="185" textAnchor="middle" fill={cssVars.colorSteelGray} fontSize="12">You cannot maximize</text>
                  <text x="200" y="200" textAnchor="middle" fill={cssVars.colorSteelGray} fontSize="12">all three</text>
                </svg>
              </div>

              {/* Factor Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space4 }}>
                {[
                  { label: 'Return', icon: 'trendingUp', color: cssVars.colorTeal, desc: 'Higher expected returns require accepting higher risk or lower liquidity.', example: 'Stocks: 7-10% historical avg.' },
                  { label: 'Risk', icon: 'alertTriangle', color: cssVars.colorDeepNavy, desc: 'The probability and magnitude of losses. Measured through volatility.', example: 'Stocks can lose 50%+ in crashes' },
                  { label: 'Liquidity', icon: 'droplet', color: cssVars.colorSteelGray, desc: 'How quickly assets convert to cash. Illiquid assets often pay premiums.', example: 'Real estate: weeks to sell' },
                ].map((item, i) => (
                  <div key={i} style={{
                    ...cardStyle,
                    borderLeft: `4px solid ${item.color}`,
                    padding: cssVars.space5,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space3, marginBottom: cssVars.space2 }}>
                      <Icon name={item.icon} color={item.color} size={18} />
                      <span style={{ fontSize: '15px', fontWeight: 700, color: item.color }}>{item.label}</span>
                    </div>
                    <p style={{ ...bodyTextStyle, fontSize: '13px', marginBottom: cssVars.space2 }}>{item.desc}</p>
                    <div style={{ ...captionStyle, fontStyle: 'italic' }}>{item.example}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Golden Rule */}
            <div style={{ ...highlightBoxStyle, marginTop: cssVars.space6, display: 'flex', alignItems: 'flex-start', gap: cssVars.space5 }}>
              <div style={{
                width: '44px',
                height: '44px',
                backgroundColor: cssVars.colorTeal,
                borderRadius: cssVars.radiusFull,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name="shield" color={cssVars.colorWhite} size={22} />
              </div>
              <div>
                <h4 style={{ ...cardHeadingStyle, marginBottom: cssVars.space2 }}>The Golden Rule</h4>
                <p style={bodyTextStyle}>
                  No investment maximizes all three factors. <strong>Anyone promising high returns
                  with low risk and high liquidity is either misleading you or hiding costs.</strong>
                </p>
              </div>
            </div>

            <div style={{ marginTop: cssVars.space8, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => changeSection('risk')} style={btnPrimaryStyle}>
                Next: Risk Profiling
                <Icon name="arrowRight" color={cssVars.colorWhite} size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== RISK PROFILING ==================== */}
        {activeSection === 'risk' && (
          <div>
            <div style={{ marginBottom: cssVars.space6 }}>
              <h2 style={{ fontSize: cssVars.fontSizeXl, fontWeight: 700, color: cssVars.colorDeepNavy, margin: `0 0 ${cssVars.space2} 0` }}>
                AI-Powered Risk Profiling
              </h2>
              <p style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.6 }}>
                Answer 5 questions to discover your investor profile and receive a personalized allocation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: cssVars.space6 }}>
              {/* Questions */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space3, marginBottom: cssVars.space6 }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: cssVars.colorLightTeal,
                    borderRadius: cssVars.radiusLg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon name="scale" color={cssVars.colorTeal} size={20} />
                  </div>
                  <h3 style={cardHeadingStyle}>Risk Assessment</h3>
                </div>

                {/* Q1 */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', marginBottom: cssVars.space3, fontSize: cssVars.fontSizeBase, fontWeight: 600, color: cssVars.colorCharcoal }}>
                    1. What is your investment time horizon?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: cssVars.space2 }}>
                    {['< 3 yrs', '3–10 yrs', '10–20 yrs', '> 20 yrs'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setRiskAnswers({...riskAnswers, horizon: i})}
                        style={radioOptionStyle(riskAnswers.horizon === i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q2 */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', marginBottom: cssVars.space3, fontSize: cssVars.fontSizeBase, fontWeight: 600, color: cssVars.colorCharcoal }}>
                    2. If your portfolio drops 25%, you would...
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space3 }}>
                    {['Sell immediately', 'Hold and wait', 'Buy more'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setRiskAnswers({...riskAnswers, reaction: i})}
                        style={radioOptionStyle(riskAnswers.reaction === i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q3 */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', marginBottom: cssVars.space3, fontSize: cssVars.fontSizeBase, fontWeight: 600, color: cssVars.colorCharcoal }}>
                    3. Rate your comfort with volatility
                  </label>
                  <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space5, borderRadius: cssVars.radiusLg }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: cssVars.space3 }}>
                      <span style={captionStyle}>Stability</span>
                      <span style={{ fontSize: cssVars.fontSizeLg, fontWeight: 700, color: cssVars.colorTeal }}>{riskAnswers.tolerance}/10</span>
                      <span style={captionStyle}>Growth</span>
                    </div>
                    <input
                      type="range" min="1" max="10" value={riskAnswers.tolerance}
                      onChange={(e) => setRiskAnswers({...riskAnswers, tolerance: parseInt(e.target.value)})}
                      style={{ width: '100%', accentColor: cssVars.colorTeal }}
                    />
                  </div>
                </div>

                {/* Q4 */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', marginBottom: cssVars.space3, fontSize: cssVars.fontSizeBase, fontWeight: 600, color: cssVars.colorCharcoal }}>
                    4. How stable is your income?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: cssVars.space2 }}>
                    {['Variable', 'Moderate', 'Very Stable'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setRiskAnswers({...riskAnswers, income: i})}
                        style={radioOptionStyle(riskAnswers.income === i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Q5 */}
                <div style={{ marginBottom: cssVars.space6 }}>
                  <label style={{ display: 'block', marginBottom: cssVars.space3, fontSize: cssVars.fontSizeBase, fontWeight: 600, color: cssVars.colorCharcoal }}>
                    5. Your investment experience?
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: cssVars.space2 }}>
                    {['Beginner', 'Intermediate', 'Advanced'].map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setRiskAnswers({...riskAnswers, experience: i})}
                        style={radioOptionStyle(riskAnswers.experience === i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => setShowRiskResult(true)} style={{ ...btnPrimaryStyle, width: '100%', justifyContent: 'center' }}>
                  <Icon name="target" color={cssVars.colorWhite} size={18} />
                  Analyze My Profile
                </button>
              </div>

              {/* Results */}
              <div style={{
                ...cardStyle,
                backgroundColor: showRiskResult ? cssVars.colorWhite : cssVars.colorOffWhite,
                opacity: showRiskResult ? 1 : 0.5,
                transition: cssVars.transitionNormal,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space3, marginBottom: cssVars.space6 }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: showRiskResult ? cssVars.colorTeal : cssVars.colorSteelGray,
                    borderRadius: cssVars.radiusLg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Icon name={showRiskResult ? 'checkCircle' : 'target'} color={cssVars.colorWhite} size={20} />
                  </div>
                  <h3 style={cardHeadingStyle}>
                    {showRiskResult ? 'Your Profile' : 'Complete assessment'}
                  </h3>
                </div>

                {showRiskResult ? (
                  <>
                    <div style={{ ...highlightBoxStyle, marginBottom: cssVars.space5, textAlign: 'center', padding: cssVars.space5 }}>
                      <div style={sectionLabelStyle}>INVESTOR TYPE</div>
                      <div style={{ fontSize: cssVars.fontSize2xl, color: cssVars.colorDeepNavy, fontWeight: 700, marginTop: cssVars.space1 }}>
                        {getRiskProfile(calculateRiskScore())}
                      </div>
                      <div style={{ ...captionStyle, marginTop: cssVars.space1 }}>
                        Risk Score: <strong>{calculateRiskScore()}</strong>/10
                      </div>
                    </div>

                    <div style={{ marginBottom: cssVars.space5 }}>
                      <div style={{ ...captionStyle, fontWeight: 600, marginBottom: cssVars.space3 }}>Recommended Allocation</div>
                      <div style={{ display: 'flex', borderRadius: cssVars.radiusMd, overflow: 'hidden', height: '32px' }}>
                        <div style={{ width: `${40 + calculateRiskScore() * 5}%`, backgroundColor: cssVars.colorTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: '11px', fontWeight: 700 }}>
                          {40 + calculateRiskScore() * 5}%
                        </div>
                        <div style={{ width: `${50 - calculateRiskScore() * 4}%`, backgroundColor: cssVars.colorDeepNavy, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: '11px', fontWeight: 700 }}>
                          {50 - calculateRiskScore() * 4}%
                        </div>
                        <div style={{ width: `${10 - calculateRiskScore() * 0.5}%`, backgroundColor: cssVars.colorSteelGray, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: '11px', fontWeight: 700 }}>
                          {Math.round(10 - calculateRiskScore() * 0.5)}%
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: cssVars.space3 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space1 }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: cssVars.colorTeal }}></div>
                          <span style={microTextStyle}>Equities</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space1 }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: cssVars.colorDeepNavy }}></div>
                          <span style={microTextStyle}>Bonds</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space1 }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: cssVars.colorSteelGray }}></div>
                          <span style={microTextStyle}>Alt</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space3, marginBottom: cssVars.space5 }}>
                      <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space4, borderRadius: cssVars.radiusLg, textAlign: 'center' }}>
                        <div style={microTextStyle}>Expected Return</div>
                        <div style={{ fontSize: cssVars.fontSizeXl, color: cssVars.colorTeal, fontWeight: 700 }}>
                          {(3.5 + calculateRiskScore() * 0.5).toFixed(1)}%
                        </div>
                      </div>
                      <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space4, borderRadius: cssVars.radiusLg, textAlign: 'center' }}>
                        <div style={microTextStyle}>Max Drawdown</div>
                        <div style={{ fontSize: cssVars.fontSizeXl, color: cssVars.colorDeepNavy, fontWeight: 700 }}>
                          -{8 + calculateRiskScore() * 3}%
                        </div>
                      </div>
                    </div>

                    <div style={{ ...cardDarkStyle, textAlign: 'center', padding: cssVars.space5 }}>
                      <div style={{ ...sectionLabelStyle }}>30-YEAR PROJECTION (€500/mo)</div>
                      <div style={{ fontSize: '28px', color: cssVars.colorWhite, fontWeight: 700 }}>
                        €{calculateProjection(500, 30, 3.5 + calculateRiskScore() * 0.5).toLocaleString('de-DE')}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: cssVars.space4 }}>
                    <Icon name="target" color={cssVars.colorSteelGray} size={48} />
                    <span style={captionStyle}>Answer all questions</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: cssVars.space8, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => changeSection('portfolio')} style={btnPrimaryStyle}>
                Next: Portfolio Builder
                <Icon name="arrowRight" color={cssVars.colorWhite} size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== PORTFOLIO BUILDER ==================== */}
        {activeSection === 'portfolio' && (
          <div>
            <div style={{ marginBottom: cssVars.space6 }}>
              <h2 style={{ fontSize: cssVars.fontSizeXl, fontWeight: 700, color: cssVars.colorDeepNavy, margin: `0 0 ${cssVars.space2} 0` }}>
                Portfolio Builder Challenge
              </h2>
              <p style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.6 }}>
                Allocate €100,000 across asset classes and run a 10-year market simulation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: cssVars.space6 }}>
              {/* Allocation */}
              <div style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: cssVars.space6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space3 }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: cssVars.colorLightTeal,
                      borderRadius: cssVars.radiusLg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Icon name="pieChart" color={cssVars.colorTeal} size={20} />
                    </div>
                    <h3 style={cardHeadingStyle}>Asset Allocation</h3>
                  </div>
                  <span style={tagStyle}>
                    Total: {portfolioAllocation.stocks + portfolioAllocation.bonds + portfolioAllocation.alternatives}%
                  </span>
                </div>

                {[
                  { key: 'stocks', label: 'Global Equities (ETFs)', color: cssVars.colorTeal, icon: 'trendingUp' },
                  { key: 'bonds', label: 'Investment Grade Bonds', color: cssVars.colorDeepNavy, icon: 'shield' },
                  { key: 'alternatives', label: 'Alternatives (REITs, Gold)', color: cssVars.colorSteelGray, icon: 'building' },
                ].map((asset) => (
                  <div key={asset.key} style={{ marginBottom: cssVars.space6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: cssVars.space3 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space2 }}>
                        <Icon name={asset.icon} color={asset.color} size={18} />
                        <span style={{ fontSize: cssVars.fontSizeBase, fontWeight: 500, color: cssVars.colorCharcoal }}>{asset.label}</span>
                      </div>
                      <span style={{
                        fontSize: '18px', fontWeight: 700, color: asset.color,
                        backgroundColor: asset.key === 'stocks' ? cssVars.colorLightTeal : cssVars.colorOffWhite,
                        padding: `${cssVars.space1} ${cssVars.space3}`, borderRadius: cssVars.radiusSm,
                      }}>
                        {portfolioAllocation[asset.key]}%
                      </span>
                    </div>
                    <input
                      type="range" min="0" max="100" value={portfolioAllocation[asset.key]}
                      onChange={(e) => {
                        const newVal = parseInt(e.target.value);
                        const others = Object.keys(portfolioAllocation).filter(k => k !== asset.key);
                        const currentOthers = portfolioAllocation[others[0]] + portfolioAllocation[others[1]];
                        const remaining = 100 - newVal;
                        if (currentOthers === 0) {
                          setPortfolioAllocation({ ...portfolioAllocation, [asset.key]: newVal, [others[0]]: Math.round(remaining / 2), [others[1]]: remaining - Math.round(remaining / 2) });
                        } else {
                          const ratio = portfolioAllocation[others[0]] / currentOthers;
                          setPortfolioAllocation({ ...portfolioAllocation, [asset.key]: newVal, [others[0]]: Math.round(remaining * ratio), [others[1]]: remaining - Math.round(remaining * ratio) });
                        }
                      }}
                      style={{ width: '100%', accentColor: asset.color }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: cssVars.space2 }}>
                      <span style={captionStyle}>€{(portfolioAllocation[asset.key] * 1000).toLocaleString('de-DE')}</span>
                      <span style={captionStyle}>of €100,000</span>
                    </div>
                  </div>
                ))}

                <div style={{ borderTop: `1px solid ${cssVars.colorLightTeal}`, paddingTop: cssVars.space5, marginTop: cssVars.space5 }}>
                  <div style={{ ...captionStyle, fontWeight: 600, marginBottom: cssVars.space3 }}>Visual Allocation</div>
                  <div style={{ display: 'flex', borderRadius: cssVars.radiusLg, overflow: 'hidden', height: '48px' }}>
                    <div style={{ width: `${portfolioAllocation.stocks}%`, backgroundColor: cssVars.colorTeal, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: '13px', fontWeight: 700, transition: cssVars.transitionNormal }}>
                      {portfolioAllocation.stocks > 15 && `${portfolioAllocation.stocks}%`}
                    </div>
                    <div style={{ width: `${portfolioAllocation.bonds}%`, backgroundColor: cssVars.colorDeepNavy, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: '13px', fontWeight: 700, transition: cssVars.transitionNormal }}>
                      {portfolioAllocation.bonds > 15 && `${portfolioAllocation.bonds}%`}
                    </div>
                    <div style={{ width: `${portfolioAllocation.alternatives}%`, backgroundColor: cssVars.colorSteelGray, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cssVars.colorWhite, fontSize: '13px', fontWeight: 700, transition: cssVars.transitionNormal }}>
                      {portfolioAllocation.alternatives > 15 && `${portfolioAllocation.alternatives}%`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={simulationRunning}
                  style={{
                    ...btnPrimaryStyle,
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: cssVars.space5,
                    backgroundColor: simulationRunning ? cssVars.colorSteelGray : cssVars.colorDeepNavy,
                    cursor: simulationRunning ? 'not-allowed' : 'pointer',
                  }}
                >
                  <Icon name={simulationRunning ? 'refreshCw' : 'zap'} color={cssVars.colorWhite} size={18} />
                  {simulationRunning ? `Simulating Year ${simulationYear}/10...` : 'Run 10-Year Simulation'}
                </button>
              </div>

              {/* Results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: cssVars.space5 }}>
                <div style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space3, marginBottom: cssVars.space5 }}>
                    <div style={{
                      width: '36px', height: '36px', backgroundColor: cssVars.colorLightTeal,
                      borderRadius: cssVars.radiusLg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name="cpu" color={cssVars.colorTeal} size={18} />
                    </div>
                    <h4 style={{ ...cardHeadingStyle, fontSize: '15px' }}>AI Evaluation</h4>
                  </div>

                  {[
                    { label: 'Diversification', score: portfolioAllocation.stocks < 80 && portfolioAllocation.bonds > 10 ? 88 : 55 },
                    { label: 'Cost Efficiency', score: 94 },
                    { label: 'ESG Compliance', score: portfolioAllocation.stocks > 50 ? 82 : 70 },
                    { label: 'Risk-Return', score: portfolioAllocation.stocks > 40 && portfolioAllocation.stocks < 80 ? 79 : 52 },
                  ].map((metric, i) => (
                    <div key={i} style={{ marginBottom: i < 3 ? cssVars.space4 : 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: cssVars.space2 }}>
                        <span style={{ fontSize: '13px', color: cssVars.colorCharcoal }}>{metric.label}</span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: getScoreColor(metric.score) }}>
                          {metric.score}/100
                        </span>
                      </div>
                      <div style={progressTrackStyle}>
                        <div style={{
                          height: '100%',
                          width: `${metric.score}%`,
                          backgroundColor: getScoreColor(metric.score),
                          borderRadius: '4px',
                          transition: cssVars.transitionNormal,
                        }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={cardStyle}>
                  <div style={{ ...captionStyle, fontWeight: 600, marginBottom: cssVars.space2 }}>Portfolio Value (Year {simulationYear})</div>
                  <div style={{ fontSize: '36px', color: portfolioValue >= 100000 ? cssVars.colorGreen : cssVars.colorRed, fontWeight: 700 }}>
                    €{portfolioValue.toLocaleString('de-DE')}
                  </div>
                  <div style={{ fontSize: cssVars.fontSizeBase, color: portfolioValue >= 100000 ? cssVars.colorGreen : cssVars.colorRed, display: 'flex', alignItems: 'center', gap: cssVars.space2, marginTop: cssVars.space2 }}>
                    <Icon name="trendingUp" size={16} color={portfolioValue >= 100000 ? cssVars.colorGreen : cssVars.colorRed} />
                    {portfolioValue >= 100000 ? '+' : ''}{((portfolioValue - 100000) / 1000).toFixed(1)}% total
                  </div>
                </div>

                <div style={{ ...cardDarkStyle, textAlign: 'center' }}>
                  <div style={sectionLabelStyle}>EXPECTED ANNUAL RETURN</div>
                  <div style={{ fontSize: '36px', color: cssVars.colorWhite, fontWeight: 700 }}>
                    {(portfolioAllocation.stocks * 0.08 + portfolioAllocation.bonds * 0.04 + portfolioAllocation.alternatives * 0.06).toFixed(1)}%
                  </div>
                  <div style={{ ...captionStyle, marginTop: cssVars.space1 }}>Based on historical averages</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: cssVars.space8, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => changeSection('esg')} style={btnPrimaryStyle}>
                Next: ESG Analysis
                <Icon name="arrowRight" color={cssVars.colorWhite} size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== ESG ANALYSIS ==================== */}
        {activeSection === 'esg' && (
          <div>
            <div style={{ marginBottom: cssVars.space6 }}>
              <h2 style={{ fontSize: cssVars.fontSizeXl, fontWeight: 700, color: cssVars.colorDeepNavy, margin: `0 0 ${cssVars.space2} 0` }}>
                ESG Investing
              </h2>
              <p style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.6 }}>
                Returns with responsibility. AI-powered analysis of Environmental, Social, and Governance factors.
              </p>
            </div>

            {/* ESG Pillars */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: cssVars.space5, marginBottom: cssVars.space8 }}>
              {[
                { letter: 'E', title: 'Environmental', color: cssVars.colorGreen, factors: ['Carbon emissions', 'Resource efficiency', 'Climate risk'] },
                { letter: 'S', title: 'Social', color: cssVars.colorTeal, factors: ['Labor practices', 'Diversity', 'Human rights'] },
                { letter: 'G', title: 'Governance', color: cssVars.colorDeepNavy, factors: ['Board independence', 'Ethics', 'Transparency'] },
              ].map((esg, i) => (
                <div key={i} style={{ ...cardAccentStyle, borderTopColor: esg.color }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: cssVars.space4, marginBottom: cssVars.space5 }}>
                    <div style={{
                      width: '52px', height: '52px', backgroundColor: esg.color,
                      borderRadius: cssVars.radiusXl, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ color: cssVars.colorWhite, fontSize: '24px', fontWeight: 700 }}>{esg.letter}</span>
                    </div>
                    <h3 style={{ ...cardHeadingStyle, fontSize: '18px' }}>{esg.title}</h3>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {esg.factors.map((f, j) => (
                      <li key={j} style={{
                        fontSize: cssVars.fontSizeBase, color: cssVars.colorCharcoal,
                        padding: `${cssVars.space3} 0`,
                        borderBottom: j < esg.factors.length - 1 ? `1px solid ${cssVars.colorLightTeal}` : 'none',
                        display: 'flex', alignItems: 'center', gap: cssVars.space3,
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: cssVars.radiusFull, backgroundColor: esg.color }}></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ESG Detective */}
            <div style={{ ...cardAccentStyle, borderTop: `4px solid ${cssVars.colorDeepNavy}`, overflow: 'hidden', padding: 0 }}>
              <div style={{ backgroundColor: cssVars.colorDeepNavy, padding: `${cssVars.space5} ${cssVars.space6}`, display: 'flex', alignItems: 'center', gap: cssVars.space4 }}>
                <Icon name="target" color={cssVars.colorTeal} size={24} />
                <div>
                  <h3 style={{ fontSize: '17px', color: cssVars.colorWhite, margin: 0, fontWeight: 700 }}>ESG Detective</h3>
                  <p style={{ fontSize: '13px', color: cssVars.colorSteelGray, margin: `${cssVars.space1} 0 0` }}>
                    Analyze companies and identify sustainability risks
                  </p>
                </div>
              </div>

              <div style={{ padding: cssVars.space6 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: cssVars.space3, marginBottom: cssVars.space6 }}>
                  {esgCompanies.map((company, i) => (
                    <button
                      key={i}
                      onClick={() => setEsgCompany(i)}
                      style={{
                        padding: cssVars.space4,
                        border: `2px solid ${esgCompany === i ? cssVars.colorTeal : cssVars.colorLightTeal}`,
                        borderRadius: cssVars.radiusLg,
                        backgroundColor: esgCompany === i ? cssVars.colorLightTeal : cssVars.colorWhite,
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: cssVars.transitionFast,
                        fontFamily: 'inherit',
                      }}
                    >
                      <div style={{ fontSize: '15px', fontWeight: 700, color: cssVars.colorDeepNavy }}>{company.name}</div>
                      <div style={captionStyle}>{company.sector}</div>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space6 }}>
                  <div>
                    <div style={{ ...captionStyle, fontWeight: 600, marginBottom: cssVars.space4 }}>ESG Scores</div>
                    {[
                      { label: 'Environmental', score: esgCompanies[esgCompany].e, color: cssVars.colorGreen },
                      { label: 'Social', score: esgCompanies[esgCompany].s, color: cssVars.colorTeal },
                      { label: 'Governance', score: esgCompanies[esgCompany].g, color: cssVars.colorDeepNavy },
                    ].map((metric, i) => (
                      <div key={i} style={{ marginBottom: cssVars.space4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: cssVars.space2 }}>
                          <span style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorCharcoal }}>{metric.label}</span>
                          <span style={{ fontSize: cssVars.fontSizeBase, fontWeight: 700, color: getScoreColor(metric.score) }}>
                            {metric.score}/100
                          </span>
                        </div>
                        <div style={{ ...progressTrackStyle, height: '10px' }}>
                          <div style={{ height: '100%', width: `${metric.score}%`, backgroundColor: getScoreColor(metric.score), borderRadius: '5px', transition: cssVars.transitionNormal }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ ...captionStyle, fontWeight: 600, marginBottom: cssVars.space4 }}>Key Findings</div>
                    <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space5, borderRadius: cssVars.radiusXl, marginBottom: cssVars.space4 }}>
                      <div style={{ ...microTextStyle, marginBottom: cssVars.space1 }}>Carbon Footprint</div>
                      <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: 700, color: esgCompanies[esgCompany].carbon < 50 ? cssVars.colorGreen : cssVars.colorRed }}>
                        {esgCompanies[esgCompany].carbon} tCO₂e
                      </div>
                      <div style={captionStyle}>per €1M revenue</div>
                    </div>
                    <div style={{
                      backgroundColor: esgCompanies[esgCompany].risk === 'Low' ? cssVars.colorLightTeal :
                                       esgCompanies[esgCompany].risk === 'High' ? cssVars.amberOverlay20 : cssVars.redOverlay20,
                      padding: cssVars.space5, borderRadius: cssVars.radiusXl,
                      borderLeft: `6px solid ${esgCompanies[esgCompany].risk === 'Low' ? cssVars.colorGreen :
                                               esgCompanies[esgCompany].risk === 'High' ? cssVars.colorAmber : cssVars.colorRed}`,
                    }}>
                      <div style={{ ...microTextStyle, marginBottom: cssVars.space1 }}>ESG Risk Level</div>
                      <div style={{
                        fontSize: cssVars.fontSizeXl, fontWeight: 700,
                        color: esgCompanies[esgCompany].risk === 'Low' ? cssVars.colorGreen :
                               esgCompanies[esgCompany].risk === 'High' ? cssVars.colorAmber : cssVars.colorRed
                      }}>
                        {esgCompanies[esgCompany].risk}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div style={{ ...cardDarkStyle, marginTop: cssVars.space6, display: 'flex', alignItems: 'flex-start', gap: cssVars.space6 }}>
              <div style={{
                width: '56px', height: '56px', backgroundColor: cssVars.colorTeal,
                borderRadius: cssVars.radiusXl, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name="lightbulb" color={cssVars.colorWhite} size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '18px', color: cssVars.colorWhite, margin: `0 0 ${cssVars.space3}`, fontWeight: 700 }}>
                  Insight: ESG Does Not Sacrifice Returns
                </h4>
                <p style={{ fontSize: '15px', color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.7 }}>
                  Meta-analyses show ESG portfolios perform <strong style={{ color: cssVars.colorWhite }}>at least as well</strong> as
                  conventional portfolios. They often <span style={{ color: cssVars.colorTeal, fontWeight: 600 }}>outperform during crises</span> due
                  to superior risk management.
                </p>
              </div>
            </div>

            <div style={{ marginTop: cssVars.space8, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => changeSection('timeline')} style={btnPrimaryStyle}>
                Next: Life Planning
                <Icon name="arrowRight" color={cssVars.colorWhite} size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== LIFE PLANNING ==================== */}
        {activeSection === 'timeline' && (
          <div>
            <div style={{ marginBottom: cssVars.space6 }}>
              <h2 style={{ fontSize: cssVars.fontSizeXl, fontWeight: 700, color: cssVars.colorDeepNavy, margin: `0 0 ${cssVars.space2} 0` }}>
                Wealth Planning by Life Phase
              </h2>
              <p style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.6 }}>
                Your investment strategy should evolve with your life.
              </p>
            </div>

            {/* Timeline */}
            <div style={{ ...cardStyle, marginBottom: cssVars.space6 }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: '14px', left: '70px', right: '70px',
                  height: '4px',
                  background: `linear-gradient(90deg, ${cssVars.colorTeal} 0%, ${cssVars.colorDeepNavy} 100%)`,
                  borderRadius: '2px',
                }}></div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: cssVars.space4 }}>
                  {[
                    { age: '25–34', title: 'Young Professional', equity: '80–90%', focus: 'Growth' },
                    { age: '35–44', title: 'Peak Earning', equity: '60–75%', focus: 'Diversify' },
                    { age: '45–60', title: 'Consolidation', equity: '45–60%', focus: 'Optimize' },
                    { age: '60+', title: 'Retirement', equity: '25–40%', focus: 'Preserve' },
                  ].map((phase, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '28px', height: '28px', backgroundColor: cssVars.colorTeal,
                        borderRadius: cssVars.radiusFull, border: `4px solid ${cssVars.colorWhite}`,
                        boxShadow: cssVars.shadowSm, margin: `0 auto ${cssVars.space5}`,
                      }}></div>

                      <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space5, borderRadius: cssVars.radiusXl }}>
                        <div style={{ ...sectionLabelStyle, marginBottom: cssVars.space1 }}>{phase.age}</div>
                        <h4 style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorDeepNavy, margin: `0 0 ${cssVars.space3}`, fontWeight: 700 }}>{phase.title}</h4>
                        <div style={{ backgroundColor: cssVars.colorWhite, padding: cssVars.space3, borderRadius: cssVars.radiusMd, marginBottom: cssVars.space3 }}>
                          <div style={microTextStyle}>Equity</div>
                          <div style={{ fontSize: cssVars.fontSizeLg, color: cssVars.colorDeepNavy, fontWeight: 700 }}>{phase.equity}</div>
                        </div>
                        <span style={tagStyle}>{phase.focus}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculator */}
            <div style={{ ...cardAccentStyle, borderTop: `4px solid ${cssVars.colorDeepNavy}`, overflow: 'hidden', padding: 0 }}>
              <div style={{ backgroundColor: cssVars.colorDeepNavy, padding: `${cssVars.space5} ${cssVars.space6}`, display: 'flex', alignItems: 'center', gap: cssVars.space4 }}>
                <Icon name="piggyBank" color={cssVars.colorTeal} size={24} />
                <div>
                  <h3 style={{ fontSize: '17px', color: cssVars.colorWhite, margin: 0, fontWeight: 700 }}>Wealth Projection Calculator</h3>
                  <p style={{ fontSize: '13px', color: cssVars.colorSteelGray, margin: `${cssVars.space1} 0 0` }}>
                    See how your savings compound over time
                  </p>
                </div>
              </div>

              <div style={{ padding: cssVars.space6 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: cssVars.space6, marginBottom: cssVars.space6 }}>
                  {[
                    { label: 'Starting Age', value: `${timelineAge} years`, min: 20, max: 55, current: timelineAge, onChange: setTimelineAge },
                    { label: 'Monthly Investment', value: `€${savingsRate}`, min: 100, max: 2000, step: 50, current: savingsRate, onChange: setSavingsRate },
                    { label: 'Expected Return', value: `${expectedReturn}% p.a.`, min: 3, max: 10, step: 0.5, current: expectedReturn, onChange: setExpectedReturn },
                  ].map((item, i) => (
                    <div key={i}>
                      <label style={{ display: 'block', marginBottom: cssVars.space3, fontSize: cssVars.fontSizeBase, fontWeight: 600, color: cssVars.colorCharcoal }}>
                        {item.label}
                      </label>
                      <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space5, borderRadius: cssVars.radiusXl }}>
                        <div style={{ fontSize: cssVars.fontSize2xl, fontWeight: 700, color: cssVars.colorDeepNavy, marginBottom: cssVars.space3 }}>
                          {item.value}
                        </div>
                        <input
                          type="range" min={item.min} max={item.max} step={item.step || 1} value={item.current}
                          onChange={(e) => item.onChange(item.step ? parseFloat(e.target.value) : parseInt(e.target.value))}
                          style={{ width: '100%', accentColor: cssVars.colorTeal }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: cssVars.space2 }}>
                          <span style={captionStyle}>{item.min}</span>
                          <span style={captionStyle}>{item.max}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: cssVars.space6 }}>
                  <div style={{ ...highlightBoxStyle, textAlign: 'left' }}>
                    <div style={sectionLabelStyle}>WEALTH AT AGE 65</div>
                    <div style={{ fontSize: '36px', color: cssVars.colorDeepNavy, fontWeight: 700 }}>
                      €{calculateProjection(savingsRate, 65 - timelineAge, expectedReturn).toLocaleString('de-DE')}
                    </div>
                    <div style={{ ...captionStyle, marginTop: cssVars.space2 }}>{65 - timelineAge} years of investing</div>
                  </div>

                  <div style={{ backgroundColor: cssVars.colorOffWhite, padding: cssVars.space6, borderRadius: cssVars.radius2xl, borderLeft: `6px solid ${cssVars.colorSteelGray}` }}>
                    <div style={{ ...sectionLabelStyle, color: cssVars.colorSteelGray }}>YOUR CONTRIBUTIONS</div>
                    <div style={{ fontSize: '36px', color: cssVars.colorDeepNavy, fontWeight: 700 }}>
                      €{(savingsRate * 12 * (65 - timelineAge)).toLocaleString('de-DE')}
                    </div>
                    <div style={{ fontSize: cssVars.fontSizeBase, color: cssVars.colorGreen, marginTop: cssVars.space2, fontWeight: 600 }}>
                      + €{(calculateProjection(savingsRate, 65 - timelineAge, expectedReturn) - savingsRate * 12 * (65 - timelineAge)).toLocaleString('de-DE')} compound growth
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insight */}
            <div style={{ ...cardDarkStyle, marginTop: cssVars.space6, display: 'flex', alignItems: 'flex-start', gap: cssVars.space6 }}>
              <div style={{
                width: '56px', height: '56px', backgroundColor: cssVars.colorTeal,
                borderRadius: cssVars.radiusXl, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name="zap" color={cssVars.colorWhite} size={28} />
              </div>
              <div>
                <h4 style={{ fontSize: '18px', color: cssVars.colorWhite, margin: `0 0 ${cssVars.space3}`, fontWeight: 700 }}>
                  The Power of Compound Interest
                </h4>
                <p style={{ fontSize: '15px', color: cssVars.colorSteelGray, margin: 0, lineHeight: 1.7 }}>
                  Starting at 25 with €300/month = <span style={{ color: cssVars.colorTeal, fontWeight: 600 }}>€600,000+</span> by 65.
                  Starting at 35? Only <span style={{ color: cssVars.colorWhite, fontWeight: 600 }}>€300,000</span>.{' '}
                  <strong style={{ color: cssVars.colorTeal }}>A 10-year delay halves your result.</strong>
                </p>
              </div>
            </div>

            {/* Core Message */}
            <div style={{ ...highlightBoxStyle, marginTop: cssVars.space6, textAlign: 'center' }}>
              <Icon name="checkCircle" color={cssVars.colorTeal} size={36} />
              <h3 style={{ fontSize: cssVars.fontSizeXl, color: cssVars.colorDeepNavy, margin: `${cssVars.space4} 0 ${cssVars.space3}`, fontWeight: 700 }}>
                The Core Message
              </h3>
              <p style={{ fontSize: '15px', color: cssVars.colorCharcoal, margin: 0, lineHeight: 1.7, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                WealthTech democratizes professional investing. Robo-Advisory doesn't replace advisors—it makes them more effective.
                <strong> The combination of human empathy and machine precision is unbeatable.</strong>
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
            <div style={{ color: cssVars.colorTeal, fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px', marginBottom: cssVars.space1 }}>
              HOUSE OF FINANCE & TECH BERLIN
            </div>
            <div style={{ color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeSm }}>
              Europe's Leading Financial Wellbeing Ecosystem
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: cssVars.colorSteelGray, fontSize: cssVars.fontSizeSm, marginBottom: cssVars.space1 }}>
              Station 4: Investment Corner
            </div>
            <div style={{ color: cssVars.colorSteelGray, fontSize: '11px' }}>
              WealthTech · Wealth Building · Investment Planning
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Investment;
