# Component Spec: Life Planning Calculator

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Investment Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Investment.jsx` (Timeline Section) |

---

## 1. Purpose & Value Proposition

> Der Life Planning Calculator zeigt, wie sich die empfohlene Asset-Allokation über verschiedene Lebensphasen verändert und ermöglicht eine interaktive Vermögensprojektion basierend auf Alter, Sparrate und erwarteter Rendite.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Personen, die langfristige Vermögensplanung verstehen wollen |
| **Secondary** | Berufseinsteiger, die früh mit Sparen beginnen möchten |

---

## 3. User Journey

```
[ESG Analysis] → [Lebensphasen-Timeline] → [Parameter anpassen] → [Projektion sehen] → [Compound Interest verstehen]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach ESG oder direkte Navigation |
| **Interaction** | Timeline betrachten, Sliders anpassen |
| **Output** | Vermögensprognose bei Alter 65 |
| **Next Action** | Core Message lesen, Station wechseln |

---

## 4. Core Features

- [x] 4-Phasen Lebenszyklus-Timeline
- [x] Equity-Allokation pro Phase
- [x] 3 interaktive Sliders (Alter, Sparrate, Rendite)
- [x] Vermögensprojektion mit 65
- [x] Eigenbeiträge vs. Compound Growth Vergleich
- [x] "Power of Compound Interest" Insight
- [x] Core Message Box

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Slider Interactions | > 70% | Event Tracking |
| Calculation Views | > 80% | Section Analytics |
| Core Message Read | > 60% | Scroll Tracking |

---

## 6. Dependencies & Integration

**Inputs:**
- `timelineAge` State (20-55)
- `savingsRate` State (100-2000)
- `expectedReturn` State (3-10%)

**Outputs:**
- Wealth at Age 65
- Total Contributions
- Compound Growth Amount

**Connected Components:**
- [ESG Analysis](./18-esg-analysis.md) - Vorheriger Schritt

---

## 7. Technical Implementation

```jsx
// Life Phases Configuration
const phases = [
  { age: '25–34', title: 'Young Professional', equity: '80–90%', focus: 'Growth' },
  { age: '35–44', title: 'Peak Earning', equity: '60–75%', focus: 'Diversify' },
  { age: '45–60', title: 'Consolidation', equity: '45–60%', focus: 'Optimize' },
  { age: '60+', title: 'Retirement', equity: '25–40%', focus: 'Preserve' },
];

// Projection Calculation
const calculateProjection = (monthly, years, rate) => {
  let total = 0;
  for (let i = 0; i < years * 12; i++) {
    total = (total + monthly) * (1 + rate / 100 / 12);
  }
  return Math.round(total);
};

// Usage
const wealthAt65 = calculateProjection(savingsRate, 65 - timelineAge, expectedReturn);
const totalContributions = savingsRate * 12 * (65 - timelineAge);
const compoundGrowth = wealthAt65 - totalContributions;
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Inflation-bereinigte Projektion | Niedrig | Hoch |
| **Hoch** | Multiple Goals (Retirement + House) | Medium | Hoch |
| **Mittel** | Tax Wrapper Comparison (Depot vs. bAV) | Medium | Mittel |
| **Mittel** | "What if I started earlier" Comparison | Niedrig | Mittel |
| **Niedrig** | Age-based Risk Glide Path | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Goal-Based Planning** | Konkreter | Mehr Inputs nötig |
| **Scenario Comparison** | Zeigt Optionen | Kann überfordern |
| **Interactive Timeline** | Drag & Drop | Komplexere UX |
| **Retirement Income** | Relevanter | Zusätzliche Annahmen |
| **Integration mit Rente** | Vollständiger | Komplexität |

---

## 10. Life Phases Detail

| Phase | Age | Equity | Strategy | Rationale |
|-------|-----|--------|----------|-----------|
| **Young Professional** | 25-34 | 80-90% | Growth | Langer Zeithorizont, Zeit für Recovery |
| **Peak Earning** | 35-44 | 60-75% | Diversify | Familie, Immobilie, mehr Verantwortung |
| **Consolidation** | 45-60 | 45-60% | Optimize | Näher an Rente, weniger Risiko |
| **Retirement** | 60+ | 25-40% | Preserve | Kapitalerhalt, Entnahmephase |

---

## 11. Compound Interest Insight

**The Power of Compound Interest:**

| Start Age | Monthly | Years | Total Contributions | With 6% Return |
|-----------|---------|-------|---------------------|----------------|
| 25 | €300 | 40 | €144,000 | ~€600,000 |
| 35 | €300 | 30 | €108,000 | ~€300,000 |
| 45 | €300 | 20 | €72,000 | ~€140,000 |

**Key Message:**
> "Starting at 25 with €300/month = €600,000+ by 65. Starting at 35? Only €300,000. A 10-year delay halves your result."

---

## 12. Calculator Defaults

| Parameter | Default | Min | Max | Step |
|-----------|---------|-----|-----|------|
| Starting Age | 30 | 20 | 55 | 1 |
| Monthly Savings | €500 | €100 | €2,000 | €50 |
| Expected Return | 6% | 3% | 10% | 0.5% |

---

## 13. Core Message

> "WealthTech democratizes professional investing. Robo-Advisory doesn't replace advisors—it makes them more effective. The combination of human empathy and machine precision is unbeatable."

---

## 14. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Rendite-Annahmen Disclaimer | Open | Legal |
| Steuer-Auswirkungen | Open | Tax Expert |
| Inflation langfristig | Open | Economics |

---

*Template Version: 1.0*
