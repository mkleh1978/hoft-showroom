# Component Spec: Portfolio Builder

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Investment Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Investment.jsx` (Portfolio Section) |

---

## 1. Purpose & Value Proposition

> Der Portfolio Builder ermöglicht die interaktive Allokation eines €100.000 Portfolios über drei Asset-Klassen und zeigt eine 10-Jahres-Simulation mit realistischen Marktbedingungen.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Anleger, die Portfolio-Konstruktion hands-on erleben wollen |
| **Secondary** | Finanz-Interessierte, die Allokations-Auswirkungen verstehen wollen |

---

## 3. User Journey

```
[Risk Profile] → [Allokation anpassen] → [Simulation starten] → [Ergebnis beobachten] → [AI Bewertung sehen]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Risk Profiling oder direkte Navigation |
| **Interaction** | Sliders für Equity/Bonds/Alternatives (Total = 100%) |
| **Output** | Animierte 10-Jahres-Simulation mit Endwert |
| **Next Action** | ESG Analysis oder Bewertung verstehen |

---

## 4. Core Features

- [x] 3 Asset Class Sliders (Equity, Bonds, Alternatives)
- [x] Automatische Rebalancierung auf 100%
- [x] Visual Allocation Bar
- [x] 10-Jahres-Simulation Button
- [x] Animierter Year-by-Year Progress
- [x] AI Evaluation (Diversification, Cost, ESG, Risk-Return)
- [x] Expected Annual Return Calculation

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Slider Interaction | > 80% | Event Tracking |
| Simulation Starts | > 70% | Click Tracking |
| Simulation Completion | > 90% | Animation Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `portfolioAllocation` State (stocks, bonds, alternatives)
- Simulation Parameters (return rates per asset class)

**Outputs:**
- `portfolioValue` nach Simulation
- AI Evaluation Scores
- Expected Annual Return

**Connected Components:**
- [Risk Profiling](./16-risk-profiling.md) - Vorheriger Schritt
- [ESG Analysis](./18-esg-analysis.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// State
const [portfolioAllocation, setPortfolioAllocation] = useState({
  stocks: 60, bonds: 30, alternatives: 10
});
const [portfolioValue, setPortfolioValue] = useState(100000);
const [simulationYear, setSimulationYear] = useState(0);

// Simulation Logic
useEffect(() => {
  if (simulationRunning && simulationYear < 10) {
    const timer = setTimeout(() => {
      const baseReturn = (
        portfolioAllocation.stocks * 0.08 +
        portfolioAllocation.bonds * 0.04 +
        portfolioAllocation.alternatives * 0.06
      ) / 100;
      const volatility = portfolioAllocation.stocks * 0.002;
      const yearReturn = baseReturn + (Math.random() - 0.5) * volatility;
      setPortfolioValue(prev => Math.round(prev * (1 + yearReturn)));
      setSimulationYear(prev => prev + 1);
    }, 500);
    return () => clearTimeout(timer);
  }
}, [simulationRunning, simulationYear]);
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Mehr Asset Classes (REITs, Commodities, Crypto) | Medium | Hoch |
| **Hoch** | Monthly Contribution Simulation | Medium | Hoch |
| **Mittel** | Scenario Selection (Bull/Bear/Base) | Medium | Mittel |
| **Mittel** | Rebalancing Strategy Comparison | Medium | Mittel |
| **Niedrig** | Social Comparison (wie andere allokieren) | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Pre-built Portfolios** | Schneller Start | Weniger interaktiv |
| **Drag & Drop** | Intuitive UX | Mobile-Probleme |
| **Risk-Matched Suggestions** | Personalisiert | Weniger Exploration |
| **Historical Backtesting** | Realer | Past ≠ Future |
| **Factor Tilts** | Fortgeschritten | Komplexität |

---

## 10. AI Evaluation Metrics

| Metric | Calculation | Score Range |
|--------|-------------|-------------|
| **Diversification** | stocks < 80% && bonds > 10% ? 88 : 55 | 0-100 |
| **Cost Efficiency** | Fixed 94 (ETF-based assumption) | 0-100 |
| **ESG Compliance** | stocks > 50% ? 82 : 70 | 0-100 |
| **Risk-Return** | 40 < stocks < 80 ? 79 : 52 | 0-100 |

**Score Color Coding:**
- 0-40: Red
- 41-60: Amber
- 61-80: Teal
- 81-100: Green

---

## 11. Return Assumptions

| Asset Class | Expected Return | Volatility |
|-------------|-----------------|------------|
| Global Equities | 8% | Variable (Stocks * 0.2%) |
| Investment Grade Bonds | 4% | Low |
| Alternatives (REITs, Gold) | 6% | Medium |

**Formula:**
```
Expected Annual Return =
  (Stocks% × 0.08) + (Bonds% × 0.04) + (Alt% × 0.06)
```

---

## 12. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Realistischere Volatilität | Open | Quant |
| Korrelationen zwischen Assets | Open | Finance |
| Tax Drag Simulation | Open | Tax Expert |

---

*Template Version: 1.0*
