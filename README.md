# HoFT Ecosystem Showroom

Interactive financial wellbeing showroom application for **House of Finance & Tech Berlin**.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/hoft-showroom/deploys)

---

## Overview

The HoFT Ecosystem Showroom is an interactive demonstration of financial technology solutions, guiding users through a complete financial wellbeing journey across 4 stations. Each station offers hands-on tools and calculators that showcase fintech capabilities.

### Key Features

- **Cross-Station Data Sharing** - Your CFPB score influences recommendations across all stations
- **LocalStorage Persistence** - Progress is saved and restored between sessions
- **Intelligent Recommendations** - AI-powered suggestions based on your financial profile
- **Interactive Visualizations** - Monte Carlo simulations, portfolio builders, and more

---

## The 4 Stations

### Station 1: Financial Education (Measurement Station)
*"What you measure, you can manage"*

| Tool | Description |
|------|-------------|
| **CFPB-10 Assessment** | Science-backed 10-question financial wellbeing assessment |
| **Goal Builder** | Set and visualize financial goals with compound growth projections |
| **Community Wall** | Anonymous comparison with other users |

### Station 2: Financial Foundation (Budget & Security)
*"Budget, emergency fund, debt freedom"*

| Tool | Description |
|------|-------------|
| **Four Pillars** | Overview of financial foundation principles |
| **Budget Calculator** | 50-30-20, Pay-Yourself-First, or Zero-Based methods |
| **Subscription Audit** | Identify and eliminate wasteful subscriptions |
| **Emergency Fund Calculator** | Calculate your safety net target |
| **Debt Freedom Simulator** | Avalanche vs Snowball repayment strategies |

### Station 3: Protection Point (Retirement & Risk)
*"AI makes complexity manageable"*

| Tool | Description |
|------|-------------|
| **Three Pillars** | German pension system explained |
| **AI Retirement Planner** | Chat-based pension gap calculation |
| **Monte Carlo Simulation** | 500-scenario retirement success probability |
| **Life Events Simulator** | Impact of job loss, illness, divorce on finances |
| **European Comparison** | Pension systems across 5 EU countries |

### Station 4: Investment Corner (Wealth Building)
*"WealthTech democratizes professional investing"*

| Tool | Description |
|------|-------------|
| **Magic Triangle** | Security-Liquidity-Return tradeoffs |
| **AI Risk Profiling** | 5-question behavioral risk assessment |
| **Portfolio Builder** | Interactive asset allocation with backtesting |
| **ESG Analysis** | Environmental, Social, Governance investing |
| **Life Planning Calculator** | Compound growth by life phase |

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite 5** | Build tool & dev server |
| **CSS-in-JS** | Styling (no external libraries) |
| **LocalStorage** | Client-side persistence |
| **Context API** | Cross-station state management |

### Project Structure

```
src/
├── App.jsx                    # Main app with UserProvider
├── context/
│   └── UserContext.jsx        # State management + persistence
├── styles/
│   ├── designTokens.js        # Colors, typography, spacing
│   └── componentStyles.js     # Shared component styles
├── components/
│   ├── icons/                 # SVG icon system
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Slider.jsx
│   │   └── ...
│   └── stations/              # Station-specific components
│       ├── education/
│       ├── foundation/
│       ├── protection/
│       └── investment/
└── stations/                  # Station page components
    ├── FinancialEducation.jsx
    ├── FinancialFoundation.jsx
    ├── Protection.jsx
    └── Investment.jsx
```

---

## Cross-Station Data Flow

The CFPB score from Station 1 influences recommendations across all other stations:

```
Station 1 (Education)
    │
    ├─► CFPB Score ──► Station 2 (Budget method recommendation)
    │                  Station 4 (Risk adjustment -2 if score <50)
    │
    └─► Goals ────────► Station 4 (Pre-fill life planning)

Station 2 (Foundation)
    │
    └─► Monthly Income ──► Station 3 (Pre-fill retirement planner)

Station 3 (Protection)
    │
    ├─► Age ──────────► Station 4 (Pre-fill life planning)
    └─► Pension Gap ──► Station 4 (Suggested savings rate)
```

### Recommendation Logic

| CFPB Score | Budget Method | Risk Adjustment | Emergency Multiplier |
|------------|---------------|-----------------|----------------------|
| < 50 | 50-30-20 (simple) | -2 (conservative) | 1.5x |
| 50-70 | Pay-Yourself-First | 0 | 1x |
| > 70 | Zero-Based (advanced) | 0 | 1x |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

### Netlify (Connected)

The repository is connected to Netlify for automatic deployments:

1. Push to `master` branch
2. Netlify automatically builds and deploys
3. Live at: `https://hoft-showroom.netlify.app`

### Manual Deployment

```bash
npm run build
# Upload /dist folder to any static host
```

### Configuration

See `netlify.toml` for build settings:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect configured

---

## Documentation

Detailed documentation is available in the `/docu` folder:

| Document | Description |
|----------|-------------|
| [00-overview.md](./docu/component-specs/00-overview.md) | Architecture & component index |
| [20-design-system.md](./docu/component-specs/20-design-system.md) | Colors, typography, spacing |
| [21-ux-guidelines.md](./docu/component-specs/21-ux-guidelines.md) | User experience patterns |
| [22-tech-stack.md](./docu/component-specs/22-tech-stack.md) | Technical architecture |
| [23-data-integration.md](./docu/component-specs/23-data-integration.md) | Cross-station data flow |

### Component Specs

Each component has its own specification document:
- `02-cfpb-assessment.md` through `19-life-planning.md`

---

## LocalStorage

All user data is stored under the key: `hoft_user_profile`

```javascript
// Sample stored data
{
  "cfpbScore": 65,
  "cfpbPersona": "Steady Builder",
  "financialGoals": [...],
  "monthlyIncome": 3500,
  "budgetMethod": "50-30-20",
  "age": 45,
  "pensionGap": 800,
  "riskScore": 6,
  "lastUpdated": "2026-02-03T..."
}
```

To clear all data:
- Open DevTools → Application → Local Storage
- Delete `hoft_user_profile`

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Deep Navy | `#0B1F3A` | Primary, headers |
| Teal | `#0D9488` | Accent, interactive |
| Steel Gray | `#64748B` | Secondary text |
| Green | `#059669` | Success, positive |
| Amber | `#D97706` | Warning, attention |

### Typography

- Font: System font stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, etc.)
- Base size: 14px
- Scale: xs (11px) → 4xl (36px)

### Spacing

- Base unit: 4px
- Scale: space1 (4px) → space12 (48px)

---

## Contributing

1. Create a feature branch
2. Make changes
3. Test locally with `npm run dev`
4. Build to verify: `npm run build`
5. Push and create PR

---

## License

Proprietary - House of Finance & Tech Berlin

---

*Last updated: February 2026*
