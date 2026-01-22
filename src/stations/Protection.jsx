import React, { useState, useEffect, useRef } from 'react';

// ============================================
// ICON COMPONENTS (Stroke-based, 2px)
// ============================================
const Icons = {
  play: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  ),
  layers: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  calculator: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="8.01" y2="10"/>
      <line x1="12" y1="10" x2="12.01" y2="10"/>
      <line x1="16" y1="10" x2="16.01" y2="10"/>
      <line x1="8" y1="14" x2="8.01" y2="14"/>
      <line x1="12" y1="14" x2="12.01" y2="14"/>
      <line x1="16" y1="14" x2="16.01" y2="14"/>
      <line x1="8" y1="18" x2="8.01" y2="18"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
      <line x1="16" y1="18" x2="16.01" y2="18"/>
    </svg>
  ),
  trendingUp: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  refresh: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  globe: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  lightbulb: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="18" x2="15" y2="18"/>
      <line x1="10" y1="22" x2="14" y2="22"/>
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
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
  users: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  clock: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  checkCircle: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  alertCircle: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  send: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  activity: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  baby: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="5"/>
      <path d="M12 13v8"/>
      <path d="M9 18h6"/>
    </svg>
  ),
  briefcase: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  userX: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <line x1="18" y1="8" x2="23" y2="13"/>
      <line x1="23" y1="8" x2="18" y2="13"/>
    </svg>
  ),
  arrowRight: ({ color = 'currentColor', size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
};

// Color constants from HoFT brand
const colors = {
  deepNavy: '#0B1F3A',
  charcoal: '#1A1A2E',
  white: '#FFFFFF',
  offWhite: '#F8F9FA',
  teal: '#0D9488',
  lightTeal: '#CCFBF1',
  steelGray: '#6B7280',
  border: '#E5E7EB',
  red: '#DC2626',
  amber: '#D97706',
  green: '#059669',
};

const Protection = () => {
  // Navigation state
  const [activeSection, setActiveSection] = useState('welcome');

  // AI Planner state
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', text: 'Welcome to the Protection Point! I\'ll help calculate your pension gap. What\'s your current age?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatStep, setChatStep] = useState(0);
  const [userData, setUserData] = useState({});
  const [isTyping, setIsTyping] = useState(false);

  // Monte Carlo state
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [scenarioCount, setScenarioCount] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

  // Life events state
  const [selectedEvent, setSelectedEvent] = useState(null);

  // European comparison state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [barsAnimated, setBarsAnimated] = useState(false);

  // Three pillars state
  const [activePillar, setActivePillar] = useState(null);

  const chatEndRef = useRef(null);
  const canvasRef = useRef(null);

  // Navigation sections
  const sections = [
    { id: 'welcome', label: 'Start', icon: Icons.play },
    { id: 'pillars', label: 'Three Pillars', icon: Icons.layers },
    { id: 'planner', label: 'AI Planner', icon: Icons.calculator },
    { id: 'simulation', label: 'Monte Carlo', icon: Icons.trendingUp },
    { id: 'events', label: 'Life Events', icon: Icons.refresh },
    { id: 'europe', label: 'EU Compare', icon: Icons.globe },
    { id: 'aha', label: 'Key Insights', icon: Icons.lightbulb },
  ];

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Animate bars when EU section is active
  useEffect(() => {
    if (activeSection === 'europe') {
      setTimeout(() => setBarsAnimated(true), 300);
    }
  }, [activeSection]);

  // ============================================
  // CHAT LOGIC
  // ============================================
  const chatQuestions = [
    { field: 'age', next: 'Great! What\'s your approximate gross annual income in EUR?' },
    { field: 'income', next: 'And your current retirement savings? (roughly in EUR)' },
    { field: 'savings', next: null },
  ];

  const handleChatSend = () => {
    if (!chatInput.trim() || chatStep > 2) return;

    const value = chatInput.trim();
    setChatMessages(prev => [...prev, { type: 'user', text: value }]);
    setUserData(prev => ({ ...prev, [chatQuestions[chatStep].field]: value }));
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (chatQuestions[chatStep].next) {
        setChatMessages(prev => [...prev, { type: 'ai', text: chatQuestions[chatStep].next }]);
        setChatStep(prev => prev + 1);
      } else {
        const age = parseInt(userData.age) || 45;
        const income = parseInt(userData.income) || 55000;
        const savings = parseInt(value) || 50000;
        const pension = Math.round(income * 0.48 / 12);
        const required = Math.round(income * 0.75 / 12);
        const gap = required - pension;

        setUserData(prev => ({ ...prev, pension, required, gap, savings: parseInt(value), calculatedAge: age, calculatedIncome: income }));
        setChatMessages(prev => [...prev, {
          type: 'ai',
          text: `Analysis complete!\n\n📊 Expected monthly pension: €${pension.toLocaleString()}\n💰 Required monthly income: €${required.toLocaleString()}\n⚠️ Your pension gap: €${gap.toLocaleString()}/month\n\nProceed to Monte Carlo simulation to see your probability of success.`
        }]);
        setChatStep(3);
      }
    }, 800);
  };

  // ============================================
  // MONTE CARLO SIMULATION
  // ============================================
  const runMonteCarloSimulation = () => {
    setSimulationRunning(true);
    setScenarioCount(0);
    setSimulationResult(null);
    setScenarios([]);

    const age = userData.calculatedAge || 45;
    const income = userData.calculatedIncome || 55000;
    const savings = userData.savings || 50000;
    const yearsToRetirement = Math.max(67 - age, 1);
    const retirementYears = 25;
    const totalYears = yearsToRetirement + retirementYears;
    const monthlyContribution = 500;
    const monthlyPension = (income * 0.48) / 12;
    const monthlyNeeds = (income * 0.75) / 12;

    const newScenarios = [];
    const totalScenarios = 500;
    let successCount = 0;

    const runBatch = (start, batchSize) => {
      for (let i = start; i < Math.min(start + batchSize, totalScenarios); i++) {
        const scenario = [];
        let balance = savings;
        let failed = false;

        for (let year = 0; year <= totalYears; year++) {
          const returnRate = 0.04 + (Math.random() - 0.5) * 0.16;
          const inflation = 0.02 + Math.random() * 0.02;

          if (year < yearsToRetirement) {
            balance = balance * (1 + returnRate) + (monthlyContribution * 12);
          } else {
            const withdrawalNeeded = (monthlyNeeds - monthlyPension) * 12 * Math.pow(1 + inflation, year - yearsToRetirement);
            balance = balance * (1 + returnRate * 0.6) - withdrawalNeeded;
          }

          if (balance < 0 && !failed) {
            failed = true;
            balance = 0;
          }

          scenario.push({
            year: age + year,
            balance: Math.max(0, balance),
            failed,
          });
        }

        if (!failed) successCount++;
        newScenarios.push(scenario);
      }

      setScenarios([...newScenarios]);
      setScenarioCount(Math.min(start + batchSize, totalScenarios));

      if (start + batchSize < totalScenarios) {
        setTimeout(() => runBatch(start + batchSize, batchSize), 30);
      } else {
        const successRate = Math.round((successCount / totalScenarios) * 100);
        setSimulationResult({
          successRate,
          scenariosRun: totalScenarios,
          status: successRate >= 80 ? 'green' : successRate >= 60 ? 'yellow' : 'red',
        });
        setSimulationRunning(false);
      }
    };

    runBatch(0, 20);
  };

  // Draw Monte Carlo chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || scenarios.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 30, right: 30, bottom: 50, left: 70 };

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = colors.offWhite;
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (height - padding.top - padding.bottom) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Y-axis labels
    ctx.fillStyle = colors.steelGray;
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ['€800k', '€600k', '€400k', '€200k', '€0'].forEach((label, i) => {
      const y = padding.top + (height - padding.top - padding.bottom) * (i / 4);
      ctx.fillText(label, padding.left - 12, y + 4);
    });

    // X-axis labels
    const age = userData.calculatedAge || 45;
    ctx.textAlign = 'center';
    const xLabels = [age, Math.round(age + 10), Math.round(age + 20), Math.round(age + 30), Math.round(age + 40)];
    xLabels.forEach((yearLabel, i) => {
      if (yearLabel <= 95) {
        const x = padding.left + (width - padding.left - padding.right) * (i / 4);
        ctx.fillText(`Age ${yearLabel}`, x, height - 20);
      }
    });

    // Draw scenarios
    const maxBalance = 800000;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    scenarios.forEach((scenario) => {
      const failed = scenario[scenario.length - 1]?.failed;
      ctx.strokeStyle = failed ? 'rgba(220, 38, 38, 0.15)' : 'rgba(13, 148, 136, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();

      scenario.forEach((point, i) => {
        const x = padding.left + (i / (scenario.length - 1)) * chartWidth;
        const y = padding.top + (1 - Math.min(point.balance, maxBalance) / maxBalance) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    });

    // Draw median line if complete
    if (simulationResult) {
      const sortedScenarios = [...scenarios].sort((a, b) => {
        return (b[b.length - 1]?.balance || 0) - (a[a.length - 1]?.balance || 0);
      });
      const medianScenario = sortedScenarios[Math.floor(scenarios.length / 2)];

      if (medianScenario) {
        ctx.strokeStyle = colors.teal;
        ctx.lineWidth = 3;
        ctx.beginPath();
        medianScenario.forEach((point, i) => {
          const x = padding.left + (i / (medianScenario.length - 1)) * chartWidth;
          const y = padding.top + (1 - Math.min(point.balance, maxBalance) / maxBalance) * chartHeight;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Retirement line
        const yearsToRetirement = Math.max(67 - age, 1);
        const retirementX = padding.left + (yearsToRetirement / (medianScenario.length - 1)) * chartWidth;
        ctx.strokeStyle = 'rgba(107, 114, 128, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(retirementX, padding.top);
        ctx.lineTo(retirementX, height - padding.bottom);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = colors.steelGray;
        ctx.fillText('Retirement (67)', retirementX, padding.top - 10);
      }
    }
  }, [scenarios, simulationResult, userData]);

  // ============================================
  // DATA
  // ============================================
  const pillars = [
    { num: 1, title: 'Public Pension', desc: 'Pay-as-you-go financed state pension. Declining from 48% to 43% by 2040.', value: '48%', label: 'replacement rate', detail: 'The German public pension (Gesetzliche Rentenversicherung) is funded by current workers paying for retirees. Demographic shifts make this increasingly challenging.' },
    { num: 2, title: 'Occupational Pension', desc: 'Employer (co-)financed pension schemes. Coverage varies by industry.', value: '~50%', label: 'penetration', detail: 'Betriebliche Altersvorsorge (bAV) offers tax advantages and often employer matching. Highly recommended but not universally available.' },
    { num: 3, title: 'Private Provision', desc: 'Riester, Rürup, life insurance, ETF savings plans.', value: '€800-1,200', label: 'monthly gap', detail: 'Personal responsibility is crucial. ETF savings plans often outperform traditional insurance due to lower costs.' },
  ];

  const lifeEvents = [
    { id: 'birth', icon: Icons.baby, name: 'Birth', impact: '~€250k/child', color: colors.teal, detail: 'Having a child costs approximately €250,000 until age 18, including childcare, education, and daily expenses.', urgency: 'Start education savings early.' },
    { id: 'marriage', icon: Icons.users, name: 'Marriage', impact: 'Tax benefits', color: colors.green, detail: 'Tax advantages through Ehegattensplitting but also risk concentration. Shared costs save 20-30%.', urgency: 'Review beneficiaries.' },
    { id: 'jobloss', icon: Icons.briefcase, name: 'Job Loss', impact: '60-67% income', color: colors.amber, detail: 'Unemployment benefit covers 60% of net salary (67% with children) for 12-24 months.', urgency: 'Build 6-month emergency fund.' },
    { id: 'illness', icon: Icons.activity, name: 'Illness', impact: '70% for 78 weeks', color: colors.amber, detail: 'Sick pay: 6 weeks at 100%, then 70% for 78 weeks. Disability pension only 30-40%.', urgency: 'Consider disability insurance.' },
    { id: 'divorce', icon: Icons.userX, name: 'Divorce', impact: '50/50 split', color: colors.red, detail: 'Assets split 50/50 (Zugewinnausgleich). Pension rights divided. Expenses increase 30-40%.', urgency: 'Protect individual retirement.' },
    { id: 'disability', icon: Icons.shield, name: 'Disability', impact: '30-40% coverage', color: colors.red, detail: '1 in 4 workers becomes disabled. Statutory pension only covers 30-40% of income.', urgency: 'HIGH PRIORITY: Get BU insurance.' },
  ];

  const countries = [
    { code: 'DE', flag: '🇩🇪', name: 'Germany', rate: 48, system: '3-Pillar System', detail: 'Declining public pension with voluntary occupational and private pillars.', color: colors.teal },
    { code: 'CH', flag: '🇨🇭', name: 'Switzerland', rate: 59, system: 'Mandatory 3 Pillars', detail: 'Strong mandatory occupational pension with individual accounts.', color: colors.green },
    { code: 'NL', flag: '🇳🇱', name: 'Netherlands', rate: 70, system: 'Quasi-Mandatory', detail: 'Excellent occupational coverage through industry-wide pension funds.', color: '#6366F1' },
    { code: 'AT', flag: '🇦🇹', name: 'Austria', rate: 78, system: 'Pay-as-you-go', detail: 'High replacement from generous public pension system.', color: colors.deepNavy },
    { code: 'SE', flag: '🇸🇪', name: 'Sweden', rate: 55, system: 'NDC + Premium', detail: 'Notional defined contribution with mandatory premium pension.', color: colors.amber },
  ];

  const ahaData = [
    { num: 1, title: 'The 20-Year Gap', stat: '3×', desc: 'Starting at 45 vs 55 triples your retirement assets. €500/month at 6%: €250k vs €85k.' },
    { num: 2, title: 'Disability Reality', stat: '1 in 4', desc: 'One in four becomes disabled before retirement. Statutory coverage only 30-40%.' },
    { num: 3, title: 'Longevity Risk', stat: '€360k', desc: '25% of 65-year-olds reach 95. That\'s 10 extra years at €3,000/month to fund.' },
    { num: 4, title: 'Part-Time Wins', stat: 'Better', desc: 'Gradual retirement from 55 often beats hard stop at 60 financially.' },
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px', background: colors.offWhite, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>

      {/* ===================== HEADER ===================== */}
      <header style={{ background: colors.deepNavy, padding: '24px 48px', borderBottom: `4px solid ${colors.teal}` }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: colors.teal, fontSize: '12px', fontWeight: 700, letterSpacing: '2px', marginBottom: '4px' }}>STATION 3</div>
            <h1 style={{ color: colors.white, fontSize: '28px', fontWeight: 700, margin: 0 }}>Protection Point</h1>
            <div style={{ color: colors.steelGray, fontSize: '14px', marginTop: '4px' }}>How do I secure my future?</div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.4)', borderRadius: '10px', padding: '12px 20px', textAlign: 'center' }}>
              <Icons.target color={colors.teal} size={20} />
              <div style={{ color: colors.white, fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>48%</div>
              <div style={{ color: colors.lightTeal, fontSize: '10px', fontWeight: 600 }}>DE Rate</div>
            </div>
            <div style={{ background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.4)', borderRadius: '10px', padding: '12px 20px', textAlign: 'center' }}>
              <Icons.users color={colors.teal} size={20} />
              <div style={{ color: colors.white, fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>1 in 4</div>
              <div style={{ color: colors.lightTeal, fontSize: '10px', fontWeight: 600 }}>Disability</div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== TAB NAVIGATION ===================== */}
      <nav style={{ background: colors.white, borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', gap: '4px', padding: '0 48px' }}>
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '16px 20px', background: 'transparent', border: 'none',
                  borderBottom: activeSection === section.id ? `3px solid ${colors.teal}` : '3px solid transparent',
                  color: activeSection === section.id ? colors.teal : colors.charcoal,
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.2s ease',
                }}
              >
                <IconComponent color={activeSection === section.id ? colors.teal : colors.steelGray} size={18} />
                {section.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ===================== MAIN CONTENT ===================== */}
      <main style={{ maxWidth: '1320px', margin: '0 auto', padding: '48px' }}>

        {/* ==================== WELCOME ==================== */}
        {activeSection === 'welcome' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div style={{ width: '80px', height: '80px', background: colors.lightTeal, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Icons.shield color={colors.teal} size={40} />
              </div>
              <h2 style={{ fontSize: '32px', color: colors.deepNavy, fontWeight: 300, margin: 0 }}>
                Welcome to <span style={{ color: colors.teal, fontWeight: 600 }}>Protection Point</span>
              </h2>
              <p style={{ fontSize: '16px', color: colors.steelGray, marginTop: '16px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Retirement planning, risk protection, and pension analysis — powered by AI and Monte Carlo simulation.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '48px' }}>
              {[
                { icon: Icons.layers, label: 'Three Pillars', desc: 'German pension system' },
                { icon: Icons.calculator, label: 'AI Planner', desc: 'Calculate your gap' },
                { icon: Icons.trendingUp, label: 'Monte Carlo', desc: '500 scenarios' },
                { icon: Icons.globe, label: 'EU Compare', desc: '5 countries' },
              ].map((item, i) => (
                <div key={i} style={{ background: colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}>
                  <item.icon color={colors.teal} size={32} />
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: colors.deepNavy, margin: '16px 0 8px' }}>{item.label}</h4>
                  <p style={{ fontSize: '13px', color: colors.steelGray, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ background: colors.lightTeal, borderRadius: '12px', padding: '24px', borderLeft: `6px solid ${colors.teal}` }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Icons.alertCircle color={colors.teal} size={24} />
                The Pension Gap
              </h3>
              <p style={{ fontSize: '14px', color: colors.charcoal, margin: 0, lineHeight: 1.7 }}>
                The difference between your last net salary and expected pension. For €50,000 gross income, the typical gap is <strong>€800-1,200 monthly</strong>.
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button onClick={() => setActiveSection('pillars')} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                Start the Journey <Icons.arrowRight color={colors.white} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== THREE PILLARS ==================== */}
        {activeSection === 'pillars' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px', marginBottom: '8px' }}>FOUNDATION KNOWLEDGE</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 32px' }}>The Three-Pillar Model</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pillars.map((pillar, i) => (
                <div key={i} onClick={() => setActivePillar(activePillar === i ? null : i)} style={{ background: colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', cursor: 'pointer', border: activePillar === i ? `2px solid ${colors.teal}` : '2px solid transparent', transition: 'all 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '56px', height: '56px', background: colors.teal, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700, color: colors.white, flexShrink: 0 }}>{pillar.num}</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: colors.deepNavy, margin: 0 }}>{pillar.title}</h3>
                      <p style={{ fontSize: '14px', color: colors.steelGray, margin: '6px 0 0' }}>{pillar.desc}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '28px', fontWeight: 700, color: colors.teal }}>{pillar.value}</div>
                      <div style={{ fontSize: '12px', color: colors.steelGray }}>{pillar.label}</div>
                    </div>
                  </div>
                  {activePillar === i && (
                    <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${colors.border}` }}>
                      <p style={{ fontSize: '14px', color: colors.charcoal, margin: 0, lineHeight: 1.7 }}>{pillar.detail}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button onClick={() => setActiveSection('planner')} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                Continue to AI Planner <Icons.arrowRight color={colors.white} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== AI PLANNER ==================== */}
        {activeSection === 'planner' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px', marginBottom: '8px' }}>AI RETIREMENT PLANNER</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 32px' }}>Calculate Your Pension Gap</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px' }}>
              {/* Chat Interface */}
              <div style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', borderTop: `4px solid ${colors.teal}`, display: 'flex', flexDirection: 'column', height: '500px' }}>
                <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icons.calculator color={colors.teal} size={20} />
                  <span style={{ fontWeight: 600, color: colors.deepNavy }}>AI Retirement Advisor</span>
                </div>

                <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '85%', padding: '12px 16px', borderRadius: '12px',
                        borderBottomLeftRadius: msg.type === 'ai' ? '4px' : '12px',
                        borderBottomRightRadius: msg.type === 'user' ? '4px' : '12px',
                        background: msg.type === 'ai' ? colors.teal : colors.lightTeal,
                        color: msg.type === 'ai' ? colors.white : colors.charcoal,
                        fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-line',
                      }}>{msg.text}</div>
                    </div>
                  ))}
                  {isTyping && (
                    <div style={{ display: 'flex', gap: '6px', padding: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.teal, animation: 'pulse 1s infinite' }}/>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.teal, animation: 'pulse 1s infinite 0.2s' }}/>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.teal, animation: 'pulse 1s infinite 0.4s' }}/>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {chatStep < 3 ? (
                  <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}`, display: 'flex', gap: '12px' }}>
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                      placeholder={chatStep === 0 ? "e.g., 45" : chatStep === 1 ? "e.g., 55000" : "e.g., 50000"}
                      style={{ flex: 1, padding: '12px 16px', border: `2px solid ${colors.border}`, borderRadius: '6px', fontSize: '16px', fontFamily: 'inherit', outline: 'none' }}
                    />
                    <button onClick={handleChatSend} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '12px 16px', cursor: 'pointer', fontFamily: 'inherit' }}>
                      <Icons.send color={colors.white} size={18} />
                    </button>
                  </div>
                ) : (
                  <div style={{ padding: '16px', borderTop: `1px solid ${colors.border}`, textAlign: 'center' }}>
                    <button onClick={() => setActiveSection('simulation')} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      Run Monte Carlo Simulation <Icons.arrowRight color={colors.white} size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Sidebar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Age', 'Income', 'Savings', 'Result'].map((label, i) => (
                  <div key={i} style={{ background: i === chatStep ? colors.deepNavy : i < chatStep ? colors.lightTeal : colors.white, borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: i === chatStep ? colors.teal : i < chatStep ? colors.green : colors.steelGray, color: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 700 }}>
                      {i < chatStep ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: i === chatStep ? colors.white : i < chatStep ? colors.teal : colors.steelGray }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
          </div>
        )}

        {/* ==================== MONTE CARLO ==================== */}
        {activeSection === 'simulation' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px', marginBottom: '8px' }}>MONTE CARLO SIMULATION</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 12px' }}>Probability Analysis</h2>
            <p style={{ color: colors.steelGray, marginBottom: '32px', maxWidth: '800px' }}>
              Instead of a single "best guess" projection, we simulate 500 different possible futures to show the range of outcomes.
            </p>

            {/* What is Monte Carlo Explanation */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
              <div style={{ background: colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', background: colors.lightTeal, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.target color={colors.teal} size={22} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: 0 }}>What is Monte Carlo?</h3>
                </div>
                <p style={{ fontSize: '14px', color: colors.charcoal, lineHeight: 1.7, margin: 0 }}>
                  Named after the famous casino, Monte Carlo simulation uses <strong>randomness</strong> to model uncertainty.
                  We run your retirement plan through 500 different market scenarios — some with great returns, some with crashes,
                  some with high inflation — to see how often your money lasts.
                </p>
              </div>

              <div style={{ background: colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', background: colors.lightTeal, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.activity color={colors.teal} size={22} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: 0 }}>Why Not Just One Projection?</h3>
                </div>
                <p style={{ fontSize: '14px', color: colors.charcoal, lineHeight: 1.7, margin: 0 }}>
                  A single projection assumes "average" returns every year. But markets don't work that way —
                  a crash early in retirement is far more damaging than one later. Monte Carlo captures this
                  <strong> sequence of returns risk</strong> that simple calculators miss.
                </p>
              </div>
            </div>

            {/* Simulation Parameters */}
            <div style={{ background: colors.deepNavy, borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: colors.teal, letterSpacing: '1px', margin: '0 0 20px' }}>SIMULATION PARAMETERS</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                {[
                  { label: 'Your Age', value: userData.calculatedAge || 45, unit: 'years' },
                  { label: 'Retirement Age', value: 67, unit: 'years' },
                  { label: 'Planning Horizon', value: 'Age 92', unit: '25+ years' },
                  { label: 'Monthly Savings', value: '€500', unit: 'until 67' },
                  { label: 'Scenarios', value: '500', unit: 'simulations' },
                ].map((param, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.white }}>{param.value}</div>
                    <div style={{ fontSize: '11px', color: colors.lightTeal, marginTop: '4px' }}>{param.label}</div>
                    <div style={{ fontSize: '10px', color: colors.steelGray }}>{param.unit}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variables Explained */}
            <div style={{ background: colors.lightTeal, borderRadius: '12px', padding: '20px', marginBottom: '24px', borderLeft: `6px solid ${colors.teal}` }}>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 12px' }}>📊 What Varies in Each Scenario?</h4>
              <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '13px', color: colors.charcoal }}>
                  <strong>Market Returns:</strong> -4% to +12% annually (random)
                </div>
                <div style={{ fontSize: '13px', color: colors.charcoal }}>
                  <strong>Inflation:</strong> 2% to 4% annually (random)
                </div>
                <div style={{ fontSize: '13px', color: colors.charcoal }}>
                  <strong>Sequence:</strong> When crashes happen matters
                </div>
              </div>
            </div>

            {/* Main Chart */}
            <div style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', borderTop: `4px solid ${colors.teal}`, padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: 0 }}>Portfolio Value Over Time</h3>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '20px', height: '3px', background: 'rgba(13,148,136,0.3)', borderRadius: '2px' }}/>
                    <span style={{ color: colors.steelGray }}>Success paths</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '20px', height: '3px', background: 'rgba(220,38,38,0.3)', borderRadius: '2px' }}/>
                    <span style={{ color: colors.steelGray }}>Failure paths</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '20px', height: '3px', background: colors.teal, borderRadius: '2px' }}/>
                    <span style={{ color: colors.steelGray }}>Median outcome</span>
                  </div>
                </div>
              </div>

              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <canvas ref={canvasRef} width={1000} height={400} style={{ width: '100%', height: '400px', borderRadius: '8px' }} />

                {!simulationRunning && !simulationResult && scenarios.length === 0 && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(248,249,250,0.98)', borderRadius: '8px' }}>
                    <Icons.trendingUp color={colors.teal} size={56} />
                    <h3 style={{ fontSize: '20px', color: colors.deepNavy, marginTop: '20px' }}>Ready to Run Simulation</h3>
                    <p style={{ fontSize: '14px', color: colors.steelGray, marginTop: '8px', textAlign: 'center', maxWidth: '400px' }}>
                      Click below to generate 500 different market scenarios and see your probability of retirement success.
                    </p>
                    <button onClick={runMonteCarloSimulation} style={{ marginTop: '24px', background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '16px 32px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                      <Icons.play color={colors.white} size={20} /> Run 500 Scenarios
                    </button>
                  </div>
                )}
              </div>

              {/* Status Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: `1px solid ${colors.border}` }}>
                {simulationRunning ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', border: `3px solid ${colors.lightTeal}`, borderTopColor: colors.teal, borderRadius: '50%', animation: 'spin 1s linear infinite' }}/>
                    <span style={{ color: colors.steelGray }}>Running scenario {scenarioCount} of 500...</span>
                    <div style={{ width: '200px', height: '6px', background: colors.border, borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${(scenarioCount / 500) * 100}%`, height: '100%', background: colors.teal, transition: 'width 0.1s ease' }}/>
                    </div>
                  </div>
                ) : simulationResult ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', background: simulationResult.status === 'green' ? 'rgba(5,150,105,0.1)' : simulationResult.status === 'yellow' ? 'rgba(217,119,6,0.1)' : 'rgba(220,38,38,0.1)', borderRadius: '8px' }}>
                    <Icons.checkCircle color={simulationResult.status === 'green' ? colors.green : simulationResult.status === 'yellow' ? colors.amber : colors.red} size={22} />
                    <span style={{ fontWeight: 600, color: simulationResult.status === 'green' ? colors.green : simulationResult.status === 'yellow' ? colors.amber : colors.red }}>
                      {simulationResult.successRate}% of scenarios succeeded
                    </span>
                  </div>
                ) : (
                  <span style={{ color: colors.steelGray }}>Click "Run 500 Scenarios" to start the simulation</span>
                )}

                {simulationResult && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: colors.steelGray }}>Risk Level:</span>
                    {['green', 'yellow', 'red'].map(status => (
                      <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: simulationResult.status === status ? (status === 'green' ? colors.green : status === 'yellow' ? colors.amber : colors.red) : colors.border, boxShadow: simulationResult.status === status ? `0 0 12px ${status === 'green' ? colors.green : status === 'yellow' ? colors.amber : colors.red}` : 'none' }}/>
                        <span style={{ fontSize: '9px', color: colors.steelGray }}>{status === 'green' ? '≥80%' : status === 'yellow' ? '60-79%' : '<60%'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results Interpretation */}
            {simulationResult && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
                <div style={{ background: colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.checkCircle color={colors.teal} size={20} />
                    What Does This Mean?
                  </h3>
                  <p style={{ fontSize: '14px', color: colors.charcoal, lineHeight: 1.7, margin: 0 }}>
                    In <strong>{simulationResult.successRate}% of the 500 simulated futures</strong>, your money lasted until age 92.
                    {simulationResult.successRate >= 80
                      ? " This is considered a solid retirement plan — you have good odds of financial security."
                      : simulationResult.successRate >= 60
                      ? " This is borderline — consider increasing savings or adjusting expectations."
                      : " This needs attention — significant changes to your plan are recommended."}
                  </p>
                </div>

                <div style={{ background: colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Icons.lightbulb color={colors.teal} size={20} />
                    How to Improve Your Odds
                  </h3>
                  <ul style={{ fontSize: '14px', color: colors.charcoal, lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
                    <li>Save €100 more monthly → +5-8% success rate</li>
                    <li>Work 2 years longer → +10-15% success rate</li>
                    <li>Reduce withdrawal needs by 10% → +8-12% success rate</li>
                  </ul>
                </div>
              </div>
            )}

            {simulationResult && (
              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button onClick={() => setActiveSection('events')} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                  Continue to Life Events <Icons.arrowRight color={colors.white} size={18} />
                </button>
              </div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ==================== LIFE EVENTS ==================== */}
        {activeSection === 'events' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px', marginBottom: '8px' }}>LIFE EVENT SIMULATOR</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 8px' }}>Financial Impact Analysis</h2>
            <p style={{ color: colors.steelGray, marginBottom: '32px' }}>Click an event to see its financial impact</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {lifeEvents.map((event) => {
                const IconComponent = event.icon;
                return (
                  <div key={event.id} onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)} style={{ background: selectedEvent?.id === event.id ? colors.deepNavy : colors.white, borderRadius: '12px', padding: '24px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', cursor: 'pointer', textAlign: 'center', border: selectedEvent?.id === event.id ? `2px solid ${event.color}` : '2px solid transparent', transition: 'all 0.2s ease' }}>
                    <IconComponent color={selectedEvent?.id === event.id ? event.color : colors.deepNavy} size={36} />
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: selectedEvent?.id === event.id ? colors.white : colors.deepNavy, margin: '16px 0 8px' }}>{event.name}</h4>
                    <p style={{ fontSize: '13px', color: selectedEvent?.id === event.id ? 'rgba(255,255,255,0.7)' : colors.steelGray, margin: 0 }}>{event.impact}</p>
                  </div>
                );
              })}
            </div>

            {selectedEvent && (
              <div style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', borderTop: `4px solid ${colors.teal}`, marginTop: '24px', padding: '24px', display: 'flex', gap: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: `${selectedEvent.color}20`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <selectedEvent.icon color={selectedEvent.color} size={28} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: colors.deepNavy, margin: 0 }}>{selectedEvent.name} — Financial Impact</h3>
                  <p style={{ fontSize: '14px', color: colors.charcoal, margin: '12px 0', lineHeight: 1.7 }}>{selectedEvent.detail}</p>
                  <div style={{ display: 'inline-block', background: `${selectedEvent.color}20`, color: selectedEvent.color, padding: '6px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 700 }}>{selectedEvent.urgency}</div>
                </div>
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button onClick={() => setActiveSection('europe')} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                Continue to EU Comparison <Icons.arrowRight color={colors.white} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== EUROPEAN COMPARISON ==================== */}
        {activeSection === 'europe' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px', marginBottom: '8px' }}>EUROPEAN COMPARISON</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 8px' }}>Pension Replacement Rates</h2>
            <p style={{ color: colors.steelGray, marginBottom: '32px' }}>Pension as percentage of last net salary. Click a country for details.</p>

            <div style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', borderTop: `4px solid ${colors.teal}`, padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: '320px', paddingTop: '24px' }}>
                {countries.map((country) => (
                  <div key={country.code} onClick={() => setSelectedCountry(selectedCountry?.code === country.code ? null : country)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', width: '120px' }}>
                    <div style={{ width: '80px', height: '240px', background: colors.offWhite, borderRadius: '8px', display: 'flex', alignItems: 'flex-end', overflow: 'hidden', border: selectedCountry?.code === country.code ? `3px solid ${country.color}` : '3px solid transparent' }}>
                      <div style={{ width: '100%', height: barsAnimated ? `${country.rate}%` : '0%', background: country.color, borderRadius: '6px 6px 0 0', transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '12px' }}>
                        <span style={{ color: colors.white, fontSize: '16px', fontWeight: 700 }}>{country.rate}%</span>
                      </div>
                    </div>
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: colors.offWhite, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginTop: '16px' }}>{country.flag}</div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: colors.deepNavy, marginTop: '8px' }}>{country.name}</span>
                    <span style={{ fontSize: '11px', color: colors.steelGray }}>{country.system}</span>
                  </div>
                ))}
              </div>

              {selectedCountry && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${colors.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '36px' }}>{selectedCountry.flag}</span>
                    <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 700, color: colors.deepNavy, margin: 0 }}>{selectedCountry.name} — {selectedCountry.rate}% Replacement Rate</h4>
                      <p style={{ fontSize: '14px', color: colors.charcoal, margin: '8px 0 0', lineHeight: 1.6 }}>{selectedCountry.detail}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button onClick={() => setActiveSection('aha')} style={{ background: colors.teal, color: colors.white, border: 'none', borderRadius: '6px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                Continue to Key Insights <Icons.arrowRight color={colors.white} size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ==================== AHA MOMENTS ==================== */}
        {activeSection === 'aha' && (
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px', marginBottom: '8px' }}>KEY INSIGHTS</div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 32px' }}>Aha Moments</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {ahaData.map((aha, i) => (
                <div key={i} style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', borderTop: `4px solid ${colors.teal}`, padding: '24px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
                    <Icons.lightbulb color={colors.deepNavy} size={120} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: colors.teal, letterSpacing: '2px' }}>AHA MOMENT #{aha.num}</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: colors.deepNavy, margin: '12px 0 16px' }}>{aha.title}</h3>
                    <div style={{ fontSize: '44px', fontWeight: 700, color: colors.teal, marginBottom: '12px' }}>{aha.stat}</div>
                    <p style={{ fontSize: '14px', color: colors.steelGray, lineHeight: 1.6, margin: 0 }}>{aha.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {userData.gap && (
              <div style={{ background: colors.lightTeal, borderRadius: '12px', padding: '24px', borderLeft: `6px solid ${colors.teal}`, marginTop: '32px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: colors.deepNavy, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icons.checkCircle color={colors.teal} size={24} />
                  Your Personal Summary
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: colors.steelGray }}>Monthly Gap</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy }}>€{userData.gap?.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: colors.steelGray }}>Expected Pension</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy }}>€{userData.pension?.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', color: colors.steelGray }}>Required Monthly</div>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: colors.deepNavy }}>€{userData.required?.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ background: colors.white, borderRadius: '12px', boxShadow: '0 2px 16px rgba(11,31,58,0.06)', borderTop: `4px solid ${colors.teal}`, marginTop: '24px', padding: '32px', textAlign: 'center' }}>
              <Icons.shield color={colors.teal} size={40} />
              <h3 style={{ fontSize: '20px', color: colors.deepNavy, margin: '16px 0 12px', fontWeight: 700 }}>The Core Message</h3>
              <p style={{ fontSize: '15px', color: colors.charcoal, margin: 0, lineHeight: 1.7, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
                Retirement planning is not a luxury — it's a necessity. AI makes the complexity manageable.
                <strong> Those who know their pension gap can close it. Those who ignore it will be surprised by it.</strong>
              </p>
            </div>
          </div>
        )}

      </main>

      {/* ===================== FOOTER ===================== */}
      <footer style={{ background: colors.deepNavy, padding: '36px 48px', marginTop: '72px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: colors.teal, fontSize: '14px', fontWeight: 600, letterSpacing: '1.5px', marginBottom: '6px' }}>HOUSE OF FINANCE & TECH BERLIN</div>
            <div style={{ color: colors.steelGray, fontSize: '13px' }}>Europe's Leading Financial Wellbeing Ecosystem</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: colors.steelGray, fontSize: '13px', marginBottom: '4px' }}>Station 3: Protection Point</div>
            <div style={{ color: colors.steelGray, fontSize: '12px' }}>InsurTech · Retirement Planning · Pension Analysis</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Protection;
