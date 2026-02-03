# HoFT Ecosystem Showroom - Component Documentation

## Overview

Diese Dokumentation enthält detaillierte Product Specs für alle Komponenten des HoFT Ecosystem Showroom.

**Status:** Alle Komponenten implementiert und live
**Letzte Aktualisierung:** Februar 2026

---

## Architektur

```
App.jsx (Main Navigation + UserProvider)
│
├── UserContext (Cross-Station State)
│   ├── CFPB Data (score, persona, answers)
│   ├── Goals Data (financial goals array)
│   ├── Budget Data (income, expenses, method)
│   ├── Protection Data (age, pension gap)
│   └── Investment Data (risk profile, allocation)
│
├── Station 1: Financial Education
│   ├── CFPB-10 Assessment (Financial Mirror) → writes CFPB score
│   ├── Goal Builder (Builder's Table) → writes goals
│   ├── Community Wall
│   └── Key Insights
│
├── Station 2: Financial Foundation
│   ├── Four Pillars Overview
│   ├── Budget Calculator ← reads CFPB for recommendations
│   ├── Subscription Audit
│   ├── Emergency Fund Calculator
│   ├── Debt Freedom Simulator
│   └── Key Insights
│
├── Station 3: Protection Point
│   ├── Three Pillars (Pension System)
│   ├── AI Retirement Planner ← reads budget income
│   ├── Monte Carlo Simulation
│   ├── Life Events Simulator
│   ├── European Comparison
│   └── Key Insights
│
└── Station 4: Investment Corner
    ├── Magic Triangle
    ├── AI Risk Profiling ← reads CFPB for adjustment
    ├── Portfolio Builder
    ├── ESG Analysis
    ├── Life Planning Calculator ← reads age, pension gap, goals
    └── Key Insights
```

---

## Component Index

### Station Components

| # | Component | Station | File | Context Integration |
|---|-----------|---------|------|---------------------|
| 1 | Main Menu & Navigation | Core | `App.jsx` | UserProvider wrapper |
| 2 | CFPB-10 Assessment | 1 | `CFPBAssessment.jsx` | Writes: score, persona |
| 3 | Goal Builder | 1 | `GoalBuilder.jsx` | Writes: goals |
| 4 | Community Wall | 1 | `CommunityWall.jsx` | - |
| 5 | Four Pillars | 2 | `FourPillars.jsx` | - |
| 6 | Budget Calculator | 2 | `BudgetCalculator.jsx` | Reads: CFPB score |
| 7 | Subscription Audit | 2 | `SubscriptionAudit.jsx` | - |
| 8 | Emergency Fund Calculator | 2 | `EmergencyFundCalculator.jsx` | - |
| 9 | Debt Freedom Simulator | 2 | `DebtFreedomSimulator.jsx` | - |
| 10 | Three Pillars (Pension) | 3 | `ThreePillars.jsx` | - |
| 11 | AI Retirement Planner | 3 | `AIRetirementPlanner.jsx` | Reads: budget income |
| 12 | Monte Carlo Simulation | 3 | `MonteCarloSimulation.jsx` | - |
| 13 | Life Events Simulator | 3 | `LifeEventsSimulator.jsx` | - |
| 14 | European Comparison | 3 | `EuropeanComparison.jsx` | - |
| 15 | Magic Triangle | 4 | `MagicTriangle.jsx` | - |
| 16 | AI Risk Profiling | 4 | `RiskProfiling.jsx` | Reads: CFPB for adjustment |
| 17 | Portfolio Builder | 4 | `PortfolioBuilder.jsx` | - |
| 18 | ESG Analysis | 4 | `ESGAnalysis.jsx` | - |
| 19 | Life Planning Calculator | 4 | `LifePlanningCalculator.jsx` | Reads: age, gap, goals |

### UI Components

| Component | File | Description |
|-----------|------|-------------|
| Button | `ui/Button.jsx` | Primary, secondary, light variants |
| Card | `ui/Card.jsx` | Default, accent, highlight, dark variants |
| ProgressBar | `ui/ProgressBar.jsx` | Animated progress indicator |
| RadioOption | `ui/RadioOption.jsx` | Selectable option cards |
| Slider | `ui/Slider.jsx` | Range input with labels |
| InputField | `ui/InputField.jsx` | Text/number input with prefix |
| StationHeader | `ui/StationHeader.jsx` | Station title with icon |
| StationNav | `ui/StationNav.jsx` | Section navigation tabs |
| PageContainer | `ui/PageContainer.jsx` | Layout wrapper |

### Context & State

| Module | File | Description |
|--------|------|-------------|
| UserContext | `context/UserContext.jsx` | Cross-station state management |
| Design Tokens | `styles/designTokens.js` | Colors, typography, spacing |
| Component Styles | `styles/componentStyles.js` | Shared style objects |

---

## System Documentation

| # | Document | Description | File |
|---|----------|-------------|------|
| 20 | Design System | Farben, Typography, Spacing | [20-design-system.md](./20-design-system.md) |
| 21 | UX Guidelines | User Experience, Flows | [21-ux-guidelines.md](./21-ux-guidelines.md) |
| 22 | Tech Stack | Architektur, Dependencies | [22-tech-stack.md](./22-tech-stack.md) |
| 23 | Data Integration | Cross-Station Datenverknüpfung | [23-data-integration.md](./23-data-integration.md) |

---

## Cross-Station Data Flow

### Visual Indicators (Implemented)

| Station | Component | Indicator |
|---------|-----------|-----------|
| Station 2 | BudgetCalculator | Teal banner: "Based on your CFPB Score (XX)" |
| Station 3 | AIRetirementPlanner | Hint: "From your budget: €XX/year" + "Use this" button |
| Station 4 | RiskProfiling | Amber/teal banner: "CFPB Score Impact" |
| Station 4 | LifePlanningCalculator | Card: "Pre-filled with Your Data" |

### Data Dependencies

```
CFPB Score (Station 1)
    ↓
    ├── recommendedBudgetMethod() → Station 2
    ├── riskAdjustment (-2 if <50) → Station 4
    └── emergencyMonthsMultiplier (1.5x if <40) → Station 2

Monthly Income (Station 2)
    ↓
    └── prefillIncome (annual) → Station 3 AI Planner

Age, Pension Gap (Station 3)
    ↓
    └── prefillAge, prefillPensionGap → Station 4 Life Planning

Goals (Station 1)
    ↓
    └── prefillGoals → Station 4 Life Planning
```

---

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `deepNavy` | #0B1F3A | Primary, headers, dark cards |
| `charcoal` | #1A1A2E | Backgrounds |
| `teal` | #0D9488 | Accent, interactive elements |
| `lightTeal` | #CCFBF1 | Highlights, badges |
| `white` | #FFFFFF | Backgrounds |
| `offWhite` | #F8FAFC | Card backgrounds |
| `steelGray` | #64748B | Secondary text |
| `green` | #059669 | Success states |
| `amber` | #D97706 | Warnings |
| `red` | #DC2626 | Errors |

### Typography

```javascript
fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

fontSizeXs: '11px'
fontSizeSm: '13px'
fontSizeBase: '14px'
fontSizeLg: '16px'
fontSizeXl: '18px'
fontSize2xl: '22px'
fontSize3xl: '28px'
fontSize4xl: '36px'
```

### Spacing

```javascript
space1: '4px'
space2: '6px'
space3: '8px'
space4: '12px'
space5: '16px'
space6: '20px'
space8: '32px'
space10: '40px'
space12: '48px'
```

---

## UserContext Hooks

```javascript
// CFPB Assessment
const { score, persona, setCFPBResult, resetCFPB } = useCFPB();

// Financial Goals
const { goals, addGoal, removeGoal, updateGoal } = useGoals();

// Budget & Foundation
const { monthlyIncome, budgetMethod, setBudgetData } = useBudget();

// Protection & Retirement
const { age, pensionGap, setProtectionData } = useProtection();

// Investment
const { riskScore, investorProfile, setRiskProfile } = useInvestment();

// Cross-Station Recommendations
const { recommendedBudgetMethod, riskAdjustment, cfpbScore } = useRecommendations();

// Clear All Data
const { clearAllData } = useClearData();
```

---

## File Structure

```
src/
├── App.jsx
├── context/
│   └── UserContext.jsx
├── styles/
│   ├── designTokens.js
│   └── componentStyles.js
├── components/
│   ├── icons/
│   │   ├── index.jsx
│   │   └── iconPaths.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── InputField.jsx
│   │   ├── PageContainer.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── RadioOption.jsx
│   │   ├── Slider.jsx
│   │   ├── StationHeader.jsx
│   │   ├── StationNav.jsx
│   │   └── index.js
│   └── stations/
│       ├── education/
│       │   ├── CFPBAssessment.jsx
│       │   ├── GoalBuilder.jsx
│       │   ├── CommunityWall.jsx
│       │   └── index.js
│       ├── foundation/
│       │   ├── FourPillars.jsx
│       │   ├── BudgetCalculator.jsx
│       │   ├── SubscriptionAudit.jsx
│       │   ├── EmergencyFundCalculator.jsx
│       │   ├── DebtFreedomSimulator.jsx
│       │   └── index.js
│       ├── protection/
│       │   ├── ThreePillars.jsx
│       │   ├── AIRetirementPlanner.jsx
│       │   ├── MonteCarloSimulation.jsx
│       │   ├── LifeEventsSimulator.jsx
│       │   ├── EuropeanComparison.jsx
│       │   └── index.js
│       └── investment/
│           ├── MagicTriangle.jsx
│           ├── RiskProfiling.jsx
│           ├── PortfolioBuilder.jsx
│           ├── ESGAnalysis.jsx
│           ├── LifePlanningCalculator.jsx
│           └── index.js
└── stations/
    ├── FinancialEducation.jsx
    ├── FinancialFoundation.jsx
    ├── Protection.jsx
    └── Investment.jsx
```

---

*Dokumentation erstellt: Februar 2026*
*Projekt: HoFT Ecosystem Showroom*
*Version: 2.0 (Phase 8 Complete)*
