# Component Spec: Monte Carlo Simulation

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Protection Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Protection.jsx` (Simulation Section) |

---

## 1. Purpose & Value Proposition

> Die Monte Carlo Simulation zeigt 500 verschiedene Zukunftsszenarien für den Vermögensaufbau bis zur Rente und während der Entnahmephase. Im Gegensatz zu einer einzelnen Projektion verdeutlicht sie die Unsicherheit und "Sequence of Returns Risk".

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die verstehen wollen, wie sicher ihr Rentenplan ist |
| **Secondary** | Finanz-Enthusiasten, die fortgeschrittene Analysetools schätzen |

---

## 3. User Journey

```
[AI Planner] → [Parameter sehen] → [Simulation starten] → [Szenarien beobachten] → [Erfolgsrate verstehen]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach AI Planner Ergebnis |
| **Interaction** | "Run 500 Scenarios" Button klicken |
| **Output** | Animierter Chart mit Success Rate |
| **Next Action** | Life Events oder Interpretation lesen |

---

## 4. Core Features

- [x] 500 Szenario-Simulation
- [x] Animated Canvas Chart
- [x] Success/Failure Path Visualization
- [x] Median Line Highlight
- [x] Progress Bar während Simulation
- [x] Success Rate Anzeige (Green/Yellow/Red)
- [x] Educational "What is Monte Carlo" Section
- [x] Retirement Age Marker

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Simulation Start Rate | > 80% | Click Tracking |
| Watch to Completion | > 70% | Animation Analytics |
| Interpretation Read | > 50% | Scroll Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `userData` from AI Planner (age, income, savings)
- Simulation Parameters (monthly savings, retirement age, return assumptions)

**Outputs:**
- `simulationResult.successRate` - % of successful scenarios
- `scenarios` Array - 500 scenario paths
- Visual Chart Output

**Connected Components:**
- [AI Retirement Planner](./11-ai-retirement-planner.md) - Datenquelle
- [Life Events](./13-life-events.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// Simulation Parameters
const yearsToRetirement = 67 - age;
const retirementYears = 25;
const monthlyContribution = 500;
const monthlyNeeds = (income * 0.75) / 12;
const monthlyPension = (income * 0.48) / 12;

// Single Scenario Loop
for (let year = 0; year <= totalYears; year++) {
  const returnRate = 0.04 + (Math.random() - 0.5) * 0.16;  // -4% to +12%
  const inflation = 0.02 + Math.random() * 0.02;  // 2% to 4%

  if (year < yearsToRetirement) {
    // Accumulation Phase
    balance = balance * (1 + returnRate) + (monthlyContribution * 12);
  } else {
    // Withdrawal Phase
    const withdrawalNeeded = (monthlyNeeds - monthlyPension) * 12;
    balance = balance * (1 + returnRate * 0.6) - withdrawalNeeded;
  }
}

// Success Criteria
const success = balance > 0 at end of simulation;
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Adjustable Parameters (Sparrate, Rendite) | Medium | Hoch |
| **Hoch** | Percentile Bands (10th, 50th, 90th) | Medium | Hoch |
| **Mittel** | Historical Backtesting Option | Hoch | Mittel |
| **Mittel** | Scenario Comparison (mit/ohne bAV) | Medium | Mittel |
| **Niedrig** | Download Results as CSV | Niedrig | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Deterministic Projection** | Einfacher zu verstehen | Versteckt Unsicherheit |
| **Fewer Scenarios (100)** | Schneller | Weniger statistisch robust |
| **Fan Chart** | Cleaner Visualization | Weniger dramatisch |
| **Real Historical Data** | Realistischer | Vergangene Performance ≠ Zukunft |
| **Web Worker** | Smoother Animation | Komplexere Implementierung |

---

## 10. Educational Content

**What is Monte Carlo?**
- Benannt nach dem Casino in Monaco
- Nutzt Zufallszahlen zur Modellierung von Unsicherheit
- Standard in Finanzplanung und Risikomanagement

**Why Not Just One Projection?**
- Märkte liefern nicht "durchschnittliche" Renditen
- Reihenfolge der Renditen ist entscheidend
- Ein Crash früh in der Rente ist verheerender als später

**Variables:**
- Marktrenditen: -4% bis +12% p.a.
- Inflation: 2% bis 4% p.a.
- Sequence: Wann Crashes passieren

**Success Thresholds:**
- Green (≥80%): Solider Plan
- Yellow (60-79%): Borderline
- Red (<60%): Anpassungen nötig

---

## 11. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Performance auf Mobile | Open | Dev |
| Mehr realistische Rendite-Verteilung | Open | Quant |
| Integration von Sozialversicherungsänderungen | Open | Research |

---

*Template Version: 1.0*
