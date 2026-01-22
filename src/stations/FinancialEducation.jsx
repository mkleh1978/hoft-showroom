import React, { useState, useEffect, useRef } from 'react';

// ============================================
// DESIGN TOKENS (Aligned with HoFT Design System)
// ============================================
const colors = {
  deepNavy: '#0B1F3A',
  charcoal: '#1A1A2E',
  teal: '#0D9488',
  lightTeal: '#CCFBF1',
  white: '#FFFFFF',
  offWhite: '#F8FAFC',
  border: '#E2E8F0',
  steelGray: '#64748B',
  red: '#DC2626',
  amber: '#D97706',
  green: '#059669',
};

// ============================================
// ICON COMPONENTS (Stroke-based SVGs)
// ============================================
const Icons = {
  play: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  mirror: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="8" ry="10" />
      <path d="M12 2v4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  target: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  users: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  lightbulb: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  ),
  arrowRight: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  check: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  home: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  education: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  ),
  plane: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16v-2a4 4 0 0 0-4-4H7l-4 4 4 4h10a4 4 0 0 0 4-4z" />
      <path d="M3 10V8a4 4 0 0 1 4-4h10l4 4" />
    </svg>
  ),
  shield: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  clock: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  briefcase: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  plus: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  x: ({ color = colors.charcoal, size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

// ============================================
// CFPB-10 ASSESSMENT QUESTIONS
// ============================================
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
const getPersona = (score) => {
  if (score >= 80) return { name: "The Guardian", desc: "Financially secure and forward-thinking", color: colors.green };
  if (score >= 65) return { name: "The Strategist", desc: "Resilient with room for optimization", color: colors.teal };
  if (score >= 50) return { name: "The Builder", desc: "Building foundations, gaining momentum", color: colors.amber };
  if (score >= 35) return { name: "The Seeker", desc: "Navigating challenges, seeking solutions", color: colors.amber };
  return { name: "The Pioneer", desc: "Starting the journey, unlimited potential", color: colors.red };
};

// ============================================
// MAIN COMPONENT
// ============================================
const FinancialEducation = () => {
  // State
  const [activeSection, setActiveSection] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finalScore, setFinalScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [communityScores, setCommunityScores] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goalTargets, setGoalTargets] = useState({
    home: 50000, education: 20000, travel: 5000,
    emergency: 15000, retire: 100000, business: 30000,
  });
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [timeline, setTimeline] = useState(5);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [showCustomGoal, setShowCustomGoal] = useState(false);
  const [customGoalName, setCustomGoalName] = useState('');
  const [customGoalTarget, setCustomGoalTarget] = useState(10000);

  // Navigation sections
  const sections = [
    { id: 'welcome', label: 'Start', icon: Icons.play },
    { id: 'mirror', label: 'Financial Mirror', icon: Icons.mirror },
    { id: 'builder', label: "Builder's Table", icon: Icons.target },
    { id: 'community', label: 'Community Wall', icon: Icons.users },
    { id: 'insights', label: 'Key Insights', icon: Icons.lightbulb },
  ];

  // Initialize community data
  useEffect(() => {
    setCommunityScores(Array.from({ length: 150 }, () => ({
      score: Math.floor(Math.random() * 50) + 35,
      timestamp: Date.now() - Math.random() * 86400000,
    })));
  }, []);

  // Calculate CFPB Score
  const calculateScore = (ans) => {
    let total = 0;
    CFPB_QUESTIONS.forEach((q) => {
      const answer = ans[q.id] || 3;
      total += q.reversed ? (6 - answer) : answer;
    });
    return Math.round(((total - 10) / 40) * 100);
  };

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < CFPB_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const score = calculateScore(newAnswers);
      setFinalScore(score);
      setCommunityScores(prev => [...prev, { score, timestamp: Date.now() }]);
      setTimeout(() => setShowResults(true), 500);
    }
  };

  const resetAssessment = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setFinalScore(null);
    setShowResults(false);
  };

  // Goal calculations
  const calculateProjection = () => {
    const months = timeline * 12;
    const total = monthlyContribution * months;
    const withGrowth = monthlyContribution * ((Math.pow(1 + 0.07/12, months) - 1) / (0.07/12));
    return { total: Math.round(total), withGrowth: Math.round(withGrowth) };
  };

  const projection = calculateProjection();
  const currentGoalData = selectedGoal ? { ...GOALS.find(g => g.id === selectedGoal), target: goalTargets[selectedGoal] } : null;
  const progressToGoal = currentGoalData ? Math.min(100, (projection.withGrowth / currentGoalData.target) * 100) : 0;

  const GOALS = [
    { id: 'home', name: 'Home', desc: 'Down payment', icon: Icons.home, color: colors.deepNavy },
    { id: 'education', name: 'Education', desc: 'Skills investment', icon: Icons.education, color: colors.teal },
    { id: 'travel', name: 'Travel', desc: 'Experience world', icon: Icons.plane, color: colors.amber },
    { id: 'emergency', name: 'Emergency', desc: '6mo expenses', icon: Icons.shield, color: colors.red },
    { id: 'retire', name: 'Retirement', desc: 'Long-term security', icon: Icons.clock, color: colors.teal },
    { id: 'business', name: 'Business', desc: 'Start a venture', icon: Icons.briefcase, color: colors.deepNavy },
  ];

  const addGoalToPlan = () => {
    if (currentGoalData && !goals.find(g => g.id === currentGoalData.id)) {
      setGoals([...goals, { ...currentGoalData, timeline, monthlyContribution, projection }]);
    }
  };

  const addCustomGoal = () => {
    if (customGoalName && customGoalTarget > 0) {
      setGoals([...goals, {
        id: `custom_${Date.now()}`,
        name: customGoalName,
        desc: 'Custom goal',
        color: colors.teal,
        target: customGoalTarget,
        timeline,
        monthlyContribution,
        projection,
      }]);
      setCustomGoalName('');
      setCustomGoalTarget(10000);
      setShowCustomGoal(false);
    }
  };

  // Community distribution
  const distribution = [
    { range: '20-35', label: 'Pioneers', count: 0, color: colors.deepNavy },
    { range: '36-49', label: 'Seekers', count: 0, color: colors.charcoal },
    { range: '50-64', label: 'Builders', count: 0, color: colors.amber },
    { range: '65-79', label: 'Strategists', count: 0, color: colors.teal },
    { range: '80-100', label: 'Guardians', count: 0, color: colors.green },
  ];
  communityScores.forEach(({ score }) => {
    if (score <= 35) distribution[0].count++;
    else if (score <= 49) distribution[1].count++;
    else if (score <= 64) distribution[2].count++;
    else if (score <= 79) distribution[3].count++;
    else distribution[4].count++;
  });
  const maxCount = Math.max(...distribution.map(d => d.count));
  const avgScore = communityScores.length > 0 ? Math.round(communityScores.reduce((a, b) => a + b.score, 0) / communityScores.length) : 0;

  return (
    <div style={{ minHeight: '100vh', background: colors.offWhite, fontFamily: "'Inter', -apple-system, sans-serif", paddingBottom: '80px' }}>

      {/* ===================== HEADER ===================== */}
      <header style={{
        background: colors.deepNavy,
        padding: '20px 40px',
        borderBottom: `4px solid ${colors.teal}`,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: colors.teal,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icons.mirror color={colors.white} size={28} />
            </div>
            <div>
              <div style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '2px' }}>
                STATION 1
              </div>
              <h1 style={{ color: colors.white, fontSize: '24px', fontWeight: '700', margin: 0 }}>
                Measurement Station
              </h1>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: colors.steelGray, fontSize: '12px', marginBottom: '4px' }}>
              Financial Education
            </div>
            <div style={{ color: colors.teal, fontSize: '13px', fontWeight: '600', letterSpacing: '1px' }}>
              HOUSE OF FINANCE & TECH
            </div>
          </div>
        </div>
      </header>

      {/* ===================== NAVIGATION ===================== */}
      <nav style={{
        background: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        padding: '0 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '2px' }}>
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  if (section.id === 'mirror') {
                    resetAssessment();
                  }
                }}
                style={{
                  padding: '16px 24px',
                  border: 'none',
                  background: isActive ? colors.deepNavy : 'transparent',
                  color: isActive ? colors.white : colors.charcoal,
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  borderBottom: isActive ? `3px solid ${colors.teal}` : '3px solid transparent',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: isActive ? colors.teal : colors.border,
                  color: isActive ? colors.white : colors.steelGray,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '700',
                }}>
                  {index + 1}
                </span>
                <IconComponent color={isActive ? colors.white : colors.charcoal} size={18} />
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ===================== MAIN CONTENT ===================== */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px' }}>

        {/* WELCOME SECTION */}
        {activeSection === 'welcome' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px' }}>
                FINANCIAL EDUCATION
              </div>
              <h2 style={{ color: colors.deepNavy, fontSize: '32px', fontWeight: '300', margin: '0 0 12px 0' }}>
                Discover Your Financial Wellbeing
              </h2>
              <p style={{ color: colors.steelGray, fontSize: '16px', lineHeight: 1.6, maxWidth: '700px' }}>
                Take a 3-minute science-backed assessment using the CFPB-10 methodology,
                set personalized goals, and see how you compare to the community.
              </p>
            </div>

            {/* Journey Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
              {[
                { icon: Icons.mirror, title: 'Financial Mirror', desc: 'Answer 10 questions to calculate your CFPB score and discover your financial persona.', color: colors.teal },
                { icon: Icons.target, title: "Builder's Table", desc: 'Set life goals, customize targets, and see projections with compound growth.', color: colors.amber },
                { icon: Icons.users, title: 'Community Wall', desc: 'Compare your score anonymously with other visitors and find your percentile.', color: colors.green },
              ].map((card, i) => (
                <div key={i} style={{
                  background: colors.white,
                  borderRadius: '16px',
                  padding: '32px',
                  borderTop: `4px solid ${card.color}`,
                  boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    background: `${card.color}15`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <card.icon color={card.color} size={28} />
                  </div>
                  <h3 style={{ color: colors.deepNavy, fontSize: '18px', fontWeight: '700', margin: '0 0 12px 0' }}>
                    {card.title}
                  </h3>
                  <p style={{ color: colors.steelGray, fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.teal} 0%, ${colors.deepNavy} 100%)`,
              borderRadius: '16px',
              padding: '48px',
              textAlign: 'center',
            }}>
              <h3 style={{ color: colors.white, fontSize: '24px', fontWeight: '600', margin: '0 0 16px 0' }}>
                Ready to begin?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '24px' }}>
                ~3 minutes | Private & Secure | CFPB-10 Validated Methodology
              </p>
              <button
                onClick={() => setActiveSection('mirror')}
                style={{
                  background: colors.white,
                  color: colors.deepNavy,
                  border: 'none',
                  padding: '16px 40px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'inherit',
                }}
              >
                Start Assessment <Icons.arrowRight color={colors.deepNavy} size={20} />
              </button>
            </div>
          </div>
        )}

        {/* MIRROR SECTION - Assessment */}
        {activeSection === 'mirror' && (
          <div>
            {!showResults ? (
              <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                {/* Progress */}
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px' }}>
                      FINANCIAL MIRROR ASSESSMENT
                    </span>
                    <span style={{ color: colors.steelGray, fontSize: '13px' }}>
                      {currentQuestion + 1} of {CFPB_QUESTIONS.length}
                    </span>
                  </div>
                  <div style={{ height: '6px', background: colors.border, borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${((currentQuestion + 1) / CFPB_QUESTIONS.length) * 100}%`,
                      background: `linear-gradient(90deg, ${colors.teal}, ${colors.green})`,
                      borderRadius: '3px',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>

                {/* Question Card */}
                <div style={{
                  background: colors.white,
                  borderRadius: '16px',
                  padding: '48px',
                  boxShadow: '0 4px 24px rgba(11,31,58,0.08)',
                  borderTop: `4px solid ${colors.teal}`,
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: colors.lightTeal,
                    color: colors.teal,
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '1px',
                    marginBottom: '24px',
                  }}>
                    {CFPB_QUESTIONS[currentQuestion].category.toUpperCase()}
                  </div>

                  <h3 style={{
                    color: colors.deepNavy,
                    fontSize: '22px',
                    fontWeight: '500',
                    lineHeight: 1.5,
                    margin: '0 0 32px 0',
                  }}>
                    "{CFPB_QUESTIONS[currentQuestion].text}"
                  </h3>

                  {/* Options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {SCALE_OPTIONS.map((option) => {
                      const isSelected = answers[CFPB_QUESTIONS[currentQuestion].id] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(CFPB_QUESTIONS[currentQuestion].id, option.value)}
                          style={{
                            background: isSelected ? colors.deepNavy : colors.offWhite,
                            border: `2px solid ${isSelected ? colors.teal : colors.border}`,
                            borderRadius: '12px',
                            padding: '18px 24px',
                            color: isSelected ? colors.white : colors.charcoal,
                            fontSize: '15px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease',
                            fontFamily: 'inherit',
                          }}
                        >
                          <span>{option.label}</span>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {[1, 2, 3, 4, 5].map((dot) => (
                              <div key={dot} style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: dot <= option.value
                                  ? (isSelected ? colors.teal : colors.teal)
                                  : (isSelected ? 'rgba(255,255,255,0.2)' : colors.border),
                              }} />
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              // Results
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                  background: colors.deepNavy,
                  borderRadius: '16px',
                  padding: '48px',
                  textAlign: 'center',
                  marginBottom: '32px',
                }}>
                  <div style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '24px' }}>
                    YOUR FINANCIAL MIRROR REFLECTION
                  </div>

                  {/* Score */}
                  <div style={{
                    width: '180px',
                    height: '180px',
                    margin: '0 auto 24px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: `4px solid ${getPersona(finalScore).color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ fontSize: '56px', fontWeight: '200', color: getPersona(finalScore).color }}>
                      {finalScore}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>CFPB-10</div>
                  </div>

                  {/* Persona */}
                  <div style={{
                    background: `${getPersona(finalScore).color}22`,
                    border: `1px solid ${getPersona(finalScore).color}44`,
                    borderRadius: '12px',
                    padding: '20px 32px',
                    display: 'inline-block',
                  }}>
                    <div style={{ color: getPersona(finalScore).color, fontSize: '20px', fontWeight: '700' }}>
                      {getPersona(finalScore).name}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>
                      {getPersona(finalScore).desc}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                  <button
                    onClick={resetAssessment}
                    style={{
                      background: 'transparent',
                      color: colors.charcoal,
                      border: `2px solid ${colors.border}`,
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Retake Assessment
                  </button>
                  <button
                    onClick={() => setActiveSection('builder')}
                    style={{
                      background: colors.teal,
                      color: colors.white,
                      border: 'none',
                      padding: '14px 28px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'inherit',
                    }}
                  >
                    Continue to Builder's Table <Icons.arrowRight color={colors.white} size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BUILDER SECTION */}
        {activeSection === 'builder' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px' }}>
                BUILDER'S TABLE
              </div>
              <h2 style={{ color: colors.deepNavy, fontSize: '28px', fontWeight: '600', margin: '0 0 8px 0' }}>
                Build Your Wealth Profile
              </h2>
              <p style={{ color: colors.steelGray, fontSize: '14px' }}>
                Select goals, customize targets, and see projections
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Left: Goal Selection */}
              <div>
                <div style={{
                  background: colors.white,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                }}>
                  <h4 style={{ color: colors.deepNavy, fontSize: '14px', fontWeight: '700', margin: '0 0 16px 0' }}>
                    SELECT YOUR LIFE GOAL
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {GOALS.map((goal) => {
                      const isSelected = selectedGoal === goal.id;
                      return (
                        <button
                          key={goal.id}
                          onClick={() => setSelectedGoal(goal.id)}
                          style={{
                            background: isSelected ? `${goal.color}15` : colors.offWhite,
                            border: isSelected ? `2px solid ${goal.color}` : '2px solid transparent',
                            borderRadius: '12px',
                            padding: '16px 12px',
                            cursor: 'pointer',
                            textAlign: 'center',
                            fontFamily: 'inherit',
                          }}
                        >
                          <div style={{ marginBottom: '8px' }}>
                            <goal.icon color={goal.color} size={28} />
                          </div>
                          <div style={{ color: colors.deepNavy, fontSize: '13px', fontWeight: '600' }}>{goal.name}</div>
                          <div style={{ color: colors.steelGray, fontSize: '11px', marginTop: '4px' }}>
                            {(goalTargets[goal.id] / 1000).toFixed(0)}k
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Sliders */}
                  <div style={{ marginTop: '24px' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: colors.charcoal, fontSize: '13px', fontWeight: '500' }}>Timeline</span>
                        <span style={{ color: colors.teal, fontSize: '13px', fontWeight: '700' }}>{timeline} years</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={timeline}
                        onChange={(e) => setTimeline(Number(e.target.value))}
                        style={{ width: '100%', accentColor: colors.teal }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: colors.charcoal, fontSize: '13px', fontWeight: '500' }}>Monthly Contribution</span>
                        <span style={{ color: colors.teal, fontSize: '13px', fontWeight: '700' }}>{monthlyContribution}</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="2000"
                        step="50"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        style={{ width: '100%', accentColor: colors.teal }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Projection */}
              <div>
                <div style={{
                  background: `linear-gradient(135deg, ${colors.deepNavy} 0%, ${colors.teal} 100%)`,
                  borderRadius: '16px',
                  padding: '24px',
                  color: colors.white,
                  marginBottom: '16px',
                }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 20px 0', opacity: 0.8 }}>
                    YOUR PROJECTION
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '120px', gap: '6px', marginBottom: '24px' }}>
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        style={{
                          width: '16px',
                          height: `${20 + (i * 8) * (progressToGoal / 100)}px`,
                          background: i < Math.floor(12 * (progressToGoal / 100)) ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
                          borderRadius: '4px 4px 0 0',
                          transition: 'height 0.5s ease',
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'center' }}>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '300' }}>{(projection.total / 1000).toFixed(1)}k</div>
                      <div style={{ fontSize: '11px', opacity: 0.7 }}>Contributions</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: '300' }}>{(projection.withGrowth / 1000).toFixed(1)}k</div>
                      <div style={{ fontSize: '11px', opacity: 0.7 }}>With 7% Growth</div>
                    </div>
                  </div>
                </div>

                {selectedGoal && (
                  <div style={{
                    background: colors.white,
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: colors.charcoal, fontSize: '13px' }}>
                        Progress to {GOALS.find(g => g.id === selectedGoal)?.name}
                      </span>
                      <span style={{ color: colors.teal, fontSize: '13px', fontWeight: '700' }}>
                        {Math.round(progressToGoal)}%
                      </span>
                    </div>
                    <div style={{ height: '8px', background: colors.border, borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
                      <div style={{
                        height: '100%',
                        width: `${progressToGoal}%`,
                        background: progressToGoal >= 100 ? colors.green : colors.amber,
                        borderRadius: '4px',
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                    <button
                      onClick={addGoalToPlan}
                      disabled={goals.find(g => g.id === selectedGoal)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        background: goals.find(g => g.id === selectedGoal) ? colors.steelGray : colors.teal,
                        color: colors.white,
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: goals.find(g => g.id === selectedGoal) ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit',
                      }}
                    >
                      {goals.find(g => g.id === selectedGoal) ? 'Added' : 'Add to My Plan'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <button
                onClick={() => setActiveSection('community')}
                style={{
                  background: colors.deepNavy,
                  color: colors.white,
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'inherit',
                }}
              >
                View Community Comparison <Icons.arrowRight color={colors.white} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* COMMUNITY SECTION */}
        {activeSection === 'community' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px' }}>
                COMMUNITY WALL
              </div>
              <h2 style={{ color: colors.deepNavy, fontSize: '28px', fontWeight: '600', margin: '0 0 8px 0' }}>
                The Financial Wellbeing Tapestry
              </h2>
              <p style={{ color: colors.steelGray, fontSize: '14px' }}>
                Anonymous aggregate of {communityScores.length} community members
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
              {[
                { value: communityScores.length, label: 'Total Assessments' },
                { value: avgScore, label: 'Community Average' },
                { value: `${Math.round((distribution[3].count + distribution[4].count) / communityScores.length * 100)}%`, label: 'Score 65+' },
              ].map((stat, i) => (
                <div key={i} style={{
                  background: colors.white,
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                }}>
                  <div style={{ color: colors.teal, fontSize: '36px', fontWeight: '300' }}>{stat.value}</div>
                  <div style={{ color: colors.steelGray, fontSize: '13px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Distribution Chart */}
            <div style={{
              background: colors.deepNavy,
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '200px' }}>
                {distribution.map((bucket, i) => {
                  const isUserBucket = finalScore && (
                    (i === 0 && finalScore <= 35) ||
                    (i === 1 && finalScore > 35 && finalScore <= 49) ||
                    (i === 2 && finalScore > 49 && finalScore <= 64) ||
                    (i === 3 && finalScore > 64 && finalScore <= 79) ||
                    (i === 4 && finalScore > 79)
                  );
                  return (
                    <div key={bucket.range} style={{ textAlign: 'center', flex: 1 }}>
                      <div style={{ color: colors.white, fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                        {bucket.count}
                      </div>
                      <div style={{
                        height: `${(bucket.count / maxCount) * 150}px`,
                        minHeight: '20px',
                        background: bucket.color,
                        borderRadius: '8px 8px 0 0',
                        margin: '0 8px',
                        transition: 'height 0.5s ease',
                        border: isUserBucket ? '3px solid white' : 'none',
                        boxShadow: isUserBucket ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
                      }} />
                      <div style={{ color: bucket.color, fontSize: '13px', fontWeight: '600', marginTop: '12px' }}>
                        {bucket.label}
                      </div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginTop: '4px' }}>
                        {bucket.range}
                      </div>
                      {isUserBucket && (
                        <div style={{
                          marginTop: '8px',
                          background: colors.amber,
                          color: colors.white,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '700',
                        }}>
                          YOU
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* User Position */}
            {finalScore && (
              <div style={{
                background: colors.lightTeal,
                borderRadius: '12px',
                padding: '24px',
                borderLeft: `6px solid ${colors.teal}`,
                textAlign: 'center',
              }}>
                <div style={{ color: colors.teal, fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
                  Your Position
                </div>
                <div style={{ color: colors.charcoal, fontSize: '15px', lineHeight: 1.6 }}>
                  With a score of <strong>{finalScore}</strong>, you rank in the top{' '}
                  <strong>{Math.round((1 - communityScores.filter(s => s.score > finalScore).length / communityScores.length) * 100)}%</strong>{' '}
                  of our community.
                </div>
              </div>
            )}
          </div>
        )}

        {/* INSIGHTS SECTION */}
        {activeSection === 'insights' && (
          <div>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ color: colors.teal, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '8px' }}>
                KEY INSIGHTS
              </div>
              <h2 style={{ color: colors.deepNavy, fontSize: '28px', fontWeight: '600', margin: '0 0 8px 0' }}>
                Your Financial Wellbeing Summary
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { title: 'What you measure, you can manage', desc: 'The CFPB-10 score provides an objective baseline for tracking your financial progress over time.' },
                { title: 'Financial wellbeing is multidimensional', desc: 'Your score reflects security, freedom, control, and future planning - not just income or savings.' },
                { title: 'Small changes compound dramatically', desc: 'Even modest monthly contributions can grow significantly through the power of compound interest.' },
                { title: "You're not alone", desc: 'Comparing with peers helps normalize the financial journey and identify common challenges.' },
              ].map((insight, i) => (
                <div key={i} style={{
                  background: colors.white,
                  borderRadius: '16px',
                  padding: '32px',
                  borderTop: `4px solid ${colors.teal}`,
                  boxShadow: '0 2px 16px rgba(11,31,58,0.06)',
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: colors.lightTeal,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}>
                    <Icons.lightbulb color={colors.teal} size={20} />
                  </div>
                  <h3 style={{ color: colors.deepNavy, fontSize: '16px', fontWeight: '700', margin: '0 0 12px 0' }}>
                    {insight.title}
                  </h3>
                  <p style={{ color: colors.steelGray, fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            {finalScore && (
              <div style={{
                marginTop: '32px',
                background: `linear-gradient(135deg, ${colors.deepNavy} 0%, ${colors.teal} 100%)`,
                borderRadius: '16px',
                padding: '48px',
                textAlign: 'center',
                color: colors.white,
              }}>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', marginBottom: '16px', opacity: 0.8 }}>
                  YOUR JOURNEY SNAPSHOT
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '48px' }}>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '200' }}>{finalScore}</div>
                    <div style={{ fontSize: '13px', opacity: 0.7 }}>CFPB Score</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '48px', fontWeight: '200' }}>{getPersona(finalScore).name.split(' ')[1]}</div>
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

      </main>

      {/* ===================== FOOTER ===================== */}
      <footer style={{
        background: colors.deepNavy,
        padding: '36px 48px',
        marginTop: '72px',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: colors.teal, fontSize: '14px', fontWeight: '600', letterSpacing: '1.5px', marginBottom: '6px' }}>
              HOUSE OF FINANCE & TECH BERLIN
            </div>
            <div style={{ color: colors.steelGray, fontSize: '13px' }}>
              Europe's Leading Financial Wellbeing Ecosystem
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: colors.steelGray, fontSize: '13px', marginBottom: '4px' }}>
              Station 1: Measurement Station
            </div>
            <div style={{ color: colors.steelGray, fontSize: '12px' }}>
              Financial Education
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FinancialEducation;
