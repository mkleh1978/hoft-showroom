# Component Spec: AI Risk Profiling

| Field | Description |
|-------|-------------|
| **Owner** | HoFT Investment Team |
| **Status** | Live |
| **Last Updated** | 2026-02-03 |
| **Location** | `src/stations/Investment.jsx` (Risk Section) |

---

## 1. Purpose & Value Proposition

> Das AI Risk Profiling ermittelt in 5 Fragen das persönliche Risikoprofil des Besuchers und empfiehlt eine entsprechende Asset-Allokation. Der Begriff "AI" signalisiert moderne, datengetriebene Methodik.

---

## 2. Target Audience

| Segment | Needs |
|---------|-------|
| **Primary** | Anleger, die ihre Risikobereitschaft kennen möchten |
| **Secondary** | Robo-Advisor-Interessierte, die den Prozess erleben wollen |

---

## 3. User Journey

```
[Magic Triangle] → [5 Fragen beantworten] → [Profil sehen] → [Allokation verstehen] → [Portfolio Builder]
```

| Step | Description |
|------|-------------|
| **Entry** | Nach Magic Triangle oder direkte Navigation |
| **Interaction** | 5 Multiple-Choice/Slider Fragen |
| **Output** | Risk Score (1-10), Profil-Typ, Empfohlene Allokation |
| **Next Action** | Weiter zum Portfolio Builder |

---

## 4. Core Features

- [x] 5-Fragen Assessment
- [x] Radio-Button und Slider Inputs
- [x] Real-time Scoring
- [x] 4 Profil-Typen (Conservative bis Aggressive Growth)
- [x] Empfohlene Equity/Bond/Alt Allokation
- [x] Expected Return und Max Drawdown Anzeige
- [x] 30-Year Projection

---

## 5. Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Assessment Completion | > 90% | Form Analytics |
| "Analyze" Button Click | > 85% | Click Tracking |
| Profile View Duration | > 20s | Analytics |

---

## 6. Dependencies & Integration

**Inputs:**
- `riskAnswers` State Object (horizon, reaction, tolerance, income, experience)

**Outputs:**
- Risk Score (1-10)
- Profile Type String
- Recommended Allocation (%)
- Expected Return, Max Drawdown

**Connected Components:**
- [Magic Triangle](./15-magic-triangle.md) - Vorheriger Schritt
- [Portfolio Builder](./17-portfolio-builder.md) - Nächster Schritt

---

## 7. Technical Implementation

```jsx
// Initial Answers
const [riskAnswers, setRiskAnswers] = useState({
  horizon: 2,      // 0-3 (< 3 yrs to > 20 yrs)
  reaction: 1,     // 0-2 (Sell, Hold, Buy more)
  tolerance: 5,    // 1-10 Slider
  income: 1,       // 0-2 (Variable to Very Stable)
  experience: 1    // 0-2 (Beginner to Advanced)
});

// Score Calculation
const calculateRiskScore = () => {
  const { horizon, reaction, tolerance, income, experience } = riskAnswers;
  const score = Math.round(
    (horizon * 1.5 + reaction * 2 + tolerance * 0.8 +
     income * 1.2 + experience * 1.5) / 2.5
  );
  return Math.min(10, Math.max(1, score));
};

// Profile Mapping
const getRiskProfile = (score) => {
  if (score <= 3) return 'Conservative';
  if (score <= 5) return 'Moderate';
  if (score <= 7) return 'Balanced Growth';
  return 'Aggressive Growth';
};
```

---

## 8. Verbesserungsideen

| Priorität | Idee | Aufwand | Impact |
|-----------|------|---------|--------|
| **Hoch** | Mehr Fragen für präziseres Profil (10+) | Medium | Hoch |
| **Hoch** | Behavioral Assessment (Szenario-basiert) | Hoch | Hoch |
| **Mittel** | Vergleich mit Peer Group | Medium | Mittel |
| **Mittel** | PDF Export des Profils | Medium | Mittel |
| **Niedrig** | Progress Saving (Return later) | Medium | Niedrig |

---

## 9. Alternativideen

| Alternative | Pro | Contra |
|-------------|-----|--------|
| **Gamified Assessment** | Höheres Engagement | Kann unseriös wirken |
| **Video Scenarios** | Realistischer | Hoher Aufwand |
| **Historical Quiz** | "Wie hättest du reagiert?" | Hindsight Bias |
| **Psychometric Test** | Tiefere Einsichten | Länger, komplexer |
| **Quick 3-Question** | Schneller | Weniger präzise |

---

## 10. Risk Profile Details

| Profile | Score | Equity | Bonds | Alt | Expected Return | Max Drawdown |
|---------|-------|--------|-------|-----|-----------------|--------------|
| Conservative | 1-3 | 40-55% | 40-50% | 5-10% | 4-5% | -15% |
| Moderate | 4-5 | 55-65% | 30-40% | 5-10% | 5-6% | -20% |
| Balanced Growth | 6-7 | 65-80% | 15-30% | 5-10% | 6-7% | -30% |
| Aggressive Growth | 8-10 | 80-95% | 0-15% | 5-10% | 7-9% | -40% |

---

## 11. Assessment Questions

1. **Investment Time Horizon**
   - < 3 years, 3-10 years, 10-20 years, > 20 years

2. **Reaction to 25% Drop**
   - Sell immediately, Hold and wait, Buy more

3. **Volatility Comfort** (1-10 Slider)
   - Stability vs Growth

4. **Income Stability**
   - Variable, Moderate, Very Stable

5. **Investment Experience**
   - Beginner, Intermediate, Advanced

---

## 12. Open Questions / Risks

| Item | Status | Owner |
|------|--------|-------|
| Wissenschaftliche Validierung | Open | Research |
| Rechtlicher Disclaimer | Open | Legal |
| MiFID II Konformität | Open | Compliance |

---

*Template Version: 1.0*
